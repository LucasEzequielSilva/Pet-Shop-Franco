let datosApi = []
const cardContenedor = document.getElementById("cardContainer")



async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(dato => {
            datosApi.push(...dato.response.filter(producto => producto.tipo.toLowerCase() == "medicamento"))
            console.table(datosApi)
            imprimirProd(datosApi)


        })
}

getData()

inpText.addEventListener("input", (e) => {
    let valor = e.target.value
    console.log(valor)
    let arrayImpr = []

    if (valor == undefined) {
        arrayImpr.push(...datosApi)
    } else {
        arrayImpr.push(...datosApi.filter(prod => prod.nombre.toLowerCase().includes(valor.toLowerCase())))
    }

    imprimirProd(arrayImpr)



})
let array1 = []
let carrito = JSON.parse(localStorage.getItem("carroShop")) || []

function imprimirProd(array) {
    cardContenedor.innerHTML = ""
    let arrayImpr = []
    if (array == undefined) {
        arrayImpr = []
        arrayImpr.push(...datosApi)
    } else {
        arrayImpr = []
        arrayImpr.push(...array)
    }
    // arrayImpr.forEach(producto => {
    //     cardContenedor.innerHTML += (`
    //     <div class="col my-5 mx-auto contCardIndividual" >
    //         <div class="card h-100 col-sm-12  mx-auto px-2">
    //         <h5 class="card-title mx-auto text-center my-3" style="width: 90%"> ${producto.nombre.toUpperCase()} </h5>
    //         <img src="${producto.imagen}" style="objet-fit:cover; border-radius:50%" class="card-img-top" alt="...">
    //             <div class="card-body">
    //                 <p class="card-text pCard">Precio : <span>$${producto.precio}</span></p>
    //                 <p class="card-text pCard">Stock : <span>${producto.stock}u.</span></p>
    //                 <p class="card-text pCard">Descripción: <span  class="d-block"> ${producto.descripcion}</span></p>
    //                 <div class="d-flex flex-wrap justify-content-between">
    //                 <input type="button" id="${producto._id}" onclick="cargarAlCarrito(${producto._id})"  value="Agregar al carrito" min="1">
    //                 <label class="labelCantidadCard">Cantidad: <input type="number" class="inputCantidad" id="inputCant${producto._id}"  value="1" min="1" onkeydown="return false"></label>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>`)
    // })

    $(() => {

        arrayImpr.forEach(producto => {
            $("#cardContainer").append(`
            <div class="col my-5 mx-auto contCardIndividual" >
                <div class="card h-100 col-sm-12  mx-auto px-2">
                <h5 class="card-title mx-auto text-center my-3" style="width: 90%"> ${producto.nombre.toUpperCase()} </h5>
                <img src="${producto.imagen}" style="objet-fit:cover; border-radius:50%" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text pCard">Precio : <span>$${producto.precio}</span></p>
                        <p class="card-text pCard">Stock : <span>${producto.stock}u.</span></p>
                        <p class="card-text pCard">Descripción: <span  class="d-block"> ${producto.descripcion}</span></p>
                        <div class="d-flex flex-wrap justify-content-between">
                        <input type="button" id="${producto._id}"  value="Agregar al carrito" min="1">
                        <label class="labelCantidadCard">Cantidad: <input type="number" class="inputCantidad" id="inputCant${producto._id}"  value="1" min="1" onkeydown="return false"></label>
                        </div>
                    </div>
                </div>
            </div>`)

            let valor = 1
            $(`#inputCant${producto._id}`).on("change", () => {
                valor = event.target.value
            })
            $(`#${producto._id}`).on("click", () => {
                let idProducto = event.target.id

                array1.push(idProducto)
                let unicos = new Set(array1)
                console.log(unicos)
                let cleanCarrito = [...unicos]
                localStorage.setItem("carroShop", JSON.stringify(cleanCarrito))

                // if (carrito.length == 0) {
                //     let obj = datosApi.find(prod => prod._id == idProducto)
                //     obj.cantidad = valor
                //     carrito.map(prod => prod._id != idProducto)
                //     carrito.push(obj)
                //     console.log(carrito)
                //     localStorage.setItem("carroShop", JSON.stringify(carrito))
                // } else {
                //     let arrayCarrito = []
                //     arrayCarrito.push(...carrito)
                //     let comparar = ""
                //     comparar = arrayCarrito.map(pro => pro._id == idProducto)
                //     if (comparar != "") {
                //         alert("ya agregado")
                //     } else {
                //         let obj = datosApi.find(prod => prod._id == idProducto)
                //         obj.cantidad = valor
                //         carrito.map(prod => prod._id != idProducto)
                //         carrito.push(obj)
                //         console.log(carrito)
                //         localStorage.setItem("carroShop", JSON.stringify(carrito))
                //     }
                // }


                // alert("El producto ya esta agregadfo al carrito")
            })
        })


    })

}








