$(document).ready(function(){
     $('select').material_select();

     var buscador = {
         
         Init: function(){
             this.inicializarListas()           
             this.mostrarDatos()
             $('#formulario').submit(function(event){
                event.preventDefault()                
             })                            
         },
         /*-------------------------------------------------------------------------------*/
         mostrarDatos: function(){
             $( "#mostrarTodos" ).click(function() {
                 suministrarDatos();
             })
             $('#submitButton').on('click', (e)=>{
                 suministrarDatos();
             })              
         },
         /*-------------------------------------------------------------------------------*/
         inicializarListas: function(){             
             
             $.ajax({url : "./php/inicializarListas.php",
                    success : function (data){                              
                        $.each(JSON.parse(data).ciudades, function(i,item){
        
                         $("#selectCiudad").append(
                               '<option>' + item + '</option>'
                           )               
                         })
                         $.each(JSON.parse(data).tipos, function(i,item){
                             $("#selectTipo").append(
                                 '<option>' + item + '</option>'
                             )
                         })
                         $('select').material_select();
                     }
             })             
         }
         /*-------------------------------------------------------------------------------*/
     }
     buscador.Init();
     /*-------------------------------------------------------------------------------*/
     function suministrarDatos(filtro){
         var ciudad = $('form').find('select[id="selectCiudad"]').val()
         var tipo = $('form').find('select[id="selectTipo"]').val()
         //alert(ciudad)
         var precioInicial = parseFloat( $('.irs-from').val())
         var precioFinal = parseFloat($('.irs-to').val())
         //alert(precioFinal);
         var filtro = {"ciudad": ciudad, "tipo": tipo, "from": precioInicial, "to": precioFinal}                           
         // alert(filtro)
         var JSON_URL = "./php/suministrarDatos.php"
         $.ajax({url : JSON_URL,
                 dataType: "text",
                 data: filtro,
                 success : function (data){                           
                     var obj = jQuery.parseJSON(data)
                     $(".contenido_res").empty();  
                     obj.forEach(function(item, index) {
                         //console.log(item.Ciudad);
                         var divTemplete = '<div class="contenido_res"> '+
                                          '	   <div class="card horizontal itemMostrado"> '+
                                          '			 <div class="card-image" > '+
                                          '			    <img src="img/home.jpg"> '+
                                          '			 </div> '+
                                          '			 <div class="card-stacked"> '+
                                          '			   <div class="card-content"> '+                    
                                          '					<p><strong>Dirección: </strong>:direccion</p> '+
                                          '					<p><strong>Ciudad: </strong>:ciudad</p> '+
                                          '					<p><strong>Teléfono: </strong>:telefono</p> '+
                                          '					<p><strong>Código postal: </strong>:codigoPostal</p> '+
                                          '					<p><strong>Tipo: </strong>:tipo</p> '+
                                          ' 				    <p><strong>Precio: </strong><span class="precioTexto">:precio</p></span> '+
                                          '			   </div> '+
                                          '		       <div class="card-action"> '+
                                          '					<a href="#">VER MAS</a>'+
                                          '			   </div> '+
                                          '			 </div> '+
                                          ' 	</div> '+
                                          '</div>'
                         divTemplete = divTemplete.replace(':direccion',obj[index]["Direccion"])
                                                 .replace(':ciudad',item.Ciudad)
                                                 .replace(':telefono',item.Telefono)
                                                 .replace(':codigoPostal',item.Codigo_Postal)
                                                 .replace(':tipo',item.Tipo)
                                                 .replace(':precio',item.Precio)
                         $('.colContenido').append(divTemplete)   
                     })
                 }
         })
     }     
})