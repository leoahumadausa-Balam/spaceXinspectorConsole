
https://github.com/user-attachments/assets/42df6788-9459-49b9-97e3-32d37be98b84


# 🚀 Simulador Espacial - Proyecto Módulo 3

Bienvenido al **Simulador Espacial**, una aplicación interactiva basada en consola diseñada para poner a prueba tus habilidades de gestión de recursos y supervivencia en el espacio.

## 📝 Descripción

Este proyecto es una aplicación web que simula un viaje interplanetario. Aunque cuenta con una interfaz gráfica estilo "Terminal Retro", la interacción principal ocurre a través de la **Consola del Desarrollador** del navegador.

Tu misión es pilotar la nave **Explorador I** hacia un planeta destino (Marte, Júpiter o Saturno), gestionando recursos vitales como:
*   ⛽ **Combustible**
*   ❤️ **Salud del Casco**
*   💨 **Oxígeno**

## 🎮 Cómo Jugar

1.  **Abrir el Proyecto:**  
    Abre el archivo `index.html` en tu navegador.
2.  **Iniciar la Consola:**  
    Presiona `F12` o haz clic derecho > *Inspeccionar* y ve a la pestaña **Console**.
3.  **Configuración Inicial:**  
    Sigue las instrucciones en pantalla para ingresar tu nombre y edad. Si eres menor, necesitarás autorización de un "tutor". Selecciona tu destino.
4.  **Comandos Principales:**  
    Usa la función global `accion(n)` para interactuar:
    *   `accion(1)`: 🚀 **Despegar / Avanzar turno** (Consume recursos, avanza distancia).
    *   `accion(2)`: 🎒 **Ver Inventario** (Muestra ítems disponibles).
    *   `accion(0)`: 🔙 **Refrescar Estado** (Vuelve a mostrar el panel de la nave).

5.  **Uso de Ítems:**  
    Si tienes ítems en el inventario, úsalos con:
    *   `usarItem(numero)`: Aplica el ítem correspondiente (ej. `usarItem(1)`).

## 🛠️ Tecnologías

*   **HTML5:** Estructura semántica.
*   **CSS3:** Diseño responsivo con estética *Retro Terminal* (CRT effect, scanlines, glow).
*   **JavaScript (ES6):** Lógica del juego, manejo de objetos, arrays y control de flujo.

## 📋 Requisitos del Proyecto (Cumplidos)

*   [x] Uso de funciones y control de flujo (`if`, `switch`, `while`).
*   [x] Manipulación de Arrays y Objetos (`inventario`, `nave`).
*   [x] Interacción mediante `prompt` y `alert`.
*   [x] Lógica matemática para cálculo de distancias y recursos.

---
*Desarrollado como parte del Módulo 3: Fundamentos de JavaScript.*
