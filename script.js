const app = document.getElementById('app');
let currentSceneId = null;
let sceneStartTime = 0;

function checkCooldown() {
  return Date.now() - sceneStartTime >= 1000;
}

function showWarning() {
  const warning = document.createElement('div');
  warning.className = 'warning-message';
  warning.textContent = 'It is not fucking Tiktok, be patient';
  document.body.appendChild(warning);
  setTimeout(() => warning.remove(), 1500);
}

function showScene(id) {
  app.innerHTML = '';
  currentSceneId = id;
  sceneStartTime = Date.now();

  switch (id) {
    case 1: renderScene1(); break;
    case 2: renderScene2(); break;
    case 3: renderScene3(); break;
    case 4: renderScene4(); break;
    case 5: renderScene5(); break;
    case 6: renderScene6(); break;
    case 7: renderScene7(); break;
    case 8: renderScene8(); break;
  }
}

function renderScene1() {
  const question = document.createElement('div');
  question.className = 'question';
  question.textContent = 'What is your name?';
  app.appendChild(question);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '...';
  app.appendChild(input);
  input.focus();

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (!checkCooldown()) {
      showWarning();
      return;
    }
    const name = input.value.trim();
    if (!name) return;

    
    question.remove();
    input.style.display = 'none';

    disintegrateName(name);

    setTimeout(() => {
      app.innerHTML = '';
      const phrase = document.createElement('div');
      phrase.className = 'question';
      phrase.textContent = 'It doesn’t matter what you are, but how you think.';
      app.appendChild(phrase);
      setTimeout(() => showScene(2), 2800);
    }, 1700);
  });
}

function disintegrateName(name) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '50%';
  container.style.left = '50%';
  container.style.transform = 'translate(-50%, -50%)';
  container.style.zIndex = '100';
  document.body.appendChild(container);

  name.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.fontSize = '2.5rem';
    span.style.margin = '0 3px';
    span.style.transition = 'all 0.8s ease-in';
    container.appendChild(span);
  });

  setTimeout(() => {
    const spans = container.querySelectorAll('span');
    spans.forEach((span, i) => {
      setTimeout(() => {
        span.style.transform = `translate(${(Math.random() - 0.5) * 250}px, ${(Math.random() - 0.5) * 250}px) rotate(${(Math.random() - 0.5) * 360}deg)`;
        span.style.opacity = '0';
      }, i * 30);
    });
  }, 500);

  const totalTime = 500 + (name.length - 1) * 30 + 800 + 100;
  setTimeout(() => container.remove(), totalTime);
}


function renderScene2() {
  const question = document.createElement('div');
  question.className = 'question';
  question.textContent = 'Do you have a feeling that you are being watched?';
  app.appendChild(question);

  const btnYes = document.createElement('button');
  btnYes.textContent = 'Yes';
  const btnNo = document.createElement('button');
  btnNo.textContent = 'No';
  app.appendChild(btnYes);
  app.appendChild(btnNo);

  function handleChoice(choice) {
    if (!checkCooldown()) {
      showWarning();
      return;
    }
    btnYes.remove();
    btnNo.remove();

    createEyes();

    question.textContent = choice === 'yes' ? 'Sure.' : 'Are you sure?';

    setTimeout(() => {
      const eyesContainer = document.getElementById('eyes-container');
      if (eyesContainer) eyesContainer.remove();
      showScene(3);
    }, 2000);
  }

  btnYes.addEventListener('click', () => handleChoice('yes'));
  btnNo.addEventListener('click', () => handleChoice('no'));
}

function createEyes() {
  const container = document.createElement('div');
  container.id = 'eyes-container';
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = 50;
  document.body.appendChild(container);

  for (let i = 0; i < 80; i++) {
    const eye = document.createElement('span');
    eye.textContent = '👁️';
    eye.style.position = 'absolute';
    eye.style.left = Math.random() * 100 + '%';
    eye.style.top = Math.random() * 100 + '%';
    eye.style.fontSize = (20 + Math.random() * 40) + 'px';
    eye.style.opacity = '0';
    eye.style.transition = 'opacity 0.3s';
    container.appendChild(eye);

    setTimeout(() => { eye.style.opacity = '1'; }, Math.random() * 500);
  }
}

function renderScene3() {
  const question = document.createElement('div');
  question.className = 'question';
  question.textContent = 'What number is playing in your head right now?';
  app.appendChild(question);

  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = '0';
  app.appendChild(input);
  input.focus();

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (!checkCooldown()) {
      showWarning();
      return;
    }
    let number = parseInt(input.value, 10);
    if (isNaN(number) || number < 0) return;
    if (number > 100) number = 100;

    input.style.display = 'none';
    question.textContent = 'We have something in common.';
    dropBalls(number, () => {
      showScene(4);
    });
  });
}

function dropBalls(count, callback) {
  let finished = 0;
  for (let i = 0; i < count; i++) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.left = Math.random() * 100 + '%';
    ball.style.animationDelay = Math.random() * 1.5 + 's';
    document.body.appendChild(ball);

    ball.addEventListener('animationend', () => {
      ball.remove();
      finished++;
      if (finished === count) callback();
    });
  }
}

