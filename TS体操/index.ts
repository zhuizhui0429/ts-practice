/**
 * 利用如下特点: 一个对象类型obj去掉其中若干可选属性后依然可以赋值给obj类型
 */

interface Person{
    name?:string
    age:number
    a?:undefined
}

type test1 =  Omit<Person,'name'> extends Person  ? true : false


type GetRequired<T extends Record<keyof any,any>> = {
    [key in keyof T as Omit<T,key> extends T ? never : key ]:T[key]
}


type required = GetRequired<Person>









export {}
// 需要得到 => type GroupKeys = 'a' | 'b';