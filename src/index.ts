import * as _ from "lodash";
import Board from "./Board";
import { ActiveObject } from "./ActiveObject";
import shapes from "./Shape";
import checkConflict from "./CheckConflict";

export class Main {
  private app: any;
  private activeObj: ActiveObject; // khởi tạo 1 lần
  private board = new Board(); // Khời tạo 1 lần
  private blockSize: number = 25;
  private imgBlock: PIXI.Texture[] = [];
  private to = Date.now() / 1000;
  private row: number = 20;
  private col: number = 15;
  private combo: number = 0;
  private score: number = 0;
  private scoreContainer = new PIXI.Container();
  public constructor() {
    this.initApplication();
  }
  createUIActiveObject = (container: PIXI.Container) => {
    let rotationIndex: number = Math.floor(Math.random() * 4);
    let shapeIndex = Math.floor(Math.random() * shapes.length);

    let yPosition: number = 0;
    let xPosition: number = Math.floor(this.board.grid[0].length / 2);

    let indexBlockStyle = Math.floor(Math.random() * this.imgBlock.length);
    let blockStyle = this.imgBlock[indexBlockStyle];

    this.activeObj = new ActiveObject(
      container,
      yPosition,
      xPosition,
      shapeIndex,
      rotationIndex,
      this.blockSize,
      blockStyle
    );
    this.activeObj.updateCellPosition();
  }; //tạo mới active obj

  addActiveObjectToBoard = async () => {
    let i = 0;
    const { grid, pivot } = this.activeObj.getShapeData();
    const dr = this.activeObj.position[0] - pivot[0];
    const dc = this.activeObj.position[1] - pivot[1];
    for (let r = 0; r < grid.length; r++) {
      const rr = grid[r];
      for (let c = 0; c < rr.length; c++) {
        if (grid[r][c] == 1) {
          const sprite = this.activeObj.cells[i]; //trong sprite đã có x và y so với board
          i++;

          const cc = c + dc;
          const rr = r + dr;
          this.board.grid[rr][cc] = 1;

          this.board.transferCell(rr, cc, sprite); // xử lý data của sprite
        }
      }
    }
    this.createUIActiveObject(this.board.container); // truyền lại chính container của board
  };

  initTicker() {
    let isFullCol = false;
    this.app.ticker.add(() => {
      if (!this.activeObj) return;
      let t = Date.now() / 1000 - this.to;
      if (t > 1) {
        let newActiveObj = this.activeObj.moveObject(this.activeObj, 1, 0, 0);

        let check = checkConflict(this.board.grid, newActiveObj);
        if (check == true) {
          this.activeObj.position = newActiveObj.position;
          this.activeObj.updateCellPosition();
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
          this.addActiveObjectToBoard();
          this.checkFullRow();
          isFullCol = this.checkFullCol();
          console.log("full col", isFullCol);
          if (isFullCol) this.app.ticker.stop();
        }
        this.updateScore();
        this.to = Date.now() / 1000;
      }
    });
  }

  checkFullCol() {
    let finalRowData = this.board.grid[0];
    for (let c = 1; c < finalRowData.length - 2; c++) {
      if (finalRowData[c] == 1) return true;
    }
    return false;
  }

