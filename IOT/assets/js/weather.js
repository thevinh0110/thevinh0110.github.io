const container_weather = $('.container_weather')
const search = $('.search-box button')
const input = $('.search-box input')
const not_found = $('.not_found')
const weather_box = $('.weather_box')
const weather_detail = $('.weather_detail')
const temp_number = $('.section__body__environment-tem-number')
const humi_number = $('.section__body__environment-humi-number')
const city_title = $('.city_title')
const btn_up = $('.btn-up')

function weather() {
    const APIkey = '63f85da8c580dd6925a6548fbde84cc5'
    const city = $('.search-box input').value
    if(city == '')
        return;

    city_title.innerText = `${city}`
    city_title.classList.add('active')
    btn_up.classList.add('active')

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric
    &appid=${APIkey}`).then(response => response.json()).then(json => {
        
        if(json.cod == '404') {
            temp_number.innerText = `0°C`
            humi_number.innerText = `0%`
            container_weather.style.height = '400px'
            weather_box.classList.remove('active')
            weather_detail.classList.remove('active')
            not_found.classList.add('active')
            return;
        } else {
       

        container_weather.style.height = '555px'
        weather_box.classList.add('active')
        weather_detail.classList.add('active')
        not_found.classList.remove('active')
       
        const image = $('.weather img')
        const temporature = $('.weather .temporature ')
        const description = $('.weather .description')
        const humidity = $('.weather_detail .humidity span')
        const wind = $('.weather_detail .wind span')
        console.log(json.weather[0].main)
        switch (json.weather[0].main) {
            
            case 'Clear':
                image.src = './assets/images/clear.png'
                
                break;
            
            case 'Clouds':
                image.src = './assets/images/cloud.png'
                
                break;
            
            case 'Mist':
                image.src = './assets/images/mist.png'
                
                break;

            case 'Haze':
                image.src = './assets/images/mist.png'
                
                break;
            
            case 'Rain':
                image.src = './assets/images/rain.png'
                
                break;
            
            case 'Snow':
                image.src = './assets/images/snow.png'
                
                break;
            
        
            default:
                image.src = './image/cloud.png'
                break;
        }
        temporature.innerHTML = `${parseInt(json.main.temp) - 273}<span>°C</span>`
        temp_number.innerText = `${parseInt(json.main.temp) - 273}°C`
        description.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        humi_number.innerText = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`
        }
       
    })
}
function btn_up_Clicked() {
    weather_box.classList.remove('active')
    weather_detail.classList.remove('active')
    not_found.classList.remove('active')
    city_title.classList.remove('active')
    container_weather.style.height = '91px'
    btn_up.classList.remove('active')

}

search.addEventListener('click', weather)
btn_up.addEventListener('click',btn_up_Clicked)
input.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') {
        weather()
    }
})
