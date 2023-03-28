// import { Application, Container } from "pixi.js";
// import { ActiveObject } from "../ActiveObject";
// import Board, { moveObject } from "../Board";
// import checkConflict from "../CheckConflict";
// import { TBoard } from "../Interface";

// export const drawNewActiveObject = async (
//   board: TBoard,
//   row: number,
//   col: number,
//   shapeIndex:number,
//   rotate: number,
//   obj: ActiveObject,
//   container: Container
// ) => {

  

//   // console.log("col", col);
//   let newActiveObj = await moveObject(obj, row, col, rotate);
//   // console.log("obj", obj);

//   let check = await  checkConflict(board, newActiveObj);
//   // console.log("check", check);

//   if (check == true) {
//     obj.position = newActiveObj.position
//     // console.log('obj now', obj);
    
//   }
  
//   else console.log("draw fail");
//   obj.updateCellPosition()
//     // console.log("newcell", obj.position);
//   }
