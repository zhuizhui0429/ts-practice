type Currying<F extends Function> = F extends (first:infer First,...args:infer  Rest)=>infer Return ? 
Rest extends [] ? F : (first:First)=>Currying<(...args:Rest)=>Return> : never

declare function Curry<F extends Function>(fn:F):Currying<F>

Curry((name:string,age:number,obj:object)=>123)


// type Curry<F extends (...args:any)=>any,Args extends unknown[] = Parameters<F>> = 
// Args extends [infer T,...infer Rest] ? (arg:T)=>Curry<F,Rest> : ReturnType<F>

// declare function curry<F extends (...args:any)=>any,Args extends unknown[] = []>(func:F,...args:Args):Curry<F>

// curry(add)


// function add(a:number,b:string){
//     return 1
// }

// type res = ReturnType<()=>[1,2,3]>

// type test = Curry<()=>true>

// const curried1 = curry((a: string, b: number, c: boolean) => true)

// F['length'] extends T['length'] ? ReturnType<F> : (...args:any[])=>

// function curry(func:Function,...args:unknown[]){
//     if(func.length===args.length){
//         return func(...args)
//     }
//     return function(...res:unknown[]){
//         return curry(func,...args,...res)
//     }
// }


// const curryFunc = curry((a:number,b:number,c:number)=>a+b+c)
// console.log(curryFunc(1)(2)(3))


export {}