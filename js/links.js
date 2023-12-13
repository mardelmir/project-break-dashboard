const savedList = document.getElementById('linkList')

document.getElementById('clear').addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})

const saveLink = () => {
    const linkName = document.getElementById('link-name').value
    const linkUrl = document.getElementById('link-URL').value
    const newLink = {
        name: linkName,
        url: linkUrl
    }

    if (!localStorage.links) {
        const savedArray = JSON.stringify([newLink])
        localStorage.setItem('links', savedArray)
    } else {
        const savedOld = JSON.parse(localStorage.links)
        localStorage.links = JSON.stringify([...savedOld, newLink])
    }
    printLink()

}

const printLink = () => {
    savedList.innerHTML = ''
    const savedLinks = JSON.parse(localStorage.links)
    savedLinks.forEach(link => {
        savedList.innerHTML += `
        <li>
            <a href="${link.url}" target="_blank">${link.name}</a>
            <span class="delete-link">x</span>
        </li>`
    })
}

const deleteLink = () => {
    console.log()
    // JSON.parse(localStorage.links).filter(link => {
    //     console.log(link)
    // })
}

!localStorage.links ? savedList.innerHTML = '' : printLink()

const deleteItem = document.getElementsByClassName('delete-link')

for (let element of deleteItem){
    element.addEventListener('click', deleteLink)
}