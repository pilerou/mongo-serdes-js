import { SerDes, SerDesTypes, SerDesSingleton } from './types';
import { ObjectID, Binary } from 'mongodb';
import * as UUID from 'uuid-mongodb';

export const MongoSerDes : SerDesTypes = {
    objectid : new SerDesSingleton({
        format : 'objectid',
        serialize: (d: ObjectID) => {
            return d && d.toString();
        },
        deserialize: (s: string) => {
            return new ObjectID(s);
        }
    }),
    uuid: new SerDesSingleton({
        format : 'uuid',
        serialize: (b: Binary) => {
            return b && UUID.from(b).toString();
        },
        deserialize: (s: string) => {
            return UUID.from(s);
        }
    })
};

export const MongoSerDesArray : SerDesSingleton[] = Object.values(MongoSerDes);

export const MongoSerDesFormats : string[] = MongoSerDesArray.map(a => a.format);
