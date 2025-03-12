// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize sticky header
    initStickyHeader();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize animations
    initAnimations();
    
    // Initialize terminal animation
    initTerminalAnimation();
    
    // Initialize Trade Anatomy Interactions
    initTradeAnatomy();
    
    // Initialize Timeline Navigation
    initTimeline();
    
    // Initialize Math Section Tabs
    initMathTabs();
    
    // Initialize Before/After Comparison
    initComparison();
    
    // Initialize FAQ Accordion
    initFaqAccordion();
    
    // Initialize Client Success Gallery
    initSuccessGallery();
    
    // Initialize the hero background animation
    initHeroAnimation();
    
    // Animate counters on scroll
    animateCounters();
});

// Custom cursor effect
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-glow');
    
    if (window.innerWidth > 992) { // Only on desktop
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for smoother cursor movement
            requestAnimationFrame(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        });
        
        // Add glow effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .pricing-card, .testimonial-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2.5)';
                cursor.style.mixBlendMode = 'plus-lighter';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.mixBlendMode = 'screen';
            });
        });
    }
}

// Sticky header effect when scrolling
function initStickyHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle menu icon
        const icon = mobileMenuButton.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.nav-links')) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Testimonial slider navigation
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonialWidth = document.querySelector('.testimonial-card').offsetWidth + 30; // Card width + gap
    
    if (slider && prevBtn && nextBtn) {
        // Next button click
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: testimonialWidth,
                behavior: 'smooth'
            });
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -testimonialWidth,
                behavior: 'smooth'
            });
        });
        
        // Auto slide every 5 seconds
        let autoSlide = setInterval(() => {
            if (!isElementInViewport(slider)) return; // Only autoslide when testimonials are visible
            
            // If we're at the end, go back to the start
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
                slider.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                slider.scrollBy({
                    left: testimonialWidth,
                    behavior: 'smooth'
                });
            }
        }, 5000);
        
        // Stop auto slide on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        // Resume auto slide on mouse leave
        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                if (!isElementInViewport(slider)) return;
                
                if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
                    slider.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    slider.scrollBy({
                        left: testimonialWidth,
                        behavior: 'smooth'
                    });
                }
            }, 5000);
        });
    }
}

