let arrayImprimir = []
let datosDeApi = []
let final = []
const carritoContainer = document.getElementById("carrito")
const limpiarCarrito = document.getElementById("limpiarCarrito")

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(dato => {
            datosDeApi.push(...dato.response)
            datosDeApi.map(prod => {
                prod.cantidad = 1
            })


        })

    imprimirPantalla()

    limpiarCarrito.addEventListener("click", vaciar)
}

getData()




function imprimirPantalla() {

    arrayImprimir = []
    let datosStorage = JSON.parse(localStorage.getItem("carroShop"))

    console.table(datosStorage)
    if (datosStorage != null) {
        final = datosStorage
    } else {
        final = []
    }


    final.map(idStorage => {
        arrayImprimir.push(...datosDeApi.filter(prod => prod._id == idStorage))
    })

    carritoContainer.innerHTML = ""
    if (final.length == 0) {
        carritoContainer.innerHTML = "<h2>No hay elementos en el carito</h2>"
    } else {
        arrayImprimir.forEach(producto => {
            carritoContainer.innerHTML += (`
            <div class="col my-5 mx-auto contCardIndividual" >
                        <div class="card h-100 col-sm-12  mx-auto px-2">
                        <h5 class="card-title mx-auto text-center my-3" style="width: 90%"> ${producto.nombre.toUpperCase()} </h5>
                        <img src="${producto.imagen}" style="objet-fit:cover; border-radius:50%" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text pCard">Precio : <span>$${producto.precio}</span></p>
                                <p class="card-text pCard">Stock : <span>${producto.stock}u.</span></p>
                                <p class="card-text pCard">Descripción: <span  class="d-block"> ${producto.descripcion}</span></p>
                                <div class="d-flex flex-wrap justify-content-between">
                                <input type="button" id="${producto._id}" value="Eliminar producto" min="1">
                                <button class="" value="${producto._id}" id="addCantidad${producto._id}">+</button>
                                <p>${producto.cantidad}</p>
                                <button class="" value="${producto._id}" id="restCantidad${producto._id}">-</button>
                                </div>
                            </div>
                        </div>
                    </div>
            `)
            $(() => {
                $(`#${producto._id}`).on("click", () => {

                    let momentaneo = event.target.id
                    let arrayPrueba = []
                    final.forEach(prod => {
                        if (momentaneo != prod) {
                            arrayPrueba.push(prod)
                        }
                    })

                    localStorage.clear()
                    localStorage.setItem("carroShop", JSON.stringify(arrayPrueba))
                    imprimirPantalla()

                })
                let contador = []
                $(`#restCantidad${producto._id}`).on("click", () => {

                    let idProd = event.target.value

                    contador = []
                    contador.push(...arrayImprimir.filter(productoA => productoA._id == idProd))
                    contador.map(prod => prod.cantidad--)

                    imprimirPantalla()
                })
                $(`#addCantidad${producto._id}`).on("click", () => {
                    let idProd = event.target.value

                    contador = []
                    contador.push(...arrayImprimir.filter(productoA => productoA._id == idProd))
                    contador.map(prod => prod.cantidad++)

                    imprimirPantalla()
                })


            })

        })
    }



}



function vaciar() {
    localStorage.clear()
    // localStorage.removeItem("carroShop")
    imprimirPantalla()
}


