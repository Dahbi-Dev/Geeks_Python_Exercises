// Health Tracker JavaScript
// API Configuration
const API_BASE_URL = 'http://localhost:5000';

// Global state
let currentUsers = [];
let currentCompetitions = [];
let connectionStatus = 'checking';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    checkConnection();
    setInterval(checkConnection, 30000); // Check connection every 30 seconds
});

// Initialize application
function initializeApp() {
    setupEventListeners();
    loadInitialData();
}

// Setup event listeners
function setupEventListeners() {
    // User form submission
    document.getElementById('userForm').addEventListener('submit', handleUserSubmit);
    
    // Competition form submission
    document.getElementById('competitionForm').addEventListener('submit', handleCompetitionSubmit);
    
    // Search functionality
    document.getElementById('searchQuery').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchUsers();
        }
    });
}

// Load initial data
function loadInitialData() {
    refreshStatistics();
    loadCompetitions();
}

// Connection status check
async function checkConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (response.ok) {
            updateConnectionStatus('online');
        } else {
            updateConnectionStatus('offline');
        }
    } catch (error) {
        updateConnectionStatus('offline');
    }
}

function updateConnectionStatus(status) {
    const statusElement = document.getElementById('connectionStatus');
    connectionStatus = status;
    
    if (status === 'online') {
        statusElement.textContent = 'Connected';
        statusElement.className = 'connection-status online';
    } else {
        statusElement.textContent = 'Disconnected';
        statusElement.className = 'connection-status offline';
    }
}

// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Load data for specific tabs
    if (tabName === 'statistics') {
        refreshStatistics();
    } else if (tabName === 'competitions') {
        loadCompetitions();
        populateCompetitionSelect();
    }
}

// User form submission
async function handleUserSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim() || 'Anonymous',
        height: parseFloat(document.getElementById('height').value),
        weight: parseFloat(document.getElementById('weight').value),
        age: parseInt(document.getElementById('age').value)
    };
    
    // Validate form data
    if (!formData.height || !formData.weight || !formData.age) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (formData.height <= 0 || formData.weight <= 0 || formData.age <= 0) {
        showNotification('All values must be positive numbers', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/user-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            displayUserResult(result);
            document.getElementById('userForm').reset();
            showNotification('User added successfully!', 'success');
        } else {
            showNotification(result.error || 'Failed to add user', 'error');
        }
    } catch (error) {
        showNotification('Network error. Please check your connection.', 'error');
        console.error('Error adding user:', error);
    }
}

// Display user result
function displayUserResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    
    const bmiCategory = getBMICategory(result.BMI);
    const bmiColor = getBMIColor(result.BMI);
    
    resultDiv.innerHTML = `
        <h3>User Added Successfully!</h3>
        <p><strong>User ID:</strong> ${result.user_id}</p>
        <p><strong>BMI:</strong> <span style="color: ${bmiColor}; font-weight: bold;">${result.BMI}</span></p>
        <p><strong>Body Type:</strong> <span style="color: ${bmiColor}; font-weight: bold;">${result['Body Type']}</span></p>
        <p><strong>Category:</strong> ${bmiCategory}</p>
        <div style="margin-top: 15px;">
            <h4>Food Advice:</h4>
            <p>${result['Food Advice']}</p>
        </div>
        <div style="margin-top: 15px;">
            <h4>Exercise Advice:</h4>
            <p>${result['Exercise Advice']}</p>
        </div>
    `;
}

// Get BMI category description
function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight - Consider gaining weight healthily';
    if (bmi < 25) return 'Normal weight - Maintain current lifestyle';
    if (bmi < 30) return 'Overweight - Consider weight loss';
    return 'Obese - Consult healthcare provider';
}

// Get BMI color coding
function getBMIColor(bmi) {
    if (bmi < 18.5) return '#17a2b8'; // Info blue
    if (bmi < 25) return '#28a745'; // Success green
    if (bmi < 30) return '#ffc107'; // Warning yellow
    return '#dc3545'; // Danger red
}

