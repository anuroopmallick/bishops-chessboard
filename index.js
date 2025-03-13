let table = document.querySelector("#table");
let storageIndex = [];
let cells;

window.addEventListener("load", function () {
  for (let ri = 0; ri < 8; ri++) {
    let tr = document.createElement("tr");
    let white = ri % 2 == 0 ? true : false;
    for (let ci = 0; ci < 8; ci++) {
      let cell = document.createElement("td");
      cell.setAttribute("class", `box ${white == true ? "white" : "black"}`);
      cell.setAttribute("data-index", `${ri}-${ci}`);

      white = !white;
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  cells = document.querySelectorAll(".box");
});

console.log("cells" + cells);

table.addEventListener("mouseover", function (e) {
  let cell = e.target;
  let dataIndex = cell.dataset.index;

  // console.log(cell);
  // console.log(dataIndex);

  let [r, c] = dataIndex.split("-");
  // console.log(r, c);
  cell.classList.add("lightblue");
  getBishopPath(r, c);
});

table.addEventListener("mouseout", function (e) {
  let cell = e.target;
  cell.classList.remove("lightblue");
  for (let cellIndex of storageIndex) {
    let [r, c] = cellIndex;
    let idx = r * 8 + c;
    cells[idx].classList.remove("red");
  }
});

function getBishopPath(r, c) {
  let tr = getTopRight(r, c);
  let br = getBottomRight(r, c);
  let tl = getTopLeft(r, c);
  let bl = getBottomLeft(r, c);

  storageIndex = [...tr, ...br, ...tl, ...bl];

  for (let cellIndex of storageIndex) {
    let [r, c] = cellIndex;
    let idx = r * 8 + c;
    cells[idx].classList.add("red");
  }
}

function getTopRight(r, c) {
  let paths = [];
  r--;
  c++;
  while (r >= 0 && c < 8) {
    paths.push([r, c]);
    r--;
    c++;
  }

  return paths;
}

function getTopLeft(r, c) {
  let paths = [];
  r--;
  c--;
  while (r >= 0 && c >= 0) {
    paths.push([r, c]);
    r--;
    c--;
  }
  return paths;
}

function getBottomRight(r, c) {
  let paths = [];
  r++;
  c++;
  while (r < 8 && c < 8) {
    paths.push([r, c]);
    r++;
    c++;
  }
  return paths;
}

function getBottomLeft(r, c) {
  let paths = [];
  r++;
  c--;
  while (r < 8 && c >= 0) {
    paths.push([r, c]);
    r++;
    c--;
  }
  return paths;
}
