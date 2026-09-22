let musica = null;
let reproduciendo = false;

function ingresar() {
    document.getElementById("intro").classList.add("intro--oculto");

    if (!musica) {
        musica = new Audio("assets/musica.mp3");
        musica.loop = true;
    }

    musica.play().then(() => {
        reproduciendo = true;
        document.getElementById("floatingBtn").style.display = "flex";
    }).catch(() => {
        document.getElementById("floatingBtn").style.display = "flex";
    });
}

function toggleMusica() {
    if (!musica) return;

    if (reproduciendo) {
        musica.pause();
        reproduciendo = false;
        document.getElementById("floatingBtn").innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>`;
    } else {
        musica.play();
        reproduciendo = true;
        document.getElementById("floatingBtn").innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
    }
}

function toggleCuenta() {
    const cuenta = document.getElementById("cuenta");
    cuenta.classList.toggle("regalos__cuenta--abierto");
}

function copiarAlias(btn) {
    const alias = "misxvmilagros.31.10p";
    navigator.clipboard.writeText(alias).then(() => {
        btn.textContent = "¡COPIADO!";
        setTimeout(() => {
            btn.textContent = "Copiar";
        }, 1500);
    });
}

function enviarWhatsApp(e) {
    e.preventDefault();

    const nombreInput = document.getElementById("nombreConfirmacion");
    const nombre = nombreInput.value.trim();
    const asistencia = document.querySelector('input[name="asistencia"]:checked');
    const mensaje = document.getElementById("mensaje").value.trim();
    const alimenticio = document.querySelector('input[name="alimenticioOption"]:checked');

    if (!nombre) {
        nombreInput.reportValidity();
        nombreInput.focus();
        return;
    }
    if (!asistencia) {
        alert("Por favor seleccioná si asistirás o no.");
        return;
    }

    let restriccionAlimenticia = 'N/A';
    if (alimenticio) {
        restriccionAlimenticia = alimenticio.value;
    }

    let texto = `Hola mi nombre es ${nombre},\nquiero confirmar que ${asistencia.value}\nRestricción alimenticia: ${restriccionAlimenticia}`;

    if (mensaje) {
        texto += `\nMensaje: ${mensaje}`;
    }

    const url = `https://wa.me/543816121741?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");

    document.getElementById("formConfirmacion").reset();

    document.querySelector(".confirmacion").scrollIntoView({ behavior: "smooth" });
}

const targetDate = new Date("October 31, 2026 22:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = String(days).padStart(2, "0");
    document.getElementById("horas").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutos").textContent = String(minutes).padStart(2, "0");
    document.getElementById("segundos").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// Fade up al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-up--visible");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("main section").forEach(s => {
    s.classList.add("fade-up");
    observer.observe(s);
});
// -----------------PLAYLIST----------------------

document.addEventListener('DOMContentLoaded', function () {
  const botonEnviar = document.getElementById('playlistbtn');
  const nombreInput = document.getElementById('nombrePlaylist');
  const cancionInput = document.getElementById('cancion');
  const linkInput = document.getElementById('link');
  const errorMensaje = document.getElementById('error-mensaje');
  const numeroWhatsapp = '543816972393';

  botonEnviar.addEventListener('click', function () {
    const nombre = nombreInput.value.trim();
    const cancion = cancionInput.value.trim();
    const link = linkInput.value.trim();

    if (!nombre || !cancion) {
      errorMensaje.textContent = "Por favor, completa tu nombre y el nombre de la canción.";
      return;
    } else {
      errorMensaje.textContent = "";
    }

    let mensaje = `Hola!, mi nombre es *${nombre}* quiero recomendar el siguiente tema:\n*${cancion}*`;

    if (link) {
      mensaje += `\nlink: ${link}`;
    }


    const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');

    // Opcional: Limpiar los campos después de enviar
    nombreInput.value = '';
    cancionInput.value = '';
    linkInput.value = '';
  });
});

