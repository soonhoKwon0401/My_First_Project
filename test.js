"use strict";

const createWordCardHeard = `
  <div class="content__container__header">
    <span class="content__numbers">${createWordCardHeardId()}</span>
  </div>`;

function createWordCardHeardId() {
  const id = document.querySelector(".content__numbers");
  id.textContent = "1";
}

const createWordCardHeardId = document.querySelector(".content__numbers");

const createWordCardHeardRightMenu = `
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

// <div class="app__content-card">
//             <div class="app__content__card__inner">
//               <div class="content__container__header">
//                 <span class="content__numbers">1</span>
//                 <!-- start of right menu-->
//                 <!-- <div class="content__input-box__menu">
//                   <button class="content__input-box__more-button">
//                     <svg viewBox="0 0 24 24" fill="currentColor">
//                       <path
//                         fill-rule="evenodd"
//                         d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
//                         clip-rule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                   <button class="content__input-box_delete-button">
//                     <svg
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       width="20"
//                       height="20"
//                     >
//                       <path
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                   </button>
//                 </div> -->
//                 <!-- End of right menu  -->
//               </div>
//               <form class="content__container__form__text-box" id="text-box">
//                 <div class="content__container__text-box">
//                   <div class="content__sentence__inner">
//                     <input
//                       type="text"
//                       id="sentence"
//                       class="content__text-box__sentence"
//                     />
//                     <label for="sentence" class="label__sentence">문장</label>
//                   </div>
//                   <div class="content__mean__inner">
//                     <input
//                       type="text"
//                       id="mean"
//                       class="content__text-box__mean"
//                     />
//                     <label for="mean" class="label__mean">뜻</label>
//                   </div>
//                   <div class="content_text-box__submit_inner">
//                     <button
//                       class="content_text-box__submit"
//                       type="submit"
//                       form="text-box"
//                     >
//                       저장
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
