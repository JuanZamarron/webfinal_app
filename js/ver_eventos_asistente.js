
    
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


      function loadRegistros() {
        $.ajax({
          //url: 'http://localhost:3000/todos',
          // url: 'https://tuapp.herokuapp.com/todos',
          url: 'https://webfinal-api.herokuapp.com/getRegisterUserId',
          headers: {
              'Content-Type':'application/json',
              'Authorization': 'Bearer ' + token
          },
          method: 'GET',
          dataType: 'json',
          success: function(data){
            console.log(data)
      
            
            let $listaRegistros = $('#listaregistros')
      
            $listaRegistros.empty();
            for( let i = 0; i < data.length; i++) {
              //console.log(data)
              // aqui va su código para agregar los elementos de la lista
              
              idEvento = data[i].eventID
              price = data[i].totalprice
              servicios = data[i].services
              

              $.ajax({
                //url: 'http://localhost:3000/todos',
                // url: 'https://tuapp.herokuapp.com/todos',
                url: 'https://webfinal-api.herokuapp.com/getEventId/' + idEvento,
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + token
                },
                method: 'GET',
                dataType: 'json',
                success: function(data){
                  console.log(data)

                  nameEvent = data.nameE
                  fecha = data.date
                  beggin = data.hourB
                  end = data.hourE
                  description = data.description
                  organizador = data.nameO
                  tipo = data.eventT
                  servicios = data.services
                  key = Object.keys(tipo)

                  dateSub = fecha.substring(0,10)

                  var insertar = ` <li>
                  <div id="evento1" class="evento-registro" >
                    <div class="cosas-izquierda" >
                      <div class="div-cosas" >
                        <a>` + nameEvent + `</a>
                      </div>
                      <div class="div-cosas" >
                        <a> Descripcion: ` + description + `</a>
                      </div>
                      <div class="div-cosas" >
                        <a>Organizador: ` + organizador + `</a>
                      </div>
                                            
                      <div class="div-cosas" >
                        <a>Precio total: ` + price + `</a>
                      </div>
                      <div class="div-cosa-verde" >
                          <a class="redondo"> ` + key[0] + `</a>
                        </div>
                    </div>
                    
                    <div class="cosas-derecha" >
                        <div class="div-cosas" >
                            <a >` + dateSub +`</a>
                          </div>
                          <div class="div-cosas" >
                            <a> Inicio: `+ beggin  + `</a>
                          </div>
                          <div class="div-cosas" >
                          <a>  Termino: ` + end + `</a>
                        </div>
                    </div>          
                  </div>        
                  <div id='box-registro-1' class="box-registro">
                        <a >Servicios Contratados</a>
                        <div class='servicios-registrados'  >`

                        for( let j = 0; j < servicios.length; j++) {
                          console.log(servicios[j])
                            insertar = insertar + `<a class="redondo-serv servicio" >` + servicios[j].service + `</a>`
                        }

                        insertar = insertar + `                     
                                                </div>
                                        </div>
                                      </li>`
                                  

                $listaRegistros.append($(insertar))
                  
                },
                error: function(error_msg) {
                  alert((error_msg['responseText']));
                }
              });

              
              //console.log(data[i].completed)
              //console.log(data[i].description)
      
      
              //var algo = '<li><input type="checkbox" name="todo" value="' + i + '"><span>' + data[i].description + '</span></li>'
      
              //$list.append($(algo))
              
                      
              // algo asi:
              // addTodo(data[i]._id, data[i].description, data[i].completed)
              // no tienen que usar la funcion de addTodo, es un ejemplo
              dataCont = i
            }
          },
          error: function(error_msg) {
            alert((error_msg['responseText']));
          }
        });
      }

      loadRegistros()