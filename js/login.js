
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
  
    $('#btn-cerrar-popup').on('click', function(){
  // cargar email y password de su html
  let email = $('#email').val()
  let password = $('#password').val()

  json_to_send = {
    "email": email,
    "password" : password
  };


  json_to_send = JSON.stringify(json_to_send)
  console.log(json_to_send)
  $.ajax({
    //url: 'http://localhost:3000/login',
    //url: 'https://tuapp.herokuapp.com/users/login',
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
})