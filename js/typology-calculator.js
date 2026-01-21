// === TYPOLOGY DETAIL PAGE - CALCULATOR ===

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar funciones
    initCalculator();
    initGalleryModal();
    initInscriptionButton();
    
    console.log('Typology detail page loaded');
});

// === CALCULADORA DE ESFUERZO ===
function initCalculator() {
    const form = document.getElementById('calculatorForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateAffordability();
    });
    
    // Calcular en tiempo real cuando cambian los valores
    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(function() {
            const salario = parseFloat(document.getElementById('salarioNeto').value);
            const alquiler = parseFloat(document.getElementById('alquilerMensual').value);
            
            if (salario > 0 && alquiler > 0) {
                calculateAffordability();
            }
        }, 500));
    });
}

function calculateAffordability() {
    const salarioNeto = parseFloat(document.getElementById('salarioNeto').value);
    const alquilerMensual = parseFloat(document.getElementById('alquilerMensual').value);
    
    // Validación
    if (!salarioNeto || !alquilerMensual || salarioNeto <= 0 || alquilerMensual <= 0) {
        showError('Por favor, introduce valores válidos mayores a 0');
        return;
    }
    
    if (alquilerMensual > salarioNeto) {
        showError('El alquiler no puede ser mayor que el salario');
        return;
    }
    
    // Calcular tasa de esfuerzo
    // Tasa de esfuerzo = (Alquiler / Salario) × 100
    const tasaEsfuerzo = (alquilerMensual / salarioNeto) * 100;
    
    // Mostrar resultado
    displayResult(tasaEsfuerzo, salarioNeto, alquilerMensual);
}

function displayResult(tasaEsfuerzo, salario, alquiler) {
    const resultDiv = document.getElementById('calculatorResult');
    const percentageDiv = document.getElementById('resultPercentage');
    const barFill = document.getElementById('resultBar');
    const messageDiv = document.getElementById('resultMessage');
    
    // Mostrar el resultado
    resultDiv.style.display = 'block';
    
    // Animar el porcentaje
    animateValue(percentageDiv, 0, tasaEsfuerzo, 800);
    
    // Animar la barra
    setTimeout(() => {
        barFill.style.width = Math.min(tasaEsfuerzo, 100) + '%';
    }, 100);
    
    // Determinar el mensaje y estilo según la tasa de esfuerzo
    let message = '';
    let messageClass = '';
    
    if (tasaEsfuerzo <= 30) {
        // Excelente - Verde
        message = `✅ <strong>¡Perfecto!</strong> Tu tasa de esfuerzo es del ${tasaEsfuerzo.toFixed(1)}%. Está dentro del rango recomendado. Puedes alquilar esta vivienda cómodamente.`;
        messageClass = 'success';
        barFill.style.background = '#4caf50';
    } else if (tasaEsfuerzo <= 35) {
        // Bueno - Verde claro
        message = `✓ <strong>Bien</strong> Tu tasa de esfuerzo es del ${tasaEsfuerzo.toFixed(1)}%. Está en un rango aceptable, aunque cerca del límite recomendado del 30%.`;
        messageClass = 'success';
        barFill.style.background = 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)';
    } else if (tasaEsfuerzo <= 40) {
        // Aceptable - Amarillo/Naranja
        message = `⚠️ <strong>Ojo</strong> Tu tasa de esfuerzo es del ${tasaEsfuerzo.toFixed(1)}%. Supera el límite recomendado del 30%. Evalúa bien tus gastos antes de alquilar.`;
        messageClass = 'warning';
        barFill.style.background = 'linear-gradient(90deg, #ff9800 0%, #f57c00 100%)';
    } else {
        // Alto esfuerzo - Rojo
        message = `❌ <strong>Atención</strong> Tu tasa de esfuerzo es del ${tasaEsfuerzo.toFixed(1)}%. Es demasiado alta. Se recomienda que no supere el 30-35% de tus ingresos.`;
        messageClass = 'danger';
        barFill.style.background = '#f44336';
    }
    
    // Aplicar mensaje
    messageDiv.innerHTML = message;
    messageDiv.className = 'result-message ' + messageClass;
    
    // Agregar información adicional
    const remainingIncome = salario - alquiler;
    const additionalInfo = document.createElement('p');
    additionalInfo.className = 'text-muted mt-2 mb-0';
    additionalInfo.style.fontSize = '13px';
    additionalInfo.innerHTML = `Te quedarían <strong>${remainingIncome.toFixed(2)}€</strong> mensuales después del alquiler.`;
    
    if (messageDiv.nextElementSibling && messageDiv.nextElementSibling.className.includes('text-muted')) {
        messageDiv.nextElementSibling.remove();
    }
    messageDiv.after(additionalInfo);
    
    // Scroll suave al resultado en móvil
    if (window.innerWidth < 768) {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function showError(message) {
    const resultDiv = document.getElementById('calculatorResult');
    const messageDiv = document.getElementById('resultMessage');
    
    resultDiv.style.display = 'block';
    document.getElementById('resultPercentage').textContent = '—';
    document.getElementById('resultBar').style.width = '0%';
    
    messageDiv.innerHTML = `⚠️ ${message}`;
    messageDiv.className = 'result-message warning';
}

// Animar el número del porcentaje
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = current.toFixed(1) + '%';
    }, 16);
}

// === MODAL DE GALERÍA ===
function initGalleryModal() {
    const galleryModal = document.getElementById('galleryModal');
    
    if (!galleryModal) return;
    
    // Cuando se abre el modal, ir a la imagen clickeada
    galleryModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const imageIndex = parseInt(button.getAttribute('data-index'));
        
        const carousel = document.getElementById('galleryCarousel');
        const bsCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
        
        bsCarousel.to(imageIndex);
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (galleryModal.classList.contains('show')) {
            const carousel = document.getElementById('galleryCarousel');
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            
            if (e.key === 'ArrowLeft') {
                bsCarousel.prev();
            } else if (e.key === 'ArrowRight') {
                bsCarousel.next();
            } else if (e.key === 'Escape') {
                bootstrap.Modal.getInstance(galleryModal).hide();
            }
        }
    });
}

