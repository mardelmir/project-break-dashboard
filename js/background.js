const array = ["posición 0", "posición 1", "posición 2", "posición 3", "posición 4", "posición 5", "posición 6", "posición 7", "posición 8", "posición 9"]

const background = () => {
    const currentBackground = Math.floor(Math.random() * (11 - 1) + 1)
    document.body.style.backgroundImage = `url('../assets/img/${currentBackground}.jpg')`
    console.log(array[currentBackground])
}

background()
setInterval(background, 15000)
