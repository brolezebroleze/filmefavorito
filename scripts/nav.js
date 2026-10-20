document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".liquid-nav");
  const pill = nav.querySelector(".pill");

  const pairs = [...nav.querySelectorAll(".nav-item")]
    .map(link => ({ link, section: document.querySelector(link.getAttribute("href")) }))
    .filter(p => {
      if (!p.section) console.warn("Seção não encontrada para", p.link.getAttribute("href"));
      return p.section;
    });

  if (pairs.length < 2) return;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const docTop = el => el.getBoundingClientRect().top + window.scrollY;

  function update() {
  const tops = pairs.map(p => docTop(p.section));
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const lastTop = tops[tops.length - 1];

  const y = maxScroll > 0 ? (window.scrollY / maxScroll) * lastTop : 0;

  let idx = 0;
  for (let i = 0; i < tops.length; i++) if (y >= tops[i]) idx = i;

  const hasNext = idx < pairs.length - 1;
  const t = hasNext ? clamp((y - tops[idx]) / (tops[idx + 1] - tops[idx]), 0, 1) : 0;

  const a = pairs[idx].link;
  const b = hasNext ? pairs[idx + 1].link : a;

  const left  = a.offsetLeft  + (b.offsetLeft  - a.offsetLeft)  * t;
  const width = a.offsetWidth + (b.offsetWidth - a.offsetWidth) * t;

  pill.style.transform = `translateX(${left}px)`;
  pill.style.width = `${width}px`;

  const active = t > 0.5 ? idx + 1 : idx;
  pairs.forEach((p, i) => p.link.classList.toggle("active", i === active));
}

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
  update();
});