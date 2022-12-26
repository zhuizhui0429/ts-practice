/**
 * 数组重新构造
 */
type T1 = [1,2,3]
type T2 = ['z','z','x']
// type Target = [[1,'z'],[2,'z'],[3,'x']]

type Merge<One extends unknown[],Two extends unknown[]> = One extends [infer OneFirst,...infer OneRest] ? 
Two extends [infer TwoFirst,...infer TwoRest] ? [[OneFirst,TwoFirst],...Merge<OneRest,TwoRest>] : [] : []

type Target = Merge<T1,T2>

/**
 * 字符串重新构造
 */
type MyCapitalize<Str extends string> = Str extends `${infer F}${infer Rest}` ? `${Uppercase<F>}${Rest}` :  ''
type Char = MyCapitalize<'csadsad'>

type Camel<Str extends string> = Str extends `${infer Left}_${infer Char}${infer Rest}` ? `${Left}${Uppercase<Char>}${Camel<Rest>}` : Str
type Res = Camel<'zhou_zhi_xiang'>

type DeleteSubStr<Str extends string,SubStr extends string> = Str extends `${infer Prefix}${SubStr}${infer Suffix}` ?
DeleteSubStr<`${Prefix}${Suffix}`,SubStr> : Str
type Deleted = DeleteSubStr<'11zzxlovezzxhhh','zzx'>

/**
 * 函数重新构造
 */
type AppendArgument<Func extends Function,Arg> = Func extends (...args:infer Args)=>infer ReturnType ? 
(...args:[...Args,Arg])=>ReturnType :never

function add(one:number,two:string){
    return String(one).concat(two)
}
type NewFunc = AppendArgument<typeof add,'新参数类型'>

/**
 * 索引类型重新构造
 */
interface Person{
    name:string
    sayHello:()=>string
    age:number
}
type UppercaseObj<T extends Record<string,any>> = {
    [key in keyof T as Uppercase<key&string>]:T[key]
}
type newObj = UppercaseObj<Person>

//按照值的类型保留特定key
type FilterByValueType<T extends Record<string,any>,Val> = {
    [key in keyof T as T[key] extends Val?key:never]:T[key]
}
type test = FilterByValueType<Person,number>
export {}