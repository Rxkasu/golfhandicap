

export function validateJson(json) {

    const Ajv = require('ajv');
    const ajv = new Ajv({allErrors: true});

    const schema = require('./json/schema/json-schema.json');
   
    if(!ajv.validateSchema(schema)) {
        console.error('JSON Schema not valid!\nValidation Errors:', ajv.errorsText());
        throw new Error('JSON Schema not valid!');
    }

    if(!ajv.validate(schema, json)) {
        console.error('JSON not valid!\nValidation errors:', ajv.errorsText());
        return false;
    } else {
        console.log('JSON data is valid!');
    }

    return true;
}