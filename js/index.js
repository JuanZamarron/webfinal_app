//subir los datos

var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

//console.log(token)

eventos = []

function loadEventos() {
  $.ajax({
    //url: 'http://localhost:3000/todos',
    // url: 'https://tuapp.herokuapp.com/todos',
    url: 'https://webfinal-api.herokuapp.com/getAllEvents',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data)

      eventos = data

      let $listaeventos = $('#listaeventos')

      var eventoCont 

      //$list.empty();
      for( let i = 0; i < data.length; i++) {

        eventoCont = 'evento' + i
        //console.log(eventoCont)

        description = data[i].description
        date = data[i].date
        cover = data[i].cover
        beggin = data[i].hourB
        end = data[i].hourE
        organizador = data[i].nameO
        name = data[i].nameE
        tipo = data[i].eventT
        servicios = data[i].services
        id = data[i]._id

        key = Object.keys(tipo)

        dateSub = date.substring(0,10)
      
        // aqui va su código para agregar los elementos de la lista
        
        var insertar =`<li>
        <div id="`+ eventoCont + `" data-id=' `+id+`' class="evento" >
        
        
          <div class="cosas-izquierda" >
            <div class="div-cosas" >
              <a>` + name + `</a>
            </div>
            <div class="div-cosas" >
              <a> Descripcion: ` + description + `<a>
            </div>
            <div class="div-cosas" >
              <a>Organizador: `+ organizador +`</a>
            </div>
            <div class="div-cosa-verde" >
                <a class="redondo">` + key[0] + `</a>
              </div>
          </div>
          
          <div class="cosas-derecha" >
              <div class="div-cosas" >
                  <a >` + dateSub + `</a>
                </div>
                <div class="div-cosas" >
                  <a> Inicio: `+ beggin  + `</a>
                </div>
                <div class="div-cosas" >
                <a>  Termino: ` + end + `</a>
              </div>
                <div class="div-cosa-verde" >
                    <a id="` + eventoCont + `-registro" class="redondo-registro" onclick="abrirRegistro(this)" > Registrarme <i class="i-algo down"></i></a>
                </div>
          </div>
        </div>
        
        <div id='`+ eventoCont +`-box' class="box-registro hidden">
          <div>
            <div>
              <a >Servicios disponibles</a>
              
              <div class="div-costos" >
                <div>
                  <a>Costo por Boleto:</a>
                </div>
                <div>
                  <a id='` + eventoCont + `-textocostototal' >` + cover + `</a>
                </div>
                <div>
                    <a>Numero de Boletos</a>
                </div>
                <div>
                    <div id="` + eventoCont + `-bajarboletos " class="circle" style="float: left" onclick="bajarBoletos(this)" >
                      <div class="horizontal" style="float: left"></div>
                    </div>
                    <div id="` + eventoCont + `-subirboletos " class="circle" style="float: right" onclick="subirBoletos(this)" >
                      <div class="horizontal" style="float: right"></div>
                      <div class="vertical" style="float: right"></div>
                    </div>
                    <div class="numero-boletos" >
                      <a id='` + eventoCont +`-numerodeboletos' >1</a>
                    </div>
                  </div>
                  <div>
                      <a>Costo Total:</a>
                  </div>
                  <div>
                      <a id="` + eventoCont +`-costototalboletos" >100</a>
                  </div>
                  <div class="div-cosa-verde" >
                    <a id="` + eventoCont + `-btn-abrir-popup" class="redondo-registro"  onclick="abrirConfirmacionDeCompra(this)"> Comprar Boleto(s)</a>
                </div>
                  
              </div>
              <div id="` + eventoCont + `-servicios " class="div-servicios" data-number="`+ servicios.length +`" >`


              for( let j = 0; j < servicios.length; j++) {
                serviceCont = 'servicio' + j
                serviceName = servicios[j].service
                serviceCosto = servicios[j].price

                serviceID = eventoCont + "-" + serviceCont

                insertar = insertar + `<div id="`+ serviceID + `" class="redondo-servicio-not-selected"  onclick="seleccionDeServicios(this)" data-selected="False" data-nombre="` + serviceName +`" data-costo="` + serviceCosto + `" >
                                        <a >` + serviceName + ' - $' + serviceCosto + `</a>
                                      </div>`

              }             

            insertar = insertar + `
                </div>
            </div>
          </div>
        </div>
      </li>`


        $listaeventos.append($(insertar))
        
                
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo
        //dataCont = i
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadEventos()




    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    }
    
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    }

    function abrirRegistro(thi){
      id = thi.id
      n = id.search("-")
      idEvento = id.substring(0,n)
      idBox = idEvento + '-box'

      //console.log(idEvento)
      //console.log(idBox)

      let $evento = $('#' + idEvento)
        
      let $boxregistro = $('#' + idBox)

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

    }

    //subir y bajar numero de boletos
    function subirBoletos(thi){

      id = thi.id
      n = id.search("-")
      idEvento = id.substring(0,n)
      idNumeroBoletos = idEvento + '-numerodeboletos'
      idCostoTotalBoletos = idEvento + '-costototalboletos'
      idTextoCostoTotalEvento = idEvento + '-textocostototal'

      let $numeroBoletos = $('#' + idNumeroBoletos)
      let $costototalboletos = $('#' + idCostoTotalBoletos)
      let $costototal = $("#" + idTextoCostoTotalEvento)

      auxCostoTotal = $costototal.text()
      auxNumeroBoletos = $numeroBoletos.text()
      auxNumeroBoletos = Number(auxNumeroBoletos) + 1
      $numeroBoletos.text(auxNumeroBoletos)
      $costototalboletos.text( Number(auxCostoTotal) * auxNumeroBoletos )
    }
    
    function bajarBoletos(thi){

      id = thi.id
      n = id.search("-")
      idEvento = id.substring(0,n)
      idNumeroBoletos = idEvento + '-numerodeboletos'
      idCostoTotalBoletos = idEvento + '-costototalboletos'
      idTextoCostoTotalEvento = idEvento + '-textocostototal'

      let $numeroBoletos = $('#' + idNumeroBoletos)
      let $costototalboletos = $('#' + idCostoTotalBoletos)
      let $costototal = $("#" + idTextoCostoTotalEvento)
      
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

      n = id.search("-")
      idEvento = id.substring(0,n)
      idNumeroBoletos = idEvento + '-numerodeboletos'
      idCostoTotalBoletos = idEvento + '-costototalboletos'
      idTextoCostoTotalEvento = idEvento + '-textocostototal'

      let $numeroboletos = $('#' + idNumeroBoletos)
      let $costototalboletos = $('#' + idCostoTotalBoletos)
      let $costototal = $("#" + idTextoCostoTotalEvento)

      let $servicio = $('#' + id)        

      auxCostoTotal = $costototal.text()
      auxCostoServicio = $servicio.data("costo")

      nombreServicio = $servicio.data("nombre")
      servicioSelected = $servicio.data("selected")
      //console.log(nombreServicio)
      //console.log(servicioSelected)

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

    idMongo = ""
    precioTotal = ""
    idEventoGlobal = ""
    numeroBoletos = 1
    precioTotalFinal = 100
    asistentesEvento = 0

    
    function abrirConfirmacionDeCompra(thi){

      id = thi.id
      n = id.search("-")
      idEvento = id.substring(0,n)
      idEventoGlobal = idEvento
      let $evento = $('#' + idEvento)
      idNumeroBoletos = idEvento + '-numerodeboletos'

      idMongo = $evento.data('id')
      
      idCostoTotalBoletos = idEvento + '-costototalboletos'
      

      let $costototalevento = $('#' + idCostoTotalBoletos)
      let $numeroboletos = $('#' + idNumeroBoletos)

      numeroBoletos =  Number($numeroboletos.text())
      

      let $btnAbrirPopup = $('#' + id)
      let $overlay = $('#overlay')
      let $popup = $('#popup')
      let $h4costototal = $('#h4-costo-total-popup')

      $overlay.addClass('active')
      $popup.addClass('active')
      $h4costototal.text( "Costo Total: " +  $costototalevento.text() )
      precioTotal = $costototalevento.text()
      precioTotalFinal = Number(precioTotal) / numeroBoletos 

    }

    function confirmarCompra(thi){

      
      idEvento = idEventoGlobal
      idServicio = idEvento + "-servicios"

      numberEvent = idEvento.substring(6,idEvento.length)
      numberEvent2 = Number(numberEvent)
      
      //console.log(numberEvent)

      //console.log(idEvento)
      //console.log(idServicio)

      let $Servicios = $('#' + idServicio )

      numServicios = $Servicios.data('number')
      //console.log(numberEvent2)

      //console.log(eventos)


      arrServicios = []
      arrServiciosCont = []

      for(let k = 0; k < eventos.length; k++) {
        if( k == numberEvent){
          asistentesEvento = eventos[k].assistant
          servicios = eventos[k].services

          for( let e = 0; e < servicios.length; e++) {

            servicioId = idEventoGlobal + '-servicio' + String(e)
            //console.log(servicioId)

            let $servicio = $('#' + servicioId)
            
            jsonAuxCont = {}

            if( $servicio.hasClass('redondo-servicio-not-selected') ){
              //console.log("No selectec")
              jsonAuxCont ={
                "service": servicios[e].service,
                "price": servicios[e].price,
                "counter": servicios[e].counter
              }
            }
            else{
              jsonAux ={
                "service": servicios[e].service,
                "price": servicios[e].price
              }
              jsonAuxCont ={
                "service": servicios[e].service,
                "price": servicios[e].price,
                "counter": servicios[e].counter + numeroBoletos
              }
              arrServicios.push(jsonAux)
              
              //console.log("selectes")
            }
            arrServiciosCont.push(jsonAuxCont)

            //console.log(servicios[e])

          }
        }
      }
      //console.log(arrServicios)
      //console.log(numeroBoletos)
      //console.log(precioTotalFinal)
      console.log(arrServiciosCont)
      //console.log( idMongo)
      //console.log( precioTotal )

      idMongo2 = idMongo.trimLeft()

      json_to_send={
        "eventID":idMongo2,
        "services":arrServicios,
        "totalprice":precioTotalFinal
      }
      //console.log(json_to_send)
      json_to_send = JSON.stringify(json_to_send);
      //console.log(json_to_send)

      for(let k = 0; k < numeroBoletos; k++) {
        
        $.ajax({
          //url: 'http://localhost:3000/todos',
          //url: 'https://tuapp.herokuapp.com/todos',
          url: 'https://webfinal-api.herokuapp.com/createRegister',
          headers: {
              'Content-Type':'application/json',
              'Authorization': 'Bearer ' + token
          },
          method: 'POST',
          dataType: 'json',
          data: json_to_send,
          success: function(data){
            console.log("se creo este pedo")

            //console.log(servic)

            json_to_send_2={
              "assistant":asistentesEvento + numeroBoletos,
              "services":arrServiciosCont
            }
            
            console.log(json_to_send_2)
            json_to_send_2 = JSON.stringify(json_to_send_2);
            console.log(json_to_send_2)

            $.ajax({
              url: 'https://webfinal-api.herokuapp.com/event/edit/' + idMongo2,
              headers: {
                  'Content-Type':'application/json',
                  'Authorization': 'Bearer ' + token
              },
              method: 'PATCH',
              dataType: 'json',
              data: json_to_send_2,
              success: function(data){
                console.log("se hizo este pinche pedo alv!!!!")
                loadEventos()

              },
              error: function(error_msg) {
                alert((error_msg['responseText']));
              }
            });

          },
          error: function(error_msg) {
            alert((error_msg['responseText']));
          }
        });
      }
      let $overlay = $('#overlay')
      let $popup = $('#popup')

      $overlay.removeClass('active')
      $popup.removeClass('active')       
    }

    function logout(){
      console.log("aio popo")
    }