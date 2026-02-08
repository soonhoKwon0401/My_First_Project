"use strict";

const mainContent = document.querySelector(".app__content");
const goToAddPage = document.querySelector(".app__main");
const appContent = document.querySelector(".app__content-card");
const appContentInner = document.querySelector(".app__content__card__inner");

const wordForm = document.querySelector(".content__container__form__text-box");
const sentenceInput = document.querySelector("#sentence");
const meanInput = document.querySelector("#mean");

const createWordCardHeard = `
  <div class="content__container__header">
    <span class="content__numbers"></span>
  </div>`;

const renderWordCardHeard = (container, html) => {
  container.insertAdjacentHTML("afterbegin", html);
};

const setWordCardId = (id) => {
  document.querySelector(".content__numbers").textContent = id;
};

const WordCardHeardHtml = createWordCardHeard;
renderWordCardHeard(appContentInner, WordCardHeardHtml);
setWordCardId("1");

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
