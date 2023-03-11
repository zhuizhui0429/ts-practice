
const arr = [1, 2, 3, 3] as const


type GetUniqueArr<T extends number[], Appear = never, Much = never, U = T[number]> = T extends [infer Item, ...infer Rest extends number[]] ?
    Item extends Appear ? GetUniqueArr<Rest, Appear, Much | Item, U> : GetUniqueArr<Rest, Appear | Item, Much, U> :
    Exclude<U, Much>

type tuple = [1, 2, 3, 3, 3, 2, 6, 7, 8, 6]

type res = GetUniqueArr<tuple>




export { }