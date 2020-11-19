


window.onload = function ()
{
    listarDoctor();
    previewImage();
}



function previewImage()
{
    var fupFoto = document.getElementById("fupFoto");
    fupFoto.onchange = function ()
    {
        //Foto elegida
        var foto = fupFoto.files[0];

        //FileReader Leer la foto
        var file = new FileReader();
        file.onloadend = function ()
        {
            document.getElementById("imgFoto").src = file.result;
        }

        file.readAsDataURL(foto);
    }
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
                contenido += "<td width='17%'>Acciones</td>";
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
                        contenido += "<button onclick='AbrirModal(" + res[i].IdDoctor +")' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>Editar</button>";
                        contenido += "<button class='btn btn-danger ml-2' data-toggle='modal' data-target='#exampleModal'>Eliminar</button>";
                    contenido += "</td>";

                    contenido += "</tr>";
            }

        contenido += "</tbody>";
    contenido += "</table>";


    document.getElementById("tabla").innerHTML = contenido;

}


function Limpiar()
{
    var limpiar = document.getElementsByClassName("limpiar");
    var nLimpiar = limpiar.length;

    for (var i = 0; i < nLimpiar; i++)
    {
        limpiar[i].value = "";
    }

}



function AbrirModal(id)
{
    Limpiar();
    if (id == 0)
    {
        document.getElementById("lblTitulo").innerHTML = "Agregar Doctor";
    }
    else
    {
        document.getElementById("lblTitulo").innerHTML = "Editar Doctor";
    }
}