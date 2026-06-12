export function fizzbuzz(n: number): "fizz" | "buzz" | number {

  if(n % 3 === 0){
    return 'fizz';
  }
  if (n === 5) {
    return 'buzz';
  }
  return n;
}
