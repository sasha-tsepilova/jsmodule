// При зажатті лівої кнопки миші над квадратом і руху миші, квадрат рухається за мишкою
// Клік правою кнопкою миші міняє колір квадрату (на рандомний або зі списку доступних кольорів)
// Shift+ЛКМ міняє розмір квадрату (за допомогою додавання/видаленню класу .box-large)
// Подвійний клік ЛКМ створює, ще один квадрат який має такий самий функціонал. Кожен новий квадрат має мати унікальний номер.
// Alt+Подвійний клік ЛКМ видаляє квадрат (останній квадрат на сторінці не повинен видалятися)
let container = document.getElementsByClassName('box-container')[0];


//MOVEMENT PART START
let begY = 0;
let begX = 0;
let boxX = 0;
let boxY = 0;
let movingBox = null;
let movementStarted = false;

function startMoving(e){
    if(movementStarted || e.button == 2 || e.shiftKey) return;
    movementStarted = true;
    movingBox = e.target;
    begY = e.clientY;
    begX = e.clientX;
    boxX = movingBox.offsetLeft;
    boxY = movingBox.offsetTop;
    console.log("STARTED")
}

function moveBox(e){
    console.log("MOVING");
    if(!movementStarted || e.target != movingBox) return;
    movingBox.style.top = boxY + e.clientY - begY + 'px';  
    movingBox.style.left = boxX + e.clientX - begX + 'px';
}

function stopMoving(e){
    if(!movementStarted) return;
    begY = 0;
    begX = 0;
    movingBox = null;
    movementStarted = false;
    boxX = 0;
    boxY = 0;
}
//MOVEMENT PART END

//CHANGE OF COLOR START
function randomHex(num){
    return Math.floor(Math.random()*(num + 1).toString(16).padStart(2,'0'));
}

function changeColor(e){
    e.preventDefault();
    hexColor = "#"+ randomHex(255) + randomHex(255) + randomHex(255);
    e.target.style.background = hexColor;
}
//CHANGE OF COLOR END

//CHANGE OF SIZE START
function changeSize(e){
    if(!e.shiftKey) return;
    e.target.classList.toggle("box-large")
}
//CHANGE OF SIZE END

//NEW BOX START
let totalBoxes = 1;
let lastCreated = 1;
function createBox(e){
    totalBoxes++;
    lastCreated++;
    let newBox = document.createElement("div");
    newBox.className = "box";
    newBox.innerHTML = lastCreated;
    newBox.style.top = e.target.offsetTop + e.target.offsetHeight+'px';
    newBox.style.left = e.target.offsetLeft + e.target.offsetWidth+'px';
    addListeners(newBox);
    container.appendChild(newBox)
}
//NEW BOX END

//DELETE BOX START
function deleteBox(e){
    if(totalBoxes == 1) return;
    totalBoxes--;
    e.target.remove()
}
//DELETE BOX END

//CREATE OR DELETE START
function createDelete(e){
    console.log(e)
    if(e.altKey){
        deleteBox(e);
    } else{
        createBox(e);
    }
}
//CREATE OR DELETE END

//EVENT LISTENERS START
function addListeners(box){
    box.addEventListener('click', changeSize);
    box.addEventListener('mousedown', startMoving);
    box.addEventListener('mousemove', moveBox);
    
    box.addEventListener('contextmenu', changeColor);
    box.addEventListener('dblclick', createDelete);
}

container.childNodes.forEach(childBox => {
    addListeners(childBox)
});
container.addEventListener('mouseup', stopMoving);
//EVENT LISTENERS END