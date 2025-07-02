// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // DOM Elements
    const preloader = document.querySelector('.preloader');
    const greetingAudio = document.getElementById('greetingAudio');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playGreetingBtn = document.getElementById('playGreeting');
    const acceptRakhiBtn = document.getElementById('acceptRakhi');
    const sendGiftBtn = document.getElementById('sendGift');
    const prevMemoryBtn = document.getElementById('prevMemory');
    const nextMemoryBtn = document.getElementById('nextMemory');
    const memoryItems = document.querySelectorAll('.memory-item');
    const giftButtons = document.querySelectorAll('.gift-button');

    // Preloader
    window.addEventListener('load', function() {
        // Add a class to body to prevent scrolling during preloader
        document.body.classList.add('preloader-active');
        
        // First stage - show loading animation for a bit longer
        setTimeout(function() {
            // Update loader text to indicate completion
            const loaderText = document.querySelector('.loader-text');
            loaderText.textContent = 'Ready to celebrate Raksha Bandhan!';
            loaderText.style.color = '#FFFFFF';
            loaderText.style.fontWeight = '600';
            
            // Add a completion animation to the loader
            const rakhiLoader = document.querySelector('.rakhi-loader');
            rakhiLoader.classList.add('loader-complete');
            
            // Second stage - fade out the preloader after showing completion
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Remove the no-scroll class
                document.body.classList.remove('preloader-active');
                
                // Play greeting audio automatically when page loads
                playGreeting();
                
                // Start background music with low volume
                backgroundMusic.volume = 0.3;
                backgroundMusic.play().catch(error => {
                    console.log('Auto-play prevented: ', error);
                });
            }, 1500);
        }, 3000);
    });

    // Play greeting audio function
    function playGreeting() {
        greetingAudio.play().catch(error => {
            console.log('Auto-play prevented: ', error);
        });
    }

    // Event Listeners
    if (playGreetingBtn) {
        playGreetingBtn.addEventListener('click', playGreeting);
    }

    // Accept Rakhi Animation
    if (acceptRakhiBtn) {
        acceptRakhiBtn.addEventListener('click', function() {
            const rakhiCard = document.querySelector('.rakhi-card');
            
            // Add celebration class
            rakhiCard.classList.add('celebration');
            
            // Create confetti effect
            createConfetti();
            
            // Show acceptance message
            showMessage('Rakhi accepted with love! ❤️');
            
            // Play celebration sound
            const celebrationSound = new Audio('audio/celebration.mp3');
            celebrationSound.play().catch(error => {
                console.log('Audio play prevented: ', error);
            });
        });
    }

    // Send Gift Animation
    if (sendGiftBtn) {
        sendGiftBtn.addEventListener('click', function() {
            // Show gift selection modal
            showGiftModal();
        });
    }

    // Memory Gallery Navigation
    let currentMemoryIndex = 0;
    const totalMemories = memoryItems.length;
    
    // Initially hide all memories except the first one
    if (memoryItems.length > 0) {
        updateMemoryDisplay();
    }
    
    if (prevMemoryBtn) {
        prevMemoryBtn.addEventListener('click', function() {
            currentMemoryIndex = (currentMemoryIndex - 1 + totalMemories) % totalMemories;
            updateMemoryDisplay();
        });
    }
    
    if (nextMemoryBtn) {
        nextMemoryBtn.addEventListener('click', function() {
            currentMemoryIndex = (currentMemoryIndex + 1) % totalMemories;
            updateMemoryDisplay();
        });
    }
    
    function updateMemoryDisplay() {
        memoryItems.forEach((item, index) => {
            if (index === currentMemoryIndex) {
                item.style.display = 'block';
                item.classList.add('active');
            } else {
                item.style.display = 'none';
                item.classList.remove('active');
            }
        });
    }

    // Gift Buttons
    giftButtons.forEach(button => {
        button.addEventListener('click', function() {
            const giftName = this.previousElementSibling.textContent;
            showMessage(`${giftName} sent with love! 🎁`);
            
            // Animation for gift sent
            this.innerHTML = 'Sent ✓';
            this.disabled = true;
            this.style.background = '#4CAF50';
            
            // Play gift sound
            const giftSound = new Audio('audio/gift-sent.mp3');
            giftSound.play().catch(error => {
                console.log('Audio play prevented: ', error);
            });
        });
    });

    // Confetti Effect
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        const colors = ['#FF5E62', '#FF9966', '#FFC371', '#FFD79D', '#F9F871'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 5 + 's';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation completes
        setTimeout(() => {
            confettiContainer.remove();
        }, 8000);
    }

    // Show Message Function
    function showMessage(text) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        messageContainer.textContent = text;
        
        document.body.appendChild(messageContainer);
        
        // Animate message
        setTimeout(() => {
            messageContainer.classList.add('show');
        }, 100);
        
        // Remove message after delay
        setTimeout(() => {
            messageContainer.classList.remove('show');
            setTimeout(() => {
                messageContainer.remove();
            }, 500);
        }, 3000);
    }

    // Show Gift Modal
    function showGiftModal() {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = 'Choose a Gift';
        
        const giftGrid = document.createElement('div');
        giftGrid.className = 'gift-grid';
        
        // Gift options
        const gifts = [
            { name: 'Traditional Sweets', image: 'images/gift1.png' },
            { name: 'Digital Watch', image: 'images/gift2.png' },
            { name: 'Gift Card', image: 'images/gift3.png' },
            { name: 'Headphones', image: 'images/gift4.png' },
            { name: 'Books', image: 'images/gift5.png' },
            { name: 'Custom Gift', image: 'images/gift6.png' }
        ];
        
        gifts.forEach(gift => {
            const giftItem = document.createElement('div');
            giftItem.className = 'modal-gift-item';
            
            const giftImg = document.createElement('img');
            giftImg.src = gift.image;
            giftImg.alt = gift.name;
            
            const giftName = document.createElement('p');
            giftName.textContent = gift.name;
            
            const selectBtn = document.createElement('button');
            selectBtn.textContent = 'Select';
            selectBtn.className = 'select-gift-btn';
            
            selectBtn.addEventListener('click', function() {
                showMessage(`${gift.name} sent with love! 🎁`);
                modalContainer.remove();
                
                // Play gift sound
                const giftSound = new Audio('audio/gift-sent.mp3');
                giftSound.play().catch(error => {
                    console.log('Audio play prevented: ', error);
                });
            });
            
            giftItem.appendChild(giftImg);
            giftItem.appendChild(giftName);
            giftItem.appendChild(selectBtn);
            
            giftGrid.appendChild(giftItem);
        });
        
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(giftGrid);
        
        modalContainer.appendChild(modalContent);
        document.body.appendChild(modalContainer);
        
        // Show modal with animation
        setTimeout(() => {
            modalContainer.classList.add('show');
        }, 100);
        
        // Close modal when clicking close button
        closeBtn.addEventListener('click', function() {
            modalContainer.classList.remove('show');
            setTimeout(() => {
                modalContainer.remove();
            }, 500);
        });
        
        // Close modal when clicking outside
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                modalContainer.classList.remove('show');
                setTimeout(() => {
                    modalContainer.remove();
                }, 500);
            }
        });
    }

    // Add scroll event for header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add CSS for dynamic elements
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        }
        
        .confetti {
            position: absolute;
            top: -10px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: confetti-fall linear forwards;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        .message-container {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: var(--background-gradient);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            transition: transform 0.5s ease;
            font-weight: 600;
        }
        
        .message-container.show {
            transform: translateX(-50%) translateY(0);
        }
        
        .modal-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal-container.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .modal-container.show .modal-content {
            transform: scale(1);
        }
        
        .close-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 30px;
            cursor: pointer;
            color: #666;
            transition: color 0.3s ease;
        }
        
        .close-btn:hover {
            color: var(--primary-color);
        }
        
        .modal-content h3 {
            text-align: center;
            margin-bottom: 20px;
            color: var(--primary-color);
            font-size: 1.8rem;
        }
        
        .gift-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .modal-gift-item {
            background: #f9f9f9;
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .modal-gift-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .modal-gift-item img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            margin-bottom: 10px;
        }
        
        .modal-gift-item p {
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .select-gift-btn {
            padding: 8px 20px;
            background: var(--background-gradient);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .select-gift-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 10px rgba(255, 94, 98, 0.3);
        }
        
        .celebration {
            animation: celebrate 1s ease-in-out;
        }
        
        @keyframes celebrate {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        header.scrolled {
            padding: 10px 0;
            background: rgba(255, 255, 255, 0.95);
        }
    `;
    
    document.head.appendChild(dynamicStyles);
});