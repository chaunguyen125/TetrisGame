// import { ActiveObject } from "../ActiveObject";
// import checkConflict from "../CheckConflict";
// import {  Board } from "../Interface";

// export const conflictDrop = (board: Board) => {
//   let activeObject: ActiveObject = {
//     position: [21, 5],
//     shapeIndex: 1,
//     rotationIndex: 0,
//   };
//   const isConflict = checkConflict(board, activeObject);
//   console.log("ConflictDrop", !isConflict);
// };

// export function conflictLeft(board: Board) {
//   let activeObject: ActiveObject = {
//     position: [10, 0],
//     shapeIndex: 1,
//     rotationIndex: 0,
//   };
//   const isConflict = checkConflict(board, activeObject);
//   console.log("ConflictLeft", !isConflict);
// }

// export function conflictRight(board: Board) {
//   let activeObject: ActiveObject = {
//     position: [10, 16],
//     shapeIndex: 1,
//     rotationIndex: 0,
//   };
//   const isConflict = checkConflict(board, activeObject);
//   console.log("ConflictRight", !isConflict);
// }

// export function noConflict(board: Board) {
//   let activeObject : ActiveObject = {
//     position: [10,10],
//     shapeIndex: 1,
//     rotationIndex: 0
//   }

//   const isConflict = checkConflict(board, activeObject);
//   console.log("accessDrop", isConflict);
// }

