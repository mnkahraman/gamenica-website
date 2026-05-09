const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navLinks.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const appCards = document.querySelectorAll("[data-app-card]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });

    appCards.forEach((card) => {
      const tags = card.dataset.category.split(" ");
      card.hidden = filter !== "all" && !tags.includes(filter);
    });
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const canvas = document.getElementById("playfield");

if (canvas) {
  const context = canvas.getContext("2d");
  const colors = ["#ff6a00", "#3294e6", "#1fb58f", "#7357ff", "#ffcf4d"];
  const pieces = [];
  let width = 0;
  let height = 0;
  let pointerX = 0;
  let pointerY = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    pointerX = width * 0.5;
    pointerY = height * 0.45;
  }

  function seed() {
    pieces.length = 0;
    const count = Math.max(46, Math.floor(width / 22));

    for (let index = 0; index < count; index += 1) {
      pieces.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 10 + Math.random() * 34,
        speed: 0.18 + Math.random() * 0.46,
        spin: (Math.random() - 0.5) * 0.018,
        angle: Math.random() * Math.PI,
        color: colors[index % colors.length],
        shape: index % 4
      });
    }
  }

  function drawPhone(x, y, size, color, angle) {
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.fillStyle = "rgba(255,255,255,0.045)";
    context.beginPath();
    context.roundRect(-size * 0.34, -size * 0.5, size * 0.68, size, size * 0.11);
    context.fill();
    context.stroke();
    context.fillStyle = color;
    context.fillRect(-size * 0.15, -size * 0.38, size * 0.3, 2);
    context.restore();
  }

  function drawPiece(piece) {
    const driftX = (pointerX - width * 0.5) * 0.012 * piece.speed;
    const driftY = (pointerY - height * 0.5) * 0.012 * piece.speed;
    context.globalAlpha = 0.32;

    if (piece.shape === 0) {
      drawPhone(piece.x + driftX, piece.y + driftY, piece.size * 2.2, piece.color, piece.angle);
      return;
    }

    context.save();
    context.translate(piece.x + driftX, piece.y + driftY);
    context.rotate(piece.angle);
    context.strokeStyle = piece.color;
    context.fillStyle = piece.color;
    context.lineWidth = 2;

    if (piece.shape === 1) {
      context.strokeRect(-piece.size * 0.5, -piece.size * 0.5, piece.size, piece.size);
    } else if (piece.shape === 2) {
      context.beginPath();
      context.arc(0, 0, piece.size * 0.42, 0, Math.PI * 2);
      context.stroke();
      context.fillRect(-2, -piece.size * 0.74, 4, piece.size * 1.48);
    } else {
      context.beginPath();
      context.moveTo(0, -piece.size * 0.62);
      context.lineTo(piece.size * 0.55, piece.size * 0.38);
      context.lineTo(-piece.size * 0.55, piece.size * 0.38);
      context.closePath();
      context.stroke();
    }

    context.restore();
  }

  function frame() {
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "screen";

    pieces.forEach((piece) => {
      piece.y -= piece.speed;
      piece.x += Math.sin(piece.angle) * 0.12;
      piece.angle += piece.spin;

      if (piece.y < -70) {
        piece.y = height + 70;
        piece.x = Math.random() * width;
      }

      drawPiece(piece);
    });

    context.globalCompositeOperation = "source-over";
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", () => {
    resize();
    seed();
  });

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  });

  resize();
  seed();
  frame();
}
