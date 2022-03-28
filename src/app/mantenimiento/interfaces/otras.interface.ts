export enum IAling {
    center = 'center',
    left = 'left',
    right = 'right',
}

export enum ITipo {
    string = 'string',
    number = 'number',
    date = 'date',
}

export interface IHeader{
    field:string,
    header:string,
    tipo:string,
    align?:string,
    alignHead?:string,
    calcula?(campo:any):any
    _class?:string,
}