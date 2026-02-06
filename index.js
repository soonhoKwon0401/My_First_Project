"use strict";

const goToAddPage = document.querySelector(".app__main");
const appContent = document.querySelector(".app__content-card");

const wordForm = document.querySelector(".content__container__text-box");
const sentenceInput = document.querySelector("#sentence");
const meanInput = document.querySelector("#mean");

wordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getInputValue();
});

function getInputValue() {
  const sentence = sentenceInput.value.trim();
  const mean = meanInput.value.trim();
  if (!sentence || !mean) {
    alert("문장 또는 뜻을 입력해주세요");
  }
  setWords(sentence, mean);
}

function setWords(sentence, mean) {
  localStorage.setItem(sentence, mean);
  console.log(localStorage.getItem(sentence));
}
// 뜻도 value 값을 이용해서 문장을 가져올 수 있는 방법은?
// 저장 후 안내 메시지 추가

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
