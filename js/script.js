// The Consorts Hotels Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (hamburger && navMobile) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            navMobile.classList.toggle('open');
        });
    }
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Booking Form Validation
    const bookingForm = document.querySelector('.booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            
            if (!checkIn || !checkOut) {
                alert('Please select check-in and check-out dates.');
                return;
            }
            
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            
            if (checkInDate >= checkOutDate) {
                alert('Check-out date must be after check-in date.');
                return;
            }
            
            // If validation passes, you would normally submit the form
            // For now, we'll just show a success message
            alert('Thank you for your booking request! We will confirm availability shortly.');
        });
    }
    
    // Set minimum dates for booking calendar
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        checkInInput.min = formatDate(today);
        checkOutInput.min = formatDate(tomorrow);
        
        // Update check-out min date when check-in changes
        checkInInput.addEventListener('change', function() {
            const newMinCheckOut = new Date(this.value);
            newMinCheckOut.setDate(newMinCheckOut.getDate() + 1);
            checkOutInput.min = formatDate(newMinCheckOut);
            
            // If current check-out date is before new min, update it
            if (new Date(checkOutInput.value) <= new Date(this.value)) {
                checkOutInput.value = formatDate(newMinCheckOut);
            }
        });
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');
    
    if (animateElements.length > 0) {
        // Initial check for elements in viewport
        checkElementsInViewport();
        
        // Check on scroll
        window.addEventListener('scroll', checkElementsInViewport);
        
        function checkElementsInViewport() {
            animateElements.forEach(element => {
                if (isElementInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.opacity = '0';
                    setTimeout(() => {
                        element.style.opacity = '1';
                    }, 100);
                }
            });
        }
        
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
    }
    
    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes, you would normally submit the form
            // For now, we'll just show a success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }
    
    // Room Booking Buttons
    const bookNowButtons = document.querySelectorAll('.room-card .btn-primary');
    
    if (bookNowButtons.length > 0) {
        bookNowButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get room type from parent card
                const roomCard = this.closest('.room-card');
                const roomTitle = roomCard.querySelector('h3').textContent;
                
                // Scroll to booking widget
                const bookingWidget = document.querySelector('.booking-widget');
                if (bookingWidget) {
                    bookingWidget.scrollIntoView({ behavior: 'smooth' });
                    
                    // Set room type in dropdown if possible
                    const roomTypeSelect = document.getElementById('room-type');
                    if (roomTypeSelect) {
                        // Find the option that matches the room title
                        for (let i = 0; i < roomTypeSelect.options.length; i++) {
                            if (roomTypeSelect.options[i].text.includes(roomTitle)) {
                                roomTypeSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                }
            });
        });
    }
});



    const slides = document.querySelectorAll('.slide');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    let index = 0;

    function showSlide(i) {
        slides.forEach((slide, idx) => {
            slide.style.display = 'none';
        });
        slides[i].style.display = 'block';
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    // Auto-show first slide
    showSlide(index);

    // ===== BOOKING WIDGET =====
    (function initBookingWidget() {
        var checkinInput = document.getElementById('bw-checkin');
        var checkoutInput = document.getElementById('bw-checkout');
        var checkAvailBtn = document.getElementById('bw-check-availability');

        if (!checkinInput || !checkoutInput) return;

        function formatDate(date) {
            var y = date.getFullYear();
            var m = String(date.getMonth() + 1).padStart(2, '0');
            var d = String(date.getDate()).padStart(2, '0');
            return y + '-' + m + '-' + d;
        }

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        // Set default dates: today and tomorrow
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var tomorrow = addDays(today, 1);

        checkinInput.value = formatDate(today);
        checkinInput.min = formatDate(today);
        checkoutInput.value = formatDate(tomorrow);
        checkoutInput.min = formatDate(tomorrow);

        // When check-in changes, auto-set checkout to +1 day
        checkinInput.addEventListener('change', function () {
            var selectedCheckin = new Date(this.value + 'T00:00:00');
            var newCheckout = addDays(selectedCheckin, 1);
            checkoutInput.min = formatDate(newCheckout);

            // If current checkout is on or before new checkin, update it
            if (!checkoutInput.value || new Date(checkoutInput.value + 'T00:00:00') <= selectedCheckin) {
                checkoutInput.value = formatDate(newCheckout);
            }
        });

        // Validate checkout cannot be same or before checkin
        checkoutInput.addEventListener('change', function () {
            var checkinDate = new Date(checkinInput.value + 'T00:00:00');
            var checkoutDate = new Date(this.value + 'T00:00:00');

            if (checkoutDate <= checkinDate) {
                var corrected = addDays(checkinDate, 1);
                this.value = formatDate(corrected);
            }
        });

        // Guest counter +/- buttons
        var counterBtns = document.querySelectorAll('.booking-widget-section .counter-btn');
        counterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetId = this.getAttribute('data-target');
                var input = document.getElementById(targetId);
                if (!input) return;

                var current = parseInt(input.value, 10) || 0;
                var min = parseInt(input.min, 10) || 0;
                var max = parseInt(input.max, 10) || 99;

                if (this.classList.contains('plus') && current < max) {
                    input.value = current + 1;
                } else if (this.classList.contains('minus') && current > min) {
                    input.value = current - 1;
                }
            });
        });

        // Check Availability button
        if (checkAvailBtn) {
            checkAvailBtn.addEventListener('click', function () {
                var checkin = checkinInput.value;
                var checkout = checkoutInput.value;
                var adults = document.getElementById('bw-adults').value;
                var children = document.getElementById('bw-children').value;

                if (!checkin || !checkout) {
                    alert('Please select check-in and check-out dates.');
                    return;
                }

                var checkinDate = new Date(checkin + 'T00:00:00');
                var checkoutDate = new Date(checkout + 'T00:00:00');

                if (checkoutDate <= checkinDate) {
                    alert('Check-out date must be after check-in date.');
                    return;
                }

                var nights = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

                var message = 'Hello! I would like to check availability:\n'
                    + 'Check-in: ' + checkin + '\n'
                    + 'Check-out: ' + checkout + '\n'
                    + 'Nights: ' + nights + '\n'
                    + 'Adults: ' + adults + '\n'
                    + 'Children: ' + children;

                var encoded = encodeURIComponent(message);
                var whatsappUrl = 'https://bookings.theconsorts.com/?hotel_id=14292&adult=2&checkin=' + checkin + '&checkout='+checkout;
                window.open(whatsappUrl, '_blank');
            });
        }
    })();

