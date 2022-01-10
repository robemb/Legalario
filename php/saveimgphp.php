<?php
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH'])){
        $imagen = $_POST['imagen'];

        if(strlen($imagen)>0){
            $img_guardar = base64_decode(preg_replace('/^[^,]*,/','',$_POST['imagen']));
            $nombre = "imagen".uniqid().".png";
            $ruta = "C:/xampp/htdocs/legalario/imagen/".$nombre;

            file_put_contents($ruta,$img_guardar);


            $error=0;
            $mensaje ="imagen almacenada";
            $datos = $ruta;
            
        }else{
            $error=1;
            $mensaje ="no hay imagen";
            $datos = "";
        }

        $resp=[
            "error"=>$error,
            "mensaje"=>$mensaje,
            "datos"=>$datos

        ];
        echo json_encode($resp);
    }
?>