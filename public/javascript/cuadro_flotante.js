let botonSesion = document.querySelector(".sesion img");
let cuadroSesion = document.querySelector(".cuadro_flotante");
let body = document.querySelector("body");

body.addEventListener('click',(e)=>{
    if(cuadroSesion.style.visibility === 'visible'){
        cuadroSesion.style.visibility = 'hidden';
        e.stopPropagation();
    }
});

botonSesion.addEventListener('click',(e)=>{
    if(cuadroSesion.style.visibility !== 'visible'){
        cuadroSesion.style.visibility = 'visible';
        e.stopPropagation();
    }
})
