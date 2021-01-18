export type SerDes = {
    format: string;
    serialize?: (o: unknown) => string;
    deserialize?: (s: string) => unknown;
};



export class SerDesSingleton implements SerDes {
    serializer: SerDes;
    deserializer: SerDes;
    format: string;
    serialize?: (o: unknown) => string;
    deserialize?: (s: string) => unknown;

    constructor(param: {
        format: string;
        serialize: (o: unknown) => string;
        deserialize: (s: string) => unknown;
    }) {
        this.format = param.format;
        this.serialize = param.serialize;
        this.deserialize = param.deserialize;
        this.deserializer = {
            format : param.format,
            deserialize : param.deserialize
        }
        this.serializer = {
            format : param.format,
            serialize : param.serialize
        }
    }
};

export type SerDesTypes = {
    [format: string]: SerDesSingleton
};
