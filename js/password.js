let passwordInput = document.getElementById('passwordInput')
let passwordDiv = document.getElementById('generated-password')

const passwordGenerator = () => {
    if (!passwordInput.value) {
        alert('Introduce una longitud para tu contraseña')
    } else {
        const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
        const minus = "abcdefghijklmnopqrstuvwxyz".split('')
        const number = "0123456789".split('')
        const symbol = "!@#$%^&*()-_=+".split('')
        const typesArray = [mayus, minus, number, symbol]
        const passwordArray = [...Array(+passwordInput.value)]

        for (let i in passwordArray) {
            const typesIndex = Math.floor(Math.random() * 4)
            const characterIndex = Math.floor(Math.random() * (typesArray[typesIndex].length - 1))
            passwordArray[i] = typesArray[typesIndex][characterIndex]
        }
        passwordDiv.innerHTML = `<p>Contraseña generada: ${passwordArray.join('')}`
    }
}

const resetPassword = () => {
    passwordInput.value = '12'
    passwordDiv.innerHTML = ''
}

const keystroke = (press) => {
    if (press.key === 'Enter') {
        passwordGenerator();
    }
}
window.addEventListener('keydown', keystroke);