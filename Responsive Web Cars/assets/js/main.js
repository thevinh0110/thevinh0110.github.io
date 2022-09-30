const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const header = $('header')
const lineUp = $('.line-up')
const navLinks = $$('.nav__bar-item-link')
const sections = $$('section[id]')
const featuresSection = $('#features')
const featuredSection = $('#featured')
const navMenuBtn = $('.nav__bar')
const navItem = $$('.nav__bar-item')
const navList = $('.nav__bar-list')

console.log(navItem)
console.log(sections)
const filters = $$('.featured__filter-item')
const app = {


    handleEvens() {
   
       window.onscroll = function() {
//         console.log(featuresSection.offsetTop ,featuredSection.offsetTop,window.scrollY)
// console.log(featuresSection,featuredSection)
        var scrollTop = window.pageYOffset;
        // ========changeHeader================ 
        if(scrollTop >= 100) {
            header.classList.add('scroll-header')
        } else {
            header.classList.remove('scroll-header')
        }
        // ==========show line up============= 
        if(scrollTop >= 350) {
            lineUp.classList.add('line-up-show')
        } else  lineUp.classList.remove('line-up-show')
        // ============Scrool active Link=================== 
        sections.forEach(function(section) {
            var scrollTop2 = window.scrollY
            const offsetT = section.offsetTop - 50 ;
            const offsetH = section.offsetHeight ;
            const sectionId = section.getAttribute('id')
            
           
            if(offsetT <= scrollTop2 && scrollTop2 <= offsetT + offsetH) {
                if($('a[href*='+ sectionId + ']').classList.add('nav--active')){
                    $('a[href*='+ sectionId + ']').classList.add('nav--active')

                }
              } else if($('a[href*='+ sectionId + ']')) $('a[href*='+ sectionId + ']').classList.remove('nav--active')
            })
        }
       


    //    =========navActive============ 
       navLinks.forEach(function(nav) {
        nav.onclick = function() {
            $('.nav--active').classList.remove('nav--active')
            nav.classList.add('nav--active')
        }
    })
    // =============filter-active================ 
        filters.forEach((crr) =>{
            crr.onclick = function() {
                $('.filter--active').classList.remove('filter--active')
                crr.classList.add('filter--active')
            }
        })
        navMenuBtn.onclick= function() {
            navMenuBtn.classList.add('nav-mobile--active')
        }
        navList.onclick = function(e) {
            e.stopPropagation()

            $('.nav-mobile--active').classList.remove('nav-mobile--active')


        }
        navItem.forEach((crr) => {
            crr.onclick = function(e) {
                e.stopPropagation()
                $('.nav-mobile--active').classList.remove('nav-mobile--active')
            }
        })
 },
   
    
    

    start() {
        this.handleEvens()
    },

}

app.start()
// ============swiper==============
var swiperPopular = new Swiper(".popular-group", {
    slidesPerView:"auto",
    spaceBetween: 30,
    loop:true,
   
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  var featuredMixer = mixitup('.featured__products', {
    selectors: {
        target: '.featured__products-cart'
    },
    animation: {
        duration: 300
    }
});
// ==========scrollReveal==================== 
const sr = ScrollReveal({
    origin:'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true,

})
sr.reveal('.home__title, .about, .popular, .features, .featured, .offer, .logo,footer')
sr.reveal('.home__sub_title',{delay:500})
sr.reveal('.home__name-wrap',{delay:600})
sr.reveal('.home__img',{delay:800})
sr.reveal('.home__datas-item',{delay:900,interval:300,origin:'bottom'})
sr.reveal('.home-start--wrap',{delay:1000,origin:'bottom'})