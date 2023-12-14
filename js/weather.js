const baseUrl = 'https://api.weatherapi.com/v1'
const apiKey = '133633a870f34925876162254231412'
const city = 'Seville'

const locationW = document.getElementById('locationW')
const currentW = document.getElementById('currentW')
const detailedW = document.getElementById('currentDetailedW')
const hourForecast = document.getElementById('hourForecast')

const currentWeather = async (url) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Se ha producido un error', response.status)
        }
        const data = await response.json()
        
        console.log(data)
    } catch (error) { console.log('Error al obtener los datos', error) }
}

currentWeather(`${baseUrl}/forecast.json?key=${apiKey}&q=${city}&aqi=no`)