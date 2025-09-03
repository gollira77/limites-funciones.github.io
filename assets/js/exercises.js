// exercises.js
// Lógica principal para la gestión de ejercicios.

/* global generateExercise, plotFunction */

let incorrectAttempts = 0

/**
 * Genera y muestra un nuevo ejercicio.
 */
function generateNewExercise() {
  const currentPage = window.location.pathname.split("/").pop()
  let level

  if (currentPage.includes("ruffini.html")) {
    level = "ruffini"
  } else if (currentPage.includes("indeterminacion.html")) {
    level = "indeterminacion"
  } else if (currentPage.includes("laterales.html")) {
    level = "laterales"
  } else if (currentPage.includes("racionalidad.html")) {
    level = "racionalidad"
  }

  const exercise = window.generateExercise(level)

  // Muestra la función en la página
  document.getElementById("function-display").innerHTML = `
        <p style="text-align: center;">Calcula el siguiente límite:</p>
        <p style="text-align: center;"><strong>$lim_{x \\to ${exercise.x0}} f(x)$</strong></p>
        <p style="text-align: center;">Donde: <strong>$f(x) = ${exercise.expr}$</strong></p>
    `

  // Llama a la función de trazado con el objeto completo del ejercicio
  window.plotFunction(exercise, "plot-container")

  // Guarda los datos del ejercicio para la verificación
  window.currentExercise = exercise

  incorrectAttempts = 0

  // Reinicia la UI
  document.getElementById("user-answer").value = ""
  document.getElementById("feedback-message").textContent = ""
  document.getElementById("check-button").style.display = "inline-block"
  document.getElementById("next-button").style.display = "none"
}

/**
 * Verifica la respuesta del usuario.
 * @param {string} userAnswer - La respuesta ingresada por el usuario.
 */
function checkAnswer(userAnswer) {
  const feedback = document.getElementById("feedback-message")
  const { expectedResult } = window.currentExercise

  // Comparación robusta
  const isCorrect = userAnswer.toLowerCase().trim() === expectedResult.toString().toLowerCase().trim()

  if (isCorrect) {
    feedback.textContent = "¡Correcto! 🎉"
    feedback.style.color = "#28a745"
    document.getElementById("check-button").style.display = "none"
    document.getElementById("next-button").style.display = "inline-block"
    incorrectAttempts = 0
  } else {
    incorrectAttempts++

    if (incorrectAttempts === 1) {
      feedback.innerHTML = `
        <p style="color: #d9534f;">Incorrecto. Inténtalo de nuevo.</p>
        <p style="color: #6c757d; font-size: 0.9em;">💡 Pista: Observa el gráfico y evalúa la función en x = ${window.currentExercise.x0}</p>
      `
    } else if (incorrectAttempts === 2) {
      feedback.innerHTML = `
        <p style="color: #d9534f;">Incorrecto nuevamente.</p>
        <p style="color: #6c757d; font-size: 0.9em;">💡 Ayuda: Sustituye x = ${window.currentExercise.x0} en la función f(x) = ${window.currentExercise.expr}</p>
      `
    } else {
      feedback.innerHTML = `
        <p style="color: #d9534f;">La respuesta correcta es: <strong>${expectedResult}</strong></p>
        <p style="color: #6c757d; font-size: 0.9em;">📚 Explicación: ${getExplanation(window.currentExercise)}</p>
      `
      document.getElementById("check-button").style.display = "none"
      document.getElementById("next-button").style.display = "inline-block"
    }
  }
}

function getExplanation(exercise) {
  const { x0, expr, expectedResult } = exercise

  if (expectedResult === "∞" || expectedResult === "-∞") {
    return `Al evaluar x = ${x0} en f(x) = ${expr}, obtenemos una indeterminación que resulta en ${expectedResult}.`
  } else if (expectedResult === "No existe") {
    return `El límite no existe porque los límites laterales son diferentes o la función no está definida en x = ${x0}.`
  } else {
    return `Al sustituir x = ${x0} en f(x) = ${expr}, obtenemos directamente ${expectedResult}.`
  }
}

document.addEventListener("DOMContentLoaded", () => {
  generateNewExercise()
})