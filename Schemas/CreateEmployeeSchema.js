const {validator} = require('../decorators/decorators')

class CreateEmployeeSchema {
    @validator(['isNumber'])
    id
    @validator(['isObject'])
    data
    @validator(['isNumber'])
    parentId
}

module.exports = CreateEmployeeSchema