/* ===============================================
   PROYECTO MÓDULO 3: SIMULADOR ESPACIAL (FINAL)
===============================================
*/

// --- 1. CONFIGURACIÓN INICIAL DEL JUEGO ---
const planetas = [
    { nombre: "Marte", distanciaTotal: 2000 },
    { nombre: "Júpiter", distanciaTotal: 5000 },
    { nombre: "Saturno", distanciaTotal: 8000 }
];

// Objeto principal de la nave y sus métodos
const nave = {
    nombre: "Explorador I",
    combustible: 100,
    salud: 100,
    oxigeno: 100,
    distancia: 0,
    objetivo: null, // Guardará el objeto planeta seleccionado
    distanciaRecorrida: 0, // Progreso actual hacia el planeta

    // Método interno del objeto
    reporteEstado: function () {
        if (this.combustible < 20) console.warn("⚠️ ¡Combustible bajo!");
        return `Nave: ${this.nombre} | Salud: ${this.salud}% | Fuel: ${this.combustible}%`;
    }
};

// Inventario de recursos disponibles
const inventario = [
    { nombre: "Kit de Reparación", tipo: "salud", valor: 20, cantidad: 1 },
    { nombre: "Tanque de Combustible", tipo: "combustible", valor: 15, cantidad: 2 },
    { nombre: "Bebida Energética", tipo: "oxigeno", valor: 10, cantidad: 3 },
    { nombre: "Herramienta Multiuso", tipo: "reparacion", valor: 5, cantidad: 5 },
    { nombre: "Nitro", tipo: "nitro", valor: 800, cantidad: 1 }
];

let tripulacion = [];
let sistemaActivo = false;

// --- 2. FUNCIONES DE VISUALIZACIÓN ---

function renderizarInterfaz() {
    console.clear();

    // 1. VISUAL (Cohete + Estadísticas al lado)
    console.log(`
       !
       !
       ^
      / \\    -------------------------------------
     /___\\   📊 ESTADO DE LA NAVE
    |=   =|  -------------------------------------
    |     |  ⛽ Combustible: ${nave.combustible}%
    |  P  |  ❤  Salud:       ${nave.salud}%
    |     |  💨 Oxígeno:     ${nave.oxigeno}%
    |     |  -------------------------------------
   /|___|\\ 
  / |   | \\  TRIPULACIÓN: ${tripulacion.map(t => t.nombre).join(", ")}
 |  |   |  |
 |__|   |__|
    !!!
   `);

    // 3. INFORMACIÓN DE MISIÓN (Requisito: Planeta y Distancia Abajo)
    if (nave.objetivo) {
        let falta = nave.objetivo.distanciaTotal - nave.distanciaRecorrida;
        if (falta < 0) falta = 0;

        console.log("-----------------------------------------------------");
        console.log(`🪐 DESTINO: ${nave.objetivo.nombre.toUpperCase()}`);
        console.log(`🚀 PROGRESO: ${nave.distanciaRecorrida} / ${nave.objetivo.distanciaTotal} km`);
        console.log(`🏁 FALTA: ${falta} km para llegar.`);
        console.log("-----------------------------------------------------");
    }

    console.log("%c👇 COMANDOS (Escribe y da Enter):", "color: #00ff00;");
    console.log("👉 accion(1) : 🚀 Despegar");
    console.log("👉 accion(2) : 🎒 Ver Inventario");
    console.log("👉 accion(0) : 🔙 Volver");
}

// Función para mostrar el listado de inventario 
function mostrarInventario() {
    console.log("%c🎒 INVENTARIO COMPLETO:", "color: orange");

    // Usamos un FOR clásico en lugar de forEach para cumplir el requisito técnico
    for (let i = 0; i < inventario.length; i++) {
        let item = inventario[i];
        console.log(`[${i + 1}] ${item.nombre} (x${item.cantidad}) -> +${item.valor} ${item.tipo}`);
    }
    console.log("ℹ️ Usar: usarItem(número)");
}



// --- 3. LÓGICA DEL JUEGO ---

window.accion = function (opcion) {
    if (!sistemaActivo) {
        alert("⚠️ Sistema apagado. Recarga la página.");
        return;
    }

    // Controlador de acciones del usuario
    switch (opcion) {
        case 0:
            renderizarInterfaz();
            break;
        case 1:
            procesarViaje();
            break;
        case 2:
            renderizarInterfaz();
            mostrarInventario();
            return;

        default:
            console.warn("Comando no reconocido.");
    }
}

