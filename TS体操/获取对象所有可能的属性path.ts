type JoinPrefix<Prefix extends string, Path extends string> = Prefix extends '' ? Path : `${Prefix}.${Path}`

type Num2Array<N extends number, T extends unknown[] = []> = T['length'] extends N ? T : Num2Array<N, [...T, unknown]>
type AddOne<N extends number> = [...Num2Array<N>, unknown]['length']

/**
 * 注意: 数组类型是object的子类型,所以在高级类型ObjectKeyPaths中要先判断数组的情况
 */
type ArrayIsExtendsObject = [1, 2, 3] extends object ? true : false

type ObjectKeyPaths<T extends object, Prefix extends string = '', Key extends keyof T = keyof T> = Key extends Key ?
    JoinPrefix<Prefix, Key & string> | (T[Key] extends any[] ? ArrayKeyPath<T[Key], never, JoinPrefix<Prefix, Key & string>> :
        T[Key] extends object ? ObjectKeyPaths<T[Key], JoinPrefix<Prefix, Key & string>> : never) : never

type ArrayKeyPath<T extends any[], Res = never, Prefix extends string = '', Index extends number = 0> = T extends [infer Cur, ...infer Rest] ?
    ArrayKeyPath<Rest, Res | JoinPrefix<Prefix, `${Index}`> |
        (Cur extends any[] ? ArrayKeyPath<Cur, never, JoinPrefix<Prefix, `${Index}`>> :
            Cur extends object ? ObjectKeyPaths<Cur, JoinPrefix<Prefix, `${Index}`>> : never)
        , Prefix, AddOne<Index> & number> : Res


interface Person {
    name: 'zzx',
    hobby: [
        {
            name: '健身',
            num: number
        },
        {
            name: 'zz',
            z: 1
        },
        string,
        [1, 2, 3]
    ],
    address: {
        city: string
    }
}

type test = ObjectKeyPaths<Person>


export { }