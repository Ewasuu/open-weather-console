const fs = require('fs')

const path = './db/data.json'

const writeDB = (data) =>{

    fs.writeFileSync(path, JSON.stringify(data))

}

const readDB = () =>{
    if (!fs.existsSync(path)) {
        return null
    }

    const db = fs.readFileSync(path, {encoding: 'utf-8'})
    const data = JSON.parse(db)
    return data
}

module.exports = {
    writeDB,
    readDB
}