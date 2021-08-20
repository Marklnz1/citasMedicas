let cuadroCitaActual = null;
    const botones_mostrar = document.querySelectorAll('.cuadro_info .boton_mostrar');
    for(let boton of botones_mostrar){
      boton.addEventListener('click',mostrarCuadroItem);
    }
    const primerCuadroItem = document.querySelector('.cuadro_info :nth-child(1)');
    if(primerCuadroItem!=null){
      mostrarCuadroItem(primerCuadroItem.id);
    }
    function mostrarCuadroItem(e){

      if(cuadroCitaActual!=null){
        cuadroCitaActual.classList.remove('cuadro_item_actual'); 
      }
      const idCuadroItemActual = typeof e === "string"?e:e.target.parentElement.id;
      cuadroCitaActual = document.getElementById(idCuadroItemActual);
      cuadroCitaActual.classList.add('cuadro_item_actual');
    }