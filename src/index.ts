import * as _ from "lodash";
import * as PIXI from "pixi.js";
import Board, { moveObject } from "./Board";
import { Color, Container } from "pixi.js";
import { ActiveObject } from "./ActiveObject";
import shapes from "./Shape";
import checkConflict from "./CheckConflict";

let app: any;
let activeObj: ActiveObject; // khởi tạo 1 lần
let board = new Board(); // Khời tạo 1 lần
const blockSize: number = 25;
let imgBlock: PIXI.Texture[] = []
const createUIActiveObject = (container: Container) => {
  let rotationIndex: number = Math.floor(Math.random() * 4);
  let shapeIndex = Math.floor(Math.random() * shapes.length);

  let yPosition: number = 0;
  let xPosition: number = Math.floor(board.grid[0].length / 2);

  let indexBlockStyle = Math.floor(Math.random()* imgBlock.length)
  let blockStyle = imgBlock[indexBlockStyle]
  console.log('imgBlock', imgBlock, indexBlockStyle);
  
  activeObj = new ActiveObject(
    container,
    yPosition,
    xPosition,
    shapeIndex,
    rotationIndex,
    blockSize,
    blockStyle,
  );
  console.log('blockstyle', blockStyle)
  activeObj.updateCellPosition();
}; //tạo mới active obj

async function eventListenerClickButton(e: KeyboardEvent) {
  //lắng nghe các nút arrow
  if (!activeObj) return;

  if (e.code === "ArrowLeft") {
    console.log("left");
    let newActiveObj = moveObject(activeObj, 0, -1, 0);

    let check = checkConflict(board.grid, newActiveObj);
    if (check == true) {
      activeObj.position = newActiveObj.position;
    }
  } else if (e.code === "ArrowRight") {
    console.log("right");
    let newActiveObj = moveObject(activeObj, 0, 1, 0);

    let check = checkConflict(board.grid, newActiveObj);
    if (check == true) {
      activeObj.position = newActiveObj.position;
    }
  } else if (e.code === "ArrowDown") {
    console.log("down");
    let newActiveObj = moveObject(activeObj, 1, 0, 0);

    let check = checkConflict(board.grid, newActiveObj);
    if (check == true) {
      activeObj.position = newActiveObj.position;
    } else {
      board.grid[activeObj.position[0]][activeObj.position[1]] = 1;
    }
  } else if (e.code === "ArrowUp") {
    console.log("up");
    let newActiveObj = moveObject(activeObj, 0, 0, 1);

    let check = checkConflict(board.grid, newActiveObj);
    if (check == true) {
      activeObj.rotationIndex = newActiveObj.rotationIndex;
    }
  }
  activeObj.updateCellPosition();
}

const addActiveObjectToBoard = async () => {
  let i = 0;
  const { grid, pivot } = activeObj.getShapeData();
  const dr = activeObj.position[0] - pivot[0];
  const dc = activeObj.position[1] - pivot[1];
  for (let r = 0; r < grid.length; r++) {
    const rr = grid[r];
    for (let c = 0; c < rr.length; c++) {
      if (grid[r][c] == 1) {
        const sprite = activeObj.cells[i]; //trong sprite đã có x và y so với board
        i++;

        const cc = c + dc;
        const rr = r + dr;
        board.grid[rr][cc] = 1;

        board.transferCell(rr, cc, sprite); // xử lý data của sprite
      }
    }
  }
  createUIActiveObject(board.container); // truyền lại chính container của board
};

let to = Date.now() / 1000;
function initTicker() {
  let isFullCol = false;
  app.ticker.add(() => {
    if (!activeObj) return;
    let t = Date.now() / 1000 - to;
    if (t > 1) {
      let newActiveObj = moveObject(activeObj, 1, 0, 0);

      let check = checkConflict(board.grid, newActiveObj);
      if (check == true) {
        activeObj.position = newActiveObj.position;
        activeObj.updateCellPosition();
      } else {
        // xử lý data 1 và 0 trên board
        // let {grid, pivot } = activeObj.getShapeData()
        // for ( let r =0; r < grid.length; r ++) {
        //   let rowData = grid[r]
        //   for(let c=0; c<rowData.length; c++) {
        //     if(grid[r][c] == 1) {
        //       let row = activeObj.position[0] + r - pivot[0];
        //       let col = activeObj.position[1] + c - pivot[1];
        //       board.grid[row][col] = 1
        //     }
        //   }
        // }
        addActiveObjectToBoard();
        checkFullRow();
        isFullCol = checkFullCol()
        console.log('full col', isFullCol);
        
      }

      to = Date.now() / 1000;
    }
  });
}

