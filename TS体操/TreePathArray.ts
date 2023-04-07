type Path<T extends object, PrePaths extends (keyof any)[] = [], Key extends keyof T = keyof T> =
    Key extends Key ? [...PrePaths, Key] | (T[Key] extends object ? Path<T[Key] & object, [...PrePaths, Key]> : never) : never


/**
 * 下面时github issue里面看到的解法，感觉很简洁👍
 */
type PathGithub<T> = T extends object
    ? {
        [K in keyof T]: [K] | [K, ...Path<T[K]>];
    }[keyof T]
    : [];


declare const example: {
    foo: {
        bar: {
            a: string;
        };
        baz: {
            b: number
            c: number
        }
    };
}

type res = Path<typeof example>

type res2 = Path<typeof example['foo']>

type test = [1, ...([5, 6] | [7, 8])]


export { }