document.getElementById('btn-nivel1').addEventListener('click', function() {
    const nombre = prompt('Por favor, ingresa tu nombre completo para el certificado:');
    if (nombre && nombre.trim() !== '') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text('Certificado de Bartender Profesional - Nivel 1', 20, 40);
        doc.setFontSize(16);
        doc.text(`Otorgado a: ${nombre}`, 20, 60);
        doc.text('¡Felicidades por completar el nivel!', 20, 80);
        doc.save('certificado_nivel1.pdf');
    }
});

function exportarCertificadoPDF() {
    const original = document.getElementById('certificate');
    const clone = original.cloneNode(true);
    clone.id = 'certificate-temp';
    clone.style.position = 'fixed';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.width = '100vw';
    clone.style.height = '100vh';
    clone.style.display = 'flex';
    clone.style.justifyContent = 'center';
    clone.style.alignItems = 'center';
    clone.style.background = '#fff';
    clone.style.zIndex = '9999';
    clone.style.margin = '0';
    clone.style.padding = '0';
    clone.style.visibility = 'visible';
    document.body.appendChild(clone);

    // Forzar el certificado a estar centrado y ocupar todo el espacio
    const cert = clone.querySelector('.certificate');
    cert.style.margin = '0';
    cert.style.position = 'relative';
    cert.style.left = '0';
    cert.style.top = '0';
    cert.style.transform = 'none';

    const opt = {
        margin: 0,
        filename: `certificado_${window._nombreCertificado || 'usuario'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1, useCORS: true },
        jsPDF: { unit: 'px', format: [1123, 794], orientation: 'landscape' }
    };

    html2pdf().set(opt).from(cert).save().then(() => {
        document.body.removeChild(clone);
    });
}

function generatePDF(tipo) {
    const studentData = loadStudentData(window._nombreCertificado);
    document.getElementById('nombre-estudiante').textContent = studentData.nombre;
    document.getElementById('curso-titulo').textContent = "Bartendering Mastery: De aprendiz a mixólogo";
    switch(tipo) {
        case 'bartender':
            document.getElementById('tipo-curso').textContent = "bartender profesional - Nivel I";
            document.getElementById('horas-curso').textContent = "80";
            break;
        case 'internacional':
            document.getElementById('tipo-curso').textContent = "bartender internacional - Nivel II";
            document.getElementById('horas-curso').textContent = "120";
            break;
        case 'mixologo':
            document.getElementById('tipo-curso').textContent = "mixólogo profesional - Nivel III";
            document.getElementById('horas-curso').textContent = "100";
            break;
    }
    exportarCertificadoPDF();
}
