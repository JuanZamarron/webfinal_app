
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
      $('#confirmacionUsuarioCreado1').addClass('hidden')
      $('#confirmacionUsuarioCreado2').addClass('hidden')

      $match_password.addClass('hidden')

      var loginCorrecto = true

      $email.removeClass('box-incorrecto-rojo')
      $password.removeClass('box-incorrecto-rojo')
      $confpassword.removeClass('box-incorrecto-rojo')
      $phone.removeClass('box-incorrecto-rojo')
      $name.removeClass('box-incorrecto-rojo')
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
        let email = $('#email').val()
        let name = $('#name').val()
        let phone = $('#phone').val()
        let password = $('#password').val()
        json_to_send = {
          "name": name,
          "phone": phone,
          "email": email,
          "password": password 
        };
        json_to_send = JSON.stringify(json_to_send);
        console.log(json_to_send)
        $.ajax({
          url: 'https://webfinal-api.herokuapp.com/createUser',
          headers:{
            'Content-Type':'application/json'
          },
          method: 'POST',
          dataType: 'json',
          data: json_to_send,
          success: function(data){
            $.ajax({
              url: 'https://webfinal-api.herokuapp.com/login',
              headers: {
                  'Content-Type':'application/json'
              },
              method: 'POST',
              dataType: 'json',
              data: json_to_send,
              success: function(data){
                // guardar token en localstorage o cookie
                localStorage.setItem('token', data.token)
                window.location = './index.html'
                console.log(data.token)
              },
              error: function(error_msg) {
                alert((error_msg["responseText"]))
              }
            })
          },
          error: function(error_msg){
            alert((error_msg["responseText"]))
          }
        })

      }

    }



  