function renderScene4() {
  const question = document.createElement('div');
  question.className = 'question';
  question.textContent = 'Where are we?';
  app.appendChild(question);

  const btn1 = document.createElement('button');
  btn1.textContent = 'In the Internet';
  const btn2 = document.createElement('button');
  btn2.textContent = 'On the website';
  const btn3 = document.createElement('button');
  btn3.textContent = 'Here';
  app.appendChild(btn1);
  app.appendChild(btn2);
  app.appendChild(btn3);

  function wrongAnswer() {
    app.innerHTML = '';
    const msg = document.createElement('div');
    msg.className = 'question';
    msg.textContent = 'You are not there.';
    app.appendChild(msg);
    setTimeout(() => {
      showScene(4);
    }, 2000);
  }

  [btn1, btn2].forEach(btn => {
    btn.addEventListener('click', () => {
      if (!checkCooldown()) { showWarning(); return; }
      wrongAnswer();
    });
  });

  btn3.addEventListener('click', () => {
    if (!checkCooldown()) { showWarning(); return; }
    showScene(5);
  });
}

function renderScene5() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const time1 = `${hours}:${minutes}`;

  const next = new Date(now.getTime() + 60000);
  const nextHours = String(next.getHours()).padStart(2, '0');
  const nextMinutes = String(next.getMinutes()).padStart(2, '0');
  const time2 = `${nextHours}:${nextMinutes}`;

  const question = document.createElement('div');
  question.className = 'question';
  question.textContent = 'What time is it now?';
  app.appendChild(question);

  const btn1 = document.createElement('button');
  btn1.textContent = time1;
  const btn2 = document.createElement('button');
  btn2.textContent = time2;
  const btn3 = document.createElement('button');
  btn3.textContent = 'Now';
  app.appendChild(btn1);
  app.appendChild(btn2);
  app.appendChild(btn3);

  function wrongAnswer() {
    app.innerHTML = '';
    const msg = document.createElement('div');
    msg.className = 'question';
    msg.textContent = 'You still do not get it lol';
    app.appendChild(msg);
    setTimeout(() => {
      showScene(5);
    }, 2000);
  }

  [btn1, btn2].forEach(btn => {
    btn.addEventListener('click', () => {
      if (!checkCooldown()) { showWarning(); return; }
      wrongAnswer();
    });
  });

  btn3.addEventListener('click', () => {
    if (!checkCooldown()) { showWarning(); return; }
    showScene(6);
  });
}

function renderScene6() {
  const question = document.createElement('div');
  question.className = 'question';
  question.textContent = 'Why are you here?';
  question.classList.add('Slight_tremble');
  app.appendChild(question);

  const btn = document.createElement('button');
  btn.textContent = '…';
  app.appendChild(btn);

  btn.addEventListener('click', () => {
    if (!checkCooldown()) { showWarning(); return; }
    showScene(7);
  });
}

function renderScene7() {
  const question = document.createElement('div');
  question.className = 'question';
  question.textContent = 'Are you sure you want to stay here?';
  question.classList.add('Hard_tremble');
  app.appendChild(question);

  const btnYes = document.createElement('button');
  btnYes.textContent = 'Yes';
  const btnNo = document.createElement('button');
  btnNo.textContent = 'No';
  app.appendChild(btnYes);
  app.appendChild(btnNo);

  btnYes.addEventListener('click', () => {
    if (!checkCooldown()) { showWarning(); return; }
    showScene(8);
  });

  btnNo.addEventListener('click', () => {
    if (!checkCooldown()) { showWarning(); return; }
    app.innerHTML = '';
    const msg = document.createElement('div');
    msg.className = 'question';
    msg.textContent = 'An unexplored life is not worth living.';
    app.appendChild(msg);

    const overlay = document.createElement('div');
    overlay.className = 'overlay-locked';
    document.body.appendChild(overlay);
  });
}

function renderScene8() {
  const msg = document.createElement('div');
  msg.className = 'question';
  msg.textContent = 'Well. You are welcome.';
  app.appendChild(msg);

  setTimeout(() => {
    app.innerHTML = '';
    const card = document.createElement('div');
    
    const gradient = document.createElement('div');
    gradient.className = 'gradient-overlay';
    document.body.appendChild(gradient);
    
    // force reflow
    gradient.getBoundingClientRect();
    gradient.style.opacity = '1';
    
    initStarfield();
    card.className = 'card';
    card.innerHTML = `
      <h2>Artem Zhuk greets you</h2>
      <p><strong>Personality:</strong> HSE AMI Student / Computer Science enthusiast</p>
      <p><strong>Github:</strong> <a href="https://github.com/Zhuchokk">Here</a></p>
      <p><strong>Get in touch:</strong> <a href="https://t.me/zuriom">Telegram</a> / <a href="https://vk.com/zhuk_artiom">VK</a> </p>
    `;
    app.appendChild(card);
  }, 2000);
}


function initStarfield() {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  canvas.style.opacity='0';
  canvas.style.transition = 'opacity 3s ease';
  document.body.appendChild(canvas);

  
  const ctx = canvas.getContext('2d');
  let stars = [];
  let width, height;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  // Stars
  const STAR_COUNT = 200;
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      brightness: Math.random(),
      speed: Math.random() * 0.3 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
      star.brightness += (Math.random() - 0.5) * 0.05;
      star.brightness = Math.max(0.3, Math.min(1, star.brightness));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 240, 200, ${star.brightness * 0.8})`;
      ctx.fill();
      star.y += star.speed;
      if (star.y > height + 5) {
        star.y = -5;
        star.x = Math.random() * width;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
  
  canvas.getBoundingClientRect();
  requestAnimationFrame(() => {
    canvas.style.opacity = '1';
  });
  
}

// Start
showScene(1);
