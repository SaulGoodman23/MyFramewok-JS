const {
    ResponseStatusCodes,
    ResponseMessages,
    ResponseStatus,
  } = require("../utility/responseConfigs");
  

class ValidationClass {
    validationError = []
    validationRules
    payload

    constructor(validationRules, payload) {
        this.validationRules = validationRules
        this.payload = payload
        this.handleValidation(validationRules, payload)
    }

    handleValidation(validationRules, payload) {
        const validationKeys=[]
        const payloadKeys=Object.keys(payload)
        validationRules.forEach((rule)=>{
            for (const [ruleKey, ruleValue] of Object.entries(rule)) {
               validationKeys.push(ruleKey)
               for (const [payloadKey, payloadValue] of Object.entries(payload)) {
                    if(ruleKey===payloadKey){
                        ruleValue.forEach((rule)=>{
                            switch (rule) {
                                case "isNumber":
                                    this.isNumber(payloadKey,payloadValue)
                                    break;
                                case "isObject":
                                    this.isObject(payloadKey,payloadValue)
                                    break;
                            }
                        })
                    }
               }
            }
        })
        const result=validationKeys.every((key)=>{
                return payloadKeys.includes(key)
        })
        if(!result) this.validationError.push(ResponseMessages.MissingRequiredFields)
    }

    isNumber(key,value) {
      if(typeof value !=='number'){
          this.validationError.push(`${key} must be a number!`)
      }
    }

    isObject(key,value) {
      if(typeof value !=='object'){
        this.validationError.push(`${key} must be an object!`)
      }
    }
}

module
    .exports = ValidationClass