// Animations for elements as they come into view
function initAnimations() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .section-header, .hero-content, .hero-image');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe each element
    animateElements.forEach(element => {
        observer.observe(element);
        
        // Add base animation class
        element.classList.add('animate-on-scroll');
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Terminal animation for Forex Plug System
function initTerminalAnimation() {
    const terminalScreen = document.querySelector('.terminal-screen');
    const chartContainer = document.querySelector('.candlestick-chart');
    const signalZone = document.querySelector('.signal-zone');
    const signalLabel = document.querySelector('.signal-label');
    const buyBtn = document.querySelector('.buy-btn');
    const sellBtn = document.querySelector('.sell-btn');
    
    if (!terminalScreen || !chartContainer) return;

    // Define the sell zone position (top 15% of chart)
    const sellZoneBottom = 85; // percentage from bottom
    
    // Define the buy zone position (bottom 15% of chart)
    const buyZoneTop = 15; // percentage from bottom
    
    // Create sell pattern - price rises into sell zone, then falls
    const createSellPattern = () => {
        const candles = [];
        const basePrice = 1.2350;
        let currentPrice = basePrice;
        const totalCandles = 25;
        
        // Phase 1: Initial position
        for (let i = 0; i < 3; i++) {
            const open = currentPrice;
            const close = open + (0.0001 * (Math.random() * 0.5 + 0.5));
            const high = Math.max(open, close) + (0.0001 * (Math.random() * 0.5 + 0.5));
            const low = Math.min(open, close) - (0.0001 * (Math.random() * 0.5 + 0.5));
            
            candles.push({ open, high, low, close, isTurningPoint: false });
            currentPrice = close;
        }
        
        // Phase 2: Strong uptrend into sell zone
        for (let i = 0; i < 10; i++) {
            const open = currentPrice;
            // Increasingly strong uptrend
            const forceFactor = 1 + (i / 10); 
            const close = open + (0.0003 * (Math.random() * 0.5 + 0.75) * forceFactor);
            const high = Math.max(open, close) + (0.0001 * (Math.random() * 0.5 + 0.5));
            const low = Math.min(open, close) - (0.0001 * (Math.random() * 0.5 + 0.25));
            
            candles.push({ open, high, low, close, isTurningPoint: false });
            currentPrice = close;
        }
        
        // Phase 3: TURNING POINT candle in the sell zone with red dot
        const turningCandle = {
            open: currentPrice,
            close: currentPrice - 0.0002,
            high: currentPrice + 0.0003,
            low: currentPrice - 0.0004,
            isTurningPoint: true,
            signalType: 'sell'
        };
        candles.push(turningCandle);
        currentPrice = turningCandle.close;
        
        // Phase 4: Strong downtrend after reversal
        for (let i = 0; i < 11; i++) {
            const open = currentPrice;
            // Increasingly strong downtrend
            const forceFactor = 1 + (i / 11);
            const close = open - (0.0004 * (Math.random() * 0.5 + 0.75) * forceFactor);
            const high = Math.max(open, close) + (0.0001 * (Math.random() * 0.5 + 0.25));
            const low = Math.min(open, close) - (0.0001 * (Math.random() * 0.5 + 0.5));
            
            candles.push({ open, high, low, close, isTurningPoint: false });
            currentPrice = close;
        }
        
        return candles;
    };
    
    // Create buy pattern - price drops into buy zone, then rises
    const createBuyPattern = () => {
        const candles = [];
        const basePrice = 1.2350;
        let currentPrice = basePrice;
        const totalCandles = 25;
        
        // Phase 1: Initial position (slightly higher start to allow more downward movement)
        const initialUplift = 0.0005; // Start higher to have more room to drop
        currentPrice += initialUplift;
        
        for (let i = 0; i < 3; i++) {
            const open = currentPrice;
            const close = open - (0.0001 * (Math.random() * 0.5 + 0.5));
            const high = Math.max(open, close) + (0.0001 * (Math.random() * 0.5 + 0.5));
            const low = Math.min(open, close) - (0.0001 * (Math.random() * 0.5 + 0.5));
            
            candles.push({ open, high, low, close, isTurningPoint: false });
            currentPrice = close;
        }
        
        // Phase 2: Strong downtrend into buy zone (ensure we go deep enough)
        // Use more candles and stronger movement to clearly show entering the zone
        for (let i = 0; i < 12; i++) {
            const open = currentPrice;
            // Increasingly strong downtrend that accelerates toward the end
            const forceFactor = 1 + (i / 6); // Stronger acceleration
            const close = open - (0.0004 * (Math.random() * 0.5 + 0.75) * forceFactor);
            const high = Math.max(open, close) + (0.0001 * (Math.random() * 0.5 + 0.25));
            const low = Math.min(open, close) - (0.0001 * (Math.random() * 0.5 + 0.5));
            
            candles.push({ open, high, low, close, isTurningPoint: false });
            currentPrice = close;
        }
        
        // Phase 3: Last downward candle to ensure we're deep in the buy zone
        const lastDownCandle = {
            open: currentPrice,
            close: currentPrice - 0.0002,
            high: currentPrice + 0.0001,
            low: currentPrice - 0.0005,
            isTurningPoint: false
        };
        candles.push(lastDownCandle);
        currentPrice = lastDownCandle.close;
        
        // Phase 4: TURNING POINT candle with blue dot - still in buy zone but starting to turn
        const turningCandle = {
            open: currentPrice,
            close: currentPrice + 0.0003, // Small move up to show reversal starting
            high: currentPrice + 0.0005,
            low: currentPrice - 0.0002, // Still low to show it's in the buy zone
            isTurningPoint: true,
            signalType: 'buy'
        };
        candles.push(turningCandle);
        currentPrice = turningCandle.close;
        
        // Phase 5: Strong uptrend after reversal
        for (let i = 0; i < 8; i++) {
            const open = currentPrice;
            // Increasingly strong uptrend
            const forceFactor = 1 + (i / 8);
            const close = open + (0.0005 * (Math.random() * 0.5 + 0.75) * forceFactor);
            const high = Math.max(open, close) + (0.0002 * (Math.random() * 0.5 + 0.5));
            const low = Math.min(open, close) - (0.0001 * (Math.random() * 0.5 + 0.25));
            
            candles.push({ open, high, low, close, isTurningPoint: false });
            currentPrice = close;
        }
        
        return candles;
    };
    
    // Process candles and determine min/max prices
    const processCandles = (candles, type) => {
        let minPrice = Number.MAX_VALUE;
        let maxPrice = Number.MIN_VALUE;
        
        candles.forEach(candle => {
            minPrice = Math.min(minPrice, candle.low);
            maxPrice = Math.max(maxPrice, candle.high);
        });
        
        // Add padding to price range
        const padding = (maxPrice - minPrice) * 0.15;
        minPrice -= padding;
        maxPrice += padding;
        
        // For sell pattern, ensure the turning point is in the top sell zone
        // For buy pattern, ensure the turning point is in the bottom buy zone
        const turningPointIndex = candles.findIndex(candle => candle.isTurningPoint);
        if (turningPointIndex >= 0) {
            const turningCandle = candles[turningPointIndex];
            
            if (type === 'sell') {
                // Calculate what percentage of height the turning point should be
                // It should be in the sell zone (top 15% of chart)
                const targetPercentage = 90; // From bottom
                // Adjust the prices so the turning point appears at this percentage
                const normalizedPos = (turningCandle.high - minPrice) / (maxPrice - minPrice) * 100;
                if (normalizedPos < targetPercentage) {
                    // Need to adjust min/max to position the turning point higher
                    const adjustFactor = (targetPercentage - normalizedPos) / 100;
                    const priceRange = maxPrice - minPrice;
                    minPrice -= adjustFactor * priceRange;
                }
            } else { // buy pattern
                // Calculate what percentage of height the turning point should be
                // It should be in the buy zone (bottom 15% of chart)
                const targetPercentage = 8; // From bottom - position it lower to ensure in buy zone
                
                // Use the low of the turning candle to ensure it's in the buy zone
                const normalizedPos = (turningCandle.low - minPrice) / (maxPrice - minPrice) * 100;
                
                if (normalizedPos > targetPercentage) {
                    // Need to adjust min/max to position the turning point lower
                    const adjustFactor = (normalizedPos - targetPercentage) / 100;
                    const priceRange = maxPrice - minPrice;
                    maxPrice += adjustFactor * priceRange * 1.5; // Increase adjustment to ensure it's well in the zone
                }
                
                // Make sure the buy zone is very visible at the bottom
                const lowestPrice = Math.min(...candles.map(candle => candle.low));
                const priceRange = maxPrice - minPrice;
                minPrice = lowestPrice - (priceRange * 0.05); // Add extra space below lowest price
            }
        }
        
        return { minPrice, maxPrice, priceRange: maxPrice - minPrice };
    };
    
    // Render the chart
    const renderChart = (candles, type) => {
        // Clear previous chart
        chartContainer.innerHTML = '';
        
        // Process candles and determine price range
        const { minPrice, maxPrice, priceRange } = processCandles(candles, type);
        
        // Update price labels
        const priceLabels = document.querySelectorAll('.price-label');
        const labelStep = priceRange / (priceLabels.length - 1);
        
        for (let i = 0; i < priceLabels.length; i++) {
            const price = maxPrice - (i * labelStep);
            priceLabels[i].textContent = price.toFixed(5);
        }
        
        // Set the zone position and style
        if (type === 'sell') {
            // Sell zone at the top
            signalZone.style.top = '0';
            signalZone.style.bottom = 'auto';
            signalZone.style.height = '15%';
            signalZone.classList.add('sell');
            signalZone.classList.remove('buy');
            signalLabel.classList.add('sell');
            signalLabel.classList.remove('buy');
            signalLabel.innerHTML = '<i class="fas fa-arrow-down"></i> Sell Signal';
            signalLabel.style.bottom = '10px';
            signalLabel.style.top = 'auto';
            
            // Make sure buttons have correct colors
            buyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            buyBtn.style.color = 'var(--text-white)';
            sellBtn.style.background = '#ff4646';
            sellBtn.style.color = '#000';
            sellBtn.style.boxShadow = '0 0 10px rgba(255, 70, 70, 0.6)';
        } else {
            // Buy zone at the bottom - moved up more from the bottom
            signalZone.style.top = 'auto';
            signalZone.style.bottom = '10%';
            signalZone.style.height = '15%';
            signalZone.classList.add('buy');
            signalZone.classList.remove('sell');
            signalLabel.classList.add('buy');
            signalLabel.classList.remove('sell');
            signalLabel.innerHTML = '<i class="fas fa-arrow-up"></i> Buy Signal';
            signalLabel.style.bottom = '10px';
            signalLabel.style.top = 'auto';
            
            // Make sure buttons have correct colors
            buyBtn.style.background = 'var(--primary-color)';
            buyBtn.style.color = '#000';
            buyBtn.style.boxShadow = '0 0 10px var(--primary-glow)';
            sellBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            sellBtn.style.color = 'var(--text-white)';
        }
        
        // Helper function to normalize price to chart percentage
        const normalizePrice = (price) => {
            return ((price - minPrice) / priceRange) * 100;
        };
        
        // Draw candles with delayed animation
        candles.forEach((candle, index) => {
            const candleWidth = 80 / candles.length; // Width in percentage
            const left = (index / candles.length) * 90 + 5; // 5% left margin, 90% width
            const isBullish = candle.close >= candle.open;
            
            // Calculate position and size
            const bottom = normalizePrice(Math.min(candle.open, candle.close));
            const height = Math.abs(normalizePrice(candle.close) - normalizePrice(candle.open));
            
            // Create candle element
            const candleElement = document.createElement('div');
            candleElement.classList.add('candle');
            candleElement.classList.add(isBullish ? 'bullish' : 'bearish');
            
            candleElement.style.left = `${left}%`;
            candleElement.style.bottom = `${bottom}%`;
            candleElement.style.width = `${candleWidth}%`;
            candleElement.style.height = `${Math.max(height, 0.1)}%`; // Min height
            
            // Create top wick
            const wickTop = document.createElement('div');
            wickTop.classList.add('wick', 'wick-top');
            const wickTopHeight = normalizePrice(candle.high) - normalizePrice(Math.max(candle.open, candle.close));
            wickTop.style.height = `${wickTopHeight}%`;
            
            // Create bottom wick
            const wickBottom = document.createElement('div');
            wickBottom.classList.add('wick', 'wick-bottom');
            const wickBottomHeight = normalizePrice(Math.min(candle.open, candle.close)) - normalizePrice(candle.low);
            wickBottom.style.height = `${wickBottomHeight}%`;
            
            // Add wicks to candle
            candleElement.appendChild(wickTop);
            candleElement.appendChild(wickBottom);
            
            // Add turning point dot if needed
            if (candle.isTurningPoint) {
                const signalDot = document.createElement('div');
                signalDot.classList.add('signal-dot');
                
                if (candle.signalType === 'buy') {
                    signalDot.classList.add('buy-dot');
                    // Position blue dot at the bottom of the turning point candle
                    signalDot.style.bottom = '-5px';
                    signalDot.style.top = 'auto';
                    
                    // Add take profit and stop loss for buy signal
                    setTimeout(() => {
                        // Position stop loss even lower than before (was 0.5%)
                        const stopLossPosPercentage = 0.1; // practically at the very bottom of the chart
                        
                        // Take profit at top of chart (with a small margin)
                        const takeProfitPosPercentage = 98; // nearly at the top
                        
                        // Create stop loss line
                        const stopLossLine = document.createElement('div');
                        stopLossLine.classList.add('order-line', 'stop-loss-line');
                        stopLossLine.style.bottom = `${stopLossPosPercentage}%`;
                        stopLossLine.innerHTML = '<span class="order-label sl-label">Stop Loss</span>';
                        chartContainer.appendChild(stopLossLine);
                        
                        // Create take profit line
                        const takeProfitLine = document.createElement('div');
                        takeProfitLine.classList.add('order-line', 'take-profit-line');
                        takeProfitLine.style.bottom = `${takeProfitPosPercentage}%`;
                        takeProfitLine.innerHTML = '<span class="order-label tp-label">Take Profit</span>';
                        chartContainer.appendChild(takeProfitLine);
                        
                        // Add entry line 2 candles after the buy signal
                        const turningPointIndex = candles.findIndex(c => c.isTurningPoint);
                        if (turningPointIndex >= 0 && turningPointIndex + 2 < candles.length) {
                            const entryCandle = candles[turningPointIndex + 2];
                            const entryPrice = entryCandle.open; // Use open price of the candle 2 positions after the turning point
                            const entryPosPercentage = normalizePrice(entryPrice);
                            
                            // Create entry line
                            const entryLine = document.createElement('div');
                            entryLine.classList.add('order-line', 'entry-line');
                            entryLine.style.bottom = `${entryPosPercentage}%`;
                            entryLine.innerHTML = '<span class="order-label entry-label">Entry</span>';
                            chartContainer.appendChild(entryLine);
                            
                            // Add animation
                            setTimeout(() => {
                                entryLine.style.width = '100%';
                            }, 200);
                        }
                        
                        // Add animations
                        setTimeout(() => {
                            stopLossLine.style.width = '100%';
                            takeProfitLine.style.width = '100%';
                        }, 200);
                    }, 1500); // Add after candlesticks appear
                } else {
                    signalDot.classList.add('sell-dot');
                    // Position red dot at the top of the turning point candle
                    signalDot.style.top = '-5px';
                    signalDot.style.bottom = 'auto';
                    
                    // Add take profit and stop loss for sell signal
                    setTimeout(() => {
                        // Keep position stop loss high
                        const stopLossPosPercentage = 98; // higher position from bottom
                        
                        // Take profit at bottom of chart (with a small margin)
                        const takeProfitPosPercentage = 2; // nearly at the bottom
                        
                        // Create stop loss line
                        const stopLossLine = document.createElement('div');
                        stopLossLine.classList.add('order-line', 'stop-loss-line');
                        stopLossLine.style.bottom = `${stopLossPosPercentage}%`;
                        stopLossLine.innerHTML = '<span class="order-label sl-label">Stop Loss</span>';
                        chartContainer.appendChild(stopLossLine);
                        
                        // Create take profit line
                        const takeProfitLine = document.createElement('div');
                        takeProfitLine.classList.add('order-line', 'take-profit-line');
                        takeProfitLine.style.bottom = `${takeProfitPosPercentage}%`;
                        takeProfitLine.innerHTML = '<span class="order-label tp-label">Take Profit</span>';
                        chartContainer.appendChild(takeProfitLine);
                        
                        // Add entry line 2 candles after the sell signal
                        const turningPointIndex = candles.findIndex(c => c.isTurningPoint);
                        if (turningPointIndex >= 0 && turningPointIndex + 2 < candles.length) {
                            const entryCandle = candles[turningPointIndex + 2];
                            const entryPrice = entryCandle.open; // Use open price of the candle 2 positions after the turning point
                            const entryPosPercentage = normalizePrice(entryPrice);
                            
                            // Create entry line
                            const entryLine = document.createElement('div');
                            entryLine.classList.add('order-line', 'entry-line');
                            entryLine.style.bottom = `${entryPosPercentage}%`;
                            entryLine.innerHTML = '<span class="order-label entry-label">Entry</span>';
                            chartContainer.appendChild(entryLine);
                            
                            // Add animation
                            setTimeout(() => {
                                entryLine.style.width = '100%';
                            }, 200);
                        }
                        
                        // Add animations
                        setTimeout(() => {
                            stopLossLine.style.width = '100%';
                            takeProfitLine.style.width = '100%';
                        }, 200);
                    }, 1500); // Add after candlesticks appear
                }
                
                candleElement.appendChild(signalDot);
                candleElement.classList.add('turning-point');
            }
            
            // Add candle to chart with staggered animation
            setTimeout(() => {
                chartContainer.appendChild(candleElement);
                // Fade in animation
                setTimeout(() => {
                    candleElement.style.opacity = '1';
                }, 10);
            }, index * 40);
        });
    };
    
    // Set initial pattern
    buyBtn.classList.add('active');
    renderChart(createBuyPattern(), 'buy');
    
    // Add button event listeners
    buyBtn.addEventListener('click', () => {
        if (buyBtn.classList.contains('active')) return;
        
        buyBtn.classList.add('active');
        sellBtn.classList.remove('active');
        chartContainer.style.opacity = '0';
        
        setTimeout(() => {
            renderChart(createBuyPattern(), 'buy');
            chartContainer.style.opacity = '1';
        }, 400);
    });
    
    sellBtn.addEventListener('click', () => {
        if (sellBtn.classList.contains('active')) return;
        
        sellBtn.classList.add('active');
        buyBtn.classList.remove('active');
        chartContainer.style.opacity = '0';
        
        setTimeout(() => {
            renderChart(createSellPattern(), 'sell');
            chartContainer.style.opacity = '1';
        }, 400);
    });
    
    // Add price tracking cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorPrice = document.querySelector('.cursor-price');
    
    if (cursorDot && cursorPrice) {
        chartContainer.addEventListener('mousemove', e => {
            const rect = chartContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Only show within chart area
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                cursorDot.style.display = 'block';
                cursorPrice.style.display = 'block';
                
                cursorDot.style.left = `${x}px`;
                cursorDot.style.top = `${y}px`;
                
                // Calculate price at y position
                const pricePercentage = 1 - (y / rect.height);
                const priceLabels = document.querySelectorAll('.price-label');
                const minPrice = parseFloat(priceLabels[priceLabels.length - 1].textContent);
                const maxPrice = parseFloat(priceLabels[0].textContent);
                const price = minPrice + (maxPrice - minPrice) * pricePercentage;
                
                cursorPrice.textContent = price.toFixed(5);
                cursorPrice.style.left = `${x + 15}px`;
                cursorPrice.style.top = `${y}px`;
            } else {
                cursorDot.style.display = 'none';
                cursorPrice.style.display = 'none';
            }
        });
        
        chartContainer.addEventListener('mouseleave', () => {
            cursorDot.style.display = 'none';
            cursorPrice.style.display = 'none';
        });
    }
    
    // Auto-switch every 10 seconds for demo effect
    let autoSwitch = setInterval(() => {
        if (buyBtn.classList.contains('active')) {
            sellBtn.click();
        } else {
            buyBtn.click();
        }
    }, 10000);
    
    // Stop auto-switching when user interacts with buttons
    buyBtn.addEventListener('click', () => clearInterval(autoSwitch));
    sellBtn.addEventListener('click', () => clearInterval(autoSwitch));
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling for newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (isValidEmail(email)) {
            // Success state
            emailInput.value = '';
            
            // Create and display success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.style.cssText = `
                color: var(--primary-color);
                margin-top: 10px;
                font-size: 0.9rem;
            `;
            
            // Remove any existing messages
            const existingMessage = newsletterForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            successMessage.classList.add('form-message');
            newsletterForm.appendChild(successMessage);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            // Error state
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.style.cssText = `
                color: #ff4444;
                margin-top: 10px;
                font-size: 0.9rem;
            `;
            
            // Remove any existing messages
            const existingMessage = newsletterForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            errorMessage.classList.add('form-message');
            newsletterForm.appendChild(errorMessage);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // Update every ~16ms (60fps)
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.round(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when counter comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Trade Anatomy Interactive Points
function initTradeAnatomy() {
    const anatomyItems = document.querySelectorAll('.anatomy-item');
    const buyBtn = document.querySelector('.trade-anatomy .buy-btn');
    const sellBtn = document.querySelector('.trade-anatomy .sell-btn');
    
    if (anatomyItems.length === 0) return;
    
    // Connect chart buttons to anatomy items
    if (buyBtn && sellBtn) {
        buyBtn.addEventListener('click', () => {
            // When clicking Buy, highlight zone, entry and risk items
            anatomyItems.forEach(item => {
                item.classList.remove('active');
                const point = item.getAttribute('data-point');
                if (point === 'zone' || point === 'entry' || point === 'risk') {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 300);
                }
            });
        });
        
        sellBtn.addEventListener('click', () => {
            // When clicking Sell, highlight deviation, zone and exit items
            anatomyItems.forEach(item => {
                item.classList.remove('active');
                const point = item.getAttribute('data-point');
                if (point === 'deviation' || point === 'zone' || point === 'exit') {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 300);
                }
            });
        });
    }
    
    // Allow clicking on each anatomy item to activate it
    anatomyItems.forEach(item => {
        item.addEventListener('click', () => {
            anatomyItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Interactive Timeline Navigation
function initTimeline() {
    const timelineSlider = document.querySelector('.timeline-slider');
    const prevBtn = document.querySelector('.timeline-prev');
    const nextBtn = document.querySelector('.timeline-next');
    const timePoints = document.querySelectorAll('.time-point');
    
    if (!timelineSlider || !prevBtn || !nextBtn || timePoints.length === 0) return;
    
    const pointWidth = timePoints[0].offsetWidth + 60; // Width + gap
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        timelineSlider.scrollBy({
            left: -pointWidth,
            behavior: 'smooth'
        });
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        timelineSlider.scrollBy({
            left: pointWidth,
            behavior: 'smooth'
        });
    });
    
    // Auto-initialize timeline chart backgrounds if images are missing
    timePoints.forEach(point => {
        const timeImage = point.querySelector('.time-image');
        
        if (timeImage && getComputedStyle(timeImage).backgroundImage === 'none') {
            // Generate gradient background if image is missing
            const time = point.getAttribute('data-time');
            const hue = (parseInt(time.substring(0, 2)) / 24) * 240; // Convert hours to hue (0-240)
            
            timeImage.style.background = `linear-gradient(45deg, hsl(${hue}, 70%, 30%), hsl(${hue + 30}, 70%, 40%))`;
        }
    });
}

// Mathematical Foundation Tabs
function initMathTabs() {
    const mathTabs = document.querySelectorAll('.math-tab');
    const mathPanels = document.querySelectorAll('.math-panel');
    
    if (mathTabs.length === 0 || mathPanels.length === 0) return;
    
    // Add click event to each tab
    mathTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            mathTabs.forEach(t => t.classList.remove('active'));
            mathPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and matching panel
            tab.classList.add('active');
            
            const targetPanel = document.getElementById(`${targetTab}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Initialize chart if it's not already initialized
                initMathChart(targetTab);
            }
        });
    });
    
    // Initialize first chart
    initMathChart(mathTabs[0].getAttribute('data-tab'));
}

