
interface MapStruct {
    mapFrom: unknown
    mapTo: unknown
}

type MapTypes<Origin extends object, R extends MapStruct> = {
    [key in keyof Origin]: R['mapFrom'] extends Origin[key] ? R['mapTo'] : Origin[key]
}


type StringToNumber = { mapFrom: string; mapTo: number; }
type test1 = MapTypes<{ iWillBeANumberOneDay: string }, StringToNumber>


type StringToDate = { mapFrom: string; mapTo: Date; }
type test2 = MapTypes<{ iWillBeNumberOrDate: string }, StringToDate | StringToNumber>



type test3 = MapTypes<{ iWillBeANumberOneDay: string, iWillStayTheSame: Function }, StringToNumber>

export { }