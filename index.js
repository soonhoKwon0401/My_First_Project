"use strict";

const goToAddPage = document.querySelector(".app__main");
const appContent = document.querySelector(".app__content-card");
const appContentInner = document.querySelector(".app__content__card__inner");

const createWordCardSideMenu = `
<div class="content__input-box__menu">
                  <button class="content__input-box__more-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button class="content__input-box_delete-button">
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

const createWordCardHeard = ({ id, showMenu = false }) =>
  `
    <div class="content__container__header">
      <span class="content__numbers">${id}</span>
      ${showMenu ? createWordCardSideMenu : ""}
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

const wordCard = ({ id, showMenu, sentence, mean, mode }) => `
  ${createWordCardHeard({ id, showMenu })}
  ${
    mode === "edit"
      ? createWordInput({ sentence, mean })
      : createWord({ sentence, mean })
  }
  `;

const cardDate = {
  id: "number",
  sentence: "왼쪽 문구",
  mean: "오른쪽 문구",
  mode: "edit",
  showMenu: true,
};

appContentInner.innerHTML = wordCard(cardDate);

appContentInner.addEventListener("submit", (event) => {
  const form = event.target.closest(".content__container__form__text-box");
  if (form) {
    console.log(form);
    event.preventDefault();
    getInputValue();
  }
});
// 이벤트 위임으로 부모 요소에서 자식 요소들의 이벤트를 한번에 관리하기

function getInputValue() {
  const sentence = sentenceInput.value.trim();
  const mean = meanInput.value.trim();
  if (!sentence || !mean) {
    alert("문장 또는 뜻을 입력해주세요");
    return;
  }
  setWords(sentence, mean);
  alert("저장되었습니다.");
  wordForm.reset();
  sentenceInput.focus();
}

function setWords(sentence, mean) {
  const id = Date.now();
  const data = {
    sentence,
    mean,
  };
  localStorage.setItem(id, JSON.stringify(data));
}

goToAddPage.addEventListener("click", (event) => {
  const linkEl = event.target.closest("[data-link]");
  if (!linkEl) return;
  event.preventDefault();

  const url = linkEl.dataset.link;
  history.pushState({}, "", url);
  render();
});

// const routes = {
//   "/": () => `<div class="add__content__container">
//                   <h2 class="add__content-title">단어를 추가해보세요</h2>
//                   <button type="button"class="add__content__button" data-link="/add">추가하기</button>
//               </div>`,

//   "/add": () => ``,
// };

function getCurrentPath() {
  return window.location.pathname;
}

function notfoundView() {
  return `<h1>Not Found</h1>`;
}

function render() {
  const path = getCurrentPath();
  const view = routes[path] ?? notfoundView;
  appContent.innerHTML = view();
}

window.addEventListener("popstate", render);
render();