// Initialize Math Charts
function initMathChart(type) {
    const chartContainer = document.querySelector(`#${type}-panel .math-chart`);
    
    if (!chartContainer) return;
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Create SVG element
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 100 100");
    chartContainer.appendChild(svg);
    
    // Draw different charts based on the type
    switch (type) {
        case 'regression':
            drawRegressionChart(svg);
            break;
        case 'deviation':
            drawDeviationChart(svg);
            break;
        case 'atr':
            drawAtrChart(svg);
            break;
        case 'confirmation':
            drawConfirmationChart(svg);
            break;
    }
}

// Draw Regression Line Chart
function drawRegressionChart(svg) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Create price data
    const prices = [];
    const uptrend = Math.random() > 0.5;
    const startPrice = 50;
    let currentPrice = startPrice;
    
    for (let i = 0; i < 15; i++) {
        // Add random fluctuation
        const trend = uptrend ? 0.8 : -0.8;
        const random = (Math.random() * 5) - 2.5; // Random between -2.5 and 2.5
        currentPrice += trend + random;
        
        // Ensure price stays in viewBox
        currentPrice = Math.max(10, Math.min(90, currentPrice));
        
        prices.push({
            x: i * (100 / 14),
            y: 100 - currentPrice // Flip Y coordinate (SVG 0,0 is top-left)
        });
    }
    
    // Draw grid lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", 20 * i + 10);
        line.setAttribute("x2", "100");
        line.setAttribute("y2", 20 * i + 10);
        line.setAttribute("stroke", "rgba(255, 255, 255, 0.1)");
        line.setAttribute("stroke-width", "0.5");
        svg.appendChild(line);
    }
    
    // Draw regression line
    const slope = uptrend ? -0.35 : 0.35; // Negative because SVG coordinate system
    const intercept = uptrend ? 70 : 30;
    
    const regressionLine = document.createElementNS(svgNS, "line");
    regressionLine.setAttribute("x1", "0");
    regressionLine.setAttribute("y1", intercept);
    regressionLine.setAttribute("x2", "100");
    regressionLine.setAttribute("y2", intercept + (slope * 100));
    regressionLine.setAttribute("stroke", "#3fb4ff");
    regressionLine.setAttribute("stroke-width", "2");
    regressionLine.setAttribute("stroke-dasharray", "0");
    svg.appendChild(regressionLine);
    
    // Draw price points
    prices.forEach((price, index) => {
        // Draw price point
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", price.x);
        circle.setAttribute("cy", price.y);
        circle.setAttribute("r", "1.5");
        circle.setAttribute("fill", "rgba(255, 255, 255, 0.8)");
        svg.appendChild(circle);
        
        // Draw distance line to regression
        const regressionY = intercept + (slope * price.x);
        const distanceLine = document.createElementNS(svgNS, "line");
        distanceLine.setAttribute("x1", price.x);
        distanceLine.setAttribute("y1", price.y);
        distanceLine.setAttribute("x2", price.x);
        distanceLine.setAttribute("y2", regressionY);
        distanceLine.setAttribute("stroke", "rgba(255, 70, 70, 0.4)");
        distanceLine.setAttribute("stroke-width", "0.5");
        distanceLine.setAttribute("stroke-dasharray", "1,1");
        svg.appendChild(distanceLine);
    });
    
    // Add animation to show calculation
    regressionLine.setAttribute("stroke-dasharray", "100");
    regressionLine.setAttribute("stroke-dashoffset", "100");
    
    // Create animation
    const animate = document.createElementNS(svgNS, "animate");
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", "100");
    animate.setAttribute("to", "0");
    animate.setAttribute("dur", "2s");
    animate.setAttribute("begin", "0s");
    animate.setAttribute("fill", "freeze");
    regressionLine.appendChild(animate);
}

