
const cardContenedor = document.getElementById("cardContainer")
const inpText = document.getElementById("inpText")

let datosApi = []
let valueInpText = ""
async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(dato => {
            datosApi.push(...dato.response.filter(producto => producto.tipo.toLowerCase() == "juguete"))
            console.log(datosApi)
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


    $(() => {

        arrayImpr.forEach(producto => {
            $("#cardContainer").append(`
            <div class="col my-5 mx-auto contCardIndividual " >
                <div class="card  col-sm-12 h-100 mx-auto px-2">
                <h5 class="card-title mx-auto text-center my-3" style="width: 90%"> ${producto.nombre.toUpperCase()} </h5>
                <img src="${producto.imagen}" style="objet-fit:cover; border-radius:50%" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text pCard">Precio : <span>$${producto.precio}</span></p>
                        <p class="card-text pCard">Stock : <span>${producto.stock}u.</span></p>
                        <p class="card-text pCard">Descripción: <span  class="d-block"> ${producto.descripcion}</span></p>
                        <div class="d-flex flex-wrap justify-content-between">
                        <input class="btnAgregar" type="button" id="${producto._id}"  value="Agregar al carrito" min="1">
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


            })
        })


    })

}



