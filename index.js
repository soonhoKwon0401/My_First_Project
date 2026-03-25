"use strict";

const goToAddPage = document.querySelector(".app__main");
const appContent = document.querySelector(".app__content");
const appContentInner = document.querySelector(".app__content__card__inner");
const initialState = {
  id: "number",
  sentence: "문장",
  mean: "뜻",
  actionMenu: true,
  mode: "edit",
};

const wordCard = ({ id, actionMenu, sentence, mean, mode }) => `  
  <div class="app__content-card">
    ${createWordCardHeader({ id, actionMenu })}
    ${mode === "edit" ? createWordInput({ sentence, mean }) : createWord({ sentence, mean })}
    </div>   
    `;

const cardContainer = (element) => `
  <div class="app__content-card">  
    ${element}
  </div>
`;

const createWordCardSideMenu = () =>
  `<div class="content__input-box__menu">
  <button class="content__input-box__more-button" data-edit="edit">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
  <button class="content__input-box_delete-button" data-action="deleted">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width="20"
      height="20"                      
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </button>
</div>
`;

const createWordCardHeader = ({ id, actionMenu }) =>
  `
    <div class="content__container__header" data-id="${id}">
      <span class="content__numbers">${id}</span>
      ${actionMenu ? createWordCardSideMenu() : ""}
    </div>
  `;

const wordCards = () => {
  const cardsHTML = getWords()
    .map((item) => {
      console.log(item);
      if (item === )
      // 이게 edit에서 누른것인지 아니면 그냥 list인지 구분할 필요가있음
      // 어떻게 구분해야하지?
      //1. item에서 edit할 id 을 찾는다.
      //2. 해당 값만 edit으로 변경하고 나머지는 list 로 보여준다.
      wordCard({ ...initialState, ...item, mode: "show", actionMenu: true });
    })
    .join("");
  return `<div class="app__content__cards__inner"> ${cardsHTML} </div>`;
};

const createWordCardSideMenuDeleteButton = `
  <button class="content__cancel-button">취소</button>
  `;

const createWordCardAdd = () => `
    <div class="add__content__container">
      <h2 class="add__content-title">단어를 추가해보세요</h2>
      <button type="button" class="add__content__button" data-link="/add">
        추가하기
      </button>
    </div>
  `;

const setWordCardId = (id) => {
  document.querySelector(".content__numbers").textContent = id;
};

const createWordInput = ({ sentence = "문장", mean = "뜻" }) =>
  `
    <form class="content__container__form__text-box" id="text-box">
      <div class="content__container__text-box">
        <div class="content__sentence__inner">
          <input
            type="text"
            id="sentence"
            class="content__text-box__sentence"
          />
          <label for="sentence" class="label__sentence">${sentence}</label>
        </div>
        <div class="content__mean__inner">
          <input
            type="text"
            id="mean"
            class="content__text-box__mean"
          />
          <label for="mean" class="label__mean">${mean}</label>
        </div>
          <button
            class="content_text-box__submit"
            type="submit"
            form="text-box"
          >
            저장
          </button>
      </div>
    </form>
  `;

const createWord = ({ sentence = "문장", mean = "뜻" }) =>
  `
  <div class="app__content__card__text-box">
    <div class="app__content_card__text-inner">
      <span class="content__card__sentence-text" id="sentence"
        >${sentence}</span
      >
      <label for="sentence" class="label__sentence">문장</label>
    </div>
    <div class="content__card__mean-text" id="mean">
      <span class="content__card__mean">${mean}</span>
      <label for="mean" class="label__mean">뜻</label>
    </div>
  </div>
  `;

const renderBody = {
  add: createWordCardAdd,
  edit: wordCard,
  lists: wordCards,
};

const routes = {
  "/": () => renderBody.add(),
  "/add": () => renderBody.edit({ ...initialState, mode: "edit" }),
  "/library": () => renderBody.lists(),
};

function createHtml(html) {
  appContent.innerHTML = html;
}

function render() {
  const path = getCurrentPath();
  const view = routes[path] ?? notfoundView;
  createHtml(view());
}

appContent.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target.closest(".content__container__form__text-box");
  if (!form) return;

  const sentenceInput = form.querySelector(".content__text-box__sentence");
  const sentence = form
    .querySelector(".content__text-box__sentence")
    .value.trim();
  const mean = form.querySelector(".content__text-box__mean").value.trim();

  if (!sentence || !mean) {
    alert("문장 또는 뜻을 입력해주세요");
    return;
  }

  setWords(sentence, mean);
  alert("저장되었습니다.");
  sentenceInput.focus();
  form.reset();
});

appContent.addEventListener("click", (event) => {
  const deleteEl = event.target.closest("[data-action]");
  if (!deleteEl) return;
  event.preventDefault();
  const result = confirm("정말 삭제하시겠습니까?");
  if (!result) return;
  const idEl = event.target.closest("[data-id]");
  localStorage.removeItem(idEl.dataset.id);
  render();
});

appContent.addEventListener("click", (event) => {
  const editButtonEl = event.target.closest("[data-edit]");
  if (!editButtonEl) return;
  event.preventDefault();
  const id = event.target.closest("[data-id]").dataset.id;
  if (!id) return;
  const data = JSON.parse(localStorage.getItem(id));
  // const viewHTML = wordCard({ ...initialState, id });
  const viewHTML = wordCards();
  createHtml(viewHTML);
  console.log(viewHTML);
  const card = document.querySelector(".app__content-card");
  setInputValue(card, data);
});

const setInputValue = (card, { sentence, mean }) => {
  const sentenceInputBox = card.querySelector(".content__text-box__sentence");
  const meanInputBox = card.querySelector(".content__text-box__mean");
  sentenceInputBox.value = sentence;
  meanInputBox.value = mean;
  sentenceInputBox.focus();
};

const setWords = (sentence, mean) => {
  const id = Date.now();
  const data = {
    sentence,
    mean,
  };
  localStorage.setItem(id, JSON.stringify(data));
};

goToAddPage.addEventListener("click", (event) => {
  const linkEl = event.target.closest("[data-link]");
  if (!linkEl) return;
  event.preventDefault();
  const url = linkEl.dataset.link;
  history.pushState({}, "", url);
  render();
});

const getWords = () => {
  return Object.keys(localStorage).map((key) => ({
    id: key,
    ...JSON.parse(localStorage.getItem(key)),
  }));
};

function getCurrentPath() {
  return window.location.pathname;
}

function notfoundView() {
  return `<h1>Not Found</h1>`;
}

window.addEventListener("popstate", render);
render();
