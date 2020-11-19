


window.onload = function ()
{
    listarDoctor();
}



function listarDoctor()
{
    fetch("http://192.168.100.221:8081/Api/Doctor")
        .then(res => res.json())
        .then(res =>
        {
            crearListado(res);
        })
}


function crearListado(res) {

    var contenido = "";


    contenido += "<table class='table table-bordered table-hover'>";
        contenido += "<thead class='bg-primary text-white font-weight-bold'>";

            contenido += "<tr>";
                contenido += "<td>ID</td>";
                contenido += "<td>Nombre</td>";
                contenido += "<td>Clinica</td>";
                contenido += "<td>Especialidad</td>";
                contenido += "<td>E-mail</td>";
                contenido += "<td>Acciones</td>";
            contenido += "</tr>";
            
        contenido += "</thead>";

        contenido += "<tbody>";

            for (var i = 0; i < res.length; i++) {
                contenido += "<tr>";
                    contenido += "<td>" + res[i].IdDoctor+"</td>";
                    contenido += "<td>" + res[i].NombreCompleto +"</td>";
                    contenido += "<td>" + res[i].NombreClinica+"</td>";
                    contenido += "<td>" + res[i].NombreEspecialidad+"</td>";
                    contenido += "<td>" + res[i].Email + "</td>";

                    contenido += "<td>";
                        contenido += "<button class='btn btn-primary'>Editar</button>";
                        contenido += "<button class='btn btn-danger'>Eliminar</button>";
                    contenido += "</td>";

                    contenido += "</tr>";
            }

        contenido += "</tbody>";
    contenido += "</table>";


    document.getElementById("tabla").innerHTML = contenido;

}