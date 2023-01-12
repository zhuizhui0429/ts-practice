type ControlsMap = {
    c: 'char',
    s: 'string',
    d: 'dec',
    o: 'oct',
    h: 'hex',
    f: 'float',
    p: 'pointer',
}

type Parse<S extends string, Res extends unknown[] = []> =
    S extends `${any}%${infer Char extends keyof ControlsMap}${infer Rest}` ?
    Parse<Rest, [...Res, ControlsMap[Char]]> : Res

type res = Parse<'Hello %s: score is %d.'>

export { }