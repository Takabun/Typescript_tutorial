let globalHello = 'hello';
function echo(message: string): string | undefined {
  if (message) {
    return message;
  }
}
let implicitAny;
implicitAny = 'implicitAny';

let nullableMessage = echo('hi');
let undefinedableMessage: string | undefined = undefined;
let onlyNull: null = null;
let onlyUndefined: undefined = undefined;
if (nullableMessage) {
  nullableMessage.toUpperCase();
}
// call/bind/apply: オブジェクトの中のthisが何を指すかを第一引数で明示する
echo.call(null, 'hi')