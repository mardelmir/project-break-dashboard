const currentDateTime = () => {
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

    printQuote(hour)
}

const printQuote = (hour) => {
    const quote = document.getElementById('quote')

    if (!quote) { return } else {
        if (hour > 0 && hour <= 7) {
            quote.textContent = 'Es hora de dormir, ¡hasta mañana!'
        } else if (hour > 7 && hour <= 12) {
            quote.textContent = '¡Buenos días!, desayuna fuerte y a manos a la obra'
        } else if (hour > 12 && hour <= 14) {
            quote.textContent = 'Sigue un poco más pero no te olvides de almorzar'
        } else if (hour > 14 && hour <= 16) {
            quote.textContent = 'Espero que hayas comido bien, recuerda beber agua'
        } else if (hour > 16 && hour <= 18) {
            quote.textContent = 'Buenas tardes, ¡a por el último empujón!'
        } else if (hour > 18 && hour <= 22) {
            quote.textContent = 'Esto ya son horas extra, ... piensa en parar pronto'
        } else if (hour > 22 && hour <= 0) {
            quote.textContent = 'Buenas noches, ve cerrando y a descansar'
        }
    }
}

setInterval(currentDateTime, 1000)
currentDateTime()