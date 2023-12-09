const background = () => {
    const currentBackground = Math.floor(Math.random() * (10 - 1) + 1)
    console.log(document.body.style.backgroundColor = `url('../assets/img/${currentBackground}.jpg')`)
}

background()