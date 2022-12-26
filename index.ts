const str = 'hello ts'
/**
 * 解析query
 */

// a=1&b=2&c=3 ===> {a:1,b:2,c:3}

type ParseEqual<E extends string> = E extends `${infer key}=${infer val}` ? {[k in key]:val} : {}
type MergeObj<Obj1 extends object,Obj2 extends object> = {
    [key in keyof Obj1 | keyof Obj2] : key extends keyof Obj1 ? key extends keyof Obj2 ? 
    mergeValues<Obj1[key],Obj2[key]> : Obj1[key] : key extends keyof Obj2 ? Obj2[key] : never
}

type mergeValues<Val1,Val2> = Val1 extends Val2 ? Val1 : Val2 extends any[] ? [Val1,...Val2] : [Val1,Val2]

type ParseQuery<Q extends string> = Q extends `${infer Equal}&${infer Rest}` ? MergeObj<ParseEqual<Equal>,ParseQuery<Rest>> :
ParseEqual<Q>

type res = ParseQuery<'a=1&b=2&c=3&a=3&a=6'>



export {}

