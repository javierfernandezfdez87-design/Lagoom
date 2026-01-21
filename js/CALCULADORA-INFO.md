# Calculadora de Esfuerzo - Documentación

## 📊 Cómo Funciona la Calculadora

### Fórmula de Cálculo

La **tasa de esfuerzo** se calcula mediante la siguiente fórmula:

```
Tasa de esfuerzo = (Alquiler mensual / Salario neto mensual familiar) × 100
```

**Ejemplo:**
- Salario neto mensual familiar: 2.000€
- Alquiler mensual: 534€
- Tasa de esfuerzo: (534 / 2000) × 100 = **26,7%**

### Criterios de Evaluación

La calculadora clasifica el resultado en 4 rangos:

#### ✅ **EXCELENTE** (≤ 30%)
- **Color**: Verde
- **Mensaje**: "¡Perfecto! Tu tasa de esfuerzo está dentro del rango recomendado."
- **Significado**: El alquiler representa hasta el 30% de los ingresos. Es el rango ideal y recomendado por expertos financieros.

#### ✓ **BUENO** (30% - 35%)
- **Color**: Verde claro
- **Mensaje**: "Bien. Está en un rango aceptable, aunque cerca del límite recomendado."
- **Significado**: Ligeramente por encima del ideal, pero aún manejable.

#### ⚠️ **ACEPTABLE** (35% - 40%)
- **Color**: Amarillo/Naranja
- **Mensaje**: "Ojo. Supera el límite recomendado. Evalúa bien tus gastos."
- **Significado**: El esfuerzo es alto. Se recomienda revisar el presupuesto familiar.

#### ❌ **ALTO ESFUERZO** (> 40%)
- **Color**: Rojo
- **Mensaje**: "Atención. Tu tasa de esfuerzo es demasiado alta."
- **Significado**: El alquiler consume más del 40% de los ingresos, lo cual es insostenible a largo plazo.

## 🎨 Elementos Visuales

### Barra de Progreso
- Se rellena hasta el porcentaje calculado
- Cambia de color según el rango:
  - Verde: ≤ 30%
  - Verde→Amarillo: 30-35%
  - Naranja: 35-40%
  - Rojo: > 40%

### Información Adicional
Muestra: **"Te quedarían X€ mensuales después del alquiler"**
- Cálculo: Salario - Alquiler = Ingreso disponible

## ⚙️ Funcionalidades Implementadas

### 1. Cálculo en Tiempo Real
- Los resultados se actualizan automáticamente al cambiar los valores
- Debounce de 500ms para evitar cálculos excesivos

### 2. Validaciones
- ✅ Valores numéricos mayores a 0
- ✅ El alquiler no puede ser mayor que el salario
- ✅ Mensajes de error claros

### 3. Animaciones
- Porcentaje animado (cuenta desde 0 hasta el valor real)
- Barra de progreso con transición suave
- Efecto de aparición del resultado

### 4. Responsive
- Se adapta a todos los tamaños de pantalla
- En móvil, hace scroll automático al resultado

## 🔧 Posibles Personalizaciones

Si necesitas ajustar la calculadora, aquí están los parámetros clave:

### Cambiar los Rangos de Evaluación

En el archivo `typology-calculator.js`, busca esta sección:

```javascript
if (tasaEsfuerzo <= 30) {
    // Excelente
} else if (tasaEsfuerzo <= 35) {
    // Bueno
} else if (tasaEsfuerzo <= 40) {
    // Aceptable
} else {
    // Alto esfuerzo
}
```

Puedes modificar los números (30, 35, 40) según tus criterios.

### Cambiar los Mensajes

Modifica las variables `message` dentro de cada condición:

```javascript
message = `Tu mensaje personalizado aquí`;
```

### Cambiar los Colores

En el archivo `typology-detail.css`, busca:

```css
.result-bar-fill {
    background: linear-gradient(...);
}
```

O directamente en el JavaScript donde se asigna:

```javascript
barFill.style.background = '#4caf50'; // Verde
```

## 📱 Ejemplo de Uso

1. El usuario introduce:
   - Salario neto mensual: **2.500€**
   - Alquiler mensual: **700€**

2. La calculadora calcula:
   - Tasa de esfuerzo: **(700 / 2500) × 100 = 28%**

3. Resultado mostrado:
   - **28%** (Verde)
   - "¡Perfecto! Tu tasa de esfuerzo es del 28%. Está dentro del rango recomendado."
   - "Te quedarían 1.800€ mensuales después del alquiler"

## 🎯 Recomendaciones Actuales

Los umbrales establecidos (30%, 35%, 40%) se basan en:

1. **Recomendaciones bancarias**: Los bancos generalmente consideran que el alquiler no debe superar el 30-35% de los ingresos netos.

2. **Estándar europeo**: La regla de oro es no destinar más del 30% de los ingresos a vivienda.

3. **Vivienda protegida**: Algunas convocatorias de VPO establecen límites del 35-40% como máximo.

## ❓ Preguntas para Confirmación

**¿Necesitas ajustar algo?**

1. ¿Los rangos de porcentaje (30%, 35%, 40%) son correctos?
2. ¿Los mensajes son adecuados?
3. ¿Hay alguna fórmula adicional que deba incluirse?
4. ¿Se debe considerar algún otro factor? (Ej: número de miembros de la familia, otros gastos fijos, etc.)

**Posibles mejoras:**

- Agregar campo de "Otros gastos fijos mensuales"
- Calcular según número de miembros de la familia
- Incluir gastos de comunidad, IBI, etc.
- Guardar cálculos anteriores en localStorage
- Enviar el resultado por email
- Comparar con otras viviendas

---

**¡Importante!** Por favor, revisa la lógica de la calculadora y dime si necesitas algún ajuste en los cálculos o mensajes.
