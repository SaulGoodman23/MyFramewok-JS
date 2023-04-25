const path = require('path')
const fs = require('fs')

function loadAllControllers() {
    const controllers = []
    const directoryPath = path.join(__dirname, '../Controllers')

    // Read all files in Controllers directory
    const fileNames = fs.readdirSync(directoryPath)
    fileNames.forEach((file) => {
        if (file.endsWith('.js')) {
            const controller = require(`${directoryPath}/${file}`)
            let methods = Object.getOwnPropertyNames(controller.prototype)
            methods = methods.filter((method) => method != 'constructor')
            controllers.push({
                controller,
                handlers: methods
            })
        }
    })
    return controllers
}


module.exports = {loadAllControllers}