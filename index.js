"use strict";

const mainContent = document.querySelector(".app__content");
const goToAddPage = document.querySelector(".app__main");
const appContent = document.querySelector(".app__content-card");
const appContentInner = document.querySelector(".app__content__card__inner");

const wordForm = document.querySelector(".content__container__form__text-box");
const sentenceInput = document.querySelector("#sentence");
const meanInput = document.querySelector("#mean");

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

const createWordCardHeard = (showMenu = false) => {
  return `
  <div class="content__container__header">
    <span class="content__numbers"></span>
    ${showMenu ? createWordCardSideMenu : ""}
  </div>`;
};

const renderWordCardHeard = (container, html) => {
  container.insertAdjacentHTML("afterbegin", html);
};

const setWordCardId = (id) => {
  document.querySelector(".content__numbers").textContent = id;
};

renderWordCardHeard(appContentInner, createWordCardHeard(true));
setWordCardId("1");

const createWordCardInput = (leftText = "문장", rightText = "뜻") => {
  return `
  <form class="content__container__form__text-box" id="text-box">
    <div class="content__container__text-box">
      <div class="content__sentence__inner">
        <input
          type="text"
          id="sentence"
          class="content__text-box__sentence"
        />
        <label for="sentence" class="label__sentence">${leftText}</label>
      </div>
      <div class="content__mean__inner">
        <input
          type="text"
          id="mean"
          class="content__text-box__mean"
        />
        <label for="mean" class="label__mean">${rightText}</label>
      </div>
      <div class="content_text-box__submit_inner">
        <button
          class="content_text-box__submit"
          type="submit"
          form="text-box"
        >
          저장
        </button>
      </div>
    </div>
  </form>`;
};

const renderWordCardInput = (container, html) => {
  container.insertAdjacentHTML("beforeend", html);
};

renderWordCardInput(appContentInner, createWordCardInput("하늘", "헬로"));

wordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getInputValue();
});

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