// Draw Deviation Chart
function drawDeviationChart(svg) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Create price data
    const prices = [];
    const uptrend = Math.random() > 0.5;
    const startPrice = 50;
    let currentPrice = startPrice;
    
    for (let i = 0; i < 15; i++) {
        // Add random fluctuation
        const trend = uptrend ? 0.8 : -0.8;
        const random = (Math.random() * 8) - 4; // Random between -4 and 4
        currentPrice += trend + random;
        
        // Ensure price stays in viewBox
        currentPrice = Math.max(10, Math.min(90, currentPrice));
        
        prices.push({
            x: i * (100 / 14),
            y: 100 - currentPrice // Flip Y coordinate (SVG 0,0 is top-left)
        });
    }
    
    // Draw grid lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", 20 * i + 10);
        line.setAttribute("x2", "100");
        line.setAttribute("y2", 20 * i + 10);
        line.setAttribute("stroke", "rgba(255, 255, 255, 0.1)");
        line.setAttribute("stroke-width", "0.5");
        svg.appendChild(line);
    }
    
    // Draw regression line
    const slope = uptrend ? -0.35 : 0.35; // Negative because SVG coordinate system
    const intercept = uptrend ? 70 : 30;
    
    const regressionLine = document.createElementNS(svgNS, "line");
    regressionLine.setAttribute("x1", "0");
    regressionLine.setAttribute("y1", intercept);
    regressionLine.setAttribute("x2", "100");
    regressionLine.setAttribute("y2", intercept + (slope * 100));
    regressionLine.setAttribute("stroke", "#3fb4ff");
    regressionLine.setAttribute("stroke-width", "2");
    svg.appendChild(regressionLine);
    
    // Draw price points
    let maxDeviation = 0;
    prices.forEach((price, index) => {
        // Calculate point on regression line
        const regressionY = intercept + (slope * price.x);
        
        // Calculate deviation
        const deviation = Math.abs(price.y - regressionY);
        maxDeviation = Math.max(maxDeviation, deviation);
        
        // Draw price point
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", price.x);
        circle.setAttribute("cy", price.y);
        circle.setAttribute("r", "1.5");
        circle.setAttribute("fill", "rgba(255, 255, 255, 0.8)");
        svg.appendChild(circle);
        
        // Draw distance line to regression
        const distanceLine = document.createElementNS(svgNS, "line");
        distanceLine.setAttribute("x1", price.x);
        distanceLine.setAttribute("y1", price.y);
        distanceLine.setAttribute("x2", price.x);
        distanceLine.setAttribute("y2", regressionY);
        distanceLine.setAttribute("stroke", "rgba(255, 70, 70, 0.4)");
        distanceLine.setAttribute("stroke-width", "0.5");
        distanceLine.setAttribute("stroke-dasharray", "1,1");
        svg.appendChild(distanceLine);
    });
    
    // Draw deviation channel
    const upperDeviation = document.createElementNS(svgNS, "line");
    upperDeviation.setAttribute("x1", "0");
    upperDeviation.setAttribute("y1", intercept - maxDeviation);
    upperDeviation.setAttribute("x2", "100");
    upperDeviation.setAttribute("y2", (intercept + (slope * 100)) - maxDeviation);
    upperDeviation.setAttribute("stroke", "rgba(63, 180, 255, 0.6)");
    upperDeviation.setAttribute("stroke-width", "1");
    upperDeviation.setAttribute("stroke-dasharray", "2,2");
    svg.appendChild(upperDeviation);
    
    const lowerDeviation = document.createElementNS(svgNS, "line");
    lowerDeviation.setAttribute("x1", "0");
    lowerDeviation.setAttribute("y1", intercept + maxDeviation);
    lowerDeviation.setAttribute("x2", "100");
    lowerDeviation.setAttribute("y2", (intercept + (slope * 100)) + maxDeviation);
    lowerDeviation.setAttribute("stroke", "rgba(63, 180, 255, 0.6)");
    lowerDeviation.setAttribute("stroke-width", "1");
    lowerDeviation.setAttribute("stroke-dasharray", "2,2");
    svg.appendChild(lowerDeviation);
    
    // Add animation to channel lines
    upperDeviation.setAttribute("stroke-dasharray", "100");
    upperDeviation.setAttribute("stroke-dashoffset", "100");
    lowerDeviation.setAttribute("stroke-dasharray", "100");
    lowerDeviation.setAttribute("stroke-dashoffset", "100");
    
    // Create animations
    const animateUpper = document.createElementNS(svgNS, "animate");
    animateUpper.setAttribute("attributeName", "stroke-dashoffset");
    animateUpper.setAttribute("from", "100");
    animateUpper.setAttribute("to", "0");
    animateUpper.setAttribute("dur", "2s");
    animateUpper.setAttribute("begin", "0.5s");
    animateUpper.setAttribute("fill", "freeze");
    upperDeviation.appendChild(animateUpper);
    
    const animateLower = document.createElementNS(svgNS, "animate");
    animateLower.setAttribute("attributeName", "stroke-dashoffset");
    animateLower.setAttribute("from", "100");
    animateLower.setAttribute("to", "0");
    animateLower.setAttribute("dur", "2s");
    animateLower.setAttribute("begin", "0.5s");
    animateLower.setAttribute("fill", "freeze");
    lowerDeviation.appendChild(animateLower);
}

