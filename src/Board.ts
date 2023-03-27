import checkConflict from "./CheckConflict";
import shapes from "./Shape";
import * as PIXI from "pixi.js";
import { ActiveObject } from "./ActiveObject";
import { TBoard } from "./Interface";

class Board {
  grid: TBoard
  cells: Record<string, PIXI.Sprite> = {}
  container: PIXI.Container
  // public static templateSprite: PIXI.Texture = null //templateSprite là một texture

  initBoard(row: number, col: number) {
     this.grid = []

     for (let i = 0; i < row+1; i++) {
      this.grid.push([])
      for (let j = 0; j < col+2; j++) {
        this.grid[i].push(1)
      }
      if (i < row) {
        for (let j=1; j<=col; j++) this.grid[i][j] = 0
      }
    }
    return this.grid
  }

  initContainer() {
    return this.container = new PIXI.Container();
  }

  addCell(row: number, col: number, blockStlyle: PIXI.Texture) {
    const key = `${row},${col}`
    let newSprite = new PIXI.Sprite(blockStlyle);
    newSprite.y = row
    newSprite.x = col
    this.cells[key] = newSprite;
  }

  transferCell(row: number, col: number, sprite: PIXI.Sprite) {
    const key = `${row},${col}`
    this.cells[key] = sprite;
    sprite.parent.removeChild(sprite)
    this.container.addChild(sprite)
  }



  removeCell(row: number, col: number) {
    const key = `${row},${col}`
    if(this.cells[key]) delete this.cells[key]
  }

}


export const moveObject =  (obj: ActiveObject, row: number, col: number, rotate: number = 0) => {
  // console.log('moveobjlog', obj);
  
  return {
    position: [obj.position[0] + row, obj.position[1] + col],
    shapeIndex: obj.shapeIndex,
    rotationIndex: (obj.rotationIndex + rotate + 4) % 4,

  } as ActiveObject
}

// checkConflict(moveObject(activeObject, 1, 0, 0), board)

export default Board