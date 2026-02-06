// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const searchInput = document.getElementById('searchInput');
const platformOptions = document.querySelectorAll('.platform-option');
const scheduleForm = document.getElementById('scheduleForm');
const postContent = document.getElementById('postContent');
const charCount = document.getElementById('charCount');
const mediaUpload = document.getElementById('mediaUpload');
const uploadPreview = document.getElementById('uploadPreview');
const recentPosts = document.getElementById('recentPosts');
const scheduledPosts = document.getElementById('scheduledPosts');
const createPostModal = document.getElementById('createPostModal');
const createPostBtn = document.getElementById('createPostBtn');
const closeModal = document.getElementById('closeModal');
const notificationBell = document.getElementById('notificationBell');
const createPostModalElement = document.getElementById('createPostModal');
const timeFilter = document.getElementById('timeFilter');
const aiSuggestionsBtn = document.getElementById('aiSuggestionsBtn');
const suggestionsList = document.getElementById('suggestionsList');
const generateReportBtn = document.getElementById('generateReportBtn');
const respondCommentsBtn = document.getElementById('respondCommentsBtn');

// Sample Data
const samplePosts = [
    {
        id: 1,
        platform: 'instagram',
        icon: 'fab fa-instagram',
        title: 'New product launch announcement',
        time: '2 hours ago',
        likes: 245,
        comments: 42,
        color: '#e1306c'
    },
    {
        id: 2,
        platform: 'twitter',
        icon: 'fab fa-twitter',
        title: 'Industry insights thread',
        time: '5 hours ago',
        likes: 312,
        comments: 87,
        color: '#1da1f2'
    },
    {
        id: 3,
        platform: 'facebook',
        icon: 'fab fa-facebook',
        title: 'Community Q&A session recap',
        time: '1 day ago',
        likes: 521,
        comments: 45,
        color: '#1877f2'
    },
    {
        id: 4,
        platform: 'linkedin',
        icon: 'fab fa-linkedin',
        title: 'Company culture blog post',
        time: '2 days ago',
        likes: 124,
        comments: 28,
        color: '#0077b5'
    }
];

const sampleScheduledPosts = [
    {
        id: 1,
        content: 'Exciting announcement coming tomorrow! Stay tuned for our big reveal.',
        platforms: ['instagram', 'twitter'],
        date: '2023-10-15T10:00',
        status: 'scheduled'
    },
    {
        id: 2,
        content: 'How to maximize your social media impact - tips from our experts.',
        platforms: ['linkedin', 'facebook'],
        date: '2023-10-16T14:30',
        status: 'scheduled'
    },
    {
        id: 3,
        content: 'Flash sale alert! 24 hours only - use code SOCIAL20 for 20% off.',
        platforms: ['instagram', 'facebook', 'twitter'],
        date: '2023-10-17T09:00',
        status: 'draft'
    }
];

const aiSuggestions = [
    'Post about industry trends on Thursday at 2 PM for maximum engagement',
    'Respond to comments on your latest post to boost algorithm visibility',
    'Try using more video content - it gets 3x more engagement',
    'Schedule a poll on Twitter to engage your audience',
    'Share behind-the-scenes content to build authenticity'
];

// Initialize the dashboard
function initDashboard() {
    // Set current date/time for schedule form
    const now = new Date();
    const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
    const formattedDate = futureDate.toISOString().slice(0, 16);
    document.getElementById('postDate').value = formattedDate;
    
    // Load sample data
    loadRecentPosts();
    loadScheduledPosts();
    loadAISuggestions();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start stats simulation
    startStatsSimulation();
}

