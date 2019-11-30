
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }
  
      let $updateNombreEvento =  $('#updateNombreEvento')


      var nombre = "prueba"


      
  function datosEvento(){

    nombre = $('#nombreEvento1').val()

    console.log($('#nombreEvento1').text())

    console.log(nombre)
  }

  function getDatosEvento2(){
    console.log($(nombre).text())
  }

  function cambiaStatus(){
      let $overlay = $('#overlay')
      let $popup = $('#popup')

      $overlay.addClass('active')
      $popup.addClass('active')
  }

  let $btnCerrarPopup = $('#btn-cerrar-popup')
    let $overlay = $('#overlay')
    let $popup = $('#popup')

  function cerrarConfirmacion(){    

    $overlay.removeClass('active')
    $popup.removeClass('active')     

  }

  function cambiarEstatus(){
    console.log("cambiar status")
    

    $overlay.removeClass('active')
    $popup.removeClass('active')     
  }