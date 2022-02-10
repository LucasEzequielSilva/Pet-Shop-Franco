let datosApi = []

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(dato => {
            datosApi.push(...dato.response)
            

            console.log(datosApi)

        })
}

getData()