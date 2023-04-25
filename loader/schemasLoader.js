const path = require('path')
const fs = require('fs')
require('reflect-metadata')

function schemasLoader() {
    const validationTypeForProperty = {}
    let arr=[]
    const directoryPath = path.join(__dirname, '../Schemas')
    const fileNames = fs.readdirSync(directoryPath)
    fileNames.forEach((file) => {
        arr=[]
        const schemaName=file.split('.')[0]
        const Schema = require(`${directoryPath}/${file}`)
        const instance = new Schema()
        const properties = Object.getOwnPropertyNames(instance)
        properties.forEach((prop) => {
            const meta = Reflect.getMetadata('validation_type', Schema.prototype, prop)
            arr.push({
                [prop]:meta
            })
        })
        validationTypeForProperty[schemaName]=arr
    })
    return validationTypeForProperty
}

module.exports = {
    schemasLoader
}