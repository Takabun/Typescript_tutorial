interface Engineer {
  name: string;
  role: string;
}
interface Blogger {
  name: string;
  follower: number;
}
// type EngineerBlogger = Engineer & Blogger;
interface EngineerBlogger extends Engineer, Blogger { }

const quill: EngineerBlogger = {
  name: 'Quill',
  role: 'front-end',
  follower: 1000
}
type NumberBoolean = number | boolean;
type StringNumber = string | number;
type Mix = NumberBoolean & StringNumber;

// 78 関数のオーバーロード 同じ関数を複数回書く。こうする事で関数の型を正しく伝えられる。upperHelloに型アサーションを書かずに済む
function toUpperCase(x: string): string;
function toUpperCase(x: number): number;
function toUpperCase(x: string | number): string | number {
  if (typeof x === 'string') {
    // typeofでxをstringだと確定させないと、toUpperCaseは使えない
    return x.toUpperCase();
  }
  return x;
}

// 83 関数型のオーバーロードの箇所
interface TmpFunc {
  (x: string): number;
  (x: number): number;
}
// 83 右側にはユニオン型しか描けない
const upperHello: TmpFunc = function (x: string | number) { return 0 };

// // // 84 関数型のインターセクション
// interface FuncA {
//   (a: number, b: string): number;
//   (a: string, b: number): number;
// }
// interface FuncB {
//   (a: string): number;
// }
// let intersectionFunc: FuncA & FuncB;
// intersectionFunc = function (a: number | string, b?: number | string) { return 0 }

interface FuncA {
  (a: number, b: string): number;
}
interface FuncB {
  (a: string): string;
}
let unionFunc: FuncA | FuncB;

type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
  // この時点ではnameプロパティにしかアクセスできない
  console.log(nomadWorker.name);
  if ('role' in nomadWorker) {
    console.log(nomadWorker.role);
  }
  if ('follower' in nomadWorker) {
    console.log(nomadWorker.follower);
  }
}


class Dog {
  // kind: タグをつけることで型を絞りこむ事であとでswitchで分岐できる (instance ofで十分な気もする)
  kind: 'dog' = 'dog'
  speak() {
    console.log('bow-wow');
  }
}
class Bird {
  kind: 'bird' = 'bird';
  speak() {
    console.log('tweet-tweet');
  }
  fly() {
    console.log('flutter');
  }
}
type Pet = Dog | Bird;
function havePet(pet: Pet) {
  pet.speak();
  switch (pet.kind) {
    case 'bird':
      pet.fly();
  }
  if (pet instanceof Bird) {
    pet.fly();
  }
}
havePet(new Bird());

// 型アサーションを使って型を上書きする
// .getElementById('input')はHTMLElementもしくはnullだが、TYpescriptはそこまでこの時点で判別できない。
// その中で.valueがあることをこの場で言い切って保障する必要がある
// ①前半に<HTMLInputElement> ②後半に as HTMLInputElement
// !を一番後ろにつけることで、nullは存在しないと言い切ってしまうのも手(76)
const input = document.getElementById('input') as HTMLInputElement;
input.value = 'initial input value';
(<HTMLInputElement>document.getElementById('input')).value = 'initial input value';

interface Designer {
  name: string;
  // インデックスシグナチャ。こうする事で、const designerでroleなど幾つでもメンバを追加できる。
  // 基本的には使わない
  [index: string]: string;
}

const designer: Designer = {
  name: 'Quill',
  role: 'web'
}

interface DownloadedData {
  id: number;
  user?: {
    name?: {
      first: string;
      last: string;
    }
  }
}
const downloadedData: DownloadedData = {
  id: 1
}
// userはあるかどうか分からないので!か?をつける
console.log(downloadedData.user?.name?.first);

// 80 Nullish Coalesting: ??左側がfalseならば右側(no-user)がtrueになる
const userData = downloadedData.user ?? 'no-user';
// 81 Lookup型。型を知りたい時はDownloadedData.idではムリ
type id = DownloadedData["id"]

enum Color {
  RED,
  BLUE
}

// 82 型の互換性。下記クラスでprivateをつけるとtarget = source;でエラーになる
class AdvancedPerson {
  name: string = 'Peter'
  age: number = 35;
}
class AdvancedCar {
  name: string = 'Prius'
  age: number = 5;
}
let target = new AdvancedPerson();
let source = new AdvancedCar();
target = source;

// 86 レストパラメーター
function advancedFn(...args: readonly number[]) {
}
advancedFn(0, 1)
const milk = 'milk' as const;
let drink = milk;
const array = [10, 20] as const;
const peter = {
  name: 'Peter',
  age: 38
} as const;
type PeterType = typeof peter;