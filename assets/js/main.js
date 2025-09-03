/* global checkAnswer, generateNewExercise */

document.addEventListener("DOMContentLoaded", () => {
  console.log("El DOM ha sido cargado. Iniciando la aplicación.")

  const checkButton = document.getElementById("check-button")
  const nextButton = document.getElementById("next-button")
  const userAnswerInput = document.getElementById("user-answer")

  if (checkButton) {
    checkButton.addEventListener("click", () => {
      const userAnswer = document.getElementById("user-answer").value
      console.log("Verificando respuesta...")
      window.checkAnswer(userAnswer)
    })
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      console.log("Generando el siguiente ejercicio...")
      window.generateNewExercise()
    })
  }

  if (userAnswerInput) {
    userAnswerInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const userAnswer = userAnswerInput.value
        window.checkAnswer(userAnswer)
      }
    })
  }
})
