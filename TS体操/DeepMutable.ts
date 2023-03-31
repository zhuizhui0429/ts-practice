
type DeepMutable<T extends object> = {
    - readonly [key in keyof T]: T[key] extends object ? DeepMutable<T[key]> : T[key]
}

interface Person {
    readonly id: number
    readonly name: string
    son: {
        readonly id: number
        readonly name: string
        hobby: string[]
    }
}



export { }