// Draw ATR Filter Chart
function drawAtrChart(svg) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Create price bars for ATR calculation
    const bars = [];
    let currentHigh = 50;
    let currentLow = 40;
    let currentOpen = 45;
    let currentClose = 45;
    
    for (let i = 0; i < 15; i++) {
        // Random bar
        const range = Math.random() * 8 + 2; // Random range between 2 and 10
        const upMove = Math.random() * 4 - 2; // Random shift between -2 and 2
        
        currentHigh = currentHigh + upMove + (range / 2);
        currentLow = currentHigh - range;
        
        const isUp = Math.random() > 0.5;
        currentOpen = isUp ? currentLow + (range * 0.3) : currentHigh - (range * 0.3);
        currentClose = isUp ? currentHigh - (range * 0.3) : currentLow + (range * 0.3);
        
        // Ensure values stay in viewBox
        currentHigh = Math.min(90, currentHigh);
        currentLow = Math.max(10, currentLow);
        
        bars.push({
            x: i * (100 / 15) + 3, // Center in segment with margin
            high: 100 - currentHigh, // Flip coordinates
            low: 100 - currentLow,
            open: 100 - currentOpen,
            close: 100 - currentClose,
            range: range
        });
    }
    
    // Draw grid
    for (let i = 0; i < 5; i++) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", 20 * i + 10);
        line.setAttribute("x2", "100");
        line.setAttribute("y2", 20 * i + 10);
        line.setAttribute("stroke", "rgba(255, 255, 255, 0.1)");
        line.setAttribute("stroke-width", "0.5");
        svg.appendChild(line);
    }
    
    // Draw bars
    bars.forEach((bar, index) => {
        // Draw bar body
        const body = document.createElementNS(svgNS, "rect");
        const bodyTop = Math.min(bar.open, bar.close);
        const bodyHeight = Math.abs(bar.open - bar.close);
        body.setAttribute("x", bar.x - 1.5);
        body.setAttribute("y", bodyTop);
        body.setAttribute("width", "3");
        body.setAttribute("height", bodyHeight > 0 ? bodyHeight : 0.5);
        body.setAttribute("fill", bar.open > bar.close ? "#ff4646" : "#3fb4ff");
        svg.appendChild(body);
        
        // Draw high-low line
        const wickLine = document.createElementNS(svgNS, "line");
        wickLine.setAttribute("x1", bar.x);
        wickLine.setAttribute("y1", bar.high);
        wickLine.setAttribute("x2", bar.x);
        wickLine.setAttribute("y2", bar.low);
        wickLine.setAttribute("stroke", "rgba(255, 255, 255, 0.5)");
        wickLine.setAttribute("stroke-width", "0.5");
        svg.appendChild(wickLine);
        
        // Add range marker
        const rangeText = document.createElementNS(svgNS, "text");
        rangeText.setAttribute("x", bar.x);
        rangeText.setAttribute("y", 95);
        rangeText.setAttribute("text-anchor", "middle");
        rangeText.setAttribute("font-size", "4");
        rangeText.setAttribute("fill", "rgba(255, 255, 255, 0.5)");
        rangeText.textContent = bar.range.toFixed(1);
        // Only show some ranges to avoid clutter
        if (index % 3 === 0) {
            svg.appendChild(rangeText);
        }
    });
    
    // Calculate ATR
    const ranges = bars.map(b => b.range);
    const atr = ranges.reduce((a, b) => a + b, 0) / ranges.length;
    const atrThreshold = atr * 0.6;
    
    // Draw ATR line
    const atrLine = document.createElementNS(svgNS, "line");
    atrLine.setAttribute("x1", "0");
    atrLine.setAttribute("y1", "20");
    atrLine.setAttribute("x2", "100");
    atrLine.setAttribute("y2", "20");
    atrLine.setAttribute("stroke", "#3fb4ff");
    atrLine.setAttribute("stroke-width", "2");
    atrLine.setAttribute("stroke-dasharray", "2,2");
    svg.appendChild(atrLine);
    
    // Draw ATR threshold line
    const thresholdLine = document.createElementNS(svgNS, "line");
    thresholdLine.setAttribute("x1", "0");
    thresholdLine.setAttribute("y1", "40");
    thresholdLine.setAttribute("x2", "100");
    thresholdLine.setAttribute("y2", "40");
    thresholdLine.setAttribute("stroke", "#ff4646");
    thresholdLine.setAttribute("stroke-width", "1");
    thresholdLine.setAttribute("stroke-dasharray", "4,2");
    svg.appendChild(thresholdLine);
    
    // Add labels
    const atrLabel = document.createElementNS(svgNS, "text");
    atrLabel.setAttribute("x", "95");
    atrLabel.setAttribute("y", "18");
    atrLabel.setAttribute("text-anchor", "end");
    atrLabel.setAttribute("font-size", "5");
    atrLabel.setAttribute("fill", "#3fb4ff");
    atrLabel.textContent = "ATR";
    svg.appendChild(atrLabel);
    
    const thresholdLabel = document.createElementNS(svgNS, "text");
    thresholdLabel.setAttribute("x", "95");
    thresholdLabel.setAttribute("y", "38");
    thresholdLabel.setAttribute("text-anchor", "end");
    thresholdLabel.setAttribute("font-size", "5");
    thresholdLabel.setAttribute("fill", "#ff4646");
    thresholdLabel.textContent = "Threshold";
    svg.appendChild(thresholdLabel);
}

