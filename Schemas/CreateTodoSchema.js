const {validator} = require('../decorators/decorators')

class CreateTodoSchema {
    @validator(['isNumber','isRequired'])
    id
}

module.exports = CreateTodoSchema