const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)
let body = $('body')
let themeBtn = $('.icon-theme')
let btnDevice = $$('.btn-off')
let lightBtn = $('.section__body__device-light-btn')
let fanBtn = $('.section__body__device-fan-btn')
let tvBtn = $('.section__body__device-tv-btn')
let acBtn = $('section__body__device-ac-btn')
let devices = ['LIGHT','FAN','TV','AC'];

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
  }
  
function on_offDevice() {

    Array.from(btnDevice).forEach((el,index,arr) => {
        el.addEventListener('click',()=>{
         
        if(el.children[0].matches('.fa.fa-toggle-off')) {
            el.children[0].classList.remove('fa-toggle-off')
            el.children[0].classList.add('fa-toggle-on')
            toast({
                title: `${devices[index]}`,
                message: "Is On",
                type: "success",
                duration: 3000
              });
        }
        else if(el.children[0].matches('.fa.fa-toggle-on')) {
            el.children[0].classList.remove('fa-toggle-on')
            el.children[0].classList.add('fa-toggle-off')
            toast({
                title: `${devices[index]}`,
                message: "Is off",
                type: "error",
                duration: 3000
              });
        }
        })
        
    })
    
}
function changeTheme() {
    themeBtn.addEventListener('click', (e) => {
        let icon = e.target.closest('.icon-theme i')
        if(icon) {
            if(icon.matches('.fa-regular.fa-sun')) {
                icon.classList.remove('fa-sun')
                icon.classList.add('fa-moon')
                body.classList.add('theme-light')
            }else if(icon.matches('.fa-regular.fa-moon')){
                icon.classList.remove('fa-moon')
                icon.classList.add('fa-sun')
                body.classList.remove('theme-light')
    
            }
        }
    })
}

function handleClicks() {
    on_offDevice()
    changeTheme()
}
function start() {
    handleClicks()
}
start()
// Toast function
