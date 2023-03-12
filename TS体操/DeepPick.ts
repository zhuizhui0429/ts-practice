type MyPick<T extends object, U extends keyof T> = {
    [key in keyof T as key extends U ? key : never]: T[key]
}

interface Person {
    name: string
    age: number
    hobby: string,
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
type test = MyPick<Person, 'hobby' | 'name'>

type GetObjAllPaths<T extends Record<string, any>, Prefix extends string = '', Key extends keyof T = keyof T> =
    Key extends Key ? T[Key] extends object ?
    GetObjAllPaths<T[Key], Prefix extends '' ? Key : `${Prefix}.${Key & string}`>
    : Prefix extends '' ? Key : `${Prefix}.${Key & string}` : never

type paths = GetObjAllPaths<Person>


type Path2Keys<Path extends string, Res extends string[] = []> = Path extends `${infer key}.${infer Rest} ` ?
    Path2Keys<Rest, [...Res, key]> : [...Res, Path]

type Keys2Path<K extends string[], Path extends string = ''> = K extends [infer Item extends string, ...infer Rest extends string[]] ?
    Keys2Path<Rest, Path extends '' ? Item : `${Path}.${Item} `> : Path

type keys = Path2Keys<'apple.color.test'>

type SingleDeepPick<T extends Record<string, any>, Path extends string, InitialPath extends string = Path, Keys extends string[] = Path2Keys<Path>> =
    Keys extends [infer Key extends string, ...infer Rest extends string[]] ?
    Rest['length'] extends 0 ? Record<InitialPath, T[Path]> :
    T[Key] extends object ? SingleDeepPick<T[Key], Keys2Path<Rest>, InitialPath> : never : never

type test1 = SingleDeepPick<Person, 'friend.parent.name'>

type DeepPick<T extends Record<string, any>, Path extends GetObjAllPaths<T>> = Path extends Path ? SingleDeepPick<T, Path> : never

type test2 = DeepPick<Person, 'name' | 'friend.parent' | 'friend.parent.name'>

export { }