const messageDiv = document.getElementById('message');
const greetings = document.querySelectorAll('.greet');
const greetingsDiv = document.querySelectorAll('.hidden');
const body = document.body;
let messages = [
    "Happy Birthday!",
    "Wishing you a fantastic day filled with joy and laughter.",
    "May your year ahead be filled with amazing adventures.",
    "Another year older, wiser, and more gorgeous!",
    "Sending you lots of love and best wishes on your special day.",
    "May your dreams and aspirations come true in the coming year.",
    "On your birthday, may you be surrounded by the people and things you love.",
    "Here's to celebrating you and the incredible person you are.",
    "Happy Birthday, love. ",
];

async function Animations() {
  for (let i = 0; i < messages.length; i++) {
    await typeMessage(messages[i]);
    await delay(2000)
    await removeMessage();
  }
  await delay(500)
  await fadeOut();
}

async function typeMessage(message) {
  return new Promise((resolve) => {
    let index = 0;
    let messageTimer = setInterval(() => {
      if (index < message.length) {
        messageDiv.innerHTML += message[index];
        index++;
      } else {
        clearInterval(messageTimer);
        resolve();
      }
    }, 150);
  });
}

async function removeMessage() {
  return new Promise((resolve) => {
    let deMessageTimer = setInterval(() => {
      if (messageDiv.innerHTML.length > 0) {
        messageDiv.innerHTML = messageDiv.innerHTML.slice(0, -1);
      } else {
        clearInterval(deMessageTimer);
        resolve();
      }
    }, 90);
  });
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function fadeOut() {
  return new Promise((resolve) => {
    let currentOpacity = 1;

    let fadeTimer = setInterval(() => {
      if (currentOpacity >= 0) {
        currentOpacity -= 0.01;
        messageDiv.style.opacity = currentOpacity.toString();
      } else {
        clearInterval(fadeTimer);
        messageDiv.style.display = 'none';
        body.style.backgroundColor = '#c80808c8';
        greetingsDiv.forEach(greetDiv => {
          greetDiv.classList.remove('hidden')
        });
        greetings.forEach(greet => {
          greet.classList.add('reveal')
        });
        resolve();
      }
    }, 10);
  });
}

Animations();

messageDiv.style.transition = 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out';
function handleMouseMove(e) {
  const mouseX = e.pageX / window.innerWidth - 0.5;
  const mouseY = e.pageY / window.innerHeight - 0.5;

  const tiltAmount = 20;
  const tiltX = mouseX * tiltAmount;
  const tiltY = -mouseY * tiltAmount;

  messageDiv.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;

  const shadowX = -tiltX / 2;
  const shadowY = tiltY / 2;
  const shadowBlur = Math.abs(tiltX) + Math.abs(tiltY);

  messageDiv.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.8) `;
}

window.addEventListener('mousemove', handleMouseMove);