// Set up event listeners
function setupEventListeners() {
    // Mobile sidebar toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Navigation between sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
            
            // Close sidebar on mobile after selection
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Platform selector
    platformOptions.forEach(option => {
        option.addEventListener('click', () => {
            platformOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    // Character count for post content
    postContent.addEventListener('input', () => {
        charCount.textContent = postContent.value.length;
    });
    
    // Media upload preview
    mediaUpload.addEventListener('change', handleMediaUpload);
    
    // Schedule form submission
    scheduleForm.addEventListener('submit', handleScheduleSubmit);
    
    // Quick action buttons
    createPostBtn.addEventListener('click', () => {
        createPostModal.classList.add('active');
    });
    
    closeModal.addEventListener('click', () => {
        createPostModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === createPostModal) {
            createPostModal.classList.remove('active');
        }
    });
    
    // Notification bell
    notificationBell.addEventListener('click', showNotifications);
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Time filter change
    timeFilter.addEventListener('change', updatePlatformPerformance);
    
    // AI Suggestions button
    aiSuggestionsBtn.addEventListener('click', toggleAISuggestions);
    
    // Other action buttons
    generateReportBtn.addEventListener('click', generateReport);
    respondCommentsBtn.addEventListener('click', respondToComments);
}

// Load recent posts
function loadRecentPosts() {
    recentPosts.innerHTML = '';
    
    samplePosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-item';
        postElement.innerHTML = `
            <div class="post-platform ${post.platform}">
                <i class="${post.icon}"></i>
            </div>
            <div class="post-content">
                <h4>${post.title}</h4>
                <p>Posted ${post.time}</p>
            </div>
            <div class="post-stats">
                <div class="post-stat">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </div>
                <div class="post-stat">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </div>
            </div>
        `;
        recentPosts.appendChild(postElement);
    });
}

// Load scheduled posts
function loadScheduledPosts() {
    scheduledPosts.innerHTML = '';
    
    sampleScheduledPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'scheduled-post-item';
        postElement.innerHTML = `
            <div class="scheduled-post-header">
                <div class="scheduled-post-platforms">
                    ${post.platforms.map(platform => 
                        `<i class="fab fa-${platform}"></i>`
                    ).join('')}
                </div>
                <span class="post-status ${post.status}">${post.status}</span>
            </div>
            <div class="scheduled-post-content">
                <p>${post.content}</p>
            </div>
            <div class="scheduled-post-meta">
                <span>Scheduled: ${formatDate(post.date)}</span>
                <span>ID: ${post.id}</span>
            </div>
            <div class="scheduled-post-actions">
                <button class="edit-btn" onclick="editScheduledPost(${post.id})">Edit</button>
                <button class="delete-btn" onclick="deleteScheduledPost(${post.id})">Delete</button>
            </div>
        `;
        scheduledPosts.appendChild(postElement);
    });
}

// Load AI suggestions
function loadAISuggestions() {
    suggestionsList.innerHTML = '';
    
    aiSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-lightbulb"></i> ${suggestion}`;
        suggestionsList.appendChild(li);
    });
}

// Handle media upload
function handleMediaUpload(e) {
    const files = e.target.files;
    uploadPreview.innerHTML = '';
    
    for (let i = 0; i < Math.min(files.length, 4); i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'upload-preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview ${i+1}">
                <div class="remove" onclick="removePreviewItem(this)">&times;</div>
            `;
            uploadPreview.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
    }
}

// Remove preview item
function removePreviewItem(element) {
    element.parentElement.remove();
}

// Handle schedule form submission
function handleScheduleSubmit(e) {
    e.preventDefault();
    
    const postContentValue = postContent.value.trim();
    const postDateValue = document.getElementById('postDate').value;
    const selectedPlatform = document.querySelector('.platform-option.selected').getAttribute('data-platform');
    
    if (!postContentValue || !postDateValue) {
        alert('Please fill in all required fields before scheduling.');
        return;
    }
    
    // Get AI optimization options
    const optimizeText = document.getElementById('optimizeText').checked;
    const suggestHashtags = document.getElementById('suggestHashtags').checked;
    const bestTime = document.getElementById('bestTime').checked;
    
    // In a real app, this would send data to a server
    const newPost = {
        id: sampleScheduledPosts.length + 1,
        content: postContentValue,
        platforms: selectedPlatform === 'all' ? ['instagram', 'twitter', 'facebook', 'linkedin'] : [selectedPlatform],
        date: postDateValue,
        status: 'scheduled'
    };
    
    sampleScheduledPosts.push(newPost);
    loadScheduledPosts();
    
    // Show success message
    showNotification(`Post scheduled for ${formatDate(postDateValue)}. AI optimization ${optimizeText || suggestHashtags || bestTime ? 'applied' : 'not applied'}.`, 'success');
    
    // Reset form
    scheduleForm.reset();
    uploadPreview.innerHTML = '';
    charCount.textContent = '0';
    
    // Reset platform selection
    platformOptions.forEach(opt => opt.classList.remove('selected'));
    document.querySelector('.platform-option[data-platform="all"]').classList.add('selected');
    
    // Update scheduled count
    updateScheduledCount();
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

// Edit scheduled post
function editScheduledPost(postId) {
    const post = sampleScheduledPosts.find(p => p.id === postId);
    if (post) {
        // In a real app, this would populate the form with post data for editing
        alert(`Editing post #${postId}: "${post.content.substring(0, 50)}..."`);
    }
}

