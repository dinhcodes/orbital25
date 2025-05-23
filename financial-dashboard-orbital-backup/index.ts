const world = "Hello, world!";
export function hello(who: string = world): string {
  return `Hello, ${who}!`;
}
