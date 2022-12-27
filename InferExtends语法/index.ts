type Last<Arr extends string[]> = Arr extends [...infer Rest,infer L extends string] ? `最后一位是${L}` : never

type res = Last<['z','z','x']>

type StrToNum<Str extends string> = Str extends `${infer Num extends number}` ? Num : Str

type test = StrToNum<'123'>


export {}