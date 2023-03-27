// import { moveObject } from "../Board"
// import checkConflict from "../CheckConflict"
// import {  Board } from "../Interface"

// export const moveObjectRightTrue = (board: Board)=> {
//   const activeObject: ActiveObject = {
//     position: [10,10],
//     shapeIndex: 1,
//     rotationIndex: 0
//   }
//   const moveObj: ActiveObject = moveObject(activeObject, 0, 1, 0)
//   const check: boolean = checkConflict(board, moveObj)
//   console.log('RightTrue: moveObj, check', moveObj, check);
   
// }

// export const moveObjectRightFail = (board: Board)=> {
//   const activeObject: ActiveObject = {
//     position: [10,16],
//     shapeIndex: 1,
//     rotationIndex: 0
//   }
//   const moveObj: ActiveObject = moveObject(activeObject, 0, 1, 0)
//   const check: boolean = checkConflict(board, moveObj)
//   console.log('RightFail: moveObj, check', moveObj, check);
   
// }

// export const moveObjectLeftTrue = (board: Board)=> {
//   const activeObject: ActiveObject = {
//     position: [10,10],
//     shapeIndex: 1,
//     rotationIndex: 0
//   }
//   const moveObj: ActiveObject = moveObject(activeObject, 0, -1, 0)
//   const check: boolean = checkConflict(board, moveObj)
//   console.log('LeftTrue: moveObj, check', moveObj, check);
   
// }

// export const moveObjectLeftFail = (board: Board)=> {
//   const activeObject: ActiveObject = {
//     position: [10, 1],
//     shapeIndex: 1,
//     rotationIndex: 0
//   }
//   const moveObj: ActiveObject = moveObject(activeObject, 0, -1, 0)
//   const check: boolean = checkConflict(board, moveObj)
//   console.log('LeftFail: moveObj, check', moveObj, check);
   
// }

// export const moveObjectDropTrue = (board: Board)=> {
//   const activeObject: ActiveObject = {
//     position: [10,10],
//     shapeIndex: 1,
//     rotationIndex: 0
//   }
//   const moveObj: ActiveObject = moveObject(activeObject, 1, 0, 0)
//   const check: boolean = checkConflict(board, moveObj)
//   console.log('DropTrue: moveObj, check', moveObj, check);
   
// }

// export const moveObjectDropFail = (board: Board)=> {
//   const activeObject: ActiveObject = {
//     position: [20,10],
//     shapeIndex: 1,
//     rotationIndex: 0
//   }
//   const moveObj: ActiveObject = moveObject(activeObject, 1, 0, 0)
//   const check: boolean = checkConflict(board, moveObj)
//   console.log('DropFail: moveObj, check', moveObj, check);
   
// }