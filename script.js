document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
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