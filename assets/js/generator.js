// generator.js
// Contiene la lógica para generar funciones y calcular sus límites.

/**
 * Genera un número entero aleatorio dentro de un rango.
 * @param {number} min - El valor mínimo (inclusive).
 * @param {number} max - El valor máximo (inclusive).
 * @returns {number} Un número entero aleatorio.
 */
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Genera un límite de función de acuerdo al nivel de dificultad.
 * @param {string} level - El nivel de dificultad ('ruffini', 'indeterminacion', 'laterales', 'racionalidad').
 * @returns {object} Un objeto con la expresión, la función, el punto y el resultado esperado.
 */
function generateExercise(level) {
  let expr, fn, x0, expectedResult

  switch (level) {
    case "ruffini":
      const a = getRandomInt(-5, 5)
      const b = getRandomInt(-5, 5)
      const x0_poly = getRandomInt(-3, 3)
      expr = `x^2 + ${a}x + ${b}`
      fn = (x) => x * x + a * x + b
      x0 = x0_poly
      expectedResult = fn(x0)
      break

    case "indeterminacion":
      const root = getRandomInt(-3, 3)
      const numFactor = getRandomInt(-5, 5)
      const denFactor = getRandomInt(-5, 5)

      const numExpr = `(x - ${root}) * (x - ${numFactor})`
      const denExpr = `(x - ${root}) * (x - ${denFactor})`

      expr = `(${numExpr}) / (${denExpr})`
      fn = (x) => ((x - root) * (x - numFactor)) / ((x - root) * (x - denFactor))
      x0 = root
      expectedResult = (x0 - numFactor) / (x0 - denFactor)
      break

    case "laterales":
      x0 = getRandomInt(-3, 3)
      const k1 = getRandomInt(-5, 5)
      const k2 = getRandomInt(-5, 5)

      expr = `{ ${x0 + k1}x + ${k1}  si x < ${x0}; ${k2}x + ${k2} si x >= ${x0} }`
      fn = (x) => (x < x0 ? (x0 + k1) * x + k1 : k2 * x + k2)
      expectedResult = fn(x0 - 0.0001) === fn(x0 + 0.0001) ? fn(x0) : "no existe"
      break

    case "racionalidad":
      const num = getRandomInt(1, 5)
      const denRoot = getRandomInt(-3, 3)

      expr = `${num} / (x - ${denRoot})`
      fn = (x) => num / (x - denRoot)
      x0 = denRoot
      expectedResult = "infinito"
      break
  }

  return { expr, fn, x0, expectedResult }
}
