const body = document.body
const lightArray = [
    'abstract',
    'blue',
    'foggy',
    'haze',
    'ink',
    'mountain',
    'shore',
    'smoke',
    'white'
]

const darkArray = [
    'constellation',
    'dark',
    'darkSmoke',
    'deepSpace',
    'navy',
    'nebula',
    'night',
    'purple',
    'space',
    'starry',
    'stars',
    'trees'
]

const lightMode = () => {
    const currentBackground = Math.floor(Math.random() * 9)
    body.style.backgroundImage = `url('./assets/img/lightMode/${lightArray[currentBackground]}.jpg')`
}

const darkMode = () => {
    const currentBackground = Math.floor(Math.random() * 12)
    body.style.backgroundImage = `url('./assets/img/darkMode/${darkArray[currentBackground]}.jpg')`
}

const verifyMode = () => {
    if (localStorage.mode == 'dark') {
        darkMode()
        if (body.classList !== 'dark-mode') { body.classList.add('dark-mode') }
    } else { lightMode() }
}

const toggleMode = () => {
    body.classList.toggle('dark-mode')
    body.classList == 'dark-mode' ? localStorage.setItem('mode', 'dark') : localStorage.setItem('mode', 'light')
    verifyMode()
}

setInterval(verifyMode, 15000)
verifyMode()

// Nav
const menuVisibility = () => {
    const hiddenMenu = document.getElementById('hiddenMenu')
    hiddenMenu.classList.toggle('hidden')
}

// Alarmas
const verifyAlarm = () => {
    let stop = false;
    (localStorage.alarms && localStorage.alarms !== '[]') ? triggerAlarm() : stop = true
}

const triggerAlarm = () => {
    const date = new Date();
    const now = date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    const parsedAlarms = JSON.parse(localStorage.alarms)
    
    parsedAlarms.forEach((alarm, i) => {
        if (alarm === now) {
            const modal = document.querySelector('.modal')
            modal.classList.remove('hidden')
            modal.innerHTML = `
                <p>¡Son las ${alarm}!</p>
                <button type="button" class="btn" onclick="hideModal(event)">Cerrar alarma</button>`
        }
    })
}

const hideModal = (clk) => {clk.target.parentElement.classList.add('hidden')}

verifyAlarm()
setInterval(verifyAlarm, 1000)