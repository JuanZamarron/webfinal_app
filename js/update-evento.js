var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var id_event = localStorage.getItem('id_event_update');

console.log(id_event)

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }
      var foopicker = new FooPicker({
        id: 'datepicker',
        dateFormat: 'dd/MM/yyyy'//,
        //disable: ['29/07/2017', '30/07/2017', '31/07/2017', '01/08/2017']
      });



  
  
      let $timeInicio =  $('#timeInicio')
      let $timeTermino =  $('#timeTermino')
      let $nombreEvento = $('#nombreEvento')
      let $descrEvento = $('#descrEvento')
      let $radioTipo = $("input[name='tipo']:checked")
  
      eventoCorrecto = true;
  
      function getDatosEvento(){
          eventoCorrecto = true;
          //console.log(foopicker.getMonthNumber())
  
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
              "servicio":$servicio.val(),
              "precio":$precio.val()
            })
  
          }
  
          if( eventoCorrecto ){
            console.log(arrServicio)
          }
          else{
            console.log("Servicio Incorrecto")
          }
          
  
          console.log()
      }
  
  
    function loadRegistros() {
    $.ajax({
      //url: 'http://localhost:3000/todos',
      // url: 'https://tuapp.herokuapp.com/todos',
      url: 'https://webfinal-api.herokuapp.com/getEventId/' + id_event,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
        //console.log(data)
  
        nameEvent = data.nameE
          hourE = data.hourE
          hourB = data.hourB
          date = data.date
          console.log(nameEvent)
          console.log(hourB)
          console.log(hourE)
          console.log(date)

          date = date.substring(0,10)
          console.log(date)

          $('#updateNombreEvento').val(nameEvent)
          $('#updateDatepicker').val(date)
          $('#updateTimeInicio').val(hourB)
          $('#updateTimeTermino').val(hourE)       
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

  loadRegistros()



  function actualizarEvento(){

    nameEvent = $('#updateNombreEvento').val()
    hourE =  $('#updateTimeTermino').val() 
    hourB =  $('#updateTimeInicio').val()
    date = $('#updateDatepicker').val()
    console.log(nameEvent)
    console.log(hourB)
    console.log(hourE)
    console.log(date)

    json_to_send = {
      "nameE": nameEvent,
      "hourE": hourE,
      "hourB": hourB,
      "date":date
    }

    console.log(json_to_send)
    json_to_send = JSON.stringify(json_to_send)
    console.log(json_to_send)

    $.ajax({
      url: 'https://webfinal-api.herokuapp.com/event/editCreatedBy/'+ id_event,
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        alert("Update evento exitoso")
        window.location = './ver_eventos_organizador.html'
      },
      error: function(error_msg){
        alert((error_msg["responseText"]))
      }
    })


    
  }