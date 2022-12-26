type CamelCase<Str extends string> = Str extends `${infer Left}_${infer Char}${infer Rest}` ? 
`${Left}${Uppercase<Char>}${CamelCase<Rest>}` : Str

type tuple = ['zzx_love_hhh','i_love_china']

type CamelStrArr<Arr extends unknown[]> = Arr extends [infer Str,...infer Rest] ? [CamelCase<Str&string>,...CamelStrArr<Rest>] : []

type arr = CamelStrArr<tuple>

type union = CamelCase<'zzx_love_hhh'|'i_love_china'>


type TestUnion<A, B = A> = A  extends A ? { a: A, b: B} : never;

type TestUnionResult = TestUnion<'a' | 'b' | 'c'>;

type isUnion<A,B = A> = A extends A ? [B] extends [A] ? false : true : never
type test = isUnion<'1'|4>

//BEM css命名
type BEM<Block extends string,Elem extends string[],Modifier extends string[]> = `${Block}_${Elem[number]}-${Modifier[number]}`

type mybem = BEM<'zhixiang',['hhh','xxx'],['success','danger']>

// 全组合
// A,B => 'A'|'B'|'AB'|'BA'

type Combine<A extends string,B extends string> = A|B|`${A}${B}`|`${B}${A}`

type AllCombine<U,T = U> = U extends U ? Combine<U&string,AllCombine<Exclude<T,U>>> : never

type res = AllCombine<'A'|'B'|'C'>


export {}