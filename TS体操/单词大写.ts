type StrToUnion<
    Str extends string,
    Tuple extends string[] = []
> = Str extends `${infer Char}${infer Rest}`
    ? StrToUnion<Rest, [...Tuple, Char]>
    : Tuple[number];
type WordChars =
    StrToUnion<"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ">;

type CapitalizeWords<
    Str extends string,
    ShouldCapitalize extends boolean = true
> = Str extends `${infer Char}${infer Rest}`
    ? `${ShouldCapitalize extends true ? Uppercase<Char> : Char}${CapitalizeWords<
        Rest,
        Char extends WordChars ? false : true
    >}`
    : Str;

type test = CapitalizeWords<"hello zzx i am hhh">;

type capitalized = CapitalizeWords<"hello world, my friends">;


type res = CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp'>
export { };
