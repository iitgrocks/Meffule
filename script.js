document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
 

    
    function renderContentItems(items) {
        const contentGrid = document.querySelector('.content-grid');
        contentGrid.innerHTML = '';
        
        items.forEach(item => {
            const contentItem = document.createElement('div');
            contentItem.className = 'content-item animate-fadeIn';
            contentItem.innerHTML = `
                <div class="content-thumbnail">
                    <img src="${item.thumbnail}" alt="${item.title}">
                </div>
                <div class="content-info">
                    <h3>${item.title}</h3>
                    <div class="content-meta">
                        <span>${item.views} views</span>
                        <span>${item.date}</span>
                    </div>
                </div>
            `;
            contentGrid.appendChild(contentItem);
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            
            if (filter === 'all') {
                renderContentItems(contentItems);
            } else {
                const filteredItems = contentItems.filter(item => item.type === filter);
                renderContentItems(filteredItems);
            }
        });
    });
    
    // Initial render
    renderContentItems(contentItems);
    
    // Suggestion Form
    const suggestionForm = document.querySelector('.suggestion-form');
    
    suggestionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const suggestion = document.getElementById('suggestion').value;
        const category = document.getElementById('category').value;
        
        if (!name || !email || !suggestion || !category) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the data to your server
        console.log('Suggestion submitted:', { name, email, suggestion, category });
        
        // Show success message
        alert('Thank you for your suggestion! We appreciate your feedback.');
        
        // Reset form
        suggestionForm.reset();
    });
    
    // Upload Functionality
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseFiles = document.getElementById('browseFiles');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const fileList = document.getElementById('fileList');
    const startUpload = document.getElementById('startUpload');
    
    let filesToUpload = [];
    
    // Drag and drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropZone.classList.add('highlight');
    }
    
    function unhighlight() {
        dropZone.classList.remove('highlight');
    }
    
    dropZone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    browseFiles.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    function handleFiles(files) {
        filesToUpload = [...files];
        updateFileList();
    }
    
    function updateFileList() {
        fileList.innerHTML = '';
        
        if (filesToUpload.length === 0) {
            uploadProgress.style.display = 'none';
            return;
        }
        
        uploadProgress.style.display = 'block';
        
        filesToUpload.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileSize = formatFileSize(file.size);
            
            fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fas fa-file-alt file-icon"></i>
                    <div>
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${fileSize}</div>
                    </div>
                </div>
                <div class="file-status uploading">Uploading</div>
            `;
            
            fileList.appendChild(fileItem);
        });
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
    }
    
    startUpload.addEventListener('click', function() {
        if (filesToUpload.length === 0) {
            alert('Please select files to upload');
            return;
        }
        
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Update status to completed
                const statusElements = document.querySelectorAll('.file-status');
                statusElements.forEach(el => {
                    el.classList.remove('uploading');
                    el.classList.add('completed');
                    el.textContent = 'Completed';
                });
                
                // Reset after 3 seconds
                setTimeout(() => {
                    filesToUpload = [];
                    updateFileList();
                    progressFill.style.width = '0%';
                    progressPercent.textContent = '0%';
                }, 3000);
            }
            
            progressFill.style.width = `${progress}%`;
            progressPercent.textContent = `${Math.round(progress)}%`;
        }, 300);
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-fadeIn');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial animation trigger
    animateOnScroll();
});
// CGPA Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const subjectsContainer = document.getElementById('subjects-container');
    const addSubjectBtn = document.getElementById('add-subject');
    const calculateBtn = document.getElementById('calculate-cgpa');
    const cgpaResult = document.getElementById('cgpa-result');
    const totalCreditsEl = document.getElementById('total-credits');
    const performanceEl = document.getElementById('performance');

    // Add a new subject row
    function addSubjectRow() {
        const subjectRow = document.createElement('div');
        subjectRow.className = 'subject-row';
        subjectRow.innerHTML = `
            <div class="form-group">
                <label>Subject Name</label>
                <input type="text" class="subject-name" placeholder="e.g., Data Structures">
            </div>
            <div class="form-group">
                <label>Credits</label>
                <input type="number" class="subject-credits" placeholder="e.g., 4" min="1" max="10">
            </div>
            <div class="form-group">
                <label>Grade</label>
                <select class="subject-grade">
                    <option value="10">A+ (10)</option>
                    <option value="9">A (9)</option>
                    <option value="8">B+ (8)</option>
                    <option value="7">B (7)</option>
                    <option value="6">C+ (6)</option>
                    <option value="5">C (5)</option>
                    <option value="4">D (4)</option>
                    <option value="0">F (Fail)</option>
                </select>
            </div>
            <button class="btn btn-danger remove-subject"><i class="fas fa-trash"></i></button>
        `;
        subjectsContainer.appendChild(subjectRow);
        
        // Add event listener to remove button
        const removeBtn = subjectRow.querySelector('.remove-subject');
        removeBtn.addEventListener('click', function() {
            subjectsContainer.removeChild(subjectRow);
        });
    }

    // Calculate CGPA
    function calculateCGPA() {
        const subjectRows = subjectsContainer.querySelectorAll('.subject-row');
        if (subjectRows.length === 0) {
            alert("Please add at least one subject!");
            return;
        }

        let totalCredits = 0;
        let totalGradePoints = 0;

        subjectRows.forEach(row => {
            const credits = parseFloat(row.querySelector('.subject-credits').value) || 0;
            const grade = parseFloat(row.querySelector('.subject-grade').value) || 0;
            
            totalCredits += credits;
            totalGradePoints += (credits * grade);
        });

        if (totalCredits === 0) {
            alert("Please enter valid credit values!");
            return;
        }

        const cgpa = (totalGradePoints / totalCredits).toFixed(2);
        
        // Update UI
        cgpaResult.textContent = cgpa;
        totalCreditsEl.textContent = totalCredits;
        
        // Determine performance
        let performance = "";
        if (cgpa >= 9.0) performance = "Excellent (First Class)";
        else if (cgpa >= 8.0) performance = "Very Good";
        else if (cgpa >= 7.0) performance = "Good";
        else if (cgpa >= 6.0) performance = "Average";
        else if (cgpa >= 5.0) performance = "Below Average";
        else performance = "Needs Improvement";
        
        performanceEl.textContent = performance;
    }

    // Event Listeners
    addSubjectBtn.addEventListener('click', addSubjectRow);
    calculateBtn.addEventListener('click', calculateCGPA);

    // Add first subject by default
    addSubjectRow();
});
// Content Hub Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterOptions = document.querySelectorAll('.filter-option');
    const contentCards = document.querySelectorAll('.content-card');
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            filterOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter content cards
            contentCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        contentCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Load more functionality (simplified example)
    const loadMoreBtn = document.getElementById('load-more');
    loadMoreBtn.addEventListener('click', function() {
        // In a real implementation, this would fetch more content from a server
        alert('This would load more content in a real implementation');
    });
    
    // Contribute button
    const contributeBtn = document.getElementById('contribute');
    contributeBtn.addEventListener('click', function() {
        // Link to your upload section or open a modal
        window.location.href = '#upload'; // Link to your upload section
    });
});
// Quick Info Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Timetable Fullscreen View
    const viewFullBtn = document.querySelector('.view-full');
    if (viewFullBtn) {
        viewFullBtn.addEventListener('click', function() {
            // In a real implementation, this would open a modal or new page
            const timetableImg = document.querySelector('.timetable-image');
            if (timetableImg) {
                const imageUrl = timetableImg.src;
                window.open(imageUrl, '_blank');
            }
        });
    }
    
    // Make notice items clickable
    const noticeItems = document.querySelectorAll('.notice-item');
    noticeItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('.notice-link');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
    
    // You could add more functionality here like:
    // - Fetching real timetable data
    // - Loading notices from an API
    // - Updating links dynamically
});
const scriptURL = 'https://script.google.com/macros/s/AKfycbyqRJ02IAbfT3Knwyy5uzf_iHVEpoyRxbTh89-VXpAdCzvR2T6zX8MRHFCUTq6muBr_/exec'
            const form = document.forms['google-sheet']
          
            form.addEventListener('submit', e => {
              e.preventDefault()
              fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => alert("Thanks for Contacting us..! We Will Contact You Soon..."))
                .catch(error => console.error('Error!', error.message))
            })


// Academic Calendar Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Sample event data (replace with your actual events)
  const events = [
    {
      id: 1,
      title: "MA 201 Quiz-1",
      date: "2025-08-25",
      type: "confirmed",
      status: "confirmed",
      description: "MA201 Quiz-1 will be taken."
    },
    {
      id: 2,
      title: "MA 201 Quiz-2",
      date: "2025-10-27",
      type: "confirmed",
      status: "confirmed",
      description: "MA201 Quiz-2 will be taken."
    },
    {
      id: 3,
      title: "ME212 Quiz-1",
      date: "2025-08-26",
      type: "tentative",
      status: "tentative",
      description: "possibly Solid Mechanics quiz-1"
    },
    {
      id: 4,
      title: "ME212 Quiz-2",
      date: "2025-10-29",
      type: "tentative",
      status: "tentative",
      description: "possibly Solid Mechanics quiz-2"
    },
    {
      id: 5,
      title: "ME211 Quiz-1",
      date: "2025-09-06",
      type: "confirmed",
      status: "confirmed",
      description: "ThermoDynamics quiz-1 will be taken"
    },
    {
      id: 6,
      title: "ME214 Quiz-1",
      date: "2025-08-24",
      type: "confirmed",
      status: "confirmed",
      description: "Fluid Mechanics Quiz-1 will be taken."
    },
    {
      id: 7,
      title: "Techniche D1",
      date: "2025-08-29",
      type: "event",
      status: "confirmed",
      description: "Techniche Fest Event Day-1"
    },
    {
      id: 8,
      title: "Techniche D2",
      date: "2025-08-30",
      type: "event",
      status: "confirmed",
      description: "Techniche Fest Event Day-2"
    },
    {
      id: 8,
      title: "Techniche D3",
      date: "2025-08-31",
      type: "event",
      status: "confirmed",
      description: "Techniche Fest Event Day-3"
    },
    {
      id: 9,
      title: "Techniche D0",
      date: "2025-08-28",
      type: "event",
      status: "confirmed",
      description: "Techniche Fest Event Day-0"
    }

  ];

  // DOM Elements
  const calendarDays = document.getElementById('calendar-days');
  const currentMonthEl = document.getElementById('current-month');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const eventSearch = document.getElementById('event-search');
  const eventModal = document.getElementById('event-modal');
  const closeModalBtn = document.querySelector('.close-modal');

  // Current date
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Initialize calendar
  renderCalendar(currentMonth, currentYear);

  // Event Listeners
  prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  eventSearch.addEventListener('input', () => {
    renderCalendar(currentMonth, currentYear);
  });

  closeModalBtn.addEventListener('click', () => {
    eventModal.classList.remove('active');
  });

  // Close modal when clicking outside
  eventModal.addEventListener('click', (e) => {
    if (e.target === eventModal) {
      eventModal.classList.remove('active');
    }
  });

  // Render calendar
  function renderCalendar(month, year) {
    // Clear previous calendar
    calendarDays.innerHTML = '';

    // Set current month header
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"];
    currentMonthEl.textContent = `${monthNames[month]} ${year}`;

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get days from previous month
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Create calendar days
    let dayCount = 1;
    let nextMonthDay = 1;
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    // Filter events based on search
    const searchTerm = eventSearch.value.toLowerCase();
    const filteredEvents = events.filter(event => 
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm)
    );

    for (let i = 0; i < totalCells; i++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';

      if (i < firstDay) {
        // Previous month days
        const prevDay = prevMonthDays - firstDay + i + 1;
        dayElement.innerHTML = `<div class="day-number inactive">${prevDay}</div>`;
        dayElement.classList.add('inactive-day');
      } else if (dayCount > daysInMonth) {
        // Next month days
        dayElement.innerHTML = `<div class="day-number inactive">${nextMonthDay}</div>`;
        dayElement.classList.add('inactive-day');
        nextMonthDay++;
      } else {
        // Current month days
        dayElement.innerHTML = `<div class="day-number">${dayCount}</div>`;
        
        // Add events for this day
        const currentDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayCount).padStart(2, '0')}`;
        const dayEvents = filteredEvents.filter(event => event.date === currentDate);
        
        if (dayEvents.length > 0) {
          const eventsContainer = document.createElement('div');
          eventsContainer.className = 'day-events';
          
          dayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = `event-item ${event.type} ${event.status === 'tentative' ? 'tentative' : ''}`;
            eventElement.textContent = event.title;
            eventElement.addEventListener('click', () => openEventModal(event));
            eventsContainer.appendChild(eventElement);
          });
          
          dayElement.appendChild(eventsContainer);
        }
        
        // Highlight current day
        const today = new Date();
        if (dayCount === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          dayElement.classList.add('today');
          const dayNumber = dayElement.querySelector('.day-number');
          dayNumber.innerHTML = `<span class="today-badge">${dayCount}</span>`;
        }
        
        dayCount++;
      }

      calendarDays.appendChild(dayElement);
    }
  }

  // Open event modal
  function openEventModal(event) {
    const modalTitle = document.getElementById('modal-event-title');
    const modalDate = document.getElementById('modal-event-date');
    const modalStatus = document.getElementById('modal-event-status');
    const modalDesc = document.getElementById('modal-event-desc');
    
    modalTitle.textContent = event.title;
    modalDate.innerHTML = `<i class="far fa-calendar"></i> ${formatDate(event.date)}`;
    modalStatus.innerHTML = `<i class="far fa-clock"></i> ${event.status === 'confirmed' ? 'Confirmed' : 'Tentative'}`;
    modalDesc.textContent = event.description;
    
    // Set status color
    modalStatus.style.color = event.status === 'confirmed' ? '#28a745' : '#ffc107';
    
    eventModal.classList.add('active');
  }

  // Format date as "Month Day, Year"
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

});