// Search users functionality
async function searchUsers() {
    const query = document.getElementById('searchQuery').value.trim();
    
    if (!query) {
        showNotification('Please enter a search term', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/search-users?name=${encodeURIComponent(query)}`);
        const result = await response.json();
        
        if (response.ok) {
            displaySearchResults(result.users, `Search results for "${query}"`);
        } else {
            displaySearchResults([], result.message || 'No users found');
        }
    } catch (error) {
        showNotification('Error searching users', 'error');
        console.error('Search error:', error);
    }
}

// Show all users
async function showAllUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        
        if (response.ok) {
            currentUsers = users;
            displaySearchResults(users, 'All Users');
        } else {
            displaySearchResults([], 'No users found');
        }
    } catch (error) {
        showNotification('Error loading users', 'error');
        console.error('Error loading users:', error);
    }
}

// Display search results
function displaySearchResults(users, title) {
    const resultsDiv = document.getElementById('searchResults');
    
    if (!users || users.length === 0) {
        resultsDiv.innerHTML = `<p class="loading">${title}</p>`;
        return;
    }
    
    let html = `<h3>${title} (${users.length} found)</h3>`;
    
    users.forEach(user => {
        const bmiColor = getBMIColor(user.bmi);
        html += `
            <div class="user-card">
                <h4>${user.name} (ID: ${user.id})</h4>
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div>
                        <p><strong>Height:</strong> ${user.height} cm</p>
                        <p><strong>Weight:</strong> ${user.weight} kg</p>
                        <p><strong>Age:</strong> ${user.age} years</p>
                    </div>
                    <div>
                        <p><strong>BMI:</strong> <span style="color: ${bmiColor}; font-weight: bold;">${user.bmi}</span></p>
                        <p><strong>Body Type:</strong> <span style="color: ${bmiColor}; font-weight: bold;">${user.body_type}</span></p>
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <p><strong>Food Advice:</strong> ${user.food_advice}</p>
                    <p><strong>Exercise Advice:</strong> ${user.exercise_advice}</p>
                </div>
            </div>
        `;
    });
    
    resultsDiv.innerHTML = html;
}

// Statistics functionality
async function refreshStatistics() {
    try {
        const response = await fetch(`${API_BASE_URL}/statistics`);
        const stats = await response.json();
        
        if (response.ok) {
            displayStatistics(stats);
        } else {
            document.getElementById('statisticsContainer').innerHTML = '<p class="error-message">Failed to load statistics</p>';
        }
    } catch (error) {
        document.getElementById('statisticsContainer').innerHTML = '<p class="error-message">Error loading statistics</p>';
        console.error('Statistics error:', error);
    }
}

// Display statistics
function displayStatistics(stats) {
    const container = document.getElementById('statisticsContainer');
    
    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <h3>${stats.total_users}</h3>
                <p>Total Users</p>
            </div>
            <div class="stat-card">
                <h3>${stats.average_bmi || 'N/A'}</h3>
                <p>Average BMI</p>
            </div>
            <div class="stat-card">
                <h3>${stats.min_bmi || 'N/A'}</h3>
                <p>Minimum BMI</p>
            </div>
            <div class="stat-card">
                <h3>${stats.max_bmi || 'N/A'}</h3>
                <p>Maximum BMI</p>
            </div>
        </div>
        
        <div class="stats-grid" style="margin-top: 20px;">
            <div class="stat-card">
                <h3>${stats.distribution.underweight}</h3>
                <p>Underweight Users</p>
            </div>
            <div class="stat-card">
                <h3>${stats.distribution.normal}</h3>
                <p>Normal Weight Users</p>
            </div>
            <div class="stat-card">
                <h3>${stats.distribution.overweight}</h3>
                <p>Overweight Users</p>
            </div>
            <div class="stat-card">
                <h3>${stats.distribution.obese}</h3>
                <p>Obese Users</p>
            </div>
        </div>
    `;
}

// Chart functionality
async function showChart(chartType) {
    const container = document.getElementById('chartContainer');
    container.innerHTML = '<div class="loading">Loading chart...</div>';
    
    try {
        let endpoint;
        switch (chartType) {
            case 'bmi':
                endpoint = '/public-user-data';
                break;
            case 'bmi-distribution':
                endpoint = '/public-bmi-distribution';
                break;
            case 'age-distribution':
                endpoint = '/public-age-distribution';
                break;
            default:
                throw new Error('Unknown chart type');
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        
        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            container.innerHTML = `<img src="${imageUrl}" alt="${chartType} Chart" style="max-width: 100%; height: auto;">`;
        } else {
            container.innerHTML = '<p class="error-message">Failed to load chart</p>';
        }
    } catch (error) {
        container.innerHTML = '<p class="error-message">Error loading chart</p>';
        console.error('Chart error:', error);
    }
}

// Visualization functionality
async function loadVisualization(type) {
    const container = document.getElementById('visualizationContainer');
    container.innerHTML = '<div class="loading">Loading visualization...</div>';
    
    try {
        let endpoint;
        let title;
        
        switch (type) {
            case 'user-data':
                endpoint = '/public-user-data';
                title = 'User BMI Data';
                break;
            case 'bmi-distribution':
                endpoint = '/public-bmi-distribution';
                title = 'BMI Distribution';
                break;
            case 'age-distribution':
                endpoint = '/public-age-distribution';
                title = 'Age Distribution';
                break;
            case 'bmi-age-scatter':
                endpoint = '/public-bmi-age-scatter';
                title = 'BMI vs Age Scatter Plot';
                break;
            case 'food':
                endpoint = '/public-food';
                title = 'Food Recommendations';
                break;
            case 'exercises':
                endpoint = '/public-exercises';
                title = 'Exercise Recommendations';
                break;
            case 'competitions':
                endpoint = '/public-competitions';
                title = 'Competition Overview';
                break;
            default:
                throw new Error('Unknown visualization type');
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        
        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            container.innerHTML = `
                <div class="chart-section">
                    <h3>${title}</h3>
                    <img src="${imageUrl}" alt="${title}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                </div>
            `;
        } else {
            const errorText = await response.text();
            container.innerHTML = `<p class="error-message">Failed to load visualization: ${errorText}</p>`;
        }
    } catch (error) {
        container.innerHTML = '<p class="error-message">Error loading visualization</p>';
        console.error('Visualization error:', error);
    }
}

// Competition functionality
async function handleCompetitionSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('compName').value.trim(),
        description: document.getElementById('compDescription').value.trim(),
        target_body_type: document.getElementById('targetBodyType').value || null,
        min_age: parseInt(document.getElementById('minAge').value) || null,
        max_age: parseInt(document.getElementById('maxAge').value) || null,
        max_participants: parseInt(document.getElementById('maxParticipants').value) || 50
    };
    
    if (!formData.name) {
        showNotification('Competition name is required', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/competitions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showNotification('Competition created successfully!', 'success');
            document.getElementById('competitionForm').reset();
            loadCompetitions();
            populateCompetitionSelect();
        } else {
            showNotification(result.error || 'Failed to create competition', 'error');
        }
    } catch (error) {
        showNotification('Network error. Please check your connection.', 'error');
        console.error('Competition creation error:', error);
    }
}

