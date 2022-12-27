//KebabCaseToCamelCase
'zzx-abc-opi ===> zzxAbcOpi'

type ToCamelCase<Str extends string> = Str extends `${infer Left}-${infer Right}` ? `${Left}${Capitalize<ToCamelCase<Right>>}` : Str
type res = ToCamelCase<'zzx-abc-opi'>

// CamelCaseToKebabCase
type ToKebabCase<Str extends string> = Str extends `${infer Char}${infer Rest}` ? Char extends Lowercase<Char> ? 
`${Char}${ToKebabCase<Rest>}` : `-${Lowercase<Char>}${ToKebabCase<Rest>}` : Str

type res1 = ToKebabCase<'zzxAbcOpi'>

//chunk: 对数组做分组,两两一组
type GenerateChunk<Arr extends unknown[],Result extends unknown[] = []> = Arr extends [infer F,infer S,...infer Rest] ? 
GenerateChunk<Rest,[...Result,[F,S]]> : [...Result,Arr]

type chunks = GenerateChunk<[1,2,3,4,5,6,7]>


// TupleToObject
//'['a','b','c'] , 'x''

type TupleToObject<T extends unknown[],Value> =  T extends [infer Ele,...infer Rest] ? 
{[key in Ele as key extends keyof any ? key : never]:TupleToObject<Rest,Value>} : Value

type obj =  TupleToObject<['a','b','c','d','e','f'],666>

// PartialObjectByKeys 把对象的一部分keys变成可选，其余不变
type PartialByKeys<Obj extends object,U extends keyof Obj> = Omit<Obj,U> & Partial<Pick<Obj,U>>
type Copy<Obj extends object> = {
    [key in keyof Obj]:Obj[key]
}
interface Stu{
    name:string
    age:number
    sayHello():string
}
type partStu = Copy<PartialByKeys<Stu,'name'>>

type RemoveFirstSpliter<Str extends string,Spliter extends string> = Str extends `${Spliter}${infer Rest}` ? Rest : Str
type JoinChars<Chars extends unknown[],Spliter extends string> = Chars extends [infer Char,...infer Rest] ? 
`${Spliter}${Char&string}${JoinChars<Rest,Spliter>}` : ''



type res6= RemoveFirstSpliter<JoinChars<['zzx','love','coding'],','>,','>

declare function join<Spliter extends string>(split:Spliter):<Chars extends string[]>(chars:Chars)=>RemoveFirstSpliter<JoinChars<Chars,Spliter>,Spliter>

// deepCamcel
type Camcel<Str extends string> = Str extends `${infer Left}_${infer Right}` ? `${Left}${Capitalize<Camcel<Right>>}` : Str

type HandleArr<Arr> = Arr extends [infer Item,...infer Rest] ? [DeepCamel<Item>,...HandleArr<Rest>] : []

type DeepCamel<Obj> = Obj extends any[] ? HandleArr<Obj> :
 Obj  extends Record<string,any> ?  {
    [key in keyof Obj as Camcel<key&string>] : DeepCamel<Obj[key]>
} :  Obj

type input = {
    aaa_bbb: string;
    bbb_ccc: [
        {
            ccc_ddd: string;
        },
        {
            ddd_eee: string;
            eee_fff: {
                fff_ggg: string;
            }
        }
    ]
}
type test = DeepCamel<input>


// allKeyPath : 拿到一个对象所有的key组成的全部path

interface Obj{
    a:{
        b:'c',
        d:'e'
    },
    f:{
        g:{
            h:'k'
        },
        i: 'z'
    }
}

type GetAllKeyPaths<Obj> = {
    [key in keyof Obj] : key extends string ? Obj[key] extends object ? key|`${key}.${GetAllKeyPaths<Obj[key]>}` : key  :never
}[keyof Obj]

type paths = GetAllKeyPaths<Obj>


// defualtize: A,B两个对象合并, A中独有属性不变，AB公共或者B独有属性变为可选

type Defaultize<A extends object,B extends object> = Pick<A,Exclude<keyof A,keyof B>> &
 Partial<Pick<A,Extract<keyof A,keyof B>>> & Partial<Pick<B,Exclude<keyof B, keyof A>>>
type Wrapper<Obj extends object> = {
    [key in keyof Obj]:Obj[key]
}

interface ObjA{
    name:'zzx',
    age:21,
    sayHello:()=>string
}
interface ObjB{
    name:'zzx',
    id:string
}
type defaultObj = Wrapper<Defaultize<ObjA,ObjB>>