// Draw Signal Confirmation Chart
function drawConfirmationChart(svg) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Draw grid lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", 20 * i + 10);
        line.setAttribute("x2", "100");
        line.setAttribute("y2", 20 * i + 10);
        line.setAttribute("stroke", "rgba(255, 255, 255, 0.1)");
        line.setAttribute("stroke-width", "0.5");
        svg.appendChild(line);
    }
    
    // Draw zone
    const zone = document.createElementNS(svgNS, "rect");
    zone.setAttribute("x", "0");
    zone.setAttribute("y", "10");
    zone.setAttribute("width", "100");
    zone.setAttribute("height", "20");
    zone.setAttribute("fill", "rgba(63, 180, 255, 0.2)");
    zone.setAttribute("stroke", "rgba(63, 180, 255, 0.5)");
    zone.setAttribute("stroke-width", "1");
    svg.appendChild(zone);
    
    // Draw price line
    const points = [
        "10,70", "20,65", "30,60", "40,55", "50,40", "60,25", "70,15", "80,20", "90,30"
    ];
    
    const priceLine = document.createElementNS(svgNS, "polyline");
    priceLine.setAttribute("points", points.join(" "));
    priceLine.setAttribute("fill", "none");
    priceLine.setAttribute("stroke", "rgba(255, 255, 255, 0.7)");
    priceLine.setAttribute("stroke-width", "1.5");
    svg.appendChild(priceLine);
    
    // Draw bar validation
    const validationLine = document.createElementNS(svgNS, "line");
    validationLine.setAttribute("x1", "70");
    validationLine.setAttribute("y1", "15");
    validationLine.setAttribute("x2", "70");
    validationLine.setAttribute("y2", "50");
    validationLine.setAttribute("stroke", "#3fb4ff");
    validationLine.setAttribute("stroke-width", "1");
    validationLine.setAttribute("stroke-dasharray", "2,2");
    svg.appendChild(validationLine);
    
    // Draw validation point
    const validationPoint = document.createElementNS(svgNS, "circle");
    validationPoint.setAttribute("cx", "70");
    validationPoint.setAttribute("cy", "15");
    validationPoint.setAttribute("r", "3");
    validationPoint.setAttribute("fill", "#3fb4ff");
    validationPoint.setAttribute("stroke", "#ffffff");
    validationPoint.setAttribute("stroke-width", "1");
    svg.appendChild(validationPoint);
    
    // Add labels
    const zoneLabel = document.createElementNS(svgNS, "text");
    zoneLabel.setAttribute("x", "10");
    zoneLabel.setAttribute("y", "22");
    zoneLabel.setAttribute("font-size", "5");
    zoneLabel.setAttribute("fill", "#3fb4ff");
    zoneLabel.textContent = "Buy Zone";
    svg.appendChild(zoneLabel);
    
    const validationLabel = document.createElementNS(svgNS, "text");
    validationLabel.setAttribute("x", "70");
    validationLabel.setAttribute("y", "55");
    validationLabel.setAttribute("text-anchor", "middle");
    validationLabel.setAttribute("font-size", "5");
    validationLabel.setAttribute("fill", "#3fb4ff");
    validationLabel.textContent = "Valid";
    svg.appendChild(validationLabel);
}

