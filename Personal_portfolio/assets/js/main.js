
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)
let serviceInfos = $$('.service__info')
let modalService = $$('.modal')
let modalCloses = $$('.modal__close')
let navLink =  $$('.nav__item-link')
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = (current.offsetTop - 58) >= 0 ?(current.offsetTop - 58) : 0,
              sectionId = current.getAttribute('id')

        if(scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight){
            if(document.querySelector('.nav__menu a[href*=' + sectionId + ']')){
                activeLink()
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
            }
           
        }else if(document.querySelector('.nav__menu a[href*=' + sectionId + ']')) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
      
    })
    
}
window.addEventListener('scroll', scrollActive)
/*=============== NAV ACTIVE-LINK ===============*/


// navLink.forEach(item => {
//     item.onclick = function () {
//         window.removeEventListener('scroll')
       
//         activeLink()
//         item.classList.add('active-link')
//     }
    
// })
let activeLink = function() {
   Array.from( $$('.nav__item-link')).forEach(element => {
       if(element.matches('.active-link')){
           element.classList.remove('active-link')

       }
        
    });
  
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
const header = $('header')
function changeBackgroundHeader() {

    if(window.scrollY > 100) {
        header.style.backgroundColor = 'var(--container-color)'
    } else {
        header.style.backgroundColor = ''
    }
}
window.addEventListener('scroll', changeBackgroundHeader)


/*=============== SERVICES MODAL ===============*/
serviceInfos.forEach((el ,index) => {
    el.onclick = function () {
        modalService[index].style.display = 'flex'
    }
})
modalCloses.forEach((el,index) =>{
    el.onclick = function () {
        modalService[index].style.display = 'none'
    }
})

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
var mixer = mixitup('.work__mix', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */ 
let activeWorkItem = function () {
    $$('.work__filter-item').forEach(function (el) {
        el.classList.remove('active-item-link')
    })
    
    
}
function activeWork() {
    $$('.work__filter-item').forEach(function(el) {
        el.onclick = function() {
            activeWorkItem()
            this.classList.add('active-item-link')
        }
    })
}
 activeWork()

/*=============== SWIPER TESTIMONIAL ===============*/
var testimonialSwiper = new Swiper(".testimonial__container", {
    slidesPerView: 2,
    spaceBetween: 24,
    slidesPerGroup: 1,
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        300: {
            slidesPerView: 1,
            spaceBetween: 12, 
        },
        1024:{
            slidesPerView: 2,
            spaceBetween: 24, 
        }
    }
  
  });



/*=============== LIGHT DARK THEME ===============*/ 
const body = $('body')
const themeBtn = $('#theme-button')

var newTheme
function changeTheme() {
    var currentTheme = themeBtn.getAttribute('class')
    if(currentTheme.includes('fa-regular fa-moon')){
        console.log(currentTheme)
        newTheme = currentTheme.replace('fa-regular fa-moon' ,'fa-solid fa-sun')
        themeBtn.setAttribute('class', newTheme)
        body.classList.remove('theme-light')
    }
    else if(currentTheme.includes('fa-solid fa-sun')) {
        console.log(currentTheme)
        newTheme = currentTheme.replace('fa-solid fa-sun', 'fa-regular fa-moon')
        themeBtn.setAttribute('class', newTheme)
        body.classList.add('theme-light')
    }
  
}
themeBtn.addEventListener('click',changeTheme)
 

/*=============== SCROLL     ANIMATION ===============*/
  ScrollReveal().reveal('#home',{
      duration:2000,
        delay:200,
       distance: '50px',
      
  })


ScrollReveal().reveal('.about__image',{
    duration:1500,
      delay:200,
     distance: '100%',
     origin: 'left',
     viewOffset:{
        bottom:60
    },
})
ScrollReveal().reveal('.about__info',{
    duration:1500,
      delay:200,
     distance: '100%',
     origin: 'right',
     viewOffset:{
        bottom:60
    },
})
ScrollReveal().reveal('#contact',{
    duration:2000,
      delay:200,
     distance: '50px',
   
})
 