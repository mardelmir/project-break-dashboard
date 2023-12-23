const currentTimeDate = () => {
    const now = new Date()
    const time = now.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    const date = now.toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long'
    })

    document.getElementById('time-date').innerHTML = `
        <p class="time">${time}</p>
        <p class="date">${date}</p>`

    printQuote(time)
    displayAlarms()
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

const hourInput = document.getElementById('hour')
const minInput = document.getElementById('min')
const secInput = document.getElementById('sec')

const setAlarm = () => {
    const date = new Date()
    date.setHours(hourInput.value)
    date.setMinutes(minInput.value)
    date.setSeconds(secInput.value)

    const formattedAlarm = date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    saveAlarm(formattedAlarm)
    displayAlarms()
    clearAlarmInput()
}

const saveAlarm = (newAlarm) => {
    if (!localStorage.alarms) {
        const stringifiedAlarms = JSON.stringify([newAlarm])
        localStorage.setItem('alarms', stringifiedAlarms)
    } else {
        const savedAlarms = JSON.parse(localStorage.alarms)
        localStorage.alarms = JSON.stringify([...savedAlarms, newAlarm])
    }
}

const displayAlarms = () => {
    if (!document.getElementById('saved-alarms')) { return } else {
        const alarmList = document.getElementById('saved-alarms')
        alarmList.innerHTML = ''

        if (!localStorage.alarms || ((localStorage.alarms).lenght == 0)) { return } else {
            const parsedAlarms = JSON.parse(localStorage.alarms)
            const toNumber = x => Number(x.match(/\d+/)[0])
            const sortedAlarms = parsedAlarms.sort((a, b) => toNumber(a) - toNumber(b))

            sortedAlarms.forEach(alarm => {
                alarmList.innerHTML += `
            <li class="link">
                <p class="saved-alarm">${alarm}</p>
                <button class="delete-link-btn" onclick="deleteAlarm('${alarm}')">x</button>
            </li>`
            })
        }
    }
}

const deleteAlarm = (alarm) => {
    const parsedAlarms = JSON.parse(localStorage.alarms)

    parsedAlarms.filter(element => {
        if (element == alarm) {
            const index = parsedAlarms.indexOf(alarm)
            parsedAlarms.splice(index, 1)
            localStorage.alarms = JSON.stringify(parsedAlarms)
            displayAlarms()
        }
    })
}

const clearAlarmInput = () => {
    hourInput.value = ''
    minInput.value = ''
    secInput.value = ''
    hourInput.focus()
}

const clearStoredAlarms = () => {
    localStorage.removeItem('alarms')
}


setInterval(currentTimeDate, 1000)
currentTimeDate()