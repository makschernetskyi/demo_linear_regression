const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const addBtn = document.getElementById("add");
const removeBtn = document.getElementById("remove");

const xInput = document.getElementById("x");
const yInput = document.getElementById("y");

const WIDTH = 500;
const HEIGHT = 500;

const points = []

//instructions
alert("how to use: add your points by typing in x and y coordinates in range between -250 and 250 and clicking +. To remove the point u added the last click -. When u enter 3 or more points, the regression line will be displayed. enjoy")

addBtn.onclick = ()=>{
  const x = Number(xInput.value);
  const y = Number(yInput.value);
  if(!isNaN(x) && !isNaN(y) && Math.abs(x)<250 && Math.abs(y)<250){
    points.push([x,y]);
    drawRegression(points)
  }else{
    alert("invalid point, change coordinates!")
  }
}

removeBtn.onclick = ()=>{
  if(points.length){
    points.pop();
    drawRegression(points)
  }
}

function drawRegression(points){
  ctx.clearRect(0,0,WIDTH,HEIGHT)
  points.forEach(point=>drawPoint(...cartesianToVisualCoordinates(...point)))
  if(points.length>2){
    const [a2, a1] = linearRegression(points)
    drawLine(a1,a2)
  }
}


function drawPoint(x,y){
  ctx.fillRect(x-2,y-2,4,4)
}

function cartesianToVisualCoordinates(x,y){
  return [x+WIDTH/2, -y+HEIGHT/2]
}

function drawLine(a1,a2){
  ctx.beginPath()
  ctx.moveTo(...cartesianToVisualCoordinates(-WIDTH/2, a1*(-WIDTH/2)+a2))
  ctx.lineTo(...cartesianToVisualCoordinates(WIDTH/2, a1*(WIDTH/2)+a2))
  ctx.stroke()
  ctx.closePath()
}

function linearRegression(points) {
    const n = points.length;
    if (n === 0) {
        throw new Error('Empty array of points');
    }

    // Extract x and y values from points
    const xs = points.map(point => point[0]);
    const ys = points.map(point => point[1]);

    // Construct the design matrix A
    const A = math.concat(math.ones(n, 1), math.reshape(xs, [n, 1]));

    // Solve normal equation: (A^T * A)^-1 * A^T * y
    const theta = math.multiply(math.multiply(math.inv(math.multiply(math.transpose(A), A)), math.transpose(A)), ys);

    return theta.toArray();
}