// Before/After Comparison Slider
function initComparison() {
    const slider = document.querySelector('.comparison-slider');
    const handle = document.querySelector('.comparison-slider-handle');
    const beforeSide = document.querySelector('.before-side');
    
    if (!slider || !handle || !beforeSide) return;
    
    let isDragging = false;
    let startPosition = 0;
    let startWidth = 0;
    
    // Mouse events
    handle.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Touch events for mobile
    handle.addEventListener('touchstart', e => {
        e.preventDefault();
        startDrag(e.touches[0]);
    });
    document.addEventListener('touchmove', e => {
        drag(e.touches[0]);
    });
    document.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        isDragging = true;
        startPosition = e.clientX;
        startWidth = beforeSide.offsetWidth;
        handle.style.transition = 'none';
        beforeSide.style.transition = 'none';
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const sliderRect = slider.getBoundingClientRect();
        const newWidth = startWidth + (e.clientX - startPosition);
        const percentage = Math.min(Math.max(newWidth / sliderRect.width * 100, 0), 100);
        
        beforeSide.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    }
    
    function endDrag() {
        isDragging = false;
        handle.style.transition = 'left 0.3s ease';
        beforeSide.style.transition = 'width 0.3s ease';
    }
    
    // Generate chart placeholders if images are missing
    const beforeChart = document.querySelector('.before-chart');
    const afterChart = document.querySelector('.after-chart');
    
    if (beforeChart && getComputedStyle(beforeChart).backgroundImage === 'none') {
        beforeChart.style.background = 'linear-gradient(45deg, #331111, #442222)';
    }
    
    if (afterChart && getComputedStyle(afterChart).backgroundImage === 'none') {
        afterChart.style.background = 'linear-gradient(45deg, #112233, #223344)';
    }
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if current item is active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
            });
            
            // If item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize Client Success Gallery
function initSuccessGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const prevBtn = document.querySelector('.gallery-controls .prev-btn');
    const nextBtn = document.querySelector('.gallery-controls .next-btn');
    const currentPageEl = document.querySelector('.current-page');
    const totalPagesEl = document.querySelector('.total-pages');
    
    // Fullscreen gallery elements
    const fullscreenGallery = document.querySelector('.fullscreen-gallery');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const fullscreenClose = document.querySelector('.fullscreen-close');
    const fullscreenPrev = document.querySelector('.fullscreen-prev');
    const fullscreenNext = document.querySelector('.fullscreen-next');
    const currentImageEl = document.querySelector('.current-image');
    const totalImagesEl = document.querySelector('.total-images');
    
    if (!galleryGrid) return;
    
    const imagesPerPage = 4;
    const totalImages = 50;
    const totalPages = Math.ceil(totalImages / imagesPerPage);
    
    let currentPage = 1;
    let currentFullscreenImage = 1;
    
    // Set total pages and images in the UI
    if (totalPagesEl) {
        totalPagesEl.textContent = totalPages;
    }
    
    if (totalImagesEl) {
        totalImagesEl.textContent = totalImages;
    }
    
    // Initialize with first page
    showPage(1);
    
    // Add event listeners for grid navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });
    }
    
    // Add event listeners for fullscreen gallery
    if (fullscreenClose) {
        fullscreenClose.addEventListener('click', closeFullscreen);
    }
    
    if (fullscreenPrev) {
        fullscreenPrev.addEventListener('click', () => {
            showFullscreenImage(currentFullscreenImage - 1);
        });
    }
    
    if (fullscreenNext) {
        fullscreenNext.addEventListener('click', () => {
            showFullscreenImage(currentFullscreenImage + 1);
        });
    }
    
    // Close fullscreen when ESC key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenGallery.classList.contains('active')) {
            closeFullscreen();
        } else if (e.key === 'ArrowLeft' && fullscreenGallery.classList.contains('active')) {
            showFullscreenImage(currentFullscreenImage - 1);
        } else if (e.key === 'ArrowRight' && fullscreenGallery.classList.contains('active')) {
            showFullscreenImage(currentFullscreenImage + 1);
        }
    });
    
    function showPage(pageNum) {
        // Update current page
        currentPage = pageNum;
        
        // Update UI
        if (currentPageEl) {
            currentPageEl.textContent = currentPage;
        }
        
        // Calculate start and end indices
        const startIndex = (pageNum - 1) * imagesPerPage + 1;
        const endIndex = Math.min(startIndex + imagesPerPage - 1, totalImages);
        
        // Clear current images
        galleryGrid.innerHTML = '';
        
        // Add images for current page
        for (let i = startIndex; i <= endIndex; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.dataset.index = i;
            
            item.innerHTML = `<img src="img/review${i}.jpg" alt="Client Success ${i}" class="review-image">`;
            
            // Add click event to open fullscreen
            item.addEventListener('click', () => {
                openFullscreen(i);
            });
            
            galleryGrid.appendChild(item);
        }
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
            prevBtn.style.opacity = currentPage === 1 ? 0.5 : 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.style.opacity = currentPage === totalPages ? 0.5 : 1;
        }
    }
    
    function openFullscreen(imageIndex) {
        // Set current image
        showFullscreenImage(imageIndex);
        
        // Show fullscreen gallery
        if (fullscreenGallery) {
            fullscreenGallery.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    function closeFullscreen() {
        if (fullscreenGallery) {
            fullscreenGallery.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    function showFullscreenImage(imageIndex) {
        // Handle index bounds
        if (imageIndex < 1) {
            imageIndex = totalImages;
        } else if (imageIndex > totalImages) {
            imageIndex = 1;
        }
        
        // Update current fullscreen image index
        currentFullscreenImage = imageIndex;
        
        // Update counter UI
        if (currentImageEl) {
            currentImageEl.textContent = currentFullscreenImage;
        }
        
        // Remove loaded class before changing image
        if (fullscreenImage) {
            fullscreenImage.classList.remove('loaded');
            
            // Update image source
            fullscreenImage.src = `img/review${imageIndex}.jpg`;
            fullscreenImage.alt = `Client Success ${imageIndex}`;
            
            // Add loaded class once image is loaded
            fullscreenImage.onload = function() {
                fullscreenImage.classList.add('loaded');
            };
        }
    }
}

// Initialize the hero background animation
function initHeroAnimation() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    // Add additional price dots randomly
    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        dot.className = 'price-dot';
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 5}s`;
        heroBackground.appendChild(dot);
    }
    
    // Add moving regression lines that appear and disappear
    setInterval(() => {
        if (document.hidden) return;
        
        const line = document.createElement('div');
        line.className = 'regression-line';
        line.style.top = `${20 + Math.random() * 60}%`;
        line.style.left = `-10%`;
        line.style.width = '120%';
        line.style.opacity = '0';
        line.style.transform = `rotate(${-5 + Math.random() * 10}deg)`;
        
        // Define animation
        line.animate([
            { opacity: 0, transform: `rotate(${-5 + Math.random() * 10}deg) translateY(-10px)` },
            { opacity: 0.7, transform: `rotate(${-5 + Math.random() * 10}deg) translateY(0)` },
            { opacity: 0, transform: `rotate(${-5 + Math.random() * 10}deg) translateY(10px)` }
        ], {
            duration: 10000,
            easing: 'ease-in-out'
        });
        
        heroBackground.appendChild(line);
        
        // Remove after animation
        setTimeout(() => {
            line.remove();
        }, 10000);
    }, 3000);
    
    // Occasionally add signal dots
    setInterval(() => {
        if (document.hidden) return;
        
        const isBuy = Math.random() > 0.5;
        const signalDot = document.createElement('div');
        signalDot.className = `price-dot signal ${isBuy ? '' : 'sell'}`;
        signalDot.style.top = `${Math.random() * 100}%`;
        signalDot.style.left = `${Math.random() * 100}%`;
        
        heroBackground.appendChild(signalDot);
        
        // Remove after animation
        setTimeout(() => {
            signalDot.remove();
        }, 4000);
    }, 5000);
} 