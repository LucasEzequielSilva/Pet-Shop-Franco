let datosApi = []
const cardContenedor = document.getElementById("cardContainer")

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(dato => {
            datosApi.push(...dato.response.filter(producto => producto.tipo.toLowerCase() == "medicamento"))


            console.log(datosApi)
            imprimirProd()
        })
}

getData()





function imprimirProd() {

    datosApi.forEach(producto => {
        cardContenedor.innerHTML += (`
        <div class="col">
            <div class="card col-10 mx-auto">
            <h5 class="card-title mx-auto text-center" style="width: 90%"> ${producto.nombre} </h5>
                <img src="${producto.imagen}" style="objet-fit:cover;" class="card-img-top" alt="...">
                <div class="card-body">
                    
                    <p class="card-text">Precio : $${producto.precio}</p>
                    <p class="card-text">Stock : ${producto.stock}u.</p>
                    
                    <p class="card-text">${producto.descripcion}</p>
                </div>
            </div>
        </div>`)
    })
}



