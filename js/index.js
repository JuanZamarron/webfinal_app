//subir los datos

var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

console.log(token)

function loadEventos() {
  $.ajax({
    //url: 'http://localhost:3000/todos',
    // url: 'https://tuapp.herokuapp.com/todos',
    url: 'https://webfinal-api.herokuapp.com/getAllEvents',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      //let $listaeventos = $('#listaeventos')

      //$list.empty();
      for( let i = 0; i < data.length; i++) {

        // aqui va su código para agregar los elementos de la lista
        
        
        console.log(data[i].description)
        console.log(data[i].date)
        
        //console.log(data[i].description)


        //var algo = '<li><input type="checkbox" name="todo" value="' + i + '"><span>' + data[i].description + '</span></li>'

        //$list.append($(algo))
        
                
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo
        //dataCont = i
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadEventos()




    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    }
    
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    }

    //box de registro para registrase a un evento
    $('#registro-evento-1').on('click',function(event){
      let $evento = $('#evento1')
      let $boxregistro = $('#box-registro-1')

      if( $evento.hasClass('evento') ){
        $evento.removeClass('evento')
        $evento.addClass('evento-registro')
        $boxregistro.removeClass('hidden')
        let $costototal = $("#textocostototalevento1")
        auxCostoTotal = $costototal.text()
        let $costototalboletos = $('#costototalboletosevento1')
        $costototalboletos.text(auxCostoTotal)
      }
      else{
        $evento.removeClass('evento-registro')
        $evento.addClass('evento')
        $boxregistro.addClass('hidden')
      }
    })

    //subir y bajar numero de boletos
    function subirBoletos(thi){
      let $numeroBoletos = $('#numerodeboletosevento1')
      let $costototalboletos = $('#costototalboletosevento1')
      let $costototal = $("#textocostototalevento1")

      auxCostoTotal = $costototal.text()
      auxNumeroBoletos = $numeroBoletos.text()
      auxNumeroBoletos = Number(auxNumeroBoletos) + 1
      $numeroBoletos.text(auxNumeroBoletos)
      $costototalboletos.text( Number(auxCostoTotal) * auxNumeroBoletos )
    }
    
    function bajarBoletos(thi){
      let $numeroBoletos = $('#numerodeboletosevento1')
      let $costototalboletos = $('#costototalboletosevento1')
      let $costototal = $("#textocostototalevento1")
      
      auxCostoTotal = $costototal.text()
      auxNumeroBoletos = $numeroBoletos.text()
      if(Number(auxNumeroBoletos) > 1){
        auxNumeroBoletos = Number(auxNumeroBoletos) - 1
        $numeroBoletos.text(auxNumeroBoletos)
        $costototalboletos.text( Number(auxCostoTotal) * auxNumeroBoletos )
      }     
    }

    // Funcion de seleccion de servicios para un evento
    function seleccionDeServicios(thi) {
      id = thi.id

      let $servicio = $('#' + id)
      let $costototal = $("#textocostototalevento1")
      let $costototalboletos = $('#costototalboletosevento1')
      let $numeroboletos = $('#numerodeboletosevento1')
        

      auxCostoTotal = $costototal.text()
      auxCostoServicio = $servicio.data("costo")

      if( $servicio.hasClass('redondo-servicio-not-selected') ){
        $servicio.removeClass('redondo-servicio-not-selected')
        $servicio.addClass('redondo-servicio-selected')

        auxCostoTotal = Number(auxCostoTotal) + Number(auxCostoServicio)

        $costototal.text(auxCostoTotal)
        $costototalboletos.text( Number(auxCostoTotal) * Number($numeroboletos.text()))
      }
      else{
        $servicio.removeClass('redondo-servicio-selected')
        $servicio.addClass('redondo-servicio-not-selected')

        auxCostoTotal = Number(auxCostoTotal) - Number(auxCostoServicio)

        $costototal.text(auxCostoTotal)
        $costototalboletos.text( Number(auxCostoTotal) * Number($numeroboletos.text()))
      }
    }
    
    function abrirConfirmacionDeCompra(thi){
      id = thi.id

      let $btnAbrirPopup = $('#' + id)
      let $overlay = $('#overlay')
      let $popup = $('#popup')
      let $h4costototal = $('#h4-costo-total-popup')
      let $costototalevento = $('#costototalboletosevento1')

      $overlay.addClass('active')
      $popup.addClass('active')
      $h4costototal.text( "Costo Total: " +  $costototalevento.text() )

    }

    function confirmarCompra(thi){
      id = thi.id

      let $btnCerrarPopup = $('#btn-cerrar-popup')
      let $overlay = $('#overlay')
      let $popup = $('#popup')

      $overlay.removeClass('active')
      $popup.removeClass('active')     

    }

    function logout(){
      console.log("aio popo")
    }