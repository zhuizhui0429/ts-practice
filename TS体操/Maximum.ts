// 思路：将数字转成数组，提取高级类型IsLessThan通过同时遍历两个数组看谁先结束来比较数字大小。
// 最后依次遍历原数组，预设Max泛型参数与当前遍历的数字比较大小从而更新max直到遍历完原数组，max即为最大值。

type Num2Tuple<N extends number, Res extends unknown[] = []> = Res['length'] extends N ? Res : Num2Tuple<N, [...Res, unknown]>

type IsLessThan<N1 extends number, N2 extends number, L extends unknown[] = Num2Tuple<N1>, R extends unknown[] = Num2Tuple<N2>> =
    L extends [infer CurL, ...infer RestL] ? R extends [infer CurR, ...infer RestR] ?
    IsLessThan<RestL['length'], RestR['length']> : false : true

type Maximum<T extends number[], Max extends number = 0, InitialT extends number[] = T> =
    InitialT['length'] extends 0 ? never :
    T extends [infer Cur extends number, ...infer Rest extends number[]] ?
    IsLessThan<Max, Cur> extends true ? Maximum<Rest, Cur, InitialT> : Maximum<Rest, Max, InitialT> : Max

type res = Maximum<[1, 6, 8, 4, 7]>

type res2 = Maximum<[]>


export { }