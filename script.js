document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Update icon based on password visibility (if using SVG)
            if (togglePassword.querySelector('svg')) {
                if (type === 'text') {
                    // Show the "eye" icon when password is visible
                    togglePassword.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    `;
                } else {
                    // Show the "eye-off" icon when password is hidden
                    togglePassword.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    `;
                }
            }
        });
    }
    
    // Form submission handling
    const signupForm = document.querySelector('form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            
            // Validate form fields
            const guardianName = document.getElementById('guardianName').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const patientName = document.getElementById('patientName').value;
            const address = document.getElementById('address').value || '';
            
            // Simple validation
            if (guardianName && phone && email && password && patientName) {
                // Store form data in localStorage
                localStorage.setItem('userData', JSON.stringify({
                    guardianName,
                    phone,
                    email,
                    patientName,
                    address
                }));
                
                // Navigate to dashboard page
                window.location.href = 'dashboard.html';
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Check if we're on the dashboard page
    const lostPersonContainer = document.getElementById('lost-person-container');
    if (lostPersonContainer) {
        // Use a small timeout to ensure DOM is fully loaded
        setTimeout(() => {
            // Retrieve user data from localStorage
            let userData = JSON.parse(localStorage.getItem('userData'));
            console.log('Retrieved user data:', userData);
            
            // If no user data in localStorage, use default values
            if (!userData) {
                console.log('No user data found, using default values');
                userData = {
                    guardianName: 'Inggrid liu',
                    phone: '+65 8796 1456',
                    address: '12 Thomson Rd, Singapore 298155',
                    patientName: 'Igna'
                };
            }
            
            // Update the input fields with data
            const guardianNameInput = document.getElementById('guardianName');
            if (guardianNameInput) {
                console.log('Setting guardian name:', userData.guardianName);
                guardianNameInput.value = userData.guardianName;
            } else {
                console.log('Guardian name input not found');
            }
            
            if (document.getElementById('phone')) {
                document.getElementById('phone').value = userData.phone;
            }
            
            if (document.getElementById('address')) {
                document.getElementById('address').value = userData.address;
            }
            
            if (document.getElementById('patientName')) {
                document.getElementById('patientName').value = userData.patientName;
            }
            
            // Update the greeting with the patient name
            if (document.getElementById('patientNameDisplay')) {
                document.getElementById('patientNameDisplay').textContent = userData.patientName;
            }
        }, 100);
    }
}); 
