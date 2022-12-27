const add = (a:number,b:number)=>a+b

type params = Parameters<typeof add>

type returnType = ReturnType<typeof add>

interface Student{
    id:string
    name:string
    age?:number
}

type partialStu = Partial<Student>
type requiredStu = Required<Student>
type onlyStu = Readonly<Student>

type MyRequired<T extends object> = {
    [key in keyof T]-?: T[key]
}

type myRequiredStu = MyRequired<Student>
/**
 * 从对象中挑出一部分
 */
type obj = Pick<Student,'age'|'name'>
/**
 * 除去对象中的一部分属性，得到剩余属性组成的子对象
 */
type obj1 = Omit<Student,'age'>

type MyPick<T extends object,U extends keyof T> = {
    [key in U]:T[key]
}
/**
 * 过滤掉T中的U
 */
type MyExclude<T,U> = T extends U ? never : T

type exclude = MyExclude<'z'|'x'|'a','a'|'z'>

/**
 * 取出T中的U，求交集
 */
type MyExtract<T,U> = U extends T ? U : never

type extract = MyExtract<'1'|'2'|'3'|'4','2'|'6'|'4'>

type pro = Promise<Promise<6>>
type state = Awaited<pro>

export {}