const currentDT = () => {
    const date = new Date();
    const year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()

    if (month < 10) { month = `0${month}` }
    if (day < 10) { day = `0${day}` }
    if (hour < 10) { hour = `0${hour}` }
    if (min < 10) { min = `0${min}` }
    if (sec < 10) { sec = `0${sec}` }

    document.getElementById('time-date').innerHTML = `
        <span class="time">${hour}:${min}:${sec}</span>
        <span class="date">${day}/${month}/${year}</span>`

    quote(hour)
}

const quote = (hour) => {
    const quote = document.getElementById('quote')
    if (0 <= hour <= 7) {
        quote.textContent = 'Es hora de descansar. Apaga y sigue mañana'
    }
}

setInterval(currentDT, 1000)
currentDT()