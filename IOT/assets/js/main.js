const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)
let themeBtn = $('.icon-theme')
let lightBtn = $('.section__body__device-light-btn')
let fanBtn = $('.section__body__device-fan-btn')
let tvBtn = $('.section__body__device-tv-btn')
let acBtn = $('section__body__device-ac-btn')
let DFdevices = ['LIGHT','FAN','TV','AC'];
let bodyDfDevices = $('.section__body__device')
let btnDevice = $$('.btn-off')
let body = $('body')
let controlbtn = $$('.otherDevice_list_item')
let btnAddDevices = $$('.btn_add_device')
let btnRemoveDevices = $$('.btn_remove_device')
let bodyOtherDevice = $('.otherDevice__mix')
let otherDevices = $$('.otherDevice_cart')

var otherDevices_data =  [
  {
    "id": 1,
    "name": "radio",
    "icon": "fa-solid fa-radio",
    "position": "floor1"
  },
  {
    "name": "light",
    "icon": "fa-regular fa-lightbulb",
    "position": "floor2",
    "id": 2
  },
  {
    "name": "robot",
    "icon": "fa-solid fa-robot",
    "position": "floor3",
    "id": 3
  },
  {
    "name": "bath",
    "icon": "fa-solid fa-bath",
    "position": "floor3",
    "id": 4
  },
  {
    "name": "sink",
    "icon": "fa-solid fa-sink",
    "position": "floor2",
    "id": 5
  },
  {
    "name": "toilet",
    "icon": "fa-solid fa-toilet",
    "position": "floor1",
    "id": 6
  },
  {
    "name": "camera",
    "icon": "fa-solid fa-video",
    "position": "floor1",
    "id": 7
  },
  {
    "name": "wifi",
    "icon": "fa-solid fa-wifi",
    "position": "floor1",
    "id": 8
  },
  {
    "name": "ghost",
    "icon": "fa-solid fa-ghost",
    "position": "floor3",
    "id": 9
  }
]
  
// const df_devicesApI =' http://localhost:3000/defaultDevices'
// const other_devicesApi = 'http://localhost:3000/otherDevices'
// function render() {
    
//     fetch(df_devicesApI)
//     .then(response => response.json())
//     .then(df_devices => {

//         var htmls = df_devices.map((device,index) => {
//           brr = [...brr,...[device]]
          
//             return `<div class="section__body__device_item">
//             <div class="section__body__device-container">
//               <div class="section__body__device-icon"><i class="${device.icon}"></i></div>
//               <div class="section__body__device-title">${device.name}</div>
//             </div>
//             <div onclick="on_offDevice(event,${index})" class="section__body__device-btn btn-off "><i class="fa fa-toggle-off" aria-hidden="true"></i></div>

//           </div>`
//         })
        
//         var aaa = JSON.stringify(df_devices)
//         console.log(aaa)
//         console.log(JSON.parse(aaa))
//         htmls = htmls.join('')
//         bodyDfDevices.innerHTML = htmls
      
//     })

//     fetch(other_devicesApi)
//     .then(response => response.json())
//     .then(otherDevices => {
//         var htmls = otherDevices.map((device,index) => {
//           return `
//           <div href="" style="order:${device.id};"class="otherDevice_cart  mix ${device.position}">
//           <div class="otherDevice_item">
//             <div class="otherDevice_item_icon"><i class="${device.icon}"></i></div>
//             <div class="otherDevice_item_title">${device.name}</div>
//           </div>
//           <div class="otherDevice_item_place">${device.position}</div>
//           <div class="btn_add_device"><i class="fa-solid fa-plus"></i></div>
          
//         </div>
//           `
//       })
//     })

// }


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
  
