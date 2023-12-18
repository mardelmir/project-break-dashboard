const body = document.body
const lightArray = [
    'abstract',
    'blue',
    'haze',
    'ice',
    'ink',
    'mountain',
    'shore',
    'smoke'
]

const darkArray = [
    'constellation',
    'dark',
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
    const currentBackground = Math.floor(Math.random() * 8)
    body.style.backgroundImage = `url('../assets/img/lightMode/${lightArray[currentBackground]}.jpg')`
}

const darkMode = () => {
    const currentBackground = Math.floor(Math.random() * 11)
    body.style.backgroundImage = `url('../assets/img/darkMode/${darkArray[currentBackground]}.jpg')`
}

const verifyMode = () => {
    if (localStorage.mode == 'dark') {
        darkMode()
        if (body.classList !== 'dark-mode') { body.classList.add('dark-mode') }
    } else {lightMode()}
}

const toggleMode = () => {
    body.classList.toggle('dark-mode')
    body.classList == 'dark-mode' ? localStorage.setItem('mode', 'dark') : localStorage.setItem('mode', 'light')
    verifyMode()
}

// setInterval(verifyMode, 5000)
verifyMode()

// Nav-bar
const menuVisibility = () => {
    const hiddenMenu = document.getElementById('hiddenMenu')
    hiddenMenu.classList.toggle('hidden')
}