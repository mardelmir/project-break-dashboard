let passwordInput = document.getElementById('passwordInput').value
let mayusInput = document.getElementById('mayusInput').value
let minusInput = document.getElementById('minusInput').value
let numberInput = document.getElementById('numberInput').value
let symbolInput = document.getElementById('symbolInput').value
let passwordDiv = document.getElementById('generated-password')

const passwordGenerator = () => {
    const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
    const minus = "abcdefghijklmnopqrstuvwxyz".split('')
    const number = "0123456789".split('')
    const symbol = "!@#$%^&*()-_=+".split('')
    const typesArray = [mayus, minus, number, symbol]

    if (!passwordInput) {
        alert('Introduce una longitud para tu contraseña')
    } else if (passwordInput && (!mayusInput || mayusInput === '0') && (!minusInput || minusInput === '0') && (!numberInput || numberInput === '0') && (!symbolInput || symbolInput === '0')) {
        const passwordArray = [...Array(+passwordInput)]
        for (let i in passwordArray) {
            const typesIndex = Math.floor(Math.random() * 4)
            const characterIndex = Math.floor(Math.random() * (typesArray[typesIndex].length - 1))
            passwordArray[i] = typesArray[typesIndex][characterIndex]
        }
        passwordDiv.innerHTML = `<p>Contraseña generada: ${passwordArray.join('')}`
    }
    else {
        customPassword(typesArray)
    }
}

const customPassword = (typesArray) => {
    const passwordArray = [...Array(+passwordInput)]
    console.log(typesArray)
}


const resetPassword = () => {
    passwordInput = '12'
    passwordDiv.innerHTML = ''
}

const keystroke = (press) => {
    if (press.key === 'Enter') {
        passwordGenerator();
    }
}
window.addEventListener('keydown', keystroke);