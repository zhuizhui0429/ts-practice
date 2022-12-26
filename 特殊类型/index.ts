/**
 * never的特点: 当条件表达式左边为类型参数并且该参数传值为never时, 则整个表达式的值为never
 */
type Test<T> = T extends never ? '是never' : '不是never'
type test = Test<never>

type IsNever<T> = [T] extends [never] ? true : false 

/**
 * 联合类型转成交叉类型
 */
type UnionToIntersection<U> = (U extends U ? (x:U)=>unknown : never) extends (x:infer R)=>unknown ? R : never
type inter = UnionToIntersection<{name:'zzx'}|{age:18}>


interface Person{
    id?:string
    name:string
}

type tempt = Pick<Person,'id'>


/**
 * 对象某个属性可选时, 用in循环遍历时, 通过Pick得到该属性key组成的对象时，会得到空对象
 */
type GetPartial<Obj extends Record<string,any>> = {
    [key in keyof Obj as {} extends Pick<Obj,key> ? key : never]:Obj[key]
}
type res = GetPartial<Person>



export {}