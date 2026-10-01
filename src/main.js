import "./normalize.scss";
import "./style.scss";
import coverImg from "./assets/img/cover_for_cards.jpg";

const images = import.meta.glob("./assets/img/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const listOpenCard = [
  images["./assets/img/feature.jpg"],
  images["./assets/img/felix.jpg"],
  images["./assets/img/gyl.jpg"],
  images["./assets/img/kalcifer.jpg"],
  images["./assets/img/meliodos.jpg"],
  images["./assets/img/nacima.jpg"],
  images["./assets/img/nagotora.jpg"],
  images["./assets/img/onydjyki.jpg"],
  images["./assets/img/saitama.jpg"],
  images["./assets/img/Overlord_Second_Season_TV_2_767244776desctop.webp"],
  images["./assets/img/sakuroso.jpg"],
  images["./assets/img/silfi.jpg"],
  images["./assets/img/teta.jpg"],
  images["./assets/img/totoro.png"],
  images["./assets/img/vanpanchmen_8.jpg"],
];

const boxCard = document.querySelector(".box-card");
let selectLevel = 16;
let numberOfPairs = selectLevel / 2;

for (let index = 0; index < selectLevel; index++) {
  const pathImg = listOpenCard[index]; // или свой индекс
  const html = `
    <div class="item-cards">
      <img src="${coverImg}" alt="card" class="card">
      <img src="${pathImg}" alt="" class="card-open">
    </div>
  `;
  boxCard.insertAdjacentHTML("afterbegin", html);
}

const cardOpen = document.querySelectorAll(".card-open");
const card = document.querySelectorAll(".card");
const btnNewGame = document.querySelector(".btn-new-game");
const modulWin = document.querySelector(".modul-win");
const wrapper = document.querySelector(".wrapper");
let randomNumOne = [];
let randomNumTwo = [];

//we get two arrays of random numbers
const getArrRandomNum = (arr) => {
  while (arr.length != numberOfPairs) {
    let num = (Math.random() * 100).toFixed();
    if (
      !arr.includes(num) &&
      arr.length < numberOfPairs &&
      num < numberOfPairs
    ) {
      arr.push(num);
    }
  }
};

getArrRandomNum(randomNumOne);
getArrRandomNum(randomNumTwo);
//

//Combining arrays
const rezult = () => {
  return [...randomNumOne, ...randomNumTwo];
};

//

//assigning pictures to the matrix
const distributeCards = () => {
  for (let index = 0; index < rezult().length; index++) {
    cardOpen[index].src = listOpenCard[rezult()[index]];
  }
};

distributeCards();
//

let counter = 0;
let OpenCardOne = "";
let cardOne = "";
let flag = true;

boxCard.addEventListener("click", (event) => {
  if (flag === true && event.target.className != "box-card") {
    event.target.classList.add("card-open-show");
    if (event.target.className !== "card-open card-open-show") {
      if (counter % 2 !== 0) {
        if (event.target.nextElementSibling.src === OpenCardOne.src) {
        } else {
          setTimeout(removeCard, 800, cardOne, event);
          flag = false;
          setTimeout(topFlag, 1000);
        }
      }
      winGame(getOpenCard());
      cardOne = event.target;
      OpenCardOne = event.target.nextElementSibling;
      counter++;
      showCounter(counter);
    }
  }
});

const topFlag = () => {
  flag = true;
};

function removeCard(cardOne, event) {
  cardOne.classList.remove("card-open-show");
  event.target.classList.remove("card-open-show");
}

const score = document.querySelector(".score");

//show counter
const showCounter = (counter) => {
  score.textContent = `Score: ${counter}`;
};
//

//modul for new game
btnNewGame.addEventListener("click", () => {
  newGame();
  score.textContent = `Score: ${counter}`;
  setTimeout(distributeCards, 500);
});

//del pic for new game
const delPic = () => {
  card.forEach((element) => {
    element.classList.remove("card-open-show");
  });
};
//

///New game
const newGame = () => {
  delPic();
  randomNumOne = [];
  randomNumTwo = [];
  getArrRandomNum(randomNumOne);
  getArrRandomNum(randomNumTwo);
  counter = 0;
  showCounter(counter);
};

//finish game
const getOpenCard = () => {
  let counterOpenCard = 0;
  card.forEach((element) => {
    if (element.className === "card card-open-show") {
      counterOpenCard++;
    }
  });
  return counterOpenCard;
};

///Show modul win
const btnWin = document.querySelector(".btn-win");
const inputWin = document.querySelector(".input-win");
const scoreRecord = {};

const NumberOfMoves = document.querySelector(".NumberOfMoves");

const winGame = (counterOpenCard) => {
  if (counterOpenCard === card.length) {
    modulWin.classList.add("modul-win-open");
    wrapper.classList.add("wrapper-inactive");
    NumberOfMoves.textContent = `Number Of moves: ${counter + 1}`;
  }
};

//get data local str
function getDataLocal() {
  if (localStorage.getItem("scoreUser")) {
    let dataUser = localStorage.getItem("scoreUser");
    let dataUserScore = JSON.parse(dataUser);
    for (const key in dataUserScore) {
      scoreRecord[key] = dataUserScore[key];
    }
  }
}
getDataLocal();

//post in record
btnWin.addEventListener("click", () => {
  if (inputWin.value.length !== 0) {
    scoreRecord[inputWin.value] = counter;
    localStorage.setItem("scoreUser", JSON.stringify(scoreRecord));
    modulWin.classList.remove("modul-win-open");
    inputWin.value = "";
    getDataLocal();
    SortRecordList();
    openModulRec();
  }
});
//

//Show record
const btnScore = document.querySelector(".btn-score");
const textRecord = document.querySelector(".list-record");
const btnRecord = document.querySelector(".btn-record");
const modulRecord = document.querySelector(".modul-record");

let record = document.querySelectorAll(".record");

btnScore.addEventListener("click", () => {
  openModulRec();
  SortRecordList();
});
//

///
btnRecord.addEventListener("click", () => {
  modulRecord.classList.remove("modul-record-open");
  wrapper.classList.remove("wrapper-inactive");
  // newGame()
});

const SortRecordList = () => {
  let dataUser = localStorage.getItem("scoreUser");
  let dataUserScore = JSON.parse(dataUser);

  let sortRecord = [];
  for (const key in dataUserScore) {
    sortRecord.push([key, dataUserScore[key]]);
  }
  sortRecord.sort(function (a, b) {
    return a[1] - b[1];
  });

  for (let index = 0; index < record.length; index++) {
    if (sortRecord[index]) {
      record[index].textContent =
        `${sortRecord[index][0]} - ${sortRecord[index][1]}`;
    }
  }
};
////

const openModulRec = () => {
  modulRecord.classList.add("modul-record-open");
  wrapper.classList.add("wrapper-inactive");
};
