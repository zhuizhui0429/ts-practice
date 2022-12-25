/**
 * 数组操作
 */
type First<T extends unknown[]> = T extends [infer F,...infer Res] ? F :never
type Last<T extends unknown[]> = T extends [...infer Sub,infer Last] ? Last : never
type f = First<[1,2,3]>
type last = Last<[1,2,3]>


type Pop<T extends unknown[]> = T extends [...infer Sub,any] ? Sub:never
type pop = Pop<[1,2,3]>

/**
 * 字符串操作
 */

type StartWith<Str extends string,Prefix extends string> = Str extends `${Prefix}${string}` ? true : false
type isStart = StartWith<'zzx','zx'>

type Replace<Origin extends string,From extends string,To extends string> = Origin extends `${infer Pre}${From}${infer Suf}` ? 
`${Pre}${To}${Suf}` : '无法替换'
type replaceRes = Replace<'zzx is a student!!','student','coder'>

type TrimLeft<S extends string> = S extends `${' '|'\t'|'\n'}${infer Res}` ? TrimLeft<Res>:S
type trimLeftRes = TrimLeft<' 12313 sadasd 12 '>

/**
 * 函数操作
 */
type Params<F extends Function> = F extends (...args:infer Args)=>any? Args : never
type getReturnType<F extends Function> = F extends (...args:any[])=>infer Return ? Return : never


type GetRefFromProps<Props extends object> = 'ref' extends keyof Props ? Props extends {ref:infer Val | undefined} ? Val : never : never

interface Props {
    name:string
    age:number
    ref:[1,2,3]
}
type res = GetRefFromProps<Props>

interface obj1{
    name:string
}
interface obj2{
    name:string
    age:number
}
const zzx:obj2 = {
    name:'zzx',
    age:21
}
const tz:obj1 = zzx

type test = obj2 extends obj1 ? true : false


export {}