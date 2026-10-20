const c = document.getElementById("matrix");
const ctx = c.getContext("2d");

function resizeCanvas() {
    c.height = window.innerHeight;
    c.width = window.innerWidth;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const letters = [
    "日","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ",
    "ﾂ","ｵ","ﾘ","ｱ","ﾎ","ﾃ","ﾏ","ｹ","ﾒ","ｴ","ｶ","ｷ",
    "ﾑ","ﾕ","ﾗ","ｾ","ﾈ","ｽ","ﾀ","ﾇ","ﾍ",":","・",".",
    "=","*","+","-","<",">","¦","｜","ﾘ"
];

const fontSize = 18;

let columns = Math.floor(c.width / fontSize);

let drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

window.addEventListener("resize", () => {
    columns = Math.floor(c.width / fontSize);
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
});

let elementsRevealed = false;

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F3";
    ctx.font = `${fontSize}px arial`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (!elementsRevealed && drops[0] * fontSize > c.height * 0.4) {
            elementsRevealed = true;
            revealSiteElements();
        }

        if (drops[i] * fontSize > c.height && Math.random() > 0.95) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    window.requestAnimationFrame(draw);
}

function revealSiteElements() {
    const elements = document.querySelectorAll(".reveal-on-start");
    elements.forEach(el => {
        el.classList.add("visible");
    });
}

draw();