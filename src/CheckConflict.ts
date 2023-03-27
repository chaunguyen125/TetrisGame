import { ActiveObject } from "./ActiveObject";
import { TBoard } from "./Interface";
import shapes from "./Shape";

const checkConflict =  (board: TBoard, activeObject: ActiveObject) => {
  let [row, col] = activeObject.position;
  let shapeData = shapes[activeObject.shapeIndex][activeObject.rotationIndex];
  // {
  //     pivot: [1, 0],
  //     grid: [
  //       [1, 1, 1],
  //       [0, 1, 0],
  //     ],
  //   },

  //tính độ chênh lệch
  row -= shapeData.pivot[0]; //y
  col -= shapeData.pivot[1]; //x

  const { grid } = shapeData;
  for (let r = 0; r < grid.length; r++) {
    let rowData = grid[r];
    for (let c = 0; c < rowData.length; c++) {
      //r,c là của activeObj
      if (grid[r][c] == 1 && board[r + row]?.[c + col] == 1) {
        //[c+col] có thể bị ra ngoài board
        return false;
      }
    }
  }
  return true;
};

export default checkConflict;