window.usarItem = function (indice) {
    if (!sistemaActivo) return;

    let i = indice - 1;

    if (inventario[i] && inventario[i].cantidad > 0) {
        let item = inventario[i];

        // Lógica específica por tipo de ítem
        if (item.tipo === "nitro") {
            nave.distanciaRecorrida += item.valor; // Avanza el doble (500km)
            nave.salud = Math.floor(nave.salud * 0.5); // Reduce salud al 50%
            nave.combustible = Math.floor(nave.combustible * 0.3); // Reduce combustible al 30% (pierde 70%)
            alert(`🔥 ¡NITRO ACTIVADO!\n🚀 Distancia: +${item.valor}km\n⚠️ Daños en casco (Salud 50%)\n⛽ Combustible quemado (Queda 30%)`);

        } else if (item.tipo === "reparacion") {
            // Lógica para herramienta (ejemplo) - Repara un poco de todo? O solo salud?
            // Asumiremos que repara salud por ahora si no hay propiedad 'reparacion'
            nave.salud += item.valor;
            alert(`🔧 Reparación completada: +${item.valor} Salud.`);

        } else {
            // Lógica estándar para salud, combustible, oxigeno
            if (nave[item.tipo] !== undefined) {
                nave[item.tipo] += item.valor;
                if (nave[item.tipo] > 100) nave[item.tipo] = 100;
                alert(`✅ APLICADO: ${item.nombre}\nRecuperaste ${item.valor} de ${item.tipo.toUpperCase()}.`);
            }
        }

        item.cantidad--;
        renderizarInterfaz();

        // Verificar si llegamos al destino con el Nitro
        if (nave.objetivo && nave.distanciaRecorrida >= nave.objetivo.distanciaTotal) {
            alert(`🎉 ¡ÉXITO! Has llegado a ${nave.objetivo.nombre} gracias al Nitro.`);
            sistemaActivo = false;
        }

    } else {
        alert("❌ Error: Ítem agotado o inexistente.");
        renderizarInterfaz();
    }
}

function procesarViaje() {
    let consumo = Math.floor(Math.random() * 15) + 5;

    nave.combustible -= consumo;
    let avance = Math.floor(Math.random() * 201) + 300; // Fluctúa entre 300 y 500 km
    nave.distanciaRecorrida += avance;
    nave.oxigeno -= 5;

    if (Math.random() > 0.7) {
        nave.salud -= 15;
        alert("⚠️ ¡IMPACTO! Casco dañado.");
    }

    renderizarInterfaz();

    // Verificación de Llegada al Planeta
    if (nave.objetivo && nave.distanciaRecorrida >= nave.objetivo.distanciaTotal) {
        alert(`🎉 ¡ÉXITO! Has llegado a ${nave.objetivo.nombre}.\nMisión Completada.`);
        sistemaActivo = false;
        return;
    }

    if (nave.combustible <= 0 || nave.salud <= 0) {
        alert("💀 GAME OVER");
        sistemaActivo = false;
    }
}

// --- 4. INICIO Y VALIDACIÓN ---

function iniciar() {
    let nombre = "";

    // Solicitar nombre del usuario
    while (nombre === "" || nombre === null) {
        nombre = prompt("SISTEMA DE NAVEGACIÓN\nIngrese nombre del Comandante:");
    }

    let edad = parseInt(prompt("Ingrese edad:"));

    // Validar edad y permisos
    if (edad >= 18) {
        seleccionarPlaneta(nombre, "Comandante");
    } else {
        let tutor = prompt("Eres menor. ¿Tienes tutor? (si/no)");
        if (tutor && tutor.toLowerCase() === "si") {
            seleccionarPlaneta(nombre, "Cadete");
        } else {
            alert("Acceso denegado.");
        }
    }
}

function seleccionarPlaneta(nombre, rol) {
    let seleccion = prompt(
        `Hola ${rol} ${nombre}. Elige destino:\n` +
        `1. Marte (2000 km)\n` +
        `2. Júpiter (5000 km)\n` +
        `3. Saturno (8000 km)`
    );

    let indice = parseInt(seleccion) - 1;

    if (planetas[indice]) {
        nave.objetivo = planetas[indice];
        configurarJuego(nombre, rol);
    } else {
        alert("Destino inválido. Intenta de nuevo.");
        location.reload();
    }
}

function configurarJuego(nombre, rol) {
    tripulacion.push({ nombre: nombre, rol: rol });
    sistemaActivo = true;
    alert(`✅ Rumbo fijado a ${nave.objetivo.nombre}. ¡Buen viaje, ${rol}!`);
    renderizarInterfaz();
}

setTimeout(iniciar, 5000);