import "./normalize.scss";
import "./style.scss";
import coverImg from "./assets/img/cover_for_cards.jpg";

const images = import.meta.glob("./src/assets/img/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const listOpenCard = [
  images["./src/assets/img/feature.jpg"],
  images["./src/assets/img/felix.jpg"],
  images["./src/assets/img/gyl.jpg"],
  images["./src/assets/img/kalcifer.jpg"],
  images["./src/assets/img/meliodos.jpg"],
  images["./src/assets/img/nacima.jpg"],
  images["./src/assets/img/nagotora.jpg"],
  images["./src/assets/img/onydjyki.jpg"],
  images["./src/assets/img/saitama.jpg"],
  images["./src/assets/img/Overlord_Second_Season_TV_2_767244776desctop.webp"],
  images["./src/assets/img/sakuroso.jpg"],
  images["./src/assets/img/silfi.jpg"],
  images["./src/assets/img/teta.jpg"],
  images["./src/assets/img/totoro.png"],
  images["./src/assets/img/vanpanchmen_8.jpg"],
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
