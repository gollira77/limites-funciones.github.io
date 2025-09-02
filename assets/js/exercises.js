// exercises.js
// =====================
// Maneja la interfaz de ejercicios:
// - Carga de un nuevo ejercicio según tipo
// - Renderizado en pantalla
// - Validación de respuestas
// - Feedback al usuario
// =====================

import { generateExercise } from "./generator.js";

// Estado global del ejercicio actual
let currentExercise = null;

// Renderiza el ejercicio en el contenedor
export function loadExercise(tipo) {
    currentExercise = generateExercise(tipo);

    const container = document.getElementById("exercise-container");
    if (!container) {
        console.error("No existe un contenedor con id 'exercise-container'");
        return;
    }

    // Render enunciado + opciones
    container.innerHTML = `
        <div class="exercise-enunciado">
            <p>${currentExercise.enunciado}</p>
        </div>
        <div class="exercise-opciones">
            ${currentExercise.opciones.map((op, i) => `
                <button class="option-btn" data-value="${op}">${op}</button>
            `).join("")}
        </div>
        <div id="feedback" class="exercise-feedback"></div>
    `;

    // Conectar eventos de botones
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", () => checkAnswer(btn.dataset.value));
    });
}

// Validar respuesta
function checkAnswer(valor) {
    const feedback = document.getElementById("feedback");

    if (valor === currentExercise.respuesta) {
        feedback.textContent = "✅ ¡Correcto!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `❌ Incorrecto. La respuesta correcta es: ${currentExercise.respuesta}`;
        feedback.style.color = "red";
    }
}
