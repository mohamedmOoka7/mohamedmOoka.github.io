// ==================================================
// CONTACT FORM HANDLING
// ==================================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('.btn-submit');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            try {
                // In a real application, you would send this data to a server
                // For demo purposes, we'll simulate an API call
                await simulateAPICall(formData);
                
                // Show success modal
                successModal.classList.add('active');
                
                // Reset form
                contactForm.reset();
                
                // Log to console (for demo)
                console.log('Contact form submitted:', formData);
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again.');
            } finally {
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
    
    // Form input effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Add character counter for textarea
        if (input.tagName === 'TEXTAREA') {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = `
                text-align: right;
                font-size: 0.8rem;
                color: var(--text-muted);
                margin-top: 5px;
            `;
            
            input.parentElement.appendChild(counter);
            
            input.addEventListener('input', () => {
                const maxLength = input.getAttribute('maxlength') || 1000;
                const currentLength = input.value.length;
                counter.textContent = `${currentLength}/${maxLength}`;
                
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = 'var(--primary)';
                } else {
                    counter.style.color = 'var(--text-muted)';
                }
            });
            
            // Trigger initial count
            input.dispatchEvent(new Event('input'));
        }
    });
    
    // Auto-resize textarea
    const textareas = document.querySelectorAll('.form-group textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
    
    // Form validation styles
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                emailInput.style.borderColor = '#ef4444';
                showValidationError(emailInput, 'Please enter a valid email address');
            } else {
                emailInput.style.borderColor = '';
                removeValidationError(emailInput);
            }
        });
    }
    
    // Helper functions
    function showValidationError(input, message) {
        removeValidationError(input);
        
        const error = document.createElement('div');
        error.className = 'validation-error';
        error.textContent = message;
        error.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 5px;
        `;
        
        input.parentElement.appendChild(error);
    }
    
    function removeValidationError(input) {
        const existingError = input.parentElement.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Simulate API call
    function simulateAPICall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure
                const isSuccess = Math.random() > 0.1; // 90% success rate
                
                if (isSuccess) {
                    resolve({ success: true, message: 'Message sent successfully!' });
                } else {
                    reject(new Error('Network error. Please try again.'));
                }
            }, 1500);
        });
    }
    
    // Copy email to clipboard
    const emailLinks = document.querySelectorAll('[data-copy-email]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.getAttribute('data-copy-email') || link.textContent;
            
            navigator.clipboard.writeText(email).then(() => {
                // Show copy confirmation
                const originalText = link.innerHTML;
                link.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    link.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    });
    
    // Form auto-save (localStorage)
    const formFields = ['name', 'email', 'subject', 'message'];
    
    // Load saved form data
    formFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            const savedValue = localStorage.getItem(`contact_${field}`);
            if (savedValue) {
                element.value = savedValue;
            }
            
            // Save on input
            element.addEventListener('input', () => {
                localStorage.setItem(`contact_${field}`, element.value);
            });
        }
    });
    
    // Clear saved data on successful submit
    contactForm.addEventListener('submit', () => {
        formFields.forEach(field => {
            localStorage.removeItem(`contact_${field}`);
        });
    });
    
    // Add form animation on focus
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            input.addEventListener('focus', () => {
                group.style.transform = 'translateY(-2px)';
                group.style.boxShadow = '0 5px 15px rgba(56, 189, 248, 0.1)';
            });
            
            input.addEventListener('blur', () => {
                group.style.transform = '';
                group.style.boxShadow = '';
            });
        }
    });
});