// === BOTÓN DE INSCRIPCIÓN ===
function initInscriptionButton() {
    const btnInscribirse = document.getElementById('btnInscribirse');
    
    if (!btnInscribirse) return;
    
    btnInscribirse.addEventListener('click', function() {
        showInscriptionModal();
    });
}

function showInscriptionModal() {
    // Verificar si el modal ya existe
    let modal = document.getElementById('inscriptionModal');
    
    if (!modal) {
        // Crear modal de inscripción
        const modalHTML = `
            <div class="modal fade" id="inscriptionModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Inscripción - Vivienda 1 dormitorio</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-info mb-4">
                                <strong>Distrito Universidad R3</strong><br>
                                Vivienda de 1 dormitorio: 534€ - 542€/mes
                            </div>
                            <form id="inscriptionForm">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="nombreInsc" class="form-label">Nombre completo *</label>
                                        <input type="text" class="form-control" id="nombreInsc" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="dniInsc" class="form-label">DNI/NIE *</label>
                                        <input type="text" class="form-control" id="dniInsc" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="emailInsc" class="form-label">Email *</label>
                                        <input type="email" class="form-control" id="emailInsc" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="telefonoInsc" class="form-label">Teléfono *</label>
                                        <input type="tel" class="form-control" id="telefonoInsc" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="ingresos" class="form-label">Ingresos netos mensuales *</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" id="ingresos" required>
                                            <span class="input-group-text">€</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="miembros" class="form-label">Miembros de la unidad familiar *</label>
                                        <input type="number" class="form-control" id="miembros" min="1" required>
                                    </div>
                                    <div class="col-12">
                                        <label for="motivacion" class="form-label">Motivo de la solicitud</label>
                                        <textarea class="form-control" id="motivacion" rows="3"></textarea>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="terminosInsc" required>
                                            <label class="form-check-label" for="terminosInsc">
                                                Acepto las <a href="#">bases de adjudicación</a> y la <a href="#">política de privacidad</a> *
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-dark" id="submitInscription">Enviar inscripción</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById('inscriptionModal');
        
        // Event listener para el botón de envío
        document.getElementById('submitInscription').addEventListener('click', handleInscriptionSubmit);
    }
    
    // Mostrar modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function handleInscriptionSubmit() {
    const form = document.getElementById('inscriptionForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Recoger datos
    const formData = {
        nombre: document.getElementById('nombreInsc').value,
        dni: document.getElementById('dniInsc').value,
        email: document.getElementById('emailInsc').value,
        telefono: document.getElementById('telefonoInsc').value,
        ingresos: document.getElementById('ingresos').value,
        miembros: document.getElementById('miembros').value,
        motivacion: document.getElementById('motivacion').value,
        vivienda: 'Distrito Universidad R3 - 1 dormitorio',
        timestamp: new Date().toISOString()
    };
    
    console.log('Inscription data:', formData);
    
    // Simular envío
    const submitBtn = document.getElementById('submitInscription');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Procesando...';
    
    setTimeout(() => {
        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('inscriptionModal'));
        modal.hide();
        
        // Mostrar confirmación
        showSuccessNotification('¡Inscripción enviada correctamente! Recibirás un email de confirmación.');
        
        // Reset
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar inscripción';
    }, 1500);
}

// === DESCARGAR LISTADO DE VIVIENDAS ===
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-outline-dark') && e.target.textContent.includes('Descargar')) {
        e.preventDefault();
        downloadPropertyList();
    }
});

function downloadPropertyList() {
    // Aquí implementarías la descarga real del PDF
    console.log('Downloading property list...');
    
    showSuccessNotification('El listado de viviendas se está descargando...');
    
    // Simular descarga
    // En producción, esto haría una petición al servidor para generar/obtener el PDF
    setTimeout(() => {
        // window.location.href = '/downloads/listado-viviendas-r3.pdf';
        console.log('Download complete (simulated)');
    }, 1000);
}

// === UTILIDADES ===

function showSuccessNotification(message) {
    const alertHTML = `
        <div class="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" 
             style="z-index: 9999; max-width: 500px;" role="alert">
            ${message}
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

function debounce(func, wait) {
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

// Validación de DNI/NIE
function validateDNI(dni) {
    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    
    return dniRegex.test(dni) || nieRegex.test(dni);
}

// Formatear moneda
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// === ANALYTICS / TRACKING ===
function trackCalculation(salario, alquiler, tasaEsfuerzo) {
    // Google Analytics o similar
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculator_use', {
            'event_category': 'Calculator',
            'event_label': 'Affordability Check',
            'value': Math.round(tasaEsfuerzo)
        });
    }
    
    console.log('Calculation tracked:', { salario, alquiler, tasaEsfuerzo });
}

// === COMPARTIR VIVIENDA ===
function shareProperty() {
    const url = window.location.href;
    const title = 'Vivienda 1 dormitorio - Distrito Universidad R3';
    
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).then(() => {
            console.log('Successfully shared');
        }).catch((error) => {
            console.log('Error sharing:', error);
        });
    } else {
        // Fallback: copiar al portapapeles
        navigator.clipboard.writeText(url).then(() => {
            showSuccessNotification('Enlace copiado al portapapeles');
        });
    }
}

// Hacer disponible globalmente si es necesario
window.calculateAffordability = calculateAffordability;
window.shareProperty = shareProperty;
