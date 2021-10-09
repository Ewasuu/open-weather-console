const axios = require('axios')
const API = require('../helpers/api_data')
const APIW = require('../helpers/api_w')
const { writeDB } = require('../helpers/handledb')

class Busquedas {
    historial = []

    constructor( historial = [] ){
        this.historial = historial
    }

    async ciudad(lugar){

        const responses = await axios(`${API.URL}${lugar}${API.TOKEN}${API.LIMIT}${API.LANG}`)

        return responses.data.features.map(res => ({
            id: res.id,
            name: res.place_name,
            lat: res.center[1],
            lng: res.center[0]
        }))
        
    }
    
    async clima({lat, lon}){

            try{
                const response = await axios(`${APIW.URL}${APIW.LAT_}${lat}${APIW.LON_}${lon}${APIW.TOKEN}`)
                const { weather, main } = response.data
                return{
                    temp: main.temp,
                    min: main.temp_min,
                    max: main.temp_max,
                    desc: weather[0].description
                }
            }catch(err){
                console.log(err)
            }
    }

    obtenerDB(el){
        el.forEach(ele => {
            this.historial.unshift(ele)
        })
    }

    escribirHistorial(el){
        if (this.historial.some( x => x == el)) {
            return null
        }
        else if (this.historial.length > 5) {
            console.log('truerrrrrrr')
            this.historial.pop()
            this.historial.unshift(el)
            writeDB(this.historial)
        }else{

            this.historial.unshift(el)
            writeDB(this.historial)

        }
    }

    mostrarHistorial(){

        this.historial.forEach( (e, i) => {
            console.log(`${i + 1}. ${e}`)
        })

    }
}

module.exports = Busquedas