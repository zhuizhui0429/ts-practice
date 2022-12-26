type ttt = Promise<Promise<Promise<Record<string, any>>>>;

type DeepGetProState<Pro> = Pro extends Promise<infer State> ? DeepGetProState<State> : Pro

type Pro = Promise<Promise<Promise<6>>>
type state = DeepGetProState<Pro>
/**
 * 数组递归
 */
type Tuple = [1,2,3,4,5]

type Reverse<T extends unknown[]> = T extends [...infer Pre,infer Last] ?
[Last,...Reverse<Pre>]: []
type reverse = Reverse<Tuple>

type IsEqual<A,B> = (A extends B ? true : false) & (B extends A ? true : false)

type Includes<Arr extends unknown[],Target> = Arr extends [infer Cur,...infer Rest] ? IsEqual<Cur,Target> extends true ? true : 
Includes<Rest,Target> : false 
type isIn = Includes<Tuple,5>

type RemoveItem<Arr extends unknown[],Target,Res extends unknown[] = []> =  Arr extends [infer Cur,...infer Rest] ? 
IsEqual<Cur,Target> extends true ? RemoveItem<Rest,Target,[...Res]> : RemoveItem<Rest,Target,[...Res,Cur]> : Res
type moveRes = RemoveItem<Tuple,2>

type BuildArray<Len extends number,Ele = unknown, Result extends any[] = []> = Result['length'] extends Len ? Result : 
BuildArray<Len,Ele,[...Result,Ele]>
type myarr = BuildArray<9,'zzx'>

type ReplaceAll<Origin extends string,From extends string,To extends string> = Origin extends `${infer Left}${From}${infer Right}` ? 
`${Left}${To}${ReplaceAll<Right,From,To>}` : Origin
type str = ReplaceAll<'zzx love coding zzx asd zz','zz','66'>

/**
 * 字符串递归
 */
type StrToUnion<Str extends string> = Str extends `${infer Char}${infer Rest}` ? Char|StrToUnion<Rest> : never
type union = StrToUnion<'zzx love you'>

type ReverseStr<Str extends string> = Str extends `${infer Char}${infer Rest}` ? `${ReverseStr<Rest>}${Char}` : ''
type strReverse = ReverseStr<'zzx'>


export {}