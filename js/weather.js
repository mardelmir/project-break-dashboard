const baseUrl = 'https://api.weatherapi.com/v1'
const apiKey = '133633a870f34925876162254231412'
const city = 'Sevilla'

const getWeather = async (url) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Error en la respuesta', response.status)
        }
        const data = await response.json()
        const { condition, cloud, humidity, temp_c: temp, wind_kph: wind } = data.current
        const { text, icon } = condition
        const currentWeather = { text, icon, cloud, humidity, temp, wind }
        const forecast = data.forecast.forecastday[0].hour

        printCurrentWeather(currentWeather)
        printHourForecast(forecast)

    } catch (error) { console.log('Error al obtener los datos', error) }
}

const printCurrentWeather = (current) => {
    const locationDiv = document.getElementById('weatherLocation')
    const currentDiv = document.getElementById('currentWeather')

    locationDiv.innerHTML = `
        <p>Sevilla/Andalucía</p>
        <p>${current.text}</p>`

    currentDiv.innerHTML = `
        <img src="https:${current.icon}" alt="${current.text}" />
        <p>${current.temp} ºC</p>
        <div class="detailed-weather">
            <p>Precipitación: ${current.cloud}%</p>
            <p>Humedad: ${current.humidity}%</p>
            <p>Viento: ${current.wind} km/h</p>
        </div>`
}

const printHourForecast = (forecast) => {
    const forecastDiv = document.getElementById('hourForecast')
    forecast.forEach(hour => {
        const { time_epoch, condition, temp_c } = hour
        let hourlyPrediction = new Date(time_epoch * 1000).getHours()
        if (hourlyPrediction < 10) { hourlyPrediction = `0${hourlyPrediction}` }

        const hourLi = document.createElement('li')
        forecastDiv.appendChild(hourLi)
        
        hourLi.innerHTML += `
                ${hourlyPrediction}:00
                <img src="https:${condition.icon}" alt="${condition.text}" />
                ${temp_c} ºC`

        const currentHour = new Date().getHours()
        if (currentHour == hourlyPrediction) {hourLi.classList.add('now')}
    })
}

getWeather(`${baseUrl}/forecast.json?key=${apiKey}&q=${city}&aqi=no&lang=es`)