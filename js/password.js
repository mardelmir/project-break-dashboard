const passwordInput = document.getElementById('passwordInput')
const passwordDiv = document.getElementById('generated-password')
const customInput = document.querySelectorAll('.custom-input')

const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const minus = "abcdefghijklmnopqrstuvwxyz".split('')
const number = "0123456789".split('')
const symbol = "!@#$%^&*()-_=+".split('')
const typesArray = [mayus, minus, number, symbol]

const passwordGenerator = () => {
    const inputLength = +passwordInput.value
    const mayusLength = +customInput[0].value
    const minusLength = +customInput[1].value
    const numberLength = +customInput[2].value
    const symbolLength = +customInput[3].value

    if (!inputLength) {
        alert('Introduce una longitud para tu contraseña')
    } else if (inputLength && (!mayusLength || mayusLength == 0) && (!minusLength || minusLength == 0) && (!numberLength || numberLength == 0) && (!symbolLength || symbolLength == 0)) { basicPassword(inputLength) }
    else { customPassword(inputLength, mayusLength, minusLength, numberLength, symbolLength) }
}

const basicPassword = (input) => {
    const basicArray = [...Array(input)]
    for (let i in basicArray) {
        const typesIndex = Math.floor(Math.random() * 4)
        const characterIndex = Math.floor(Math.random() * (typesArray[typesIndex].length))
        basicArray[i] = typesArray[typesIndex][characterIndex]
    }
    printPassword(basicArray)
}

const customPassword = (input, mayus, minus, number, symbol) => {
    const customArray = [...Array(input)]
    const customIteration = [mayus, minus, number, symbol]
    console.log(customIteration);
    customIteration.forEach(type => {

    })

    
    const customMinus = typesArray[1]
    const customNumber = typesArray[2]
    const customSymbol = typesArray[3]

    const numberOfCustom = mayus + minus + number + symbol
    const randomCharacters = input - numberOfCustom
}

const printPassword = (passwordArray) => {
    passwordDiv.innerHTML = `<p>Contraseña generada: ${passwordArray.join('')}`
}

const resetPassword = () => {
    passwordInput.value = '12'
    customInput
    for (const item of customInput) { item.value = '0' }
    passwordDiv.innerHTML = ''
}

const keystroke = (press) => {
    if (press.key === 'Enter') {
        passwordGenerator();
    }
}
window.addEventListener('keydown', keystroke);