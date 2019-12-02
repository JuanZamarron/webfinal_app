
    var token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
    }
    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    }
    
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    }
    /*var foopicker = new FooPicker({
      id: 'datepicker',
      dateFormat: 'dd/MM/yyyy'//,
      //disable: ['29/07/2017', '30/07/2017', '31/07/2017', '01/08/2017']
    });*/

    let $date = $('#datepick')
    let $timeInicio =  $('#timeInicio')
    let $timeTermino =  $('#timeTermino')
    let $nombreEvento = $('#nombreEvento')
    let $descrEvento = $('#descrEvento')
    let $radioTipo = $("input[name='tipo']:checked")

    eventoCorrecto = true;

    function getDatosEvento(){
        eventoCorrecto = true;

        $nombreEvento.removeClass('box-incorrecto-rojo')
        $descrEvento.removeClass('box-incorrecto-rojo')

        if( !$nombreEvento.val() ){
          eventoCorrecto = false 
          $nombreEvento.addClass('box-incorrecto-rojo')
        }
        if( !$descrEvento.val() ){
          eventoCorrecto = false 
          $descrEvento.addClass('box-incorrecto-rojo')
        }

        arrServicio = []

        for (var i = 1 ; i <= contServicios ; i++ ){
          idServicio = "servicio" + i
          idPrecio = "precio" + idServicio

          let $servicio =  $('#' + idServicio)
          let $precio =  $('#' + idPrecio)

          $servicio.removeClass('box-incorrecto-rojo')
          $precio.removeClass('box-incorrecto-rojo')

          if( !$servicio.val() ){
            eventoCorrecto = false 
            $servicio.addClass('box-incorrecto-rojo')
          }
          

          let regex=/^[0-9]+$/;

          if( !$precio.val() || !$precio.val().match(regex)  ){
            eventoCorrecto = false 
            $precio.addClass('box-incorrecto-rojo')
          }

          arrServicio.push({
            "service":$servicio.val(),
            "price":$precio.val(),
            "counter": 0
          })

        }

        if( eventoCorrecto ){
          let date = $('#datepick').val()
          let timeInicio =  $('#timeInicio').val()
          let timeTermino =  $('#timeTermino').val()
          let nombreEvento = $('#nombreEvento').val()
          let descrEvento = $('#descrEvento').val()
          let radioTipo = $("input[name='tipo']:checked").val()
          let cover = $('#coverEvento').val()
          let fiesta = false
          let conferencia = false
          let deportivo = false
          let otro = false
          let concierto = false
          switch(radioTipo){
            case "Fiesta":
              fiesta = true
              break;
            case "Conferencia":
              conferencia = true
              break;
            case "Deportivo":
              deportivo = true
              break;
            case "otro":
              otro = true
              break;
            case "Concierto":
              concierto = true
              break;
            
          }

          json_to_send = {
	          "nameE": nombreEvento,
	          "date": date,
	          "description": descrEvento,
	          "hourB": timeInicio,
	          "hourE": timeTermino,
	          "cover": cover,
	          "services": arrServicio,
	          "eventT": {
              "fiesta":fiesta,
              "conferencia":conferencia,
              "deportivo":deportivo,
              "otro":otro,
              "concierto": concierto
            },
            "assistant": 0,
            "status": true
          }
          console.log(json_to_send)
          json_to_send = JSON.stringify(json_to_send)
          console.log(json_to_send)
          $.ajax({
            url: 'https://webfinal-api.herokuapp.com/createEvent',
            headers: {
              'Content-Type':'application/json',
              'Authorization': 'Bearer ' + token
            },
            method: 'POST',
            dataType: 'json',
            data: json_to_send,
            success: function(data){
              alert("Evento creado exitosamente")
            },
            error: function(error_msg){
              alert((error_msg["responseText"]))
            }
          })
          console.log(arrServicio)
        }
        else{
          console.log("Servicio Incorrecto")
        }
        


    }

    var contServicios = 1;

    function agregaServicio(){
        contServicios = contServicios + 1;

        idServicio = "servicio" + contServicios
        idPrecio = "precio" + idServicio
        idBr = "br" + idServicio
        idClose = "btnClose" + idServicio
        idCloseLast = "btnClose" + "servicio" + (contServicios - 1)

        let $servicio =  $('#' + idServicio)
        let $precio =  $('#' + idPrecio)
        let $br = $('#' + idBr )
        let $close = $('#' + idClose)
        let $closeLast = $('#' + idCloseLast)

        $servicio.removeClass('hidden')
        $precio.removeClass('hidden')
        $br.removeClass('hidden')
        $close.removeClass('hidden')
        $closeLast.addClass('hidden')

        if( contServicios == 5){
            let $agregaServicio = $("#agregaServicio")
            $agregaServicio.addClass('hidden') 
        }
    }

    function cerrarServicios(){
      //console.log(contServicios)
      idServicio = "servicio" + contServicios
      idPrecio = "precio" + idServicio
      idBr = "br" + idServicio
      idClose = "btnClose" + idServicio
      idCloseLast = "btnClose" + "servicio" + (contServicios - 1)
    
      let $servicio =  $('#' + idServicio)
      let $precio =  $('#' + idPrecio)
      let $br = $('#' + idBr )
      let $close = $('#' + idClose)
      let $closeLast = $('#' + idCloseLast)

      $servicio.addClass('hidden')
      $precio.addClass('hidden')
      $br.addClass('hidden')
      $close.addClass('hidden')
      $closeLast.removeClass('hidden')

      contServicios = contServicios - 1;

      if( contServicios <= 0){
        contServicios = 0
      }
      if( contServicios < 5  ){
        let $agregaServicio = $("#agregaServicio")
        $agregaServicio.removeClass('hidden') 
      }
    
    }

  function datosEvento(){
    let $updateNombreEvento =  $('#updateNombreEvento')

    $updateNombreEvento.val("simon")


  }
