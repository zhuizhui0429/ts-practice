type CamelCase<S extends string> = S extends `${infer Cur}${infer Next}${infer Rest}` ?
    Cur extends '_' ? `${Uppercase<Next>}${CamelCase<Rest>}` : `${Lowercase<Cur>}${CamelCase<`${Next}${Rest}`>}` : Lowercase<S>


type camelCase1 = CamelCase<'hello_world_with_types'> // expected to be 'helloWorldWithTypes'
type camelCase2 = CamelCase<'HELLO_WORLD_WITH_TYPES'> // expected to be same as previous one





export { }