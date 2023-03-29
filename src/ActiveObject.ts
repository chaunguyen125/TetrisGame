
import Board from "./Board";
import * as PIXI from 'pixi.js'
import shapes from "./Shape";

export class ActiveObject {

  position: number[] //position pivot
  shapeIndex: number
  rotationIndex: number
  container: PIXI.Container
  cells: PIXI.Sprite[] = []
  board:Board
  blockSize: number
  blockStyle: PIXI.Texture

  public constructor(container: PIXI.Container, row: number, col: number, shapeIndex: number, rotationIndex: number, blockSize: number, blockStyle: PIXI.Texture) {
    this.position = [row, col]
    this.shapeIndex = shapeIndex
    this.rotationIndex = rotationIndex
    this.container = container
    this.blockSize = blockSize
    this.blockStyle = blockStyle
    this.addCells(container)
  }

  getShapeData() {
    return shapes[this.shapeIndex][this.rotationIndex]
  }

  updateCellPosition() {    
    const { grid, pivot } = this.getShapeData()
    let i = 0
    for (let r = 0; r < grid.length; r++) {
      const rr = grid[r]
      for (let c = 0; c < rr.length; c++) {
        if (grid[r][c] == 1) {
          this.cells[i].x = (this.position[1] + c - pivot[1])*this.blockSize
          this.cells[i].y = (this.position[0] + r - pivot[0])*this.blockSize
          i++
        }
      }
    }
  }

  addCells(container: PIXI.Container) {
    const grid = shapes[this.shapeIndex][this.rotationIndex].grid
    for (let r = 0; r < grid.length; r++) {
      const rr = grid[r]
      for (let c = 0; c < rr.length; c++) {
        if (grid[r][c] == 1) {          
          let sprite = new PIXI.Sprite(this.blockStyle);
          sprite.alpha = 1
          sprite.x = (c+this.position[1])*this.blockSize
          sprite.y = (r+this.position[0])*this.blockSize          
          this.cells.push(sprite)
          container.addChild(sprite);
        }
      }
    }
  }

  moveObject =  (obj: ActiveObject, row: number, col: number, rotate: number = 0) => {
    // console.log('moveobjlog', obj);
    
    return {
      position: [obj.position[0] + row, obj.position[1] + col],
      shapeIndex: obj.shapeIndex,
      rotationIndex: (obj.rotationIndex + rotate + 4) % 4,
  
    } as ActiveObject
  }

}