// Load competitions
async function loadCompetitions() {
    try {
        const response = await fetch(`${API_BASE_URL}/competitions`);
        const result = await response.json();
        
        if (response.ok) {
            currentCompetitions = result.competitions;
            displayCompetitions(result.competitions);
        } else {
            document.getElementById('competitionsContainer').innerHTML = '<p class="error-message">Failed to load competitions</p>';
        }
    } catch (error) {
        document.getElementById('competitionsContainer').innerHTML = '<p class="error-message">Error loading competitions</p>';
        console.error('Competitions error:', error);
    }
}

// Display competitions
function displayCompetitions(competitions) {
    const container = document.getElementById('competitionsContainer');
    
    if (!competitions || competitions.length === 0) {
        container.innerHTML = '<p class="loading">No competitions found</p>';
        return;
    }
    
    let html = '';
    competitions.forEach(comp => {
        const statusColor = comp.status === 'active' ? '#28a745' : '#6c757d';
        html += `
            <div class="user-card">
                <h4>${comp.name}</h4>
                <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${comp.status}</span></p>
                <p><strong>Description:</strong> ${comp.description || 'No description'}</p>
                <p><strong>Target Body Type:</strong> ${comp.target_body_type || 'Any'}</p>
                <p><strong>Age Range:</strong> ${comp.min_age || 'Any'} - ${comp.max_age || 'Any'}</p>
                <p><strong>Participants:</strong> ${comp.participant_count}/${comp.max_participants}</p>
                <p><strong>Created:</strong> ${new Date(comp.created_at).toLocaleDateString()}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Populate competition select dropdown
function populateCompetitionSelect() {
    const select = document.getElementById('competitionSelect');
    select.innerHTML = '<option value="">Select a competition...</option>';
    
    currentCompetitions.forEach(comp => {
        const option = document.createElement('option');
        option.value = comp.id;
        option.textContent = comp.name;
        select.appendChild(option);
    });
}

// Show competition participants
async function showParticipants() {
    const competitionId = document.getElementById('competitionSelect').value;
    
    if (!competitionId) {
        showNotification('Please select a competition first', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}/participants`);
        const result = await response.json();
        
        if (response.ok) {
            displayParticipants(result.participants, 'Competition Participants');
        } else {
            document.getElementById('participantsContainer').innerHTML = '<p class="error-message">Failed to load participants</p>';
        }
    } catch (error) {
        document.getElementById('participantsContainer').innerHTML = '<p class="error-message">Error loading participants</p>';
        console.error('Participants error:', error);
    }
}

