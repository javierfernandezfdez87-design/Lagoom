// === LAGOOM LIVING - JavaScript Vanilla ===

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {

    // Inicializar todas las funciones
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initPropertyCards();
    initMobileMenu();
    initTooltips();
    initGallery(); // Nueva función para la galería

    console.log('Lagoom Living - Página cargada correctamente');

    // Auto-open IKEA Promo Modal
    const promoModalEl = document.getElementById('ikeaPromoModal');
    if (promoModalEl) {
        const promoModal = new bootstrap.Modal(promoModalEl);

        // Show after 2 seconds
        // Optional: Check if already shown in this session
        if (!sessionStorage.getItem('ikeaPromoShown')) {
            setTimeout(() => {
                promoModal.show();
                sessionStorage.setItem('ikeaPromoShown', 'true');
            }, 2000);
        }
    }
});

// === TOOLTIPS ===
function initTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    // Seleccionar todos los enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Solo aplicar si el href es un hash válido
            if (href && href !== '#' && href.length > 1) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Scroll suave al elemento
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Cerrar menú móvil si está abierto
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) ||
                            new bootstrap.Collapse(navbarCollapse, { toggle: false });
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
}

// === ANIMACIONES AL HACER SCROLL ===
function initScrollAnimations() {
    // Configurar Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // Opcional: dejar de observar después de la animación
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar las tarjetas de propiedades
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Agregar clase cuando sea visible
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// === NAVBAR CON EFECTO AL HACER SCROLL ===
function initNavbarScroll() {
    const navbar = document.querySelector('.main-navbar');
    const topBar = document.querySelector('.top-bar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Agregar sombra al navbar cuando se hace scroll
        if (currentScroll > 50) {
            navbar.classList.add('navbar-scrolled');
            if (!navbar.style.boxShadow) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                navbar.style.transition = 'box-shadow 0.3s ease';
            }
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.boxShadow = 'none';
        }

        // Ocultar/mostrar top bar al hacer scroll (opcional)
        if (currentScroll > 100 && currentScroll > lastScroll) {
            // Scroll hacia abajo - ocultar top bar
            if (topBar) {
                topBar.style.transform = 'translateY(-100%)';
                topBar.style.transition = 'transform 0.3s ease';
            }
        } else {
            // Scroll hacia arriba - mostrar top bar
            if (topBar) {
                topBar.style.transform = 'translateY(0)';
            }
        }

        lastScroll = currentScroll;
    });
}

// === FUNCIONALIDAD DE TARJETAS DE PROPIEDADES ===
function initPropertyCards() {
    const propertyCards = document.querySelectorAll('.property-card');

    propertyCards.forEach(card => {
        // Agregar evento click para ver detalles
        card.addEventListener('click', function (e) {
            // Evitar que el click en el badge active esto
            if (e.target.classList.contains('property-badge')) {
                return;
            }

            const propertyTitle = this.querySelector('.property-title').textContent;
            console.log('Propiedad seleccionada:', propertyTitle);

            // Aquí podrías abrir un modal, redirigir a otra página, etc.
            // showPropertyModal(propertyTitle);
        });

        // Efecto hover mejorado
        card.addEventListener('mouseenter', function () {
            this.style.cursor = 'pointer';
        });
    });
}

// === MENÚ MÓVIL ===
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        // Agregar evento para cerrar menú al hacer click fuera
        document.addEventListener('click', function (e) {
            const isClickInside = navbarToggler.contains(e.target) || navbarCollapse.contains(e.target);

            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) ||
                    new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    }
}

