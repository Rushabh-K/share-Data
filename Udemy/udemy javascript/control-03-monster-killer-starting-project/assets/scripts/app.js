const ATTACK_VAlUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 20;

const ATTACK_MODE = "ATTACK";
const STRONG_ATTACK_MODE = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACk";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACk";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACk";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredNumber = prompt("enter the number to set the health ", "100");

let chosenMaxLife = parseInt(enteredNumber);
let battleLog = [];

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntery = {
    event: event,
    value: value,
    target: "MONSTER",
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntery.target = "MONSTER";
  } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntery = {
      event: event,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntery = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntery = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntery = {
      event: event,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }
  battleLog.push(logEntery);
}

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerhealth = chosenMaxLife;
let hasBonousLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerhealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerhealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerhealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerhealth
  );

  if (currentPlayerhealth <= 0 && hasBonousLife) {
    hasBonousLife = false;
    removeBonusLife();
    currentPlayerhealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would be dead but you had bonous life");
  }
  if (currentMonsterHealth <= 0 && currentPlayerhealth > 0) {
    alert("YOU WON!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Player WON!",
      currentMonsterHealth,
      currentPlayerhealth
    );
  } else if (currentPlayerhealth <= 0 && currentMonsterHealth > 0) {
    alert("YOU LOST!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Player LOST!",
      currentMonsterHealth,
      currentPlayerhealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerhealth <= 0) {
    alert("IT IS A DRAW!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "ITS DRAW!",
      currentMonsterHealth,
      currentPlayerhealth
    );
  }

  if (currentPlayerhealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if (mode === ATTACK_MODE) {
    maxDamage = ATTACK_VAlUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === STRONG_ATTACK_MODE) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerhealth);
  endRound();
}

function attackHandler() {
  attackMonster(ATTACK_MODE);
}

function strongAttackHandler() {
  attackMonster(STRONG_ATTACK_MODE);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerhealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You cant heal the Player above max health");
    healValue = chosenMaxLife - currentPlayerhealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerhealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerhealth
  );
  endRound();
}

function printLogHandler() {
  console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
