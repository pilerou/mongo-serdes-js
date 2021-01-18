# Mongo Serdes JS

Types serializer and deserializer for MongoDB. 

It can be used in API project in order to deserialize data from requests and serialize it to response.

First usage is in [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) project usage when `serDes` is used.




## Install
`npm install mongo-serdes-js`

## Usage
####Import library
```javascript
const {mongoSerDes} = require('mongo-serdes-js');
```


#### Serialize or deserialize data in Javascript
```javascript
// Example with ObjectID
mongoSerDes.objectid.deserialize('5fec2665792afbcd812ace9b'); // return ObjectID object
const anObjectID = new ObjectID();
mongoSerDes.objectid.serialize(anObjectID);  // return the ObjectID as String

// Example with UUID (stored as Binary in MongoDB)
mongoSerDes.uuid.deserialize('7c239196-53b2-428c-8f1d-275e52c661f3'); // return a Binary BSON object
// Retrieve data with an UUID Binary field 
const myData = await myCollection.findOne({name : 'Pierre'});
mongoSerDes.uuid.serialize(myData.uuidField);  // return the ObjectID as String
```

#### [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) usage
If you use `serDes` setting in middleware, you may want to :
- deserialize requests string to Mongodb objects 
- serialize responses Mongodb objects to string

This serialization or deserialization is done according to each data `format` configuration in your OpenAPI description.

Example :
- YAML description
```yaml
paths:
  /users/{id}:
    get:
      parameters:
        - name: id
          in: path
          required: true
          schema:
            $ref: "#/components/schemas/ObjectId"
        - name: uuid
          in: path
          required: true
          schema:
            $ref: "#/components/schemas/UUID"
...

components:
  schemas:
    ObjectId:
      type: string
      format: objectid
      pattern: '^[0-9a-fA-F]{24}$'
    UUID:
      type: string
      format: uuid
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$'
...
```

- Your Express OpenAPI configuration with `serDes` setting including `mongoSerDes` formats.
Formats must be added to `unknownFormats`
```javascript
const {MongoSerDes} = require('mongo-serdes-js');
const OpenApiValidator = require('express-openapi-validator');

app.use(OpenApiValidator.middleware({
    apiSpec: ...,
    validateRequests: {
      coerceTypes: true
    },
    validateResponses: {
      coerceTypes: true
    },
    serDes: [
      OpenApiValidator.baseSerDes.date,
      OpenApiValidator.baseSerDes.dateTime,
      MongoSerDes.objectid, // this configuration if we want to deserialize objectid in request and serialize it in response
      MongoSerDes.uuid.serializer, // this configuration if we only want to serialize on response or write "MongoSerDes.uuid" if you want both serialize and deserialize
    ],
  }));
```

## License

[MIT](LICENSE)