// Delete scheduled post
function deleteScheduledPost(postId) {
    if (confirm('Are you sure you want to delete this scheduled post?')) {
        const index = sampleScheduledPosts.findIndex(p => p.id === postId);
        if (index !== -1) {
            sampleScheduledPosts.splice(index, 1);
            loadScheduledPosts();
            updateScheduledCount();
            showNotification('Scheduled post deleted.', 'info');
        }
    }
}

// Show notifications
function showNotifications() {
    const notifications = [
        'Your post is trending with 500+ likes!',
        'AI suggests posting at 3 PM today for maximum reach',
        'New comment from @socialguru requires response'
    ];
    
    alert(`Notifications:\n\n${notifications.join('\n')}`);
    
    // Reset notification count
    document.querySelector('.notification-count').textContent = '0';
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length > 2) {
        // In a real app, this would filter content
        console.log(`Searching for: ${searchTerm}`);
    }
}

// Update platform performance charts
function updatePlatformPerformance() {
    const days = parseInt(timeFilter.value);
    console.log(`Updating charts for last ${days} days`);
    
    // In a real app, this would fetch new data and update charts
    showNotification(`Showing data for last ${days} days`, 'info');
}

// Toggle AI suggestions panel
function toggleAISuggestions() {
    const panel = document.getElementById('aiSuggestionsPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    
    if (panel.style.display === 'block') {
        aiSuggestionsBtn.innerHTML = '<i class="fas fa-robot"></i><span>Hide Suggestions</span>';
    } else {
        aiSuggestionsBtn.innerHTML = '<i class="fas fa-robot"></i><span>AI Suggestions</span>';
    }
}

// Generate report
function generateReport() {
    showNotification('Generating AI-powered performance report...', 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showNotification('Report generated! Download will start automatically.', 'success');
        
        // In a real app, this would trigger a download
        console.log('Report generated with AI insights');
    }, 2000);
}

// Respond to comments
function respondToComments() {
    showNotification('Opening AI-powered comment response tool...', 'info');
    
    // In a real app, this would open a comment management interface
    console.log('Opening comment response interface');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Start stats simulation
function startStatsSimulation() {
    // Update follower count every 30 seconds
    setInterval(() => {
        const followerElement = document.getElementById('followerCount');
        let followers = parseFloat(followerElement.textContent.replace('K', ''));
        
        // Small random increment
        const increment = (Math.random() * 0.2 - 0.05); // Between -0.05 and 0.15
        followers = Math.max(24, followers + increment); // Don't go below 24K
        
        followerElement.textContent = followers.toFixed(1) + 'K';
        
        // Update engagement rate
        const engagementElement = document.getElementById('engagementRate');
        let engagement = parseFloat(engagementElement.textContent.replace('%', ''));
        
        const engagementChange = (Math.random() * 0.2 - 0.1); // Between -0.1 and 0.1
        engagement = Math.max(7, Math.min(10, engagement + engagementChange)); // Keep between 7-10%
        
        engagementElement.textContent = engagement.toFixed(1) + '%';
        
        // Update post count (only during business hours)
        const now = new Date();
        const hour = now.getHours();
        if (hour >= 9 && hour <= 17) {
            const postElement = document.getElementById('postCount');
            let posts = parseInt(postElement.textContent);
            
            // Occasionally increment post count
            if (Math.random() > 0.7) {
                posts += 1;
                postElement.textContent = posts;
            }
        }
    }, 30000);
}

// Update scheduled count
function updateScheduledCount() {
    const scheduledElement = document.getElementById('scheduledCount');
    scheduledElement.textContent = sampleScheduledPosts.filter(p => p.status === 'scheduled').length;
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);