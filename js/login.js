
    let $overlay = $('#overlay')
    let $popup = $('#popup')
    let $h4costototal = $('#h4-costo-total-popup')

    $overlay.addClass('active')
    $popup.addClass('active')

    function login(){
      let $email = $('#email')
      let $password = $('#password')

      var loginCorrecto = true

      $email.removeClass('box-incorrecto-rojo')
      $password.removeClass('box-incorrecto-rojo')

      if( !$email.val() ){
        loginCorrecto = false
        $email.addClass('box-incorrecto-rojo')
      }
      if( !$password.val() ){
        loginCorrecto = false
        $password.addClass('box-incorrecto-rojo')
      }

      if( loginCorrecto ){
        console.log($email.val())
        console.log($password.val())
      }
    }
  