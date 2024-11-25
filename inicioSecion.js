const botonIncio = document.getElementById('botonInicio');

const usuarioAutorizado = "usuario";
const passwordAutorizada = '1234';

botonIncio.addEventListener('click', ()=>{
    Swal.fire({
        title: "Inicio de sesion",
        html: `
            <input type="text" id="usuario" id="swal2-input" placeholder="usuario">
            <input type="text" id="contraseña" id="swal2-input" placeholder="contraseña">
        `,
        confirmButtonText:"enviar",
        cancelButtonText:"cancelar"
    }).then((result)=>{
        if(result.isConfirmed){
            const usuario1 = document.getElementById('usuario').value;
            const clave = document.getElementById('contraseña').value; 

            if(usuario1 === usuarioAutorizado && clave === passwordAutorizada){
                window.location.href= "/primerVentaja.html"
            }else{
                alert("clave incorrecta")
            }
        }
    })

})