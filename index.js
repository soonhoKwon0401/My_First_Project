'use strict';

const goToAddPage = document.querySelector('.app__main')
const appContent = document.querySelector('.app__content')

goToAddPage.addEventListener('click', (event) => {
        const linkEl = event.target.closest('[data-link]')
        if(!linkEl) return
        event.preventDefault() 

        const url = linkEl.dataset.link
        history.pushState({}, "", url)
        render();
    })

const routes = {
    '/': () => `              
                 <div class="app__content-card">
                    <div class="add__content__container">
                        <div class="add__content-heading">     
                            <h2 class="add__content-title">단어를 추가해보세요</h2>
                        </div>
                        <div class="add__content__form">
                            <button type="button"class="add__content__button" data-link="/add">추가하기</button>
                        </div>
                    </div>
                </div>`,
    '/add': () => 
                //  `
                // <div class="app__content-card">
                //     <div class="add__content__container">
                        
                //     </div>
                // </div>
                // `
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
    appContent.innerHTML = view()
}

window.addEventListener('popstate', render)
render();