var globalHello = 'hello';
function echo(message) {
    if (message) {
        return message;
    }
}
var implicitAny;
implicitAny = 'implicitAny';
var nullableMessage = echo('hi');
var undefinedableMessage = undefined;
var onlyNull = null;
var onlyUndefined = undefined;
if (nullableMessage) {
    nullableMessage.toUpperCase();
}
echo.call(null, 'hi');
