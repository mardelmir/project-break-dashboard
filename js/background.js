// const imgArray = [
//     "darkerIce",
//     "grayCloud",
//     "ice",
//     "ink",
//     "mountain",
//     "rain",
//     "sea",
//     "sunset",
//     "underwater",
//     "yellowCloud"]

const background = () => {
    const currentBackground = Math.floor(Math.random() * 10)
    document.body.style.backgroundImage = `url('../assets/img/${imgArray[currentBackground]}.jpg')`
}

// background()
// setInterval(background, 15000)