const c = document.getElementById("matrix");
const ctx = c.getContext("2d");

const letters = [
    "日","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ",
    "ﾂ","ｵ","ﾘ","ｱ","ﾎ","ﾃ","ﾏ","ｹ","ﾒ","ｴ","ｶ","ｷ",
    "ﾑ","ﾕ","ﾗ","ｾ","ﾈ","ｽ","ﾀ","ﾇ","ﾍ",":","・",".",
    "=","*","+","-","<",">","¦","｜","ﾘ"
];

const getFontSize = () => Math.max(16, Math.round(window.innerWidth * 0.0115));

let fontSize = getFontSize();
let columns = 0;
let drops = [];
let elementsRevealed = false;

function setup() {
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    fontSize = getFontSize();
    columns = Math.floor(c.width / fontSize);
    drops = Array.from({ length: columns }, () => 1);
}

setup();
window.addEventListener("resize", setup);

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
    document.querySelectorAll(".reveal-on-start").forEach(el => {
        el.classList.add("visible");
    });
}

draw();