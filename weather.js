const cityInput = document.querySelector('.weather-city-input')
const searchBtn = document.querySelector('.weather-search-btn')
const apiKey = 'f2ebf97468b722c4c26b0a45c3f330d7'
const searchCitySection = document.querySelector('.search-city')
const weatherInfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const countryTxt = document.querySelector('.weather-country-text')
const tempTxt = document.querySelector('.weather-temp-txt')
const conditionTxt = document.querySelector('.weather-condition-txt')
const humidityValueTxt = document.querySelector('.weather-humidity-value-txt')
const windValueTxt = document.querySelector('.weather-wind-value-txt')
let weatherSummaryimg = document.querySelector('.weather-summary-img')
const currentDateTxt = document.querySelector('.current-date-txt')
// const foreCastItemContainer = document.querySelector('.forecast-item-container')

searchBtn.addEventListener('click', ()=>{
    console.log(cityInput.value.trim() != '')
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
)

cityInput.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter' && cityInput.value.trim()!= ''){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

async function getFetchData(endPoint, city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(apiUrl)
    return response.json()
}

function getWeaatherIcon(id){
    
    if(id <= 232) return 'thunderstorm.svg'
    if(id <= 321) return 'drizzle.svg'
    if(id <= 531) return 'rain.svg'
    if(id <= 632) return 'snow.svg'
    if(id <= 781) return 'atmosphere.svg'
    if(id <= 800) return 'clear.svg'
    else return 'clouds.svg'
}

function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-IN', options)
}

async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather',city)
    if(weatherData.cod != 200){
        showDisplaySection(notFoundSection)
        return
    }
   
    console.log(weatherData)

    const{
        name:country,
        main:{temp, humidity},
        weather: [{id, main}],
        wind:{speed}

    } = weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round(temp) + ' °C'
    conditionTxt.textContent = humidity + '%'
    windValueTxt.textContent = speed + ' M/s'
    currentDateTxt.textContent = getCurrentDate()
    weatherSummaryimg = `weather/${getWeaatherIcon(id)}`

    await updateForecastsInfo(city)
    showDisplaySection(weatherInfoSection)
}

async function updateForecastsInfo(city){
    const forecastsData = await getFetchData('forecast', city)
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]
    // foreCastItemContainer.innerHTML = 

    forecastsData.list.forEach(forecastWeather =>{
        if(forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)){
                // updateForecastsItems(forecastWeather)
        }
    })
    console.log(forecastsData)
}


function showDisplaySection(section){
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')
        section.style.display = 'flex'

}