const currentTimeDate = () => {
    const now = new Date();
    const time = now.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit', 
        second: '2-digit'
    });
    const date = now.toLocaleDateString(navigator.language, {
        year:'numeric',
        month:'2-digit',
        day: '2-digit',
        weekday: 'long'
    });

    document.getElementById('time-date').innerHTML = `
        <p class="time">${time}</p>
        <p class="date">${date}</p>`

    printQuote(time)
}

const printQuote = (time) => {
    const quote = document.getElementById('quote')

    if (!quote) { return } else {
        if (time >= '00:01:00' && time < '07:01:00') {
            quote.textContent = 'Es hora de dormir, ¡hasta mañana!'
        } else if (time >= '07:01:00' && time < '12:01:00') {
            quote.textContent = '¡Buenos días!, desayuna fuerte y a manos a la obra'
        } else if (time >= '12:01:00' && time < '14:01:00') {
            quote.textContent = 'Sigue un poco más pero no te olvides de almorzar'
        } else if (time >= '14:01:00' && time < '16:01:00') {
            quote.textContent = 'Espero que hayas comido bien, recuerda beber agua'
        } else if (time >= '16:01:00' && time < '18:01:00') {
            quote.textContent = 'Buenas tardes, ¡a por el último empujón!'
        } else if (time >= '18:01:00' && time < '22:01:00') {
            quote.textContent = 'Esto ya son horas extra, ... piensa en parar pronto'
        } else if (time >= '22:01:00' && time < '00:01:00') {
            quote.textContent = 'Buenas noches, ve cerrando y a descansar'
        }
    }
}

const alarm = () => {
    const alarmInput = document.getElementById('alarm-input').value
    console.log(alarmInput)
}

document.getElementById('alarm-btn').addEventListener('click', alarm)


setInterval(currentTimeDate, 1000)
currentTimeDate()