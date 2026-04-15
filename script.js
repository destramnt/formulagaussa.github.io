const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function generateInputs() {
    const count = document.getElementById("vertexCount").value;
    const container = document.getElementById("coordinates");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        container.innerHTML += `
            <div>
                Вершина ${i + 1}: 
                x: <input type="number" id="x${i}">
                y: <input type="number" id="y${i}">
            </div>
        `;
    }
}

function calculate() {
    const count = document.getElementById("vertexCount").value;
    let points = [];

    for (let i = 0; i < count; i++) {
        let x = parseFloat(document.getElementById(`x${i}`).value);
        let y = parseFloat(document.getElementById(`y${i}`).value);

        if (isNaN(x) || isNaN(y)) {
            alert("Введите все координаты!");
            return;
        }

        points.push({x, y});
    }

    // Формула Гаусса
    let area = 0;
    for (let i = 0; i < count; i++) {
        let j = (i + 1) % count;
        area += points[i].x * points[j].y;
        area -= points[j].x * points[i].y;
    }

    area = Math.abs(area / 2);
    document.getElementById("result").innerText = "Площадь: " + area;

    draw(points);
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const step = 25;

    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Оси
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
}

function draw(points) {
    drawGrid();

    const scale = 25;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.strokeStyle = "#667eea";
    ctx.fillStyle = "rgba(102,126,234,0.3)";
    ctx.lineWidth = 3;

    points.forEach((point, index) => {
        let x = centerX + point.x * scale;
        let y = centerY - point.y * scale;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "black";
ctx.font = "14px Arial";

points.forEach((point, index) => {
    let x = centerX + point.x * scale;
    let y = centerY - point.y * scale;

    ctx.fillText(String.fromCharCode(65 + index), x + 6, y - 6);
});
    ctx.stroke();

    // точки
    ctx.fillStyle = "#e53e3e";
    points.forEach(point => {
        let x = centerX + point.x * scale;
        let y = centerY - point.y * scale;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}
function animateDraw(points){
    let step = 0;
    const centerX = canvas.width/2;
    const centerY = canvas.height/2;

    function frame(){
        drawGrid();
        ctx.beginPath();
        ctx.strokeStyle = "#667eea";
        ctx.fillStyle = "rgba(102,126,234,0.3)";
        ctx.lineWidth = 3;

        for(let i=0;i<=step;i++){
            let j = i%points.length;
            let x = centerX + points[j].x*scale;
            let y = centerY - points[j].y*scale;
            if(i===0) ctx.moveTo(x,y);
            else ctx.lineTo(x,y);
        }
        if(step>=points.length-1) ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // точки
        points.forEach(point=>{
            let x = centerX + point.x*scale;
            let y = centerY - point.y*scale;
            ctx.beginPath();
            ctx.fillStyle="#e53e3e";
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
        });

        if(step<points.length-1){
            step++;
            requestAnimationFrame(frame);
        }
    }
    frame();
}

// рисуем сетку при загрузке
drawGrid();
