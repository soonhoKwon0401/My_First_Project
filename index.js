'use strict';

const goToAddPage = document.querySelector('#content');

goToAddPage.addEventListener('click', (event) => {
        const linkEl = event.target.closest('[data-link]')
        if(!linkEl) return

        const url = linkEl.dataset.link
        history.pushState({}, "", url)
        render();
    })

const routes = {
    '/add': () => `              
                 <div class="app__content-card">
                    <div class="add__word__header">
                        <div class="add__word-heading">     
                            <h2 class="add__word-title">단어를 추가해보세요</h2>
                        </div>
                        <div class="add__word__form">
                            <button type="button"class="add__word__button" data-link="/add">추가하기</button>
                        </div>
                    </div>
                </div>`,
    '/': () => `<h1>About</h1>`
}

function getCurrentPath () {
    return window.location.pathname
    
}

function notfoundView () {
    return `<h1>Not Found</h1>`;
}

function render () {
    const path = getCurrentPath()
    const view = routes[path] ?? notfoundView
    goToAddPage.innerHTML = view()
}

window.addEventListener('popstate', render)
// render();