
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