document.addEventListener('DOMContentLoaded', function () {
    const createAccountBtn = document.getElementById('createAccountBtn');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const termsCheckbox = document.getElementById('termsCheckbox');

    // Form validation and data storage
    createAccountBtn.addEventListener('click', function () {
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const terms = termsCheckbox.checked;
        
        let errorMessages = [];

        // Name Validation
        if (!name) {
            errorMessages.push("Name is required.");
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessages.push("Please enter a valid email.");
        }

        // Password Validation
        if (password.length < 6) {
            errorMessages.push("Password must be at least 6 characters.");
        }

        // Terms Checkbox Validation
        if (!terms) {
            errorMessages.push("You must agree to the terms and conditions.");
        }

        if (errorMessages.length > 0) {
            alert(errorMessages.join("\n"));
        } else {
            // Generate random ID
            const randomID = Math.random().toString(36).substr(2, 9);

            // Store form data in localStorage with a random key
            const userData = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem(randomID, JSON.stringify(userData));

            // Generate a "random link"
            const randomLink = `${window.location.origin}/user/${randomID}`;

            // Simulate success message with link
            alert(`Account created successfully! You can view your data at: \n${randomLink}`);
            
            // Redirect to the generated "random" link
            window.location.href = randomLink;
        }
    });
});
