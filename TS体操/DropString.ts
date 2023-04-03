type name = 'zzx465456z45x'

type Str2Union<S extends string> = S extends `${infer Cur}${infer Rest}` ? Cur | Str2Union<Rest> : never

type DropString<S extends string, T extends string> =
    S extends `${infer Char}${infer Rest}` ? Char extends Str2Union<T> ? DropString<Rest, T> : `${Char}${DropString<Rest, T>}` : ''

type res = DropString<name, 'zx'>

type test1 = DropString<'zzx love coding', 'o '>



export { }