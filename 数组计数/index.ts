type StrLen<Str extends string,Arr extends string[] = []> = Str extends `${infer Char}${infer Rest}` ? 
StrLen<Rest,[...Arr,Char]> : Arr['length']

type count = StrLen<'zzx'>

type IsMoreThan<Num1 extends number,Num2 extends number,Arr extends unknown[] = []> = Num1 extends Num2 ? false : 
Num2 extends Arr['length'] ? true : Num1 extends Arr['length'] ? false : IsMoreThan<Num1,Num2,[...Arr,unknown]>

type isMore = IsMoreThan<4,3>

type BuildArray<N extends number,Arr extends unknown[] = []> =  Arr['length'] extends N ? Arr : BuildArray<N,[...Arr,unknown]>

type FeiBo<N extends number,Pre extends unknown[] = [],Cur extends unknown[] = [unknown],Index extends unknown [] = [unknown]> =
N extends 1|2 ? 1 : N extends Index['length'] ? Cur['length'] : FeiBo<N,Cur,[...Pre,...Cur],[...Index,unknown]>

type Fei8 = FeiBo<8>



// type FeiBo<N extends number> = N extends 1|2 ? [unknown] : [...FeiBo<N-1>,...FeiBo<N-2>]['length'] 




export {}