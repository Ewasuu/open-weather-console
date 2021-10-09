const inquirer = require('inquirer')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial` 
            },
            {
                value: 3,
                name: `${'3.'.green} Salir \n\n`
            }
        ]
    }
]


const inquirerMenu = async () => {

    console.clear()
    console.log('========================================='.green)
    console.log('       Escoge una opcion'.green)
    console.log('========================================='.green)

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion

}

const pausa = async () => {
    const inputPaused = [
        {
            type: 'input',
            name: 'inputPause',
            message: `Presione ${'ENTER'.green} para continuar`
        } 
    ]

    await inquirer.prompt(inputPaused)
}

const leerInput = async (message) =>{
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if (value.length === 0) throw 'Por favor complete el campo'
            return true
        }
    }

    const { desc } = await inquirer.prompt(question)
    return desc
}
const selectExactSearch = async ({locations = []}) =>{

    const choices = locations.map( (location, i) => {


        return{
            value: location.id,
            name: `${`${i+1}`.brightGreen}. ${location.name} \n`
        }
    })
    const preguntas = [
        {
            type: 'list',
            name: 'locationList',
            message: 'Escoja una opcion',
            choices
        }
    ]
    const { locationList } = await inquirer.prompt(preguntas)
    return locationList
}

const confirmar = async ({ mensaje }) => {
    const pregunta = {
        type: 'confirm',
        name: 'confirmacion',
        message: mensaje
    }

    const { confirmacion } = await inquirer.prompt(pregunta)
    return confirmacion
}

module.exports = {
    inquirerMenu, 
    pausa,
    leerInput,
    confirmar,
    selectExactSearch
}