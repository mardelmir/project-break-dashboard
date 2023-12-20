const passwordInput = document.getElementById('passwordInput')
const customInput = document.querySelectorAll('.custom-input')
const passwordDiv = document.getElementById('generated-password')
const warningDiv = document.getElementById('warning')

const show = () => { document.getElementById('custom').classList.toggle('hidden') }

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
    warningDiv.innerHTML = ''

    if (!inputLength) {
        alert('Introduce una longitud para tu contraseña')
    } else if (inputLength && (!mayusLength || mayusLength == 0) && (!minusLength || minusLength == 0) && (!numberLength || numberLength == 0) && (!symbolLength || symbolLength == 0)) { standardPassword(inputLength) }
    else { customPassword(inputLength, mayusLength, minusLength, numberLength, symbolLength) }
}

const randomCharacterGenerator = (input) => {
    const randomArray = [...Array(input)]
    for (let i in randomArray) {
        const typesIndex = Math.floor(Math.random() * 4)
        const characterIndex = Math.floor(Math.random() * (typesArray[typesIndex].length))
        randomArray[i] = typesArray[typesIndex][characterIndex]
    } return randomArray
}

const standardPassword = (input) => { printPassword(randomCharacterGenerator(input)) }

const customPassword = (input, mayus, minus, number, symbol) => {
    const arrayMayus = []
    for (let i = 0; i < mayus; i++) {
        const index = Math.floor(Math.random() * (typesArray[0].length))
        arrayMayus[i] = typesArray[0][index]
    }
    const arrayMinus = []
    for (let i = 0; i < minus; i++) {
        const index = Math.floor(Math.random() * (typesArray[1].length))
        arrayMinus[i] = typesArray[1][index]
    }
    const arrayNumber = []
    for (let i = 0; i < number; i++) {
        const index = Math.floor(Math.random() * (typesArray[2].length))
        arrayNumber[i] = typesArray[2][index]
    }
    const arraySymbol = []
    for (let i = 0; i < symbol; i++) {
        const index = Math.floor(Math.random() * (typesArray[3].length))
        arraySymbol[i] = typesArray[3][index]
    }

    const customArray = [...arrayMayus, ...arrayMinus, ...arrayNumber, ...arraySymbol]
    if (customArray.length > input) {
        input = customArray.length
        warningDiv.innerHTML = `
        El número de caracteres personalizados supera la longitud total especificada, la contraseña generada pasa a tener ${input} caracteres. Haz scroll si no ves la contraseña completa.`
    }
    const standardLength = input - (mayus + minus + number + symbol)
    let cpArray = [...customArray, ...randomCharacterGenerator(standardLength)]
    cpArray.sort(() => Math.random() - 0.5)
    printPassword(cpArray)
}

const printPassword = (passwordArray) => {
    passwordDiv.classList.remove('hidden')
    passwordDiv.innerHTML = `
        <p class="bold">Contraseña generada</p>
        <p class="bold important">${passwordArray.join('')}</p>`
}

const resetPassword = () => {
    passwordInput.value = '12'
    const customInput = document.querySelectorAll('.custom-input')
    for (const input of customInput) {input.value = '0'}
    passwordDiv.innerHTML = ''
    warningDiv.innerHTML = ''
    passwordDiv.classList.add('hidden')
}

passwordInput.addEventListener('keydown', (press) => {
    if (press.key === 'Enter') {passwordGenerator()}})

customInput.forEach(e => {e.addEventListener('keydown', (press) => {
    if (press.key === 'Enter') {passwordGenerator()}})})