      
      const listaTab = document.querySelectorAll('.cuadro_detalle .tabs h2');
      const listaContenido = document.querySelectorAll('.cuadro_detalle .contenedor .contenido');
      let primeraVez = false;
      let tabActual = null;
      for(let i = 0; i < listaTab.length;i++){
        let tab = listaTab[i];
        tab.index = i;
        if(tab.parentElement.parentElement.classList.contains('no_cuadro_detalle')){
          continue;
        }
        
        if(!primeraVez){
          actualizarTabActual(listaTab[i]);
          primeraVez = true;
        }
        
        
        listaContenido[i].index = i;

        tab.addEventListener('click',function(){
          actualizarTabActual(this);
        });
      }
      
      
      function actualizarTabActual(nuevoTab){
        if(tabActual!=null){
          tabActual.classList.remove('tab_actual');
          listaContenido[tabActual.index].classList.remove('contenido_actual');
        }
        nuevoTab.classList.add('tab_actual');
        console.log(listaContenido,nuevoTab.index)
        listaContenido[nuevoTab.index].classList.add('contenido_actual');
        tabActual = nuevoTab;
      }
