// generator.js
// =====================
// Generador de ejercicios matemáticos
// Centraliza la creación de enunciados y sus respuestas correctas/incorrectas
// Cada tipo de ejercicio tiene su propio generador especializado
// =====================

// Función auxiliar: genera un entero aleatorio entre min y max (inclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función auxiliar: desordena un array (Fisher-Yates)
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

// =====================
// Generadores de cada tipo de ejercicio
// =====================

// 1. Método de Ruffini
function generateRuffini() {
    // Ejemplo: dividir x^2 + 3x + 2 por (x+1)
    let a = randInt(1, 5);
    let b = randInt(1, 5);
    let divisor = randInt(-5, 5) || 1; // divisor nunca 0

    let enunciado = `Divide el polinomio x² + ${a}x + ${b} usando el método de Ruffini por (x - (${divisor}))`;

    // Calcular división manualmente (simplificado para ejemplo)
    let correcto = `Cociente: x + ${a + divisor}, Resto: ${b + divisor * (a + divisor)}`;

    return {
        tipo: "ruffini",
        enunciado,
        opciones: shuffle([correcto, "Resultado incorrecto 1", "Resultado incorrecto 2"]),
        respuesta: correcto
    };
}

// 2. Indeterminación (límite tipo 0/0)
function generateIndeterminacion() {
    let x = randInt(1, 5);
    let enunciado = `Calcula: \\( \\lim_{x \\to ${x}} \\frac{(x-${x})(x+1)}{x-${x}} \\)`;

    let correcto = `${x + 1}`;

    return {
        tipo: "indeterminacion",
        enunciado,
        opciones: shuffle([correcto, (x + 2).toString(), (x - 1).toString()]),
        respuesta: correcto
    };
}

// 3. Límites laterales
function generateLaterales() {
    let x = randInt(1, 4);
    let enunciado = `Calcula el límite lateral: \\( \\lim_{x \\to ${x}^-} \\frac{1}{x-${x}} \\)`;

    let correcto = "-∞";

    return {
        tipo: "laterales",
        enunciado,
        opciones: shuffle([correcto, "+∞", "0"]),
        respuesta: correcto
    };
}

// 4. Racionalidad (racionalización)
function generateRacionalidad() {
    let a = randInt(2, 5);
    let b = randInt(1, 4);
    let enunciado = `Racionaliza el denominador: \\( \\frac{1}{\\sqrt{${a}} + \\sqrt{${b}}} \\)`;

    let correcto = `\\( \\frac{\\sqrt{${a}} - \\sqrt{${b}}}{${a - b}} \\)`;

    return {
        tipo: "racionalidad",
        enunciado,
        opciones: shuffle([correcto, "\\( \\frac{1}{${a - b}} \\)", "\\( \\sqrt{${a}} + \\sqrt{${b}} \\)"]),
        respuesta: correcto
    };
}

// =====================
// Export principal
// =====================

export function generateExercise(tipo) {
    switch (tipo) {
        case "ruffini": return generateRuffini();
        case "indeterminacion": return generateIndeterminacion();
        case "laterales": return generateLaterales();
        case "racionalidad": return generateRacionalidad();
        default:
            throw new Error("Tipo de ejercicio no soportado: " + tipo);
    }
}
