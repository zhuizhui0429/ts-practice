type Num2Array<N extends number, T extends unknown[] = []> = T['length'] extends N ? T : Num2Array<N, [...T, unknown]>

type AddOne<N extends number> = [unknown, ...Num2Array<N>]['length']

type FindIndex<T extends unknown[], Target, Index extends number = 0> =
    T extends [infer Item, ...infer Rest] ? Target extends Item ? Index : FindIndex<Rest, Target, AddOne<Index> & number> : never

type index = FindIndex<['1', 'zzx', 5], 5>

type MyEnum<T extends string[], ToNumber extends boolean = false> = {
    [key in T[number]as Capitalize<key>]: ToNumber extends true ? FindIndex<T, key> : key
}


type res1 = MyEnum<["macOS", "Windows", "Linux"]>

type res2 = MyEnum<["macOS", "Windows", "Linux"], true>


export { }