// Show eligible users for competition
async function showEligibleUsers() {
    const competitionId = document.getElementById('competitionSelect').value;
    
    if (!competitionId) {
        showNotification('Please select a competition first', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}/eligible-users`);
        const result = await response.json();
        
        if (response.ok) {
            displayEligibleUsers(result.eligible_users, 'Eligible Users');
        } else {
            document.getElementById('participantsContainer').innerHTML = '<p class="error-message">Failed to load eligible users</p>';
        }
    } catch (error) {
        document.getElementById('participantsContainer').innerHTML = '<p class="error-message">Error loading eligible users</p>';
        console.error('Eligible users error:', error);
    }
}

// Display participants
function displayParticipants(participants, title) {
    const container = document.getElementById('participantsContainer');
    
    if (!participants || participants.length === 0) {
        container.innerHTML = `<p class="loading">${title}: No participants found</p>`;
        return;
    }
    
    let html = `<h3>${title} (${participants.length} found)</h3>`;
    
    participants.forEach(participant => {
        const bmiColor = getBMIColor(participant.bmi);
        html += `
            <div class="user-card">
                <h4>${participant.name} (ID: ${participant.id})</h4>
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div>
                        <p><strong>Height:</strong> ${participant.height} cm</p>
                        <p><strong>Weight:</strong> ${participant.weight} kg</p>
                        <p><strong>Age:</strong> ${participant.age} years</p>
                    </div>
                    <div>
                        <p><strong>BMI:</strong> <span style="color: ${bmiColor}; font-weight: bold;">${participant.bmi}</span></p>
                        <p><strong>Body Type:</strong> <span style="color: ${bmiColor}; font-weight: bold;">${participant.body_type}</span></p>
                        ${participant.registration_date ? `<p><strong>Registered:</strong> ${new Date(participant.registration_date).toLocaleDateString()}</p>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Display eligible users with registration buttons
function displayEligibleUsers(users, title) {
    const container = document.getElementById('participantsContainer');
    const competitionId = document.getElementById('competitionSelect').value;
    
    if (!users || users.length === 0) {
        container.innerHTML = `<p class="loading">${title}: No eligible users found</p>`;
        return;
    }
    
    let html = `<h3>${title} (${users.length} found)</h3>`;
    
    users.forEach(user => {
        const bmiColor = getBMIColor(user.bmi);
        html += `
            <div class="user-card">
                <h4>${user.name} (ID: ${user.id})</h4>
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div>
                        <p><strong>Height:</strong> ${user.height} cm</p>
                        <p><strong>Weight:</strong> ${user.weight} kg</p>
                        <p><strong>Age:</strong> ${user.age} years</p>
                    </div>
                    <div>
                        <p><strong>BMI:</strong> <span style="color: ${bmiColor}; font-weight: bold;">${user.bmi}</span></p>
                        <p><strong>Body Type:</strong> <span style="color: ${bmiColor}; font-weight: bold;">${user.body_type}</span></p>
                        <button onclick="registerUserForCompetition(${competitionId}, ${user.id}, '${user.name}')">Register User</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Register user for competition
async function registerUserForCompetition(competitionId, userId, userName) {
    try {
        const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showNotification(`${userName} registered successfully!`, 'success');
            showEligibleUsers(); // Refresh the list
        } else {
            showNotification(result.error || 'Registration failed', 'error');
        }
    } catch (error) {
        showNotification('Network error during registration', 'error');
        console.error('Registration error:', error);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
    
    // Remove on click
    notification.addEventListener('click', () => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+?[\d\s-()]+$/;
    return re.test(phone);
}

// Export functions for global access
window.showTab = showTab;
window.searchUsers = searchUsers;
window.showAllUsers = showAllUsers;
window.refreshStatistics = refreshStatistics;
window.showChart = showChart;
window.loadVisualization = loadVisualization;
window.loadCompetitions = loadCompetitions;
window.showParticipants = showParticipants;
window.showEligibleUsers = showEligibleUsers;
window.registerUserForCompetition = registerUserForCompetition;