// === PROPERTY DETAIL PAGE JAVASCRIPT ===

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar funcionalidades
    initGalleryLightbox();
    initReserveButtons();
    initScrollAnimations();
    initTableResponsive();
    
    console.log('Property detail page loaded');
});

// === LIGHTBOX PARA GALERÍA ===
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Crear lightbox si no existe
    if (!document.getElementById('lightbox')) {
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <span class="lightbox-close">&times;</span>
                <span class="lightbox-nav lightbox-prev">&#10094;</span>
                <div class="lightbox-content">
                    <img src="" alt="Gallery image" class="lightbox-image">
                </div>
                <span class="lightbox-nav lightbox-next">&#10095;</span>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('.gallery-image');
        return {
            src: img.src,
            alt: img.alt
        };
    });
    
    // Click en imagen para abrir lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            showLightbox();
        });
        
        // Accesibilidad con teclado
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentImageIndex = index;
                showLightbox();
            }
        });
    });
    
    function showLightbox() {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Cerrar lightbox
    closeBtn.addEventListener('click', hideLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });
    
    // Navegación en lightbox
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                hideLightbox();
                break;
            case 'ArrowLeft':
                prevBtn.click();
                break;
            case 'ArrowRight':
                nextBtn.click();
                break;
        }
    });
}

// === BOTONES DE RESERVA ===
function initReserveButtons() {
    const reserveButtons = document.querySelectorAll('.btn-reserve, .reserve-btn');
    
    reserveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener información de la tipología si es de la tabla
            const row = this.closest('tr');
            let typology = 'General';
            let price = 'Consultar';
            
            if (row) {
                typology = row.querySelector('td:first-child').textContent;
                price = row.querySelector('td:nth-child(4)').textContent;
            }
            
            showReservationModal(typology, price);
        });
    });
}

function showReservationModal(typology, price) {
    // Verificar si el modal ya existe
    let modal = document.getElementById('reservationModal');
    
    if (!modal) {
        // Crear modal de reserva
        const modalHTML = `
            <div class="modal fade" id="reservationModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Reserva tu vivienda</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div id="reservation-info" class="alert alert-info mb-4"></div>
                            <form id="reservationForm">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="nombre" class="form-label">Nombre completo *</label>
                                        <input type="text" class="form-control" id="nombre" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="dni" class="form-label">DNI/NIE *</label>
                                        <input type="text" class="form-control" id="dni" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="email" class="form-label">Email *</label>
                                        <input type="email" class="form-control" id="email" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="telefono" class="form-label">Teléfono *</label>
                                        <input type="tel" class="form-control" id="telefono" required>
                                    </div>
                                    <div class="col-12">
                                        <label for="comentarios" class="form-label">Comentarios adicionales</label>
                                        <textarea class="form-control" id="comentarios" rows="3"></textarea>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="terminos" required>
                                            <label class="form-check-label" for="terminos">
                                                Acepto los <a href="#">términos y condiciones</a> y la <a href="#">política de privacidad</a> *
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-dark" id="submitReservation">Enviar solicitud</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById('reservationModal');
        
        // Agregar event listener al botón de envío
        document.getElementById('submitReservation').addEventListener('click', handleReservationSubmit);
    }
    
    // Actualizar información de la reserva
    const infoDiv = document.getElementById('reservation-info');
    infoDiv.innerHTML = `
        <strong>Tipología seleccionada:</strong> ${typology}<br>
        <strong>Precio:</strong> ${price}
    `;
    
    // Mostrar modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function handleReservationSubmit() {
    const form = document.getElementById('reservationForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Recoger datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        dni: document.getElementById('dni').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        comentarios: document.getElementById('comentarios').value,
        property: 'Distrito Universidad R3',
        timestamp: new Date().toISOString()
    };
    
    // Aquí enviarías los datos a tu backend
    console.log('Reservation data:', formData);
    
    // Simular envío
    const submitBtn = document.getElementById('submitReservation');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
    
    setTimeout(() => {
        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('reservationModal'));
        modal.hide();
        
        // Mostrar confirmación
        showConfirmationAlert();
        
        // Reset
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar solicitud';
    }, 1500);
}

function showConfirmationAlert() {
    const alertHTML = `
        <div class="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" 
             style="z-index: 9999; max-width: 500px;" role="alert">
            <strong>¡Solicitud enviada!</strong> Nos pondremos en contacto contigo pronto.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', alertHTML);
    
    setTimeout(() => {
        const alert = document.querySelector('.alert-success');
        if (alert) {
            const bsAlert = bootstrap.Alert.getInstance(alert) || new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
}

// === ANIMACIONES AL HACER SCROLL ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.service-item, .adjudication-card, .gallery-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// === HACER TABLA RESPONSIVE ===
function initTableResponsive() {
    if (window.innerWidth <= 768) {
        const table = document.querySelector('.typology-table tbody');
        if (!table) return;
        
        const headers = ['Tipología', 'Superficie útil', 'Anexos', 'Precio/mes', 'Reserva'];
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (headers[index]) {
                    cell.setAttribute('data-label', headers[index]);
                }
            });
        });
    }
}

