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
let selectLevel = 20;
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

//Combining arrays
const rezult = () => {
  return [...randomNumOne, ...randomNumTwo];
};

const distributeCards = () => {
  for (let index = 0; index < rezult().length; index++) {
    cardOpen[index].src = listOpenCard[rezult()[index]];
  }
};

distributeCards();
