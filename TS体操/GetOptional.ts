type GetOptional<T extends Record<keyof any, any>> = {
    [key in keyof T as Omit<T, key> extends T ? key : never]: T[key]
}

interface Person {
    name: string
    id: number
    hobby?: string[]
    sex?: 'male' | 'female'
}

type test = GetOptional<Person>


export { }