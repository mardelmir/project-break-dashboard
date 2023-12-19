const baseUrl = 'https://api.weatherapi.com/v1'
const apiKey = '133633a870f34925876162254231412'
const city = 'Sevilla'
const searchLocation = document.getElementById('search-location')
const results = document.getElementById('search-location-results')

const getWeather = async (url) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Error en la respuesta', response.status)
        }
        const data = await response.json()
        const { condition, cloud, humidity, temp_c: temp, wind_kph: wind } = data.current
        const { text, icon } = condition
        const weather = { text, icon, cloud, humidity, temp, wind }
        const location = { name: data.location.name, country: data.location.country }
        const forecast = data.forecast.forecastday[0].hour

        printCurrentWeather(weather, location)
        printHourForecast(forecast)

    } catch (error) { console.log('Error al obtener los datos', error) }
}

const printCurrentWeather = (weather, location) => {
    searchLocation.value = ''
    results.innerHTML = ''
    results.classList.add('hidden')
    const locationDiv = document.getElementById('weatherLocation')
    const currentDiv = document.getElementById('currentWeather')

    locationDiv.innerHTML = `
    <p>${location.name}/${location.country}</p>
    <p class="important">${weather.text}</p>`

    currentDiv.innerHTML = `
    <img src="https:${weather.icon}" alt="${weather.text}" />
    <p>${weather.temp} ºC</p>
    <img src="../assets/img/degree.png" alt="degree" class="black-icon"/>
    <div class="detailed-weather">
        <p>Precipitación: ${weather.cloud}%</p>
        <p>Humedad: ${weather.humidity}%</p>
        <p>Viento: ${weather.wind} km/h</p>
    </div>`
}

const printHourForecast = (forecast) => {
    const forecastDiv = document.getElementById('hourForecast')
    forecast.forEach(hour => {
        const { time_epoch, condition, temp_c } = hour
        let hourlyPrediction = new Date(time_epoch * 1000).getHours()

        hourlyPrediction < 10 ? hourlyPrediction = '0' + hourlyPrediction : hourlyPrediction

        const hourLi = document.createElement('li')
        forecastDiv.appendChild(hourLi)

        hourLi.innerHTML += `
        ${hourlyPrediction}:00
        <img src="https:${condition.icon}" alt="${condition.text}" />
        ${temp_c} ºC`

        const currentHour = new Date().getHours()
        if (currentHour == hourlyPrediction) { hourLi.classList.add('now') }
    })
}

const getLocation = () => {
    const searchUrl = `${baseUrl}/search.json?key=${apiKey}&q=${searchLocation.value}&aqi=no&lang=es`
    results.innerHTML = ''
    selectLocation(searchUrl)
}

const selectLocation = async (url) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Error en la respuesta (location)', response.status)
        }
        const data = await response.json()
        results.classList.remove('hidden')
        data.forEach(option => {
            const selectedUrl = `${baseUrl}/forecast.json?key=${apiKey}&q=${option.lat},${option.lon}&aqi=no&lang=es`
            results.innerHTML += `
                <li class="select-location" onclick="getWeather('${selectedUrl}')">
                    ${option.name}, ${option.region}, ${option.country}
                </li>`
        })
    }
    catch (error) { console.log('Error al obtener los datos', error) }
}

getWeather(`${baseUrl}/forecast.json?key=${apiKey}&q=${city}&aqi=no&lang=es`)