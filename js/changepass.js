
    var token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
    }
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
        let password = $('#password').val()
        json_to_send = {
          "password": password
        }
        json_to_send = JSON.stringify(json_to_send)
        console.log(json_to_send)
        $.ajax({
          url: 'https://webfinal-api.herokuapp.com//user/edit',
          headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
          },
          method: 'PATCH',
          dataType: 'json',
          data: json_to_send,
          success: function(){
            alert("Se cambio la contraseña")
          },
          error: function(error_msg){
            alert((error_msg["responseText"]))
          }
        })
      }
      else{
        console.log("nel perro")
      }

    }



