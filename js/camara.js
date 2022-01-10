var Width = document.querySelector("canvas").scrollWidth;
var Height = document.querySelector("canvas").scrollHeight;
var videz;
navigator.mediaDevices.getUserMedia({audio: false,video:{width:Width, height:Height}}).then((vid)=>{
    let video =document.querySelector("video");
    videz=vid;
    if("srcObject" in video){
        video.srcObject = vid;
        window.MediaStream
    }else{
        video.src= window.URL.createObjectURL(vid);
    }
}).catch((err)=>{
    alert("necesita dar permisos a la camara");
});


function foto(){
    var windowWidth = window.screen.width;


    let video= document.getElementById("video");
    const canva = document.querySelector("canvas");
    let contexto=canva.getContext("2d");

    contexto.drawImage(video,0,0,video.videoWidth+140,video.videoHeight+30);
    document.querySelector("video").style.display="none";
    document.querySelector("canvas").style.display="inline-block"; 
    document.getElementById("guardar").style.display="inline-block" 

    document.getElementById("guardar").addEventListener('click',save);
    document.getElementById("camara").addEventListener('click',refresh)
        
        
        videz.getTracks().forEach(function(track) {
            if (track.readyState == 'live' && track.kind === 'video') {
                track.stop();
            }
        });
        
 }


 function save(){
    let canva = document.querySelector("canvas");
    let crx = canva.getContext("2d");
    let data = canva.toDataURL();
    let formato = new FormData();

    formato.append("captura",data);

    $.ajax({
        url:"../php/savephp.php",
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

function refresh(){
    location.href = location.href;
}

function regresar(){
    location.href="../index.php";
  }