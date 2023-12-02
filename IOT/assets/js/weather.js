
const container_weather = $('.container_weather')
const search = $('.search-box button')
const input = $('.search-box input')
const not_found = $('.not_found')
const weather_box = $('.weather_box')
const weather_detail = $('.weather_detail')
const temp_number = $('.section__body__environment-tem-number')
const humi_number = $('.section__body__environment-humi-number')
const city_title = $('.city_title')

function weather() {
    const APIkey = '63f85da8c580dd6925a6548fbde84cc5'
    const city = $('.search-box input').value
    if(city == '')
        return;

    city_title.innerText = `${city}`
    city_title.classList.add('active')
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric
    &appid=${APIkey}`).then(response => response.json()).then(json => {
        
        if(json.cod == '404') {
            container_weather.style.height = '400px'
            weather_box.classList.remove('active')
            weather_detail.classList.remove('active')
            not_found.classList.add('active')
            console.log(not_found)
            return;
        } 
         
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
        console.log(typeof(json.main.temp))
        temporature.innerHTML = `${parseInt(json.main.temp) - 273}<span>°C</span>`
        temp_number.innerText = `${parseInt(json.main.temp) - 273}°C`
        description.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        humi_number.innerText = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`
    })
}
search.addEventListener('click', weather)
input.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') {
        weather()
    }
})