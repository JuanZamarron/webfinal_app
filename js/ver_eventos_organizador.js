var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
    
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }
  
      let $updateNombreEvento =  $('#updateNombreEvento')


      var nombre = "prueba"


      
  function datosEvento(thi){
    id = thi.id

    n = id.search("-")
    idEvento = id.substring(0,n)
    console.log(idEvento)
    let $idEvento = $('#' + idEvento)

    id_evento = $idEvento.data("id")

    localStorage.setItem('id_event_update', id_evento)
    

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

  
  function loadRegistros() {
    $.ajax({
      //url: 'http://localhost:3000/todos',
      // url: 'https://tuapp.herokuapp.com/todos',
      url: 'https://webfinal-api.herokuapp.com/getEventCreatedBy',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
        console.log(data)
  
        
        let $listaRegistros = $('#listaregistros')
  
        //$listaRegistros.empty();
        for( let i = 0; i < data.length; i++) {
          console.log(data[i])

          // aqui va su código para agregar los elementos de la lista
          
          id = data[i]._id
          price = data[i].cover
          servicios = data[i].services
          
          nameEvent = data[i].nameE
          fecha = data[i].date
          beggin = data[i].hourB
          end = data[i].hourE
          description = data[i].description
          organizador = data[i].nameO
          tipo = data[i].eventT
          servicios = data[i].services
          key = Object.keys(tipo)
          assistentes = data[i].assistant

          dateSub = fecha.substring(0,10)

          console.log(id)



          var insertar = `
          <li>
            <div id="evento`+ i +`" data-id=`+ id +` class="evento-registro" >
              <div class="cosas-izquierda" >
                <div class="div-cosas" >
                  <a id="nombreEvento1" val="Nombremamalon" >` + nameEvent + `</a>
                </div>
                <div class="div-cosas" >
                    <a>Costo: $` + price + `</a>
                </div>
    
                <div class="div-cosas" >
                  <a> Descripcion: `+ description + `</a>
                </div>
                
    
                <div class="div-cosas" >
                    <a>Numero de Asistentes: `+ assistentes +` </a>
                  </div>
                
                <div class="div-cosa-verde" >
                    <a class="redondo">` + key[0] + `</a>
                  </div>
              </div>
              
              <div class="cosas-derecha" >
                  <div class="div-cosas" >
                      <a > ` + dateSub +`</a>
                    </div>
                    <div class="div-cosas" >
                      <a> Inicio: `+ beggin  + `</a>
                    </div>
                    <div class="div-cosas" >
                    <a>  Termino: ` + end + `</a>
                  </div>
                    <div class="div-cosa-verde" >
                      <a id="evento`+ i +`-actualizarEvento" class="redondo-registro" href='update-evento.html'  onclick="datosEvento(this)" > Actualizar Evento </a>
                  </div>
              </div>
              
            </div>
            
            <div id='box-registro-1' class="box-registro">
                  <a >Servicios Disponibles</a>
                  <div  >`

                  for( let j = 0; j < servicios.length; j++) {

                    serviceName = servicios[j].service
                    serviceCosto = servicios[j].price
                    serviceCont = servicios[j].counter

                      insertar = insertar + `<div class="redondo servicio-organizador" style="width: 30%" >
                                              <a>` + serviceName + `</a>
                                              <br>
                                              <a>$` + serviceCosto + `</a>
                                              <br>
                                              <a>`+ serviceCont + ` personas</a>
                                            </div>`
                  }

                  insertar = insertar + ` </div>
                                          </div>
                                        </li>`

          $listaRegistros.append($(insertar))
          
          dataCont = i
        }
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

  loadRegistros()