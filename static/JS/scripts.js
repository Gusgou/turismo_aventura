document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('agregar').addEventListener('click', mostrarFormularioAgregar);
    document.getElementById('modificar').addEventListener('click', mostrarFormularioModificar);
    document.getElementById('eliminar').addEventListener('click', mostrarFormularioEliminar);
    document.getElementById('consultar').addEventListener('click', mostrarFormularioConsultar);
});

function mostrarFormularioAgregar() {
    document.getElementById('contenido').innerHTML = `
        <h2>Agregar Solicitud</h2>
        <form id="formAgregar">
            <label for="destino">Destino:</label>
            <input type="text" id="destino" name="destino" required><br>
            <label for="actividad">Actividad:</label>
            <input type="text" id="actividad" name="actividad" required><br>
            <label for="personas">Cantidad de Personas:</label>
            <input type="number" id="personas" name="personas" required><br>
            <input type="submit" value="Agregar">
        </form>
    `;

    document.getElementById('formAgregar').addEventListener('submit', function(e) {
        e.preventDefault();
        const destino = document.getElementById('destino').value;
        const actividad = document.getElementById('actividad').value;
        const personas = document.getElementById('personas').value;

        fetch('/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ destino, actividad, personas }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.message);
        });
    });
}

function mostrarFormularioModificar() {
    document.getElementById('contenido').innerHTML = `
        <h2>Modificar Solicitud</h2>
        <form id="formModificar">
            <label for="id">ID de Solicitud:</label>
            <input type="text" id="id" name="id" required><br>
            <label for="destino">Nuevo Destino:</label>
            <input type="text" id="destino" name="destino"><br>
            <label for="actividad">Nueva Actividad:</label>
            <input type="text" id="actividad" name="actividad"><br>
            <label for="personas">Nueva Cantidad de Personas:</label>
            <input type="number" id="personas" name="personas"><br>
            <input type="submit" value="Modificar">
        </form>
    `;

    document.getElementById('formModificar').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('id').value;
        const destino = document.getElementById('destino').value;
        const actividad = document.getElementById('actividad').value;
        const personas = document.getElementById('personas').value;

        fetch('/modificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, destino, actividad, personas }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.message);
        });
    });
}

function mostrarFormularioEliminar() {
    document.getElementById('contenido').innerHTML = `
        <h2>Eliminar Solicitud</h2>
        <form id="formEliminar">
            <label for="id">ID de Solicitud:</label>
            <input type="text" id="id" name="id" required><br>
            <input type="submit" value="Eliminar">
        </form>
    `;

    document.getElementById('formEliminar').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('id').value;

        fetch('/eliminar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.message);
        });
    });
}

function mostrarFormularioConsultar() {
    document.getElementById('contenido').innerHTML = `
        <h2>Consultar Solicitudes</h2>
        <div id="resultados"></div>
    `;

    consultarSolicitudes();
}

function consultarSolicitudes() {
    fetch('/consultar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        data.resultados.forEach(item => {
            const p = document.createElement('p');
            p.textContent = `ID: ${item.id}, Destino: ${item.destino}, Actividad: ${item.actividad}, Personas: ${item.personas}`;
            resultadosDiv.appendChild(p);
        });

        const solicitarButton = document.createElement('button');
        solicitarButton.textContent = 'Solicitar';
        solicitarButton.addEventListener('click', function() {
            alert('Gracias por tu consulta. En breve, te enviaremos la mejor cotización disponible');
        });
        resultadosDiv.appendChild(solicitarButton);
    });
}
