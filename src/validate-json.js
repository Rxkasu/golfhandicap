import Ajv from 'ajv';
import schema from './json/schema/json-schema.json' assert { type: "json" };

export function validateJson(json) {


    const ajv = new Ajv({allErrors: true});

   
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