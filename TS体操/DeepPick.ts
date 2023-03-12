type MyPick<T extends object, U extends keyof T> = {
    [key in keyof T as key extends U ? key : never]: T[key]
}

interface Person {
    name: string
    age: number
    address: {
        city: string,
    },
    friend: {
        name: string,
        parent: {
            name: 'zzx'
        }
    }
}
type test = MyPick<Person, 'address' | 'name'>

type JoinPrefix<P extends string, S extends string> = P extends '' ? S : `${P}.${S}`

/**
 * 得到一个对象类型的所有可能的属性path组成的联合类型
 */
type GetObjAllPaths<T extends Record<string, any>, Prefix extends string = '', Key extends keyof T = keyof T> =
    Key extends Key ? T[Key] extends object ?
    JoinPrefix<Prefix, Key & string> | GetObjAllPaths<T[Key], JoinPrefix<Prefix, Key & string>>
    : JoinPrefix<Prefix, Key & string> : never

type paths = GetObjAllPaths<Person>


type Path2Keys<Path extends string, Res extends string[] = []> = Path extends `${infer key}.${infer Rest}` ?
    Path2Keys<Rest, [...Res, key]> : [...Res, Path]

type keys = Path2Keys<'apple.color.test'>


type Keys2Path<K extends string[], Path extends string = ''> = K extends [infer Item extends string, ...infer Rest extends string[]] ?
    Keys2Path<Rest, JoinPrefix<Path, Item>> : Path

type path = Keys2Path<['zzx', 'love', 'fitness']>


type SingleDeepPick<T extends Record<string, any>, Path extends string, InitialPath extends string = Path, Keys extends string[] = Path2Keys<Path>> =
    Keys extends [infer Key extends string, ...infer Rest extends string[]] ?
    Rest['length'] extends 0 ? { [key in InitialPath]: T[Key] } :
    T[Key] extends object ? SingleDeepPick<T[Key], Keys2Path<Rest>, InitialPath> : never : never

type test1 = SingleDeepPick<Person, 'friend.name'>

type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type DeepPick<T extends Record<string, any>, Path extends GetObjAllPaths<T>> =
    UnionToIntersection<Path extends Path ? SingleDeepPick<T, Path> : never>



type test2 = DeepPick<Person, 'friend.parent.name' | 'friend.parent' | 'age' | 'friend' | 'name'>




export { }