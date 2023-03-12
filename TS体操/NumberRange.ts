type Num2Tuple<N extends number, T extends unknown[] = []> = T['length'] extends N ? T : Num2Tuple<N, [...T, unknown]>

type Add<A extends number, B extends number> = [...Num2Tuple<A>, ...Num2Tuple<B>]['length']


type NumberRange<Min extends number, Max extends number, Cur extends number = Min, Tuple extends number[] = []> =
    Cur extends Add<Max, 1> ? Tuple[number] : NumberRange<Min, Max, Add<Cur, 1> & number, [...Tuple, Cur]>

type test = NumberRange<88, 100>


const num: test = 99

export { }