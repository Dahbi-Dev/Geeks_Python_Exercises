     // Sound management
        const sounds = {};
        
        // Preload all sounds
        function preloadSounds() {
            const pads = document.querySelectorAll('.drum-pad');
            pads.forEach(pad => {
                const soundPath = pad.dataset.sound;
                sounds[soundPath] = new Audio(soundPath);
                sounds[soundPath].preload = 'auto';
            });
        }
        
        // Play sound function
        function playSound(soundPath) {
            if (sounds[soundPath]) {
                sounds[soundPath].currentTime = 0; // Reset sound to beginning
                sounds[soundPath].play().catch(e => {
                    console.log('Audio play failed:', e);
                });
            }
        }
        
        // Create ripple effect
        function createRipple(element, event) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        // Add active class temporarily
        function activatePad(pad) {
            pad.classList.add('active');
            setTimeout(() => {
                pad.classList.remove('active');
            }, 150);
        }
        
        // Handle drum pad clicks
        function handlePadClick(event) {
            const pad = event.currentTarget;
            const soundPath = pad.dataset.sound;
            
            playSound(soundPath);
            createRipple(pad, event);
            activatePad(pad);
        }
        
        // Handle keyboard presses
        function handleKeyPress(event) {
            const keyCode = event.keyCode;
            const pad = document.querySelector(`[data-key="${keyCode}"]`);
            
            if (pad) {
                const soundPath = pad.dataset.sound;
                playSound(soundPath);
                
                // Create ripple at center of pad for keyboard events
                const rect = pad.getBoundingClientRect();
                const centerEvent = {
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2
                };
                
                createRipple(pad, centerEvent);
                activatePad(pad);
            }
        }
        
        // Initialize the drum kit
        function init() {
            preloadSounds();
            
            // Add click event listeners to all drum pads
            const pads = document.querySelectorAll('.drum-pad');
            pads.forEach(pad => {
                pad.addEventListener('click', handlePadClick);
            });
            
            // Add keyboard event listener
            document.addEventListener('keydown', handleKeyPress);
        }
        
        // Start the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);
        
        // Prevent default behavior for the keys we're using
        document.addEventListener('keydown', function(event) {
            const drumKeys = [65, 83, 68, 70, 71, 72, 74, 75, 76]; // A, S, D, F, G, H, J, K, L
            if (drumKeys.includes(event.keyCode)) {
                event.preventDefault();
            }
        });