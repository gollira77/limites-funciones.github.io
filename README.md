# Límites de Funciones - Proyecto Interactivo

## Descripción

Este proyecto es una **herramienta educativa interactiva** sobre límites de funciones, diseñada para estudiantes universitarios de matemáticas.  
Permite aprender, visualizar y practicar los distintos tipos de límites de funciones de manera dinámica, con gráficos generados automáticamente.

El proyecto está dividido en dos grandes secciones:

1. **Aprendiendo**:  
   - Teoría sobre límites de funciones.  
   - Ejemplos prácticos y visualización de funciones con Plotly.  
   - Introducción a conceptos como límites laterales, indeterminaciones y límites infinitos.  

2. **Ejercicios**:  
   - Generador de ejercicios interactivos con **niveles de dificultad**:  
     - Fácil: funciones polinomiales y límites sencillos.  
     - Medio: funciones con indeterminaciones (0/0, ∞/∞).  
     - Difícil: límites laterales, infinito y discontinuidades.  
   - Cada ejercicio incluye la opción de calcular límites desde la izquierda o la derecha, y verificar si el límite existe o no.  
   - Gráficos interactivos de cada función utilizando **Plotly**.

El diseño es **minimalista y limpio** (blanco y azul) con enfoque en usabilidad y visualización clara.

## Estructura del Proyecto

# Crear carpetas internas
mkdir .github
mkdir .github\workflows
mkdir aprendiendo
mkdir ejercicios
mkdir assets
mkdir assets\css
mkdir assets\js
mkdir assets\img

# Crear archivos en la raíz
ni index.html -ItemType File
ni README.md -ItemType File
ni LICENSE -ItemType File

# Crear archivos en .github\workflows
ni .github\workflows\pages-deploy.yml -ItemType File

# Crear archivos en aprendiendo
ni aprendiendo\index.html -ItemType File
ni aprendiendo\introduccion.html -ItemType File
ni aprendiendo\definicion-formal.html -ItemType File
ni aprendiendo\metodos.html -ItemType File
ni aprendiendo\ejemplos.html -ItemType File

# Crear archivos en ejercicios
ni ejercicios\index.html -ItemType File
ni ejercicios\ruffini.html -ItemType File
ni ejercicios\indeterminacion.html -ItemType File
ni ejercicios\laterales.html -ItemType File
ni ejercicios\racionalidad.html -ItemType File

# Crear archivos en assets
ni assets\css\styles.css -ItemType File
ni assets\js\main.js -ItemType File
ni assets\js\generator.js -ItemType File
ni assets\js\plotter_plotly.js -ItemType File
ni assets\js\exercises.js -ItemType File