function checkFullCol () {
  let finalRowData = board.grid[0]  
  for (let c = 1; c < finalRowData.length - 2 ; c ++) {    
    if(finalRowData[c] == 1)
    return true
  }  
  return false
}

function checkFullRow() {
  console.log("check full row");

  let boardGrid = board.grid;
  //duyệt qua board grid
  for (let r = 0; r < boardGrid.length - 1; r++) {
    let rowData = boardGrid[r];
    let count = 0;
    for (let c = 0; c < rowData.length; c++) {
      if (boardGrid[r][c] == 1) {
        count++;
      }
    }
    if (count == rowData.length) {
      // xử lý data trên board gird
      updateDataIsFullRow(r);
    }
  }
}

function updateDataIsFullRow(row: number) {
  console.log("update full row");

  let boardGrid = board.grid;
  for (let r = row; r >= 1; r--) {
    let rowData = boardGrid[r];
    for (let c = 1; c < rowData.length - 1; c++) {
      try {
        boardGrid[r][c] = boardGrid[r - 1][c];
        const newKey = `${r},${c}`;
        const oldKey = `${r - 1},${c}`;
        const oldCell = board.cells[newKey];
        if (oldCell) {
          //xoa sprite cu tai newKey
          oldCell.destroy();
          board.container.removeChild(oldCell);
          delete board.cells[newKey];
        }
        const cell = board.cells[oldKey];
        if (cell) {
          board.cells[newKey] = cell; //gan sprite tren xuong duoi
          delete board.cells[oldKey]; //xoa sprite cu tai vi tri duoi
          cell.y += blockSize; //sprite.y cap nhat vi tri
        }
      } catch (e) {
        const a = boardGrid;
        const b = r;
      }
    }
  }
}

document.addEventListener("keydown", eventListenerClickButton);



window.onload = async () => {
  app = new PIXI.Application();
 

  const row: number = 20;
  const col: number = 15;

  const initPlayground = async () => {
    let width = blockSize * (col + 2);
    let height = blockSize * (row + 1);

    board.initBoard(row, col);
    board.initContainer();

    board.container.x = width/10
    board.container.y = height/10

    const graphic = new PIXI.Graphics()
    graphic.beginFill('#fff')
    graphic.drawRect(0, 0, width, height)
    graphic.alpha = 0.8 
    board.container.addChild(graphic)

    app.stage.addChild(board.container);
    createUIActiveObject(board.container);
    initTicker();
  };
  await imagesLoad()

  async function initGameBackground () {
    let width = window.innerWidth / 2
    let height = window.innerHeight / 1.5

    app.renderer.view.width = width;
    app.renderer.view.height = height;
    // app.renderer.background.color = '#fff'
    const sprite = PIXI.Sprite.from('/assets/img/tetris-background/background_start.jpg')
    sprite.width = width
    sprite.height = height
    sprite.x = width/2
    sprite.y = height/2
    sprite.anchor.set(0.5, 0.5)

    app.stage.addChild(sprite)
    // let test = new PIXI.Sprite(imgBlock[0])
    // app.stage.addChild(test)
    initPlayground()

    document.body.appendChild(app.view);
  }

  async function imagesLoad () {
    const imgFrames = [
      'b-yellow.png',
      'b-black.png',
      'b-pink.png',
      'b-red.png',
      'b-brown.png',
      'b-orange.png',
      'b-blue.png',
      'b-green.png',
    ]
    await PIXI.Assets.load("/assets/img/spritesheet.json").then(()=> {
      let l = imgFrames.length
      for( let i = 0; i < l; i ++) {
        const frameName = imgFrames[i]
        imgBlock.push(PIXI.Texture.from(frameName))
      }
    });
    initGameBackground();
  }
  

  
};

//resume:
//tạo 1 board grid lưu dữ liệu 0 1
//tạo 1 container cho UI board
//add active object lên board
//chuyển data active object lên board
//thay đổi active obj
//err: tạo mới nhiều active obj
