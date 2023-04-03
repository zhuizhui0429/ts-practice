type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']

type Join<S extends string, T extends string[]> =
    T extends [infer Cur extends string, ...infer Rest extends string[]] ? `${S} ${Cur}` | Join<S, Rest> : never

type Combination<T extends string[]> =
    T extends [infer Cur extends string, ...infer Rest extends string[]] ? Join<Cur, Rest> | Combination<Rest> : never

type test = Combination<ModifierKeys>




export { }