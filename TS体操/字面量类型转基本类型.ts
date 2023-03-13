import type { wrapper } from '../index'

type Basic = [number, string, boolean, undefined, symbol]

type GetBasicType<T, B = Basic> = B extends [infer Item, ...infer Rest] ? T extends Item ? Item : GetBasicType<T, Rest> : T

type ToBasic<T extends object> = {
    [key in keyof T]: T[key] extends object ? ToBasic<T[key]> : GetBasicType<T[key]>
}

type PersonInfo = { name: 'Tom', age: 30, married: false, addr: { home: '123456', phone: '13111111111', obj: { a: '666' } } }



type res = wrapper<ToBasic<PersonInfo>>



export { }