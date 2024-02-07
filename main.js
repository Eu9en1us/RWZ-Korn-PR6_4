const $btn = document.getElementById("btn-kick");
const $btn1 = document.getElementById("btn-kick1");
const $logs = document.getElementById("logs");

// Счетчик кликов
let clickCount = 0; 

const handleClick = () => {
  clickCount++;
  console.log(`Кнопка "$btn" нажата ${clickCount} раз`);  
};

$btn.addEventListener('click', handleClick);


// Счетчик кликов
let clickCount1 = 0;

const handleClick1 = () => {
  clickCount1++;
  console.log(`Кнопка "$btn1" нажата ${clickCount1} раз`);   
};

$btn1.addEventListener('click', handleClick1);


// Ограничение по количеству кликов
const maxClicks = 6;

function createClickCounter(button, maxClicks) {

  let clickCount = 0;

  const handleClick = () => {

    clickCount++;

    let message = `Кнопка "${button.innerText}" может быть нажата ${maxClicks} раз`;
    message += `\nКнопка "${button.innerText}" нажата ${clickCount} раз`;

    if(clickCount >= maxClicks) {
      button.disabled = true;
    }

    log(message);

  };

  button.addEventListener('click', handleClick);

  return () => {
    clickCount = 0; 
    button.disabled = false;
  };

}

const resetClickCount = createClickCounter($btn, maxClicks);
const resetClickCount1 = createClickCounter($btn1, maxClicks);




const character = {
  name: "Pikachu",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-character"),
  elProgressbar: document.getElementById("progressbar-character"),
  init: function () {
    console.log("Start Game!");
    this.renderHP();
  },
  renderHP: function () {
    this.renderHPLife();
    this.renderProgressbarHP();
  },
  renderHPLife: function () {
    this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
  },
  renderProgressbarHP: function () {
    this.elProgressbar.style.width = `${this.damageHP}%`;
  },
  changeHP: function (count) {
    if (this.damageHP < count) {
      this.damageHP = 0;
      this.renderHP();
      $btn.disabled = true;
      $btn1.disabled = true;
      setTimeout(() => {
        log(`${this.name} проиграл бой!`);
      }, 0);
      return;
    }

    this.damageHP -= count;
    this.renderHP();
    log(`${this.name} получил урон: ${count}. Осталось жизней: ${this.damageHP}`);
  },
};

const enemy = {
  name: "Charmander",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-enemy"),
  elProgressbar: document.getElementById("progressbar-enemy"),
  init: character.init,
  renderHP: character.renderHP,
  renderHPLife: character.renderHPLife,
  renderProgressbarHP: character.renderProgressbarHP,
  changeHP: character.changeHP,
};

const logs = [
  'Pikachu вспомнил что-то важное, но неожиданно Charmander, не помня себя от испуга, ударил в предплечье врага.',
  'Pikachu поперхнулся, и за это Charmander с испугу приложил прямой удар коленом в лоб врага.',
  'Pikachu забылся, но в это время наглый Charmander, приняв волевое решение, неслышно подойдя сзади, ударил.',
  'Pikachu пришел в себя, но неожиданно Charmander случайно нанес мощнейший удар.',
  'Pikachu поперхнулся, но в это время Charmander нехотя раздробил кулаком \<вырезанно цензурой\> противника.',
  'Pikachu удивился, а Charmander пошатнувшись влепил подлый удар.',
  'Pikachu высморкался, но неожиданно Charmander провел дробящий удар.',
  'Pikachu пошатнулся, и внезапно наглый Charmander беспричинно ударил в ногу противника',
  'Pikachu расстроился, как вдруг, неожиданно Charmander случайно влепил стопой в живот соперника.',
  'Pikachu пытался что-то сказать, но вдруг, неожиданно Charmander со скуки, разбил бровь сопернику.',
];

function log(text) {

  const logEntry = document.createElement("div");
  logEntry.innerText = text;
  $logs.prepend(logEntry);

}

$btn1.addEventListener("click", function () {
  console.log("Fire Charmander");
  const damage = random(25);
  enemy.changeHP(damage);
  const logMessage = `${enemy.name} получил урон: ${damage}. Осталось жизней: ${enemy.damageHP}`;
  const randomLog = logs[random(logs.length)];
  log(randomLog.replace('Charmander', enemy.name).replace('Pikachu', character.name));
});

$btn.addEventListener("click", function () {
  console.log("Kick");
  const characterDamage = random(20);
  const enemyDamage = random(20);
  character.changeHP(characterDamage);
  enemy.changeHP(enemyDamage);

  log(logs[random(logs.length)]);
});

character.init();
enemy.init();

function random(num) {
  return Math.floor(Math.random() * num);
}

function log(message) {
  const logEntry = document.createElement("div");
  logEntry.innerText = message;
  $logs.prepend(logEntry);
}
