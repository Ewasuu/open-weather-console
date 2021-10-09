const { writeDB, readDB } = require("./helpers/handledb")
const { 
    leerInput, 
    inquirerMenu, 
    pausa, 
    selectExactSearch 
} = require("./helpers/inquirer")


const Busquedas = require("./models/busquedas")



const main = async () => {

    const Busqueda = new Busquedas()
    let opt = ''
    const data = readDB()
    if (data) {
        Busqueda.obtenerDB(data)
    }
    do{
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                // introducir la busqueda
                const queryV1 = await leerInput('Ingrese el lugar a buscar:')
                // Hacer el fetch de datos
                const confirmSearch = await Busqueda.ciudad(queryV1)
                // confirmar la busqueda para ver datos extras
                console.clear()
                const queryV2 = await selectExactSearch({locations: confirmSearch})
                const finalQuery = confirmSearch.find( i => queryV2 === i.id)
                Busqueda.escribirHistorial(finalQuery.name)
                const clima = await Busqueda.clima({lat: finalQuery.lat,lon: finalQuery.lng})



                console.log(`\nInformacion de la ciudad: ${finalQuery.name} \n`)
                console.log('Latitud: ', finalQuery.lat, '\n')
                console.log('Longitud: ',finalQuery.lng, '\n')
                console.log('Temperatura: ', clima.temp,'\n')
                console.log('El clima Maximos es: ', clima.max, '\n')
                console.log('El clima Minimo es: ', clima.min, '\n')
                console.log('Estado: ', clima.desc)


                break;
        
            case 2:
                Busqueda.mostrarHistorial()
                break;
        }
        await pausa()

    }while(opt !== 3)


}

main()