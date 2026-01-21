// FAQs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add smooth scroll behavior for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Track accordion interactions
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Optional: Add analytics tracking here
            const questionText = this.textContent.trim();
            console.log('FAQ clicked:', questionText);
        });
    });

    // Add animation to accordion items when they open
    const accordionItems = document.querySelectorAll('.accordion-collapse');
    accordionItems.forEach(item => {
        item.addEventListener('show.bs.collapse', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Close other accordions when opening a new one (optional behavior)
    // Uncomment if you want only one accordion open at a time
    /*
    const accordion = document.getElementById('faqsAccordion');
    if (accordion) {
        const collapseElements = accordion.querySelectorAll('.accordion-collapse');
        collapseElements.forEach(collapse => {
            collapse.addEventListener('show.bs.collapse', function() {
                collapseElements.forEach(otherCollapse => {
                    if (otherCollapse !== collapse && otherCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(otherCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                });
            });
        });
    }
    */

    // Add keyboard navigation support
    accordionButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                let nextIndex;
                
                if (e.key === 'ArrowDown') {
                    nextIndex = (index + 1) % accordionButtons.length;
                } else {
                    nextIndex = (index - 1 + accordionButtons.length) % accordionButtons.length;
                }
                
                accordionButtons[nextIndex].focus();
            }
        });
    });

    // Check if URL has a hash parameter to open specific FAQ
    const urlHash = window.location.hash;
    if (urlHash) {
        const targetFAQ = document.querySelector(urlHash);
        if (targetFAQ && targetFAQ.classList.contains('accordion-collapse')) {
            setTimeout(() => {
                const bsCollapse = new bootstrap.Collapse(targetFAQ, {
                    show: true
                });
                targetFAQ.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }

    // Add loading state management
    const page = document.querySelector('.faqs-main');
    if (page) {
        page.style.opacity = '0';
        page.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            page.style.opacity = '1';
        }, 50);
    }

    // Print functionality (optional)
    function printFAQs() {
        window.print();
    }

    // Expose print function globally if needed
    window.printFAQs = printFAQs;
});

// Add print styles dynamically
const printStyles = `
    @media print {
        .site-header,
        .site-footer {
            display: none;
        }
        
        .faqs-accordion .accordion-button::after {
            display: none;
        }
        
        .faqs-accordion .accordion-collapse {
            display: block !important;
            height: auto !important;
        }
        
        .faqs-accordion .accordion-body {
            page-break-inside: avoid;
        }
        
        .faqs-accordion .accordion-item {
            page-break-inside: avoid;
            margin-bottom: 20px;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);
