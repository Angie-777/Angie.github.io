const preguntas = [
    {
        numero: 1,
        definicion: "Así nos dicen cuando se enteran que nos llamamos Angel y Ángela",
        respuesta: "LOS ANGELES"
    },
    {
        numero: 2,
        definicion: "Frase cringe hacia mi persona",
        respuesta: "ASI ME GUSTA CALLADITA"
    },
    {
        numero: 3,
        definicion: "TE AMO",
        respuesta: "YO MÁS"
    },
    {
        numero: 4,
        definicion: "Tienes unos ojos que los veo...",
        respuesta: "Y ME DESMAYO"
    },
    {
        numero: 5,
        definicion: "Cuántos años cumples hoy",
        respuesta: "VEINTIOCHO"
    },
    {
        numero: 6,
        definicion: "Lo que más me gusta de ti",
        respuesta: "TUS OJOS"
    },
    {
        numero: 7,
        definicion: "Tu fav de fav",
        respuesta: "FAKER"
    },
    {
        numero: 8,
        definicion: "Uno de los regalos que te regalé",
        respuesta: "BERSERK"
    },
    {
        numero: 9,
        definicion: "Tus besos son...",
        respuesta: "DULCES"
    },
    {
        numero: 10,
        definicion: "Cuántas canitas tienes en tu barba",
        respuesta: "UNA"
    },
    {
        numero: 11,
        definicion: "Cuánto te amo",
        respuesta: "INFINITAMENTE"
    },
    {
        numero: 12,
        definicion: "Cómo te hago sentir",
        respuesta: "AFORTUNADO"
    },
    {
        numero: 13,
        definicion: "Lo que más amo hacerte",
        respuesta: "MANUALIDADES"
    },
    {
        numero: 14,
        definicion: "Siempre y para siempre",
        respuesta: "TE AMARE"
    },
    {
        numero: 15,
        definicion: "La pintura que te dediqué",
        respuesta: "EL BESO"
    },
    {
        numero: 16,
        definicion: "La primera palabra que te dije",
        respuesta: "AAAH TOCAYO"
    },
    {
        numero: 17,
        definicion: "Si te sientes mal puedes acurrucarte entre mis...",
        respuesta: "BRAZOS"
    },
    {
        numero: 18,
        definicion: "Mi amor por ti es...",
        respuesta: "DESBORDANTE"
    },
    {
        numero: 19,
        definicion: "Llenas mis ojitos de ...... y mi corazón de ....",
        respuesta: "BRILLO - AMOR"
    },
    {
        numero: 20,
        definicion: "Tengo ..... de verte siempre",
        respuesta: "GANAS"
    },
    {
        numero: 21,
        definicion: "Cuánto tiempo quiero pasar contigo",
        respuesta: "LA ETERNIDAD"
    },
    {
        numero: 22,
        definicion: "Porque eres tú, ...",
        respuesta: "NO QUIERO A NADIE MAS"
    },
    {
        numero: 23,
        definicion: "Tu signo zodiacal es",
        respuesta: "LIBRA"
    },
    {
        numero: 24,
        definicion: "Tu sonrisa es lo que me...",
        respuesta: "HACE SONREIR A DIARIO"
    },
    {
        numero: 25,
        definicion: "Tu eres m rayito de...",
        respuesta: "SOL"
    },
    {
        numero: 26,
        definicion: "Tu color fav",
        respuesta: "NEGRO"
    },
    {
        numero: 27,
        definicion: "Tus favs",
        respuesta: "TIGUAN"
    },
    {
        numero: 28,
        definicion: "Lo que siento por ti",
        respuesta: "ADORACION"
    }
];

let respuestasCorrectas = {};
let startTime = 0;

// ========== INICIALIZAR ==========
function initExam() {
    console.log("🎮 EXAMEN INICIALIZADO");
    startTime = Date.now();
    
    // Mezclar respuestas
    const respuestasMezcladas = [...preguntas].sort(() => Math.random() - 0.5);
    
    renderizarDefiniciones();
    renderizarRespuestas(respuestasMezcladas);
    agregarEventListeners();
    
    document.getElementById('totalCount').textContent = preguntas.length;
}

// ========== RENDERIZAR DEFINICIONES ==========
function renderizarDefiniciones() {
    const container = document.getElementById('definitionsList');
    container.innerHTML = '';

    preguntas.forEach((pregunta, index) => {
        const defDiv = document.createElement('div');
        defDiv.className = 'definition-item';
        
        defDiv.innerHTML = `
            <div class="definition-number">${pregunta.numero}</div>
            <div class="definition-text">${pregunta.definicion}</div>
        `;
        
        container.appendChild(defDiv);
    });

    console.log("✅ Definiciones renderizadas");
}

