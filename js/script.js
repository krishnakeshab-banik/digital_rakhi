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
        acceptRakhiBtn.onclick = function() {
            const rakhiCard = document.querySelector('.rakhi-card');
            if (rakhiCard) {
                rakhiCard.classList.add('celebration');
            }
            createConfetti();
            showMessage('Rakhi accepted with love! ❤️');
            // Play celebration sound only if file exists and user interacted
            // Commented out audio for Vercel compatibility
            // try {
            //     const celebrationSound = new Audio('audio/celebration.mp3');
            //     celebrationSound.play().catch(() => {});
            // } catch (e) {}
        };
    }

    // Send Gift Animation
    if (sendGiftBtn) {
        sendGiftBtn.onclick = function() {
            showGiftModal();
        };
    }

    // Memory Gallery Navigation
    // REMOVE the following lines to show all memories at once:
    // let currentMemoryIndex = 0;
    // const totalMemories = memoryItems.length;
    // if (memoryItems.length > 0) {
    //     updateMemoryDisplay();
    // }
    // if (prevMemoryBtn) {
    //     prevMemoryBtn.addEventListener('click', function() {
    //         currentMemoryIndex = (currentMemoryIndex - 1 + totalMemories) % totalMemories;
    //         updateMemoryDisplay();
    //     });
    // }
    // if (nextMemoryBtn) {
    //     nextMemoryBtn.addEventListener('click', function() {
    //         currentMemoryIndex = (currentMemoryIndex + 1) % totalMemories;
    //         updateMemoryDisplay();
    //     });
    // }
    // function updateMemoryDisplay() {
    //     memoryItems.forEach((item, index) => {
    //         if (index === currentMemoryIndex) {
    //             item.style.display = 'block';
    //             item.classList.add('active');
    //         } else {
    //             item.style.display = 'none';
    //             item.classList.remove('active');
    //         }
    //     });
    // }

    // Optionally, you can disable the gallery controls since all images are visible:
    if (prevMemoryBtn) prevMemoryBtn.style.display = 'none';
    if (nextMemoryBtn) nextMemoryBtn.style.display = 'none';

    // Gift Buttons
    giftButtons.forEach(button => {
        button.onclick = function() {
            const giftName = this.previousElementSibling.textContent;
            showMessage(`${giftName} sent with love! 🎁`);
            this.innerHTML = 'Sent ✓';
            this.disabled = true;
            this.style.background = '#4CAF50';
            // Commented out audio for Vercel compatibility
            // try {
            //     const giftSound = new Audio('audio/gift-sent.mp3');
            //     giftSound.play().catch(() => {});
            // } catch (e) {}
        };
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
            giftImg.onerror = function() {
                this.onerror = null;
                this.src = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f381.png';
            };

            const giftName = document.createElement('p');
            giftName.textContent = gift.name;

            const selectBtn = document.createElement('button');
            selectBtn.textContent = 'Select';
            selectBtn.className = 'select-gift-btn';

            selectBtn.onclick = function() {
                showMessage(`${gift.name} sent with love! 🎁`);
                modalContainer.remove();
                // Commented out audio for Vercel compatibility
                // try {
                //     const giftSound = new Audio('audio/gift-sent.mp3');
                //     giftSound.play().catch(() => {});
                // } catch (e) {}
            };

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

        setTimeout(() => {
            modalContainer.classList.add('show');
        }, 100);

        closeBtn.onclick = function() {
            modalContainer.classList.remove('show');
            setTimeout(() => {
                modalContainer.remove();
            }, 500);
        };

        modalContainer.onclick = function(e) {
            if (e.target === modalContainer) {
                modalContainer.classList.remove('show');
                setTimeout(() => {
                    modalContainer.remove();
                }, 500);
            }
        };
    }

    // --- Share Rakhi Button ---
    const shareBtn = document.getElementById('shareRakhi');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const url = shareBtn.getAttribute('data-share-url') || window.location.href;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(() => {
                    showMessage('Link copied! Share it with your loved ones 🎉');
                });
            } else {
                // fallback
                const tempInput = document.createElement('input');
                tempInput.value = url;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                tempInput.remove();
                showMessage('Link copied! Share it with your loved ones 🎉');
            }
        });
    }

    // --- Scroll To Top Button ---
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    function setDarkMode(on) {
        if (on) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('rakhi-dark-mode', '1');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('rakhi-dark-mode', '0');
        }
    }
    // On load, check localStorage
    if (localStorage.getItem('rakhi-dark-mode') === '1') {
        setDarkMode(true);
    }
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            setDarkMode(!document.body.classList.contains('dark-mode'));
        });
    }

    // --- Sparkle Effect in Hero Section ---
    function createSparkle() {
        const container = document.querySelector('.sparkle-container');
        if (!container) return;
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 90 + '%';
        sparkle.style.top = Math.random() * 90 + '%';
        sparkle.style.animationDuration = (1.2 + Math.random() * 1.2) + 's';
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1800);
    }
    setInterval(createSparkle, 600);

    // Add scroll event for header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Dynamic Particle Background ---
    function createParticle() {
        const particleBg = document.querySelector('.particle-bg');
        if (!particleBg) return;
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '-10px';
        particle.style.background = ['#FF5E62', '#FF9966', '#FFC371'][Math.floor(Math.random()*3)];
        particle.style.opacity = Math.random() * 0.18 + 0.08;
        particle.style.animationDuration = (12 + Math.random() * 10) + 's';
        particleBg.appendChild(particle);
        setTimeout(() => particle.remove(), 17000);
    }
    setInterval(createParticle, 350);

    // --- Background Music on First User Interaction ---
    function playMusicOnce() {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.volume = 0.3;
            backgroundMusic.play().catch(() => {});
        }
        document.removeEventListener('click', playMusicOnce);
        document.removeEventListener('touchstart', playMusicOnce);
    }
    document.addEventListener('click', playMusicOnce);
    document.addEventListener('touchstart', playMusicOnce);

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
        
        .dark-mode {
            background-color: #121212;
            color: #e0e0e0;
        }
        
        .dark-mode a {
            color: #bb86fc;
        }
        
        .dark-mode header {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .dark-mode .modal-content {
            background: #1e1e1e;
            color: #e0e0e0;
        }
        
        .dark-mode .close-btn {
            color: #bbb;
        }
        
        .dark-mode .close-btn:hover {
            color: #fff;
        }
        
        .sparkle {
            position: absolute;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #fff 0%, rgba(255, 255, 255, 0) 70%);
            pointer-events: none;
            animation: sparkle-animation 1.5s infinite;
        }
        
        @keyframes sparkle-animation {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-10px) scale(0);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(dynamicStyles);
});
