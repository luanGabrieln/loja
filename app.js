
var carritoVisible = false;


if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    
    document.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', eliminarItemCarrito);
    });

    
    document.querySelectorAll('.sumar-cantidad').forEach(button => {
        button.addEventListener('click', sumarCantidad);
    });

    
    document.querySelectorAll('.restar-cantidad').forEach(button => {
        button.addEventListener('click', restarCantidad);
    });

   
    document.querySelectorAll('.boton-item').forEach(button => {
        button.addEventListener('click', agregarAlCarritoClicked);
    });

   
    document.querySelector('.btn-pagar').addEventListener('click', pagarClicked);
}


function pagarClicked() {
    alert("Obrigado pela Compra seu pedido sai em aprosimadamente: 30 minutos ");
   
    var carritoItems = document.querySelector('.carrito-items');
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}


function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.querySelector('.titulo-item').innerText;
    var precio = item.querySelector('.precio-item').innerText;
    var imagenSrc = item.querySelector('.img-item').src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}


function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.querySelector('.carrito');
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.querySelector('.contenedor-items');
    items.style.width = '60%';
}


function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.querySelector('.carrito-items');

   
    var nombresItemsCarrito = itemsCarrito.querySelectorAll('.carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText === titulo) {
            alert("já se-encontra em seu carrinho");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

   
    item.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);

   
    item.querySelector('.restar-cantidad').addEventListener('click', restarCantidad);

   
    item.querySelector('.sumar-cantidad').addEventListener('click', sumarCantidad);

   
    actualizarTotalCarrito();
}


function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.querySelector('.carrito-item-cantidad').value);
    cantidadActual++;
    selector.querySelector('.carrito-item-cantidad').value = cantidadActual;
    actualizarTotalCarrito();
}


function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.querySelector('.carrito-item-cantidad').value);
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.querySelector('.carrito-item-cantidad').value = cantidadActual;
        actualizarTotalCarrito();
    }
}


function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
   
    actualizarTotalCarrito();
   
    ocultarCarrito();
}


function ocultarCarrito() {
    var carritoItems = document.querySelector('.carrito-items');
    if (carritoItems.childElementCount === 0) {
        var carrito = document.querySelector('.carrito');
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.querySelector('.contenedor-items');
        items.style.width = '100%';
    }
}


function actualizarTotalCarrito() {
    
    var carritoContenedor = document.querySelector('.carrito');
    var carritoItems = carritoContenedor.querySelectorAll('.carrito-item');
    var total = 0;
    
    carritoItems.forEach(item => {
        var precioElemento = item.querySelector('.carrito-item-precio');
       
        var precio = parseFloat(precioElemento.innerText.replace('R$', '').replace('.', ''));
        var cantidadItem = item.querySelector('.carrito-item-cantidad');
        var cantidad = parseInt(cantidadItem.value);
        total += precio * cantidad;
    });
    const costoEnvio = 15;
    if (total <= 80) {
        total += costoEnvio;
        document.querySelector('.costo-envio').innerText = `R$${costoEnvio.toLocaleString("es")},00`;
    } else {
        document.querySelector('.costo-envio').innerText = 'Gratis';
    }
    total = Math.round(total * 100) / 100;
    document.querySelector('.carrito-precio-total').innerText = 'R$' + total.toLocaleString("es") + ",00";
}
