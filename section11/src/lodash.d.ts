
import _ from 'lodash';　//152 拡張
declare module 'lodash' {
  interface LoDashStatic { //152 拡張
    hello: string;
  }
}

// // 144
// declare module 'lodash' {
//   export function shuffle<T>(arr: T[]): T[]
// }

// 145
// interface Lodash {
//   shuffle<T>(arr: T[]): T[]
// }

// 146, 147namespace
// namespace myApp {
//   const hello = 'hello in namespace';
//   export const name = 'QUill';
//   export interface Nameable {
//     name: string;
//   }
// }
// const hello: myApp.Nameable;