import { Equal } from '@type-challenges/utils'

type TupleFilter<T extends unknown[], K> =
    T extends [infer Cur, ...infer Rest] ? [...(Equal<K, Cur> extends true ? [] : [Cur]), ...TupleFilter<Rest, K>] : []

type res = TupleFilter<[1, 2, 3, null, 5, null], null>


export { }