// === SCROLL SUAVE A SECCIONES ===
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// === COMPARTIR EN REDES SOCIALES ===
function shareOnSocialMedia(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Distrito Universidad R3 - Lagoom Living');
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${title}%20${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// === IMPRIMIR PÁGINA ===
function printPropertyDetails() {
    window.print();
}

// === GUARDAR FAVORITO ===
function saveToFavorites(propertyId) {
    let favorites = JSON.parse(localStorage.getItem('lagoom_favorites') || '[]');
    
    if (!favorites.includes(propertyId)) {
        favorites.push(propertyId);
        localStorage.setItem('lagoom_favorites', JSON.stringify(favorites));
        
        showNotification('Propiedad guardada en favoritos', 'success');
    } else {
        showNotification('Esta propiedad ya está en favoritos', 'info');
    }
}

function showNotification(message, type = 'info') {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed bottom-0 end-0 m-3" 
             style="z-index: 9999; max-width: 300px;" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertHTML);
    
    setTimeout(() => {
        const alerts = document.querySelectorAll('.alert');
        const lastAlert = alerts[alerts.length - 1];
        if (lastAlert) {
            const bsAlert = bootstrap.Alert.getInstance(lastAlert) || new bootstrap.Alert(lastAlert);
            bsAlert.close();
        }
    }, 3000);
}

// === CALCULAR CUOTA MENSUAL (si se implementa) ===
function calculateMonthlyPayment(price, extras = 0) {
    const basePrice = parseFloat(price.replace(/[^\d.-]/g, ''));
    const total = basePrice + extras;
    
    return {
        base: basePrice,
        extras: extras,
        total: total,
        formatted: `${total.toFixed(2)}€`
    };
}

// === COMPARAR PROPIEDADES ===
function addToComparison(propertyData) {
    let comparison = JSON.parse(localStorage.getItem('lagoom_comparison') || '[]');
    
    if (comparison.length >= 3) {
        showNotification('Solo puedes comparar hasta 3 propiedades', 'warning');
        return;
    }
    
    if (!comparison.find(p => p.id === propertyData.id)) {
        comparison.push(propertyData);
        localStorage.setItem('lagoom_comparison', JSON.stringify(comparison));
        
        showNotification('Propiedad añadida a comparación', 'success');
        updateComparisonCounter();
    }
}

function updateComparisonCounter() {
    const comparison = JSON.parse(localStorage.getItem('lagoom_comparison') || '[]');
    const counter = document.getElementById('comparison-counter');
    
    if (counter) {
        counter.textContent = comparison.length;
        counter.style.display = comparison.length > 0 ? 'inline-block' : 'none';
    }
}

// === VALIDACIÓN DE DNI/NIE ===
function validateDNI(dni) {
    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    
    return dniRegex.test(dni) || nieRegex.test(dni);
}

// === UTILIDADES DE FORMATO ===
function formatPrice(price) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Hacer funciones disponibles globalmente si es necesario
window.shareProperty = shareOnSocialMedia;
window.printProperty = printPropertyDetails;
window.saveProperty = saveToFavorites;
