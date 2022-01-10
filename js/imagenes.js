function validarExten() {
    var archivo = document.getElementById("archivo");
    var ruta = archivo.value;
    var formatoValido = ruta.match(/(.png|.jpg)$/i);
    if (!formatoValido) {
      alert('Formato no valido');
      archivo.value = "";
      return false;
    } else {
      if (archivo.files && archivo.files[0]) {
        var visor = new FileReader();
        visor.onload = (e) => {
          document.getElementById('visor').innerHTML = `<img id="img" src="${e.target.result}" class="container">`;
        }
        visor.readAsDataURL(archivo.files[0]);
      
    }
        document.getElementById("archivo").style.display="none" 
        document.getElementById("camara").style.display="inline-block" 
        document.getElementById("guardar").style.display="inline-block" 
        document.getElementById("guardar").addEventListener('click',save);
        document.getElementById("camara").addEventListener('click',refresh);
    }
  }


  function refresh(){
    location.href = location.href;
}

function save(){
    let canva = document.getElementById("img");
    let data = canva.src;
    let formato = new FormData();

    formato.append("imagen",data);

    $.ajax({
        url:"../php/saveimgphp.php",
        type: "POST",
        data: formato,
        cache: false,
        contentType: false,
        processData: false,
        success: function (resp){
            let men = JSON.parse(resp);
            if(men.error == 0){
                alert(men.mensaje);
                location.href="../index.php";
            }else{
                alert(men.mensaje);
                location.href = location.href;
            }
        }
    })
}

function regresar(){
  location.href="../index.php";
}