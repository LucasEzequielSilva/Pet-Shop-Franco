let datosApi = []
const cardContenedor = document.getElementById("cardContainer")

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(dato => {
            datosApi.push(...dato.response.filter(producto => producto.tipo.toLowerCase() == "medicamento"))
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
    arrayImpr.forEach(producto => {
        cardContenedor.innerHTML += (`
        <div class="col my-5 mx-auto contCardIndividual" >
            <div class="card h-100 col-sm-12  mx-auto px-2">
            <h5 class="card-title mx-auto text-center my-3" style="width: 90%"> ${producto.nombre.toUpperCase()} </h5>
            <img src="${producto.imagen}" style="objet-fit:cover; border-radius:50%" class="card-img-top" alt="...">
                <div class="card-body">
                    <p style="font-weight: 900;" class="card-text">Precio : <span style="font-weight: 600;margin-left:1rem">$${producto.precio}</span></p>
                    <p style="font-weight: 900;" class="card-text">Stock : <span  style="font-weight: 600;margin-left:1rem">${producto.stock}u.</span></p>
                    <p style="font-weight: 900;" class="card-text">Descripción: <span  style="font-weight: 600;display:block"> ${producto.descripcion}</span></p>
                    <div class="d-flex flex-wrap justify-content-between">
                    <input type="button" style="color:black; width;50% ;background-color: #3f4c6b; border-radius: 8px;padding: 0.3rem 0.5rem; color:white" value="Agregar al carrito" min="1">
                    <label class="labelCantidadCard">Cantidad: <input type="number"style="color:black; width:2rem"  value="1" min="1" onkeydown="return false"></label>
                    </div>
                </div>
            </div>
        </div>`)
    })
}



