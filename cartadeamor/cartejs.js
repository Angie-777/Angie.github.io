// ========== MODAL DESTINO ==========
const btnDestino = document.getElementById('btnDestino');
const modalDestino = document.createElement('div');
modalDestino.className = 'modal-destino';
modalDestino.id = 'modalDestino';

modalDestino.innerHTML = `
    <div class="card-destino">
        <button class="close-btn" onclick="cerrarDestino()">×</button>
        <h2>DESTINO</h2>
        
        <div class="destino-image">✨</div>
        
        <p>Dicen que el alma tiene caminos secretos, que hay hilos invisibles que nos guían.</p>
        
        <p>Yo no lo entendía.... hasta que llegaste tú.</p>
        
        <p>Desde entonces, todo tiene sentido: las ausencias, las búsquedas, las noches en que soñaba sin saber tu nombre.</p>
        
        <p>Porque si el alma tiene un destino, la mía fue creada para encontrarte.</p>
        
        <p>Para reconocerte en tu risa, para quedarse en tus abrazos, para escribirte versos que solo tú comprendes.</p>
        
        <p>Gracias por ser mi destino.</p>
        
        <p class="firma">Mi cielo 💕</p>
    </div>
`;

document.body.appendChild(modalDestino);

btnDestino.addEventListener('click', function() {
    modalDestino.classList.add('show');
});

function cerrarDestino() {
    const modal = document.getElementById('modalDestino');
    modal.classList.remove('show');
}

// Cerrar modal al hacer click fuera de la card
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modalDestino');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});
