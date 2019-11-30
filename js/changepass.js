
    let $overlay = $('#overlay')
    let $popup = $('#popup')
    let $h4costototal = $('#h4-costo-total-popup')

    $overlay.addClass('active')
    $popup.addClass('active')

    
    function changePass(){
      let $password = $('#password')
      let $confpassword = $('#confirm_password')
      let $match_password = $('#match_password')

      $match_password.addClass('hidden')

      var changeCorrecto = true

      $password.removeClass('box-incorrecto-rojo')
      $confpassword.removeClass('box-incorrecto-rojo')

      if( !$password.val() ){
        changeCorrecto = false
        $password.addClass('box-incorrecto-rojo')
      }
      if( !$confpassword.val() ){
        changeCorrecto = false
        $confpassword.addClass('box-incorrecto-rojo')
      }
      if( $password.val() != $confpassword.val() ){
          changeCorrecto = false
          $confpassword.addClass('box-incorrecto-rojo')
          $password.addClass('box-incorrecto-rojo')
          $match_password.removeClass('hidden')
      }

      if( changeCorrecto ){
        console.log($password.val())
        console.log($confpassword.val())
      }
      else{
        console.log("nel perro")
      }

    }



