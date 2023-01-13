/**
 * 高级类型: ThisType<T> 约束对象的方法内的this指向
 */

type ObjWithFuncProp = Record<string, (...args: any) => any>
type ComputedType<T extends ObjWithFuncProp> = {
    [key in keyof T]: ReturnType<T[key]>
}
type PropsType = Record<string, Function | { type: Function | Function[] } | {}>
/**
 * 有一些原生constructor是可以不带new调用的
 * 例如BooleanConstructor,new 调用返回Boolean, 不带new调用返回boolean
 * 有一些原生constructor则只有new调用签名例如Promise
 * 因此先推断不带new的情况, 再推带new的情况
 */
type MyReturnType<F> = F extends (...args: any) => infer R ? R : F extends new (...args: any) => infer R ? R : F
type Unionize<T> = T extends any[] ? T[number] : T
type InferPropsType<T extends PropsType> = {
    [key in keyof T]: MyReturnType<Unionize<T[key] extends { type: infer Type } ? Type : T[key] extends {} ? any : T[key]>>
}

declare function simpleVue<P extends PropsType = {}, D extends object = {}, C extends ObjWithFuncProp = {}, M extends ObjWithFuncProp = {}>(option: Partial<{
    props: P,
    data: (this: InferPropsType<P>) => D
    computed: C & ThisType<InferPropsType<P> & D & M & ComputedType<C>>
    methods: M & ThisType<InferPropsType<P> & D & ComputedType<C> & M>
}>): unknown


interface car {
    name: string
    size: number
}
interface CarConstructor {
    new(name: string, size: number): car
}

// const Car: CarConstructor = function (name: string, size: number) {
//     this.name = name
//     this.size = size
//     return this
// }



simpleVue({
    props: {
        name: Boolean,
        hobby: {
            type: String
        },
        much: {
            type: [Promise, Number]
        },
        empty: {}
    },
    data() {
        return {
            firstName: 'zzx',
            lastName: 'justin'
        }
    },
    computed: {
        fullName() {
            return this.firstName + this.lastName
        }
    },
    methods: {
        sayHello() {
            console.log(`hi ${this.fullName}`)
        },
        test() {

        }
    }
})

export { }