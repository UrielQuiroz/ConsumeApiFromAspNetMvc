


window.onload = function ()
{
    listarDoctor();
    previewImage();
    listarClinica();
    listarEspecialidad();
}



function previewImage()
{
    var fupFoto = document.getElementById("fupFoto");
    fupFoto.onchange = function ()
    {
        //Foto elegida
        var foto = fupFoto.files[0];
        nombreArchivo = foto.name;

        //FileReader Leer la foto
        var file = new FileReader();
        file.onloadend = function ()
        {
            document.getElementById("imgFoto").src = file.result;
        }

        file.readAsDataURL(foto);
    }
}


function listarClinica()
{
    fetch("http://192.168.100.221:8081/Api/Clinica")
        .then(res => res.json())
        .then(res => {
            llenarComboClinica(res);
        })
}


function llenarComboClinica(res)
{
    var contenido = "<option value=''>---SELECCIONE---</option>";

    for (var i = 0; i < res.length; i++) {
        contenido += "<option value='" + res[i].IdClinica + "'>" + res[i].Nombre +"</option>";
    }

    document.getElementById("cboClinica").innerHTML = contenido;
}



function listarEspecialidad() {
    fetch("http://192.168.100.221:8081/Api/Especialidad")
        .then(res => res.json())
        .then(res => {
            lenarComboEspecialidad(res);
        })
}

function lenarComboEspecialidad(res)
{
    var contenido = "<option value=''>---SELECCIONE---</option>";

    for (var i = 0; i < res.length; i++) {
        contenido += "<option value='" + res[i].IdEspecialidad + "'>" + res[i].Nombre + "</option>";
    }

    document.getElementById("cboEspecialidad").innerHTML = contenido;
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
                        contenido += "<button onclick='Eliminar(" + res[i].IdDoctor +")' class='btn btn-danger ml-2'>Eliminar</button>";
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
        fetch("http://192.168.100.221:8081/Api/Doctor/?idDoctor=" + id)
            .then(res => res.json())
            .then(res =>
            {
                //document.getElementById("txtIdDoctor").value = res.IdDoctor;
                document.getElementById("txtNombre").value = res.Nombre;
                document.getElementById("txtApPaterno").value = res.ApPaterno;
                document.getElementById("txtApMaterno").value = res.ApMaterno;
                document.getElementById("cboClinica").value = res.IdClinica;
                document.getElementById("cboEspecialidad").value = res.IdEspecialidad;
                document.getElementById("txtEmail").value = res.Email;
                document.getElementById("txtTelefonoCelular").value = res.celular;

                //RadioButton
                var rbSexoMasculino = document.getElementById("rbSexoMasculino");
                var rbSexoFemenino = document.getElementById("rbSexoFemenino");

                if (res.Sexo == 1) {
                    rbSexoMasculino.checked = true;
                } else {
                    rbSexoFemenino.checked = true;
                }

                document.getElementById("txtSueldo").value = res.Sueldo;
                document.getElementById("txtFechaContrato").value = res.FechaContrato.substr(0, 10);
                document.getElementById("imgFoto").src = res.Archivo;
                nombreArchivo = res.nombre;
            })
    }
}


function Eliminar(id)
{
    if (confirm("Desea eliminar realmente?") == 1) {
        fetch("http://192.168.100.221:8081/Api/Doctor?idDoctor=" + id, {
            method: "PUT"
        }).then(res => res.json())
            .then(res =>
            {
                if (res ==1) {
                    alert("Se elimino correctamente");
                    listarDoctor();
                }
                else {
                    alert("Ocurrio un error");
                }
            })
    }
}



var nombreArchivo;
function Guardar()
{
    if (confirm("Desea guardar?") == 1) {

        var idDoc = document.getElementById("txtIdDoctor").value;

        if (idDoc == "") {
            idDoc = 0;
        }

        var nombre = document.getElementById("txtNombre").value;
        var ApPaterno = document.getElementById("txtApPaterno").value;
        var ApMaterno = document.getElementById("txtApMaterno").value;
        var clinica = document.getElementById("cboClinica").value;
        var especialidad = document.getElementById("cboEspecialidad").value;
        var email = document.getElementById("txtEmail").value;
        var celular = document.getElementById("txtTelefonoCelular").value;
        var sueldo =document.getElementById("txtSueldo").value;
        var fechaContrato = document.getElementById("txtFechaContrato").value;
        var foto = document.getElementById("imgFoto").src;

        var cboSexo;
        if (document.getElementById("rbSexoMasculino").checked == 1)
        {
            cboSexo = 1;
        }
        else
        {
            cboSexo = 2;
        }

        //if (foto != null) {
        //    nombreArchivo = document.getElementById("fupFoto").files[0].name;
        //}

        fetch("http://192.168.100.221:8081/Api/Doctor", {
            headers: {
                'Content-Type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify({

                "IIDDOCTOR": idDoc,
                "NOMBRE": nombre,
                "APPATERNO": ApPaterno,
                "APMATERNO": ApMaterno,
                "IIDCLINICA": clinica,
                "IIDESPECIALIDAD": especialidad,
                "EMAIL": email,
                "TELEFONOCELULAR": celular,
                "IIDSEXO": cboSexo,
                "SUELDO": sueldo,
                "FECHACONTRATO": fechaContrato,
                "NOMBREARCHIVO": nombreArchivo,
                "ARCHIVO": foto,
                "BHABILITADO": 1
            })
        }).then(res => res.json())
            .then(res =>
            {
                if (res == 1) {
                    alert("Se ejecuto correctamente!");
                    listarDoctor();
                    document.getElementById("btnClose").click();
                }
                else {
                    alert("Ocurrio un error!");
                }
            })
    }
}