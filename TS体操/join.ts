type Join<T extends unknown[], C extends string, Res extends string = ''> =
    T extends [infer Item extends string | number, ...infer Rest] ?
    Res extends '' ? Join<Rest, C, `${Item}`> : Join<Rest, C, `${Res}${C}${Item}`> :
    Res

type test = Join<['zzx', 'love', 'fitness'], '   ~~~~   '>


export { }