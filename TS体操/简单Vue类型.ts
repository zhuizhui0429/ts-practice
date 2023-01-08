/**
 * 高级类型: ThisType<T> 约束对象的方法内的this指向
 */

type ObjWithFuncProp = Record<string,(...args:any)=>any>
type ComputedType<T extends ObjWithFuncProp> = {
    [key in keyof T]:ReturnType<T[key]>
}
declare function simpleVue<D extends object = {},C extends ObjWithFuncProp = {},M extends ObjWithFuncProp = {}>(option:Partial<{
    data:(this:{})=> D
    computed:C & ThisType<D&M&ComputedType<C>>
    methods:M & ThisType<D&ComputedType<C>&M>
}>):unknown


simpleVue({
    data() {
        return {
            firstName:'zzx',
            lastName:'justin'
        }
    },
    computed:{
        fullName(){
            return this.firstName+this.lastName 
        }
    },
    methods:{
        sayHello(){
            console.log(`hi ${this.fullName}`) 
        },
        test(){

        }
    }
})




export {}