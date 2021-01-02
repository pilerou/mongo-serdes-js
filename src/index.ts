import { SerDes, SerDesMap } from './types';
import { ObjectID, Binary } from 'mongodb';
import * as UUID from 'uuid-mongodb';

export const mongoSerDes : SerDesMap = {
    objectid : {
        format : 'objectid',
        serialize: (d: ObjectID) => {
            return d && d.toString();
        },
        deserialize: (s: string) => {
            return new ObjectID(s);
        }
    },
    uuid: {
        format : 'uuid',
        serialize: (b: Binary) => {
            return b && UUID.from(b).toString();
        },
        deserialize: (s: string) => {
            return UUID.from(s);
        }
    }
};

export const mongoSerDesArray : SerDes[] = Object.values(mongoSerDes);

export const mongoSerDesFormats : string[] = mongoSerDesArray.map(a => a.format);

