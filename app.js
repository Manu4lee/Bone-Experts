// --- LÓGICA DEL CARRUSEL INFINITO REPARADA ---
const track = document.querySelector('.carousel-track');

if (track) {
    
    const cards = Array.from(track.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let x = 0;
    function animate() {
        x -= 0.8; // Velocidad del carrusel
        
        if (Math.abs(x) >= track.scrollWidth / 2) {
            x = 0;
        }
        track.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(animate);
    }
    animate();
}

function showSpec(tipo, event) {
    const contents = document.querySelectorAll('.spec-content');
    const buttons = document.querySelectorAll('.spec-card');

    // Ocultar todos
    contents.forEach(c => c.classList.remove('active'));

    // Quitar activo de botones
    buttons.forEach(b => b.classList.remove('active'));

    // Mostrar seleccionado
    const selected = document.getElementById(tipo);
    if (selected) {
        selected.classList.add('active');
    }

    // Activar botón presionado
    event.target.classList.add('active');
}

// --- VALIDACIÓN DE FORMULARIO DE CITAS ---
const bookingForm = document.querySelector('.booking-card form');
if(bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
       
        console.log("Datos enviados correctamente mediante POST");
        alert("Cita agendada. Revisaremos la disponibilidad.");
    });
}

// --- EFECTO AL HACER SCROLL (UX/UI) ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card, .doctor-card, .sede-item').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});

// --- js api google sheets ---
const formMedico = document.getElementById("form-medico");

if (formMedico) {
  formMedico.addEventListener("submit", async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    params.append("nombre", document.getElementById("nombre").value);
    params.append("apellidos", document.getElementById("apellidos").value);
    params.append("edad", document.getElementById("edad").value);
    params.append("fechaNacimiento", document.getElementById("fechaNacimiento").value);
    params.append("genero", document.getElementById("genero").value);
    params.append("estadoCivil", document.getElementById("estadoCivil").value);
    params.append("ocupacion", document.getElementById("ocupacion").value);
    params.append("telefono", document.getElementById("telefono").value);
    params.append("direccion", document.getElementById("direccion").value);
    params.append("contactoEmergencia", document.getElementById("contactoEmergencia").value);
    params.append("antecedentes", document.getElementById("antecedentes").value);
    params.append("especialidad", document.getElementById("especialidad").value);
    params.append("fechaCita", document.getElementById("fechaCita").value);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxDeju2fQqI-6zkxqEBjI6CgO_9loJdmWkibrqQAMtHzcK0hoXTvZMtkhyCIa7EWdG7/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      });

      const text = await response.text();
      console.log("RESPUESTA:", text);

      if (text.includes("success")) {
        alert("Expediente clínico guardado correctamente");
        formMedico.reset();
      } else {
        throw new Error(text);
      }

    } catch (error) {
      console.error("ERROR:", error);
      alert("Error al guardar el expediente: " + error.message);
    }
  });
}

// ===== MODAL DOCTORES  =====
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("doctorModal");
    const closeBtn = document.querySelector(".close-btn");

    const modalNombre = document.getElementById("modalNombre");
    const modalEspecialidad = document.getElementById("modalEspecialidad");
    const modalDescripcion = document.getElementById("modalDescripcion");

    const cards = document.querySelectorAll(".doctor-card");

    console.log("Cards encontradas:", cards.length); // DEBUG

    cards.forEach(card => {
        card.addEventListener("click", () => {
            console.log("CLICK detectado"); // DEBUG

            const nombre = card.querySelector("h3").innerText;
            const especialidad = card.querySelector(".specialty-tag").innerText;
            const descripcion = card.querySelector(".doc-cv p").innerText;

            modalNombre.innerText = nombre;
            modalEspecialidad.innerText = especialidad;
            modalDescripcion.innerText = descripcion;

            modal.style.display = "block";
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

});