// ========== RENDERIZAR RESPUESTAS ==========
function renderizarRespuestas(respuestasMezcladas) {
    const container = document.getElementById('answersList');
    container.innerHTML = '';

    respuestasMezcladas.forEach((item, index) => {
        const ansDiv = document.createElement('div');
        ansDiv.className = 'answer-item';
        
        
        ansDiv.innerHTML = `
            <input 
                type="text" 
                class="answer-input" 
                id="answer-${index}"
                placeholder="?" 
                maxlength="2"
                data-correct="${item.numero}"
                data-answer="${item.respuesta}"
            />
            <div class="answer-word">${item.respuesta}</div>
        `;
        
        container.appendChild(ansDiv);
        respuestasCorrectas[index] = item.numero;
    });

    console.log("✅ Respuestas renderizadas");
}

// ========== EVENT LISTENERS ==========
function agregarEventListeners() {
    const inputs = document.querySelectorAll('.answer-input');

    inputs.forEach(input => {
        // Input
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase().replace(/[^0-9]/g, '');
            
            if (e.target.value.length > 2) {
                e.target.value = e.target.value.slice(0, 2);
            }

            validarInput(input);
            actualizarProgreso();
        });

        // Enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const nextInput = input.parentElement.nextElementSibling?.querySelector('.answer-input');
                if (nextInput) nextInput.focus();
            }
        });

        // Backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '') {
                const prevInput = input.parentElement.previousElementSibling?.querySelector('.answer-input');
                if (prevInput) prevInput.focus();
            }
        });
    });

    document.getElementById('checkBtn').addEventListener('click', verificar);
    document.getElementById('clearBtn').addEventListener('click', limpiar);
}

// ========== VALIDAR INPUT ==========
function validarInput(input) {
    const valor = input.value.trim();
    const correcto = input.dataset.correct;

    if (valor === '') {
        input.classList.remove('correct', 'error');
    } else if (valor == correcto) {
        input.classList.remove('error');
        input.classList.add('correct');
    } else {
        input.classList.remove('correct');
        input.classList.add('error');
    }
}

// ========== ACTUALIZAR PROGRESO ==========
function actualizarProgreso() {
    const inputs = document.querySelectorAll('.answer-input');
    let completadas = 0;

    inputs.forEach(input => {
        const valor = input.value.trim();
        const correcto = input.dataset.correct;
        
        if (valor === correcto) {
            completadas++;
        }
    });

    const total = inputs.length;
    const porcentaje = (completadas / total) * 100;

    document.getElementById('completedCount').textContent = completadas;
    document.getElementById('progressFill').style.width = porcentaje + '%';

    // Auto-verificar si está completo
    if (completadas === total && total > 0) {
        setTimeout(verificar, 300);
    }
}

// ========== VERIFICAR ==========
function verificar() {
    const inputs = document.querySelectorAll('.answer-input');
    let errores = 0;
    let correctas = 0;

    inputs.forEach(input => {
        const valor = input.value.trim();
        const correcto = input.dataset.correct;

        if (valor === correcto) {
            input.classList.remove('error');
            input.classList.add('correct');
            correctas++;
        } else if (valor === '') {
            input.classList.remove('error', 'correct');
        } else {
            input.classList.add('error');
            errores++;
        }
    });

    if (errores === 0 && correctas === inputs.length && correctas > 0) {
        setTimeout(mostrarExito, 500);
    } else if (errores > 0) {
        alert(`⚠️ HAY ${errores} ERROR(ES). ¡INTENTA DE NUEVO! 🔥`);
    } else if (correctas < inputs.length) {
        alert('¡CASI! COMPLETA TODAS LAS RESPUESTAS 📝');
    }
}

// ========== LIMPIAR ==========
function limpiar() {
    if (confirm('¿LIMPIAR TODAS LAS RESPUESTAS?')) {
        document.querySelectorAll('.answer-input').forEach(input => {
            input.value = '';
            input.classList.remove('error', 'correct');
        });
        actualizarProgreso();
    }
}

// ========== MOSTRAR ÉXITO ==========
function mostrarExito() {
    const modal = document.getElementById('successModal');
    const endTime = Date.now();
    const diffMs = endTime - startTime;
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);

    document.getElementById('timeSpent').textContent = 
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    modal.classList.add('show');

    // Redirección automática
    setTimeout(() => {
        window.location.href = 'cartadeamor/cartadeamor.html';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    initExam();
    actualizarProgreso();
});
