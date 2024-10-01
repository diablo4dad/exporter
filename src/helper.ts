function partition<T>(input: T[], size: number): T[][] {
  const output = [];

  for (let i = 0; i < input.length; i += size) {
    output[output.length] = input.slice(i, i + size);
  }

  return output;
}

function pipe<A>(value: A): A;
function pipe<A, B>(value: A, fn1: (input: A) => B): B;
function pipe<A, B, C>(value: A, fn1: (input: A) => B, fn2: (input: B) => C): C;
function pipe<A, B, C, D>(value: A, fn1: (input: A) => B, fn2: (input: B) => C, fn3: (input: C) => D): D;
function pipe<A, B, C, D, E>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
): E;

function pipe(value: any, ...fns: Function[]) {
  return fns.reduce((acc, fn) => fn(acc), value);
}

function identity<T>(v: T): T {
  return v;
}

function hashCode(s: string) {
  return s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}

export { hashCode, identity, partition, pipe };

export function stu(string: string): string | undefined {
  return string === '' ? undefined : string;
}
