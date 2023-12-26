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
    const typeLengthArray = [mayusLength, minusLength, numberLength, symbolLength]
    warningDiv.innerHTML = ''

    if (!inputLength) {
        alert('Introduce una longitud para tu contraseña')
    } else if (inputLength && (!mayusLength || mayusLength == 0) && (!minusLength || minusLength == 0) && (!numberLength || numberLength == 0) && (!symbolLength || symbolLength == 0)) { standardPassword(inputLength) }
    else { customPassword(inputLength, typeLengthArray) }
}

const randomCharacterGenerator = (input) => {
    const randomArray = [...Array(input)]
    for (let i in randomArray) {
        const typesIndex = Math.floor(Math.random() * 4)
        const characterIndex = Math.floor(Math.random() * (typesArray[typesIndex].length))
        randomArray[i] = typesArray[typesIndex][characterIndex]
    } return randomArray.join('')
}

const standardPassword = (input) => { printPassword(randomCharacterGenerator(input)) }

const customPassword = (input, typeArray) => {
    const characterTypeArray = []

    typeArray.forEach((typeLength, i) => {
        const arrayLenght = []
        for (let x = 0; x < typeLength; x++) {
            const index = Math.floor(Math.random() * (typesArray[i].length))
            arrayLenght[x] = typesArray[i][index]
        }
        arrayLenght.length !== 0 ? characterTypeArray.push(arrayLenght.join('')) : characterTypeArray
    })

    const joinedTypeArray = characterTypeArray.join('').split('')

    if (joinedTypeArray.length > input) {
        input = joinedTypeArray.length
        warningDiv.innerText = `El número de caracteres personalizados supera la longitud total especificada, la contraseña generada pasa a tener ${input} caracteres.`
    }
    const standardLength = input - joinedTypeArray.length
    let finalPassword = [...joinedTypeArray, ...randomCharacterGenerator(standardLength)]
    finalPassword.sort(() => Math.random() - 0.5)

    printPassword(finalPassword.join(''))
}

const printPassword = (password) => {
    passwordDiv.classList.remove('hidden')
    passwordDiv.innerHTML = `
        <p class="bold">Contraseña generada</p>
        <p class="bold important">${password}</p>`
}

const resetPassword = () => {
    passwordInput.value = '12'
    passwordInput.focus()
    const customInput = document.querySelectorAll('.custom-input')
    for (const input of customInput) { input.value = '0' }
    passwordDiv.innerHTML = ''
    warningDiv.innerHTML = ''
    passwordDiv.classList.add('hidden')
}

passwordInput.addEventListener('keydown', (press) => {
if (press.key === 'Enter') { passwordGenerator() }
})

customInput.forEach(input => {
    input.addEventListener('keydown', (press) => {
        if (press.key === 'Enter') { passwordGenerator() }
    })
})