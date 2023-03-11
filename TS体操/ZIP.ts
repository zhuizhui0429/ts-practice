type Zip<T extends unknown[], K extends unknown[], Res extends unknown[] = []> =
    T extends [infer Item1, ...infer Rest1] ? K extends [infer Item2, ...infer Rest2] ?
    Zip<Rest1, Rest2, [...Res, [Item1, Item2]]> : Res : Res

type test1 = Zip<[1, 2], [true, false]>
type test2 = Zip<[], [1, 2, 3]>
type test3 = Zip<[[1, 2]], [3]>

export { }