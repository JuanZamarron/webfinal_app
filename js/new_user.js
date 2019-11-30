
    let $overlay = $('#overlay')
    let $popup = $('#popup')
    let $h4costototal = $('#h4-costo-total-popup')

    $overlay.addClass('active')
    $popup.addClass('active')

    function login(){
      let $email = $('#email')
      let $name = $('#name')
      let $password = $('#password')
      let $confpassword = $('#confirm_password')
      let $phone = $('#phone')
      let $match_password = $('#match_password')

      $match_password.addClass('hidden')

      var loginCorrecto = true

      $email.removeClass('box-incorrecto-rojo')
      $password.removeClass('box-incorrecto-rojo')
      $confpassword.removeClass('box-incorrecto-rojo')
      $phone.removeClass('box-incorrecto-rojo')
      $name.removeClass('box-incorrecto-rojo')

      if( !$email.val() ){
        loginCorrecto = false
        $email.addClass('box-incorrecto-rojo')
      }
      if( !$password.val() ){
        loginCorrecto = false
        $password.addClass('box-incorrecto-rojo')
      }
      if( !$confpassword.val() ){
        loginCorrecto = false
        $confpassword.addClass('box-incorrecto-rojo')
      }
      if( !$phone.val() ){
        loginCorrecto = false
        $phone.addClass('box-incorrecto-rojo')
      }
      if( !$name.val() ){
        loginCorrecto = false
        $name.addClass('box-incorrecto-rojo')
      }
      if( $password.val() != $confpassword.val() ){
          loginCorrecto = false
          $confpassword.addClass('box-incorrecto-rojo')
          $password.addClass('box-incorrecto-rojo')
          $match_password.removeClass('hidden')
      }

      if( loginCorrecto ){
        console.log($email.val())
        console.log($password.val())
        console.log($confpassword.val())
        console.log($name.val())
        console.log($phone.val())
      }

    }



  