function on_offDevice(event,index, deviceString) {
  // var devicess = JSON.parse(...deviceString)
    if(event.target.matches('.fa.fa-toggle-off')) {
        event.target.classList.remove('fa-toggle-off')
        event.target.classList.add('fa-toggle-on')
        toast({
            title: `${DFdevices[index]}`,
            message: "Is On",
            type: "success",
            duration: 3000
          });
    }
    else if(event.target.matches('.fa.fa-toggle-on')) {
        event.target.classList.remove('fa-toggle-on')
        event.target.classList.add('fa-toggle-off')
        toast({
            title: `${DFdevices[index]}`,
            message: "Is off",
            type: "error",
            duration: 3000
          });
    }
    
}
function on_offDevice2(event,index, deviceString) {
  // var devicess = JSON.parse(...deviceString)
    if(event.target.matches('.fa.fa-toggle-off')) {
        event.target.classList.remove('fa-toggle-off')
        event.target.classList.add('fa-toggle-on')
        toast({
            title: `${otherDevices_data[index].name}`,
            message: "Is On",
            type: "success",
            duration: 3000
          });
    }
    else if(event.target.matches('.fa.fa-toggle-on')) {
        event.target.classList.remove('fa-toggle-on')
        event.target.classList.add('fa-toggle-off')
        toast({
            title: `${otherDevices_data[index].name}`,
            message: "Is off",
            type: "error",
            duration: 3000
          });
    }
    
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
function controlBtnActive() {
  controlbtn.forEach((elemen, index) => {
    elemen.addEventListener('click',() =>{
      document.querySelector('.otherDevice_list_item.active-item').classList.remove('active-item')
      elemen.classList.add('active-item')
    })
    
  });
}

function add_removeDevice() {

  btnAddDevices.forEach((el,index) => {
    el.addEventListener('click',() =>{

      if(!bodyDfDevices.contains(document.querySelector(`.data-item-${index}`))) {
           // otherDevices[index].remove()
          otherDevices[index].style.display = 'none'
      // arr.splice(index,1)
      // console.log(arr)
      // arr.forEach(element=> {
      //   bodyOtherDevice.appendChild(element)
      // })
      // mixFloor()
      var html = document.createElement('div')
      html.classList.add('section__body__device_item','section__body__device_itemSelected',`data-item-${index}`)
      html.setAttribute("data-index",index)
      html.innerHTML = `
      <div class="section__body__device-container">
        <div class="section__body__device-icon"><i class="${otherDevices_data[index].icon}"></i></div>
        <div class="section__body__device-title">${otherDevices_data[index].name}</div>
      </div>
      <div onclick="on_offDevice2(event,${index})" class="section__body__device-btn btn-off "><i class="fa fa-toggle-off" aria-hidden="true"></i></div>
      <div onclick="removeItem(${index})" class="btn_remove_device"><i class="fa-solid fa-minus"></i></div>   
`
      bodyDfDevices.appendChild(html)
      } else {
        toast({ title : `${otherDevices_data[index].name}`, message : "has been selected", type : "info", duration :3000 })
      }
   
    })
    
  })
}
function removeItem(index) {
  var itemSelected = $$('.section__body__device_itemSelected')
  var indexx
  itemSelected.forEach((el,id) => {
    var dataIndex = el.getAttribute("data-index")
    if(dataIndex == index) {
      indexx = dataIndex
      el.remove()
      // bodyOtherDevice.appendChild(otherDevices[indexx])
      otherDevices[indexx].style.display = '' 
      // mixFloor()
      
    }
  })  
}

function handleClicks() {
  controlBtnActive()
  changeTheme()
  add_removeDevice()
}
function start() {
    mixFloor()
    handleClicks()
}
start()
// Toast function
function mixFloor() {
  let mixerDevice = mixitup('.otherDevice__mix', {
    selectors: {
        target: '.otherDevice_cart'
    },
    animation: {
        duration: 300
    }
  });
}

ScrollReveal().reveal('.section_weather', {
  origin: 'right',
  duration: 2000,
  distance: '100px',
  delay : 500,
  opacity:0,
  viewOffset:{
    bottom:100
},
afterReveal: function(el) {
  ScrollReveal().clean(el);
}
});
ScrollReveal().reveal('.section_smartHome', { 
  origin: 'left',
  duration: 2000,
  distance: '100px',
  delay : 500,
  opacity:0,
  viewOffset:{
    bottom:100
},
});
function haha() {
  console.log(otherDevices)
  Array.from(otherDevices).forEach(el => {
    el.style.visibility = 'visible'
  })
  ScrollReveal().reveal('.otherDevice_cart', { 
    origin: 'bottom',
    interval: 200,
    duration: 1000,
    distance:'',
    delay : 500,
    opacity:0,
    viewOffset:{
      bottom:60
  },
  });
}

ScrollReveal().reveal('.section_otherDevice', { 
  origin: 'right',
  duration: 2000,
  distance:'100px',
  delay : 500,
  opacity:0,
  viewOffset:{
    bottom:60
},
 afterReveal: haha
});

ScrollReveal().reveal('.section_chart', { 
  origin: 'bottom',
  duration: 2000,
  distance:'100%',
  delay : 500,
  opacity:0,
  viewOffset:{
    bottom:100
},
});


