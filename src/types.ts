export type SerDes = {
    format: string,
    serialize?: (o: unknown) => string;
    deserialize?: (s: string) => unknown;
};

export type SerDesMap = {
    [format: string]: SerDes
};
