
import Board, { moveObject } from "./Board";
import { Board as IBoard } from "./Interface";
import * as PIXI from 'pixi.js'
import shapes from "./Shape";
import checkConflict from "./CheckConflict";

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
    console.log('BlockStyle', this.blockStyle);
    
    const { grid, pivot } = this.getShapeData()
    let i = 0
    for (let r = 0; r < grid.length; r++) {
      const rr = grid[r]
      for (let c = 0; c < rr.length; c++) {
        if (grid[r][c] == 1) {
          this.cells[i].x = (this.position[1] + c - pivot[1])*this.blockSize
          this.cells[i].y = (this.position[0] + r - pivot[0])*this.blockSize
          i++
          // console.log('i', i);
          
        }
      }
    }
    // this.drawCells(container)  
    
      
  }


  addCells(container: PIXI.Container) {
    const grid = shapes[this.shapeIndex][this.rotationIndex].grid
    console.log('this blockStyle', this.blockStyle);
    for (let r = 0; r < grid.length; r++) {
      const rr = grid[r]
      for (let c = 0; c < rr.length; c++) {
        if (grid[r][c] == 1) {          
          let sprite = PIXI.Sprite.from(this.blockStyle);
          
          sprite.alpha = 1
          // console.log('sprite', sprite);

          sprite.x = (c+this.position[1])*this.blockSize
          sprite.y = (r+this.position[0])*this.blockSize
          
          
          this.cells.push(sprite)
          container.addChild(sprite);
        }
      }
    }
  }

 

}