  checkFullRow() {
    console.log("check full row");

    let boardGrid = this.board.grid;
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
        this.updateDataIsFullRow(r);
        ++this.combo;
        console.log("combo", this.combo);
      }
    }
  }

  updateScore() {
    let bonus = this.combo > 1 ? this.combo * 2 : 0;
    this.score = this.score + this.combo * 10 + bonus;
    console.log("combo, score", this.combo, this.score);
    this.combo = 0;
  }

  updateDataIsFullRow(row: number) {
    console.log("update full row");

    let boardGrid = this.board.grid;
    for (let r = row; r >= 1; r--) {
      let rowData = boardGrid[r];
      for (let c = 1; c < rowData.length - 1; c++) {
        try {
          boardGrid[r][c] = boardGrid[r - 1][c];
          const newKey = `${r},${c}`;
          const oldKey = `${r - 1},${c}`;
          const oldCell = this.board.cells[newKey];
          if (oldCell) {
            //xoa sprite cu tai newKey
            oldCell.destroy();
            this.board.container.removeChild(oldCell);
            delete this.board.cells[newKey];
          }
          const cell = this.board.cells[oldKey];
          if (cell) {
            this.board.cells[newKey] = cell; //gan sprite tren xuong duoi
            delete this.board.cells[oldKey]; //xoa sprite cu tai vi tri duoi
            cell.y += this.blockSize; //sprite.y cap nhat vi tri
          }
        } catch (e) {
          const a = boardGrid;
          const b = r;
        }
      }
    }
  }


  imagesLoad(main: Main) {
    return new Promise(function (resolve, reject) {
      const imgFrames = [
        "b-yellow.png",
        "b-black.png",
        "b-pink.png",
        "b-red.png",
        "b-brown.png",
        "b-orange.png",
        "b-blue.png",
        "b-green.png",
      ];
  
      let loader = PIXI.loader;
      loader.add("load_block", "/assets/img/spritesheet.json");
      loader.on("complete", () => {
        let l = imgFrames.length;
        for (let i = 0; i < l; i++) {
          const frameName = imgFrames[i];
          main.imgBlock.push(PIXI.Texture.from(frameName));
          resolve(true);
        }
      });
      loader.load();
  
      // await Assets.load("/assets/img/spritesheet.json").then(() => {
      //   let l = imgFrames.length;
      //   for (let i = 0; i < l; i++) {
      //     const frameName = imgFrames[i];
      //     this.imgBlock.push(PIXI.Texture.from(frameName));
      //   }
      // });
    });
  }


  async eventListenerClickButton(e: KeyboardEvent) {
    // document.getElementsByTagName('body')[0].focus({ preventScroll: true })
    //lắng nghe các nút arrow
    if (!this.activeObj) return;

    if (e.code === "ArrowLeft") {
      console.log("left");
      let newActiveObj = this.activeObj.moveObject(this.activeObj, 0, -1, 0);

      let check = checkConflict(this.board.grid, newActiveObj);
      if (check == true) {
        this.activeObj.position = newActiveObj.position;
      }
    } else if (e.code === "ArrowRight") {
      console.log("right");
      let newActiveObj = this.activeObj.moveObject(this.activeObj, 0, 1, 0);

      let check = checkConflict(this.board.grid, newActiveObj);
      if (check == true) {
        this.activeObj.position = newActiveObj.position;
      }
    } else if (e.code === "ArrowDown") {
      console.log("down");
      let newActiveObj = this.activeObj.moveObject(this.activeObj, 1, 0, 0);

      let check = checkConflict(this.board.grid, newActiveObj);
      if (check == true) {
        this.activeObj.position = newActiveObj.position;
      } else {
        this.board.grid[this.activeObj.position[0]][
          this.activeObj.position[1]
        ] = 1;
      }
    } else if (e.code === "ArrowUp") {
      console.log("up");
      let newActiveObj = this.activeObj.moveObject(this.activeObj, 0, 0, 1);

      let check = checkConflict(this.board.grid, newActiveObj);
      if (check == true) {
        this.activeObj.rotationIndex = newActiveObj.rotationIndex;
      }
    }
    this.activeObj.updateCellPosition();
  }

  initPlayground = async () => {
    let width = this.blockSize * (this.col + 2);
    let height = this.blockSize * (this.row + 1);

    this.board.initBoard(this.row, this.col);
    this.board.initContainer();

    this.board.container.x = width / 10;
    this.board.container.y = height / 13;

    const graphic = new PIXI.Graphics();
    graphic.beginFill(0xfff);
    graphic.drawRect(0, 0, width, height);
    graphic.alpha = 0.8;
    this.board.container.addChild(graphic);
    this.initScore();
    this.app.stage.addChild(this.board.container);
    this.createUIActiveObject(this.board.container);
    this.initTicker();
  };

  async initGameBackground() {
    let width = window.innerWidth / 2.5;
    let height = window.innerHeight / 1.6;

    this.app.renderer.view.width = width;
    this.app.renderer.view.height = height;
    const sprite = PIXI.Sprite.from(
      "/assets/img/tetris-background/background_start.jpg"
    );
    sprite.width = width;
    sprite.height = height;
    sprite.x = width / 2;
    sprite.y = height / 2;
    sprite.anchor.set(0.5, 0.5);

    this.app.stage.addChild(sprite);
    this.initPlayground();
    document.body.appendChild(this.app.view);
  }

  initScore() {
    const containerWidth = this.board.container.width;
    const containerHeight = this.board.container.height;
    this.scoreContainer.x = containerWidth / 0.75;
    this.scoreContainer.y = containerHeight / 7;

    const graphic = new PIXI.Graphics();
    graphic.beginFill(0xfff);
    graphic.drawEllipse(0, 0, 60, 50);

    console.log("score in init", this.score);

    const scoreText = new PIXI.Text(`${this.score}`, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    });

    this.scoreContainer.addChild(graphic);
    this.scoreContainer.addChild(scoreText);
    this.board.container.addChild(this.scoreContainer);
  }

  initApplication() {
    document.addEventListener(
      "keydown",
      this.eventListenerClickButton.bind(this)
    );
    window.onload = async () => {
      this.app = new PIXI.Application();

      this.imagesLoad(this).then(()=>{
        this.initGameBackground()

      }
        );
    };
  }
}

new Main();

//resume:
//tạo 1 board grid lưu dữ liệu 0 1
//tạo 1 container cho UI board
//add active object lên board
//chuyển data active object lên board
//thay đổi active obj
//err: tạo mới nhiều active obj