// === FUNCIÓN PARA MOSTRAR MODAL DE PROPIEDAD (Ejemplo) ===
function showPropertyModal(propertyTitle) {
    // Crear modal dinámicamente
    const modalHTML = `
        <div class="modal fade" id="propertyModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${propertyTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>Información detallada de la propiedad...</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Contactar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Agregar al body si no existe
    if (!document.getElementById('propertyModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('propertyModal'));
    modal.show();
}

// === FILTRO DE PROPIEDADES (Opcional) ===
function filterProperties(criteria) {
    const propertyCards = document.querySelectorAll('.property-card');

    propertyCards.forEach(card => {
        const badge = card.querySelector('.property-badge');
        const status = badge ? badge.textContent.trim() : '';

        if (criteria === 'all' || status.toLowerCase() === criteria.toLowerCase()) {
            card.style.display = 'block';
            // Animar entrada
            card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// === LAZY LOADING DE IMÁGENES ===
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// === CONTADOR DE PROPIEDADES ===
function updatePropertyCount() {
    const visibleCards = document.querySelectorAll('.property-card:not([style*="display: none"])');
    const countElement = document.getElementById('property-count');

    if (countElement) {
        countElement.textContent = `${visibleCards.length} propiedades disponibles`;
    }
}

// === FUNCIÓN DE CONTACTO (Formulario) ===
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            console.log('Datos del formulario:', data);

            // Aquí enviarías los datos a tu backend
            // Ejemplo: sendContactData(data);

            // Mostrar mensaje de éxito
            showAlert('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
            contactForm.reset();
        });
    }
}

// === MOSTRAR ALERTAS ===
function showAlert(message, type = 'info') {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" 
             style="z-index: 9999; max-width: 500px;" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', alertHTML);

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        const alert = document.querySelector('.alert');
        if (alert) {
            const bsAlert = bootstrap.Alert.getInstance(alert) || new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
}

// === UTILIDADES ===

// Hacer petición fetch simplificada
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Debounce para optimizar eventos de scroll/resize
function debounce(func, wait = 250) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Ejemplo de uso del debounce
window.addEventListener('resize', debounce(function () {
    console.log('Window resized');
    // Ajustar layout si es necesario
}, 250));

// === GOOGLE ANALYTICS / TRACKING (Opcional) ===
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log('Event tracked:', category, action, label);
}

// Ejemplo: trackear clicks en propiedades
document.addEventListener('click', function (e) {
    const propertyCard = e.target.closest('.property-card');
    if (propertyCard) {
        const propertyTitle = propertyCard.querySelector('.property-title').textContent;
        trackEvent('Property', 'Click', propertyTitle);
    }
});

// === GALERÍA DE IMÁGENES (CARRUSEL) ===
function initGallery() {
    const mainImage = document.getElementById('mainGalleryImage');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    const prevBtn = document.getElementById('prevGalleryBtn');
    const nextBtn = document.getElementById('nextGalleryBtn');

    // Variables for drag/swipe
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;

    if (mainImage && thumbnails.length > 0) {

        // Helper function to update image
        function updateMainImage(index) {
            if (index < 0) index = thumbnails.length - 1;
            if (index >= thumbnails.length) index = 0;

            currentIndex = index;
            const targetThumb = thumbnails[currentIndex];
            const newSrc = targetThumb.querySelector('img').getAttribute('src');

            // Fade effect only if not dragging
            if (!isDragging) {
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = '1';
                }, 200);
            } else {
                mainImage.src = newSrc;
            }

            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            targetThumb.classList.add('active');

            // Update data-index for modal
            const mainContainer = document.querySelector('.gallery-main-container');
            if (mainContainer) {
                mainContainer.setAttribute('data-index', currentIndex);
            }

            // Scroll thumbnail into view
            targetThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        // Thumbnail Click Events
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevent bubbling
                updateMainImage(index);
            });
        });

        // Button Events
        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                updateMainImage(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                updateMainImage(currentIndex + 1);
            });
        }

        // Touch/Drag Events for Main Container
        const mainContainer = document.querySelector('.gallery-main-container');

        if (mainContainer) {
            // Touch events
            mainContainer.addEventListener('touchstart', touchStart);
            mainContainer.addEventListener('touchend', touchEnd);
            mainContainer.addEventListener('touchmove', touchMove);

            // Mouse events
            mainContainer.addEventListener('mousedown', touchStart);
            mainContainer.addEventListener('mouseup', touchEnd);
            mainContainer.addEventListener('mouseleave', touchEnd);
            mainContainer.addEventListener('mousemove', touchMove);

            // Prevent context menu
            mainContainer.addEventListener('contextmenu', e => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }

        function touchStart(event) {
            isDragging = true;
            startPos = getPositionX(event);
            animationID = requestAnimationFrame(animation);
            mainContainer.style.cursor = 'grabbing';
        }

        function touchEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            mainContainer.style.cursor = 'pointer';

            const movedBy = currentTranslate - prevTranslate;

            // If moved enough
            if (movedBy < -50) {
                updateMainImage(currentIndex + 1);
            } else if (movedBy > 50) {
                updateMainImage(currentIndex - 1);
            }

            // Reset position
            currentTranslate = 0;
            prevTranslate = 0;
            setSliderPosition();
        }

        function touchMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }

        function animation() {
            if (isDragging) {
                setSliderPosition();
                requestAnimationFrame(animation);
            }
        }

        function setSliderPosition() {
            // Move only the image
            // We limit movement to avoid dragging it out completely before release
            if (Math.abs(currentTranslate) < 150) {
                mainImage.style.transform = `translateX(${currentTranslate}px)`;
            }
        }

        // Ensure reset on image update (handled in updateMainImage implicitly by src change, but let's be safe)
        const originalUpdate = updateMainImage;
        updateMainImage = function (index) {
            mainImage.style.transform = `translateX(0px)`;
            originalUpdate(index);
        }

        // Sincronizar modal
        const galleryModal = document.getElementById('galleryModal');
        if (galleryModal) {
            galleryModal.addEventListener('show.bs.modal', function (event) {
                const triggerElement = event.relatedTarget;
                let index = currentIndex; // Default to current index

                if (triggerElement) {
                    // Try to get index from element itself or closest container
                    if (triggerElement.hasAttribute('data-index')) {
                        index = parseInt(triggerElement.getAttribute('data-index'));
                    } else {
                        const container = triggerElement.closest('.gallery-main-container');
                        if (container && container.hasAttribute('data-index')) {
                            index = parseInt(container.getAttribute('data-index'));
                        }
                    }
                }

                // Buscar el carrusel dentro del modal
                const carouselElement = galleryModal.querySelector('.carousel');
                if (carouselElement) {
                    const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement);
                    carousel.to(parseInt(index));
                }
            });
        }
    }
}
