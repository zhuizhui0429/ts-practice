import { Equal } from "@type-challenges/utils"

/**
 * 思路：
 *  1.先得到所有对象的键组成的联合类型,最终结果target有且仅有这些类型
 *  2.将数组[target,...source]进行逆序, 最终target里每一个属性的类型应该是用key在逆序后的数组里顺序查找，找到的第一个值类型即满足要求
 * 
 */
type Reverse<T extends object[], R extends object[] = []> =
    T extends [infer Item extends object, ...infer Rest extends object[]] ? Reverse<Rest, [Item, ...R]> : R

type FindFirstType<T extends object[], K extends keyof any> =
    T extends [infer Item extends object, ...infer Rest extends object[]] ? K extends keyof Item ? Item[K] : FindFirstType<Rest, K> : never

type GetAllKeys<T extends object[], U = never> =
    T extends [infer Item extends object, ...infer Rest extends object[]] ? GetAllKeys<Rest, U | keyof Item> : U


type Assign<T extends object, S extends object[], List extends object[] = Reverse<[T, ...S]>> = {
    [key in GetAllKeys<List>]: FindFirstType<List, key>
}

type Target = {
    a: 'a'
    d: {
        hi: 'hi'
    }
}

type Origin1 = {
    a: 'a1',
    b: 'b'
}


type Origin2 = {
    b: 'b2',
    c: 'c'
}

type Answer = {
    a: 'a1',
    b: 'b2',
    c: 'c'
    d: {
        hi: 'hi'
    }
}

type MyRes = Assign<Target, [Origin1, Origin2]>

type isCorrect = Equal<MyRes, Answer>





// type test = GetAllKeys<Reverse<[Target, Origin1, Origin2]>>












export { }