import { ShapeInfo } from "./Interface";

let shapes: ShapeInfo[][];

shapes = [
  // Chu T
  [
    {
      pivot: [0, 1],
      grid: [
        [1, 1, 1],
        [0, 1, 0],
      ],
    },
    {
      pivot: [1, 1],
      grid: [
        [0, 1],
        [1, 1],
        [0, 1],
      ],
    },
    {
      pivot: [1, 1],
      grid: [
        [0, 1, 0],
        [1, 1, 1],
      ],
    },
    {
      pivot: [1, 0],
      grid: [
        [1, 0],
        [1, 1],
        [1, 0],
      ],
    },
  ],
  [ // hình chữ Z xuôi
    {
      pivot: [1, 1],
      grid: [
        [0, 1],
        [1, 1],
        [1, 0]
      ],
    },
    {
      pivot: [1, 1],
      grid: [
        [1, 1, 0],
        [0, 1, 1],
      ],
    },
    {
      pivot: [1, 0],
      grid: [
        [0, 1],
        [1, 1],
        [1, 0]
      ],
    },
    {
      pivot: [0, 1],
      grid: [
        [1, 1, 0],
        [0, 1, 1],
      ],
    },
  ],
  //hinh chu Z
  [
    {
      pivot: [1, 1], //[y,x]
      grid: [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    },
    {
      pivot: [1, 1],
      grid: [
        [0, 1, 1],
        [1, 1, 0],
      ],
    },

    {
      pivot: [1, 0],
      grid: [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    },
    {
      pivot: [0, 1],
      grid: [
        [0, 1, 1],
        [1, 1, 0],
      ],
    },
  ],
  [
    //hình chữ L xuôi
    {
      pivot: [1, 1], //[y,x]
      grid: [
        [1, 0, 0],
        [1, 1, 1],
      ],
    },
    {
      pivot: [1, 0],
      grid: [
        [1, 1],
        [1, 0],
        [1, 0],
      ],
    },

    {
      pivot: [0, 1],
      grid: [
        [1, 1, 1],
        [0, 0, 1],
      ],
    },
    {
      pivot: [1, 1],
      grid: [
        [0, 1],
        [0, 1],
        [1, 1],
      ],
    },
  ],
  [
    //hình chữ L ngược
    {
      pivot: [1, 1], //[y,x]
      grid: [
        [0, 0, 1],
        [1, 1, 1],
      ],
    },
    {
      pivot: [1, 0],
      grid: [
        [1, 0],
        [1, 0],
        [1, 1],
      ],
    },

    {
      pivot: [0, 1],
      grid: [
        [1, 1, 1],
        [1, 0, 0],
      ],
    },
    {
      pivot: [1, 1],
      grid: [
        [1, 1],
        [0, 1],
        [0, 1],
      ],
    },
  ],
  [ // hinh gay
    {
      pivot: [0, 1],
      grid: [
        [1, 1, 1, 1],
      ],
    },
    {
      pivot: [1, 0],
      grid: [
        [1],
        [1],
        [1],
        [1],
      ],
    },
    {
      pivot: [0, 1],
      grid: [
        [1, 1, 1, 1],
      ],
    },
    {
      pivot: [1, 0],
      grid: [
        [1],
        [1],
        [1],
        [1],
      ],
    },
  ],
  [
    {
      pivot: [0, 0],
      grid: [[1]]
    },
    {
      pivot: [0, 0],
      grid: [[1]]
    },
    {
      pivot: [0, 0],
      grid: [[1]]
    },
    {
      pivot: [0, 0],
      grid: [[1]]
    }
  ]
];

// let b: StatusOfShape[];

// b = [{
//     status: 0,
//     info: {
//         pivot: [1,1],
//         grid: [
//             [1,0,],
//             [1,1,],
//             [0,1,]
//         ]
//     }

// }, {
//     status: 1,
//     info: {
//         pivot: [1,1],
//         grid: [
//             [0,1,1],
//             [1,1,0]
//         ]
//     }

// }, {
//     status: 2,
//     info: {
//         pivot: [0,1],
//         grid: [
//             [1,0,],
//             [1,1,],
//             [0,1,]
//         ]
//     }

// }, {
//     status: 3,
//     info: {
//         pivot: [1,0],
//         grid: [
//             [0,1,1],
//             [1,1,0]
//         ]
//     }

// }]

// let c: StatusOfShape[];

// c = [{
//     status: 0,
//     info: {
//         pivot: [1,1],
//         grid: [[1,0,0], [1,1,1]]
//     }

// }, {
//     status: 1,
//     info: {
//         pivot: [1,0],
//         grid: [[1,1,0], [1,0,0],[1,0,0]]
//     }

// }, {
//     status: 2,
//     info: {
//         pivot: [0,1],
//         grid: [[1,1,1], [0,0,1]]
//     }

// }, {
//     status: 3,
//     info: {
//         pivot: [1,1],
//         grid: [[0,1,0], [0,1,0],[1,1,0]]
//     }

// }]

// let d: StatusOfShape[];

// d = [{
//     status: 0,
//     info: {
//         pivot: [1,1],
//         grid: [[0,0,1], [1,1,1]]
//     }

// }, {
//     status: 1,
//     info: {
//         pivot: [1,0],
//         grid: [[1,0,0], [1,0,0],[1,1,0]]
//     }

// }, {
//     status: 2,
//     info: {
//         pivot: [0,1],
//         grid: [[1,1,1], [1,0,0]]
//     }

// }, {
//     status: 3,
//     info: {
//         pivot: [1,1],
//         grid: [[1,1,0], [0,1,0],[0,1,0]]
//     }

// }]

// let e: StatusOfShape[];

// e = [{
//     status: 0,
//     info: {
//         pivot: [1,1],
//         grid: [
//             [1,0,0],
//             [1,1,0],
//             [0,1,0]
//         ]
//     }

// }, {
//     status: 1,
//     info: {
//         pivot: [1,1],
//         grid: [[0,1,1], [1,1,0]]
//     }

// }, {
//     status: 2,
//     info: {
//         pivot: [1,0],
//         grid: [[1,0,0], [1,1,0],[0,1,0]]
//     }

// }, {
//     status: 3,
//     info: {
//         pivot: [0,1],
//         grid: [[0,1,1], [1,1,0]]
//     }

// }]

export default shapes;
