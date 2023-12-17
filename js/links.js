const savedList = document.getElementById('linkList')

const saveLink = () => {
    const linkName = document.getElementById('link-name').value
    const linkUrl = document.getElementById('link-URL').value
    if (!linkName || !linkUrl) { return }

    const newLink = {
        name: linkName,
        url: linkUrl
    }
    if (!localStorage.links) {
        const savedArray = JSON.stringify([newLink])
        localStorage.setItem('links', savedArray)
    } else {
        const oldArray = JSON.parse(localStorage.links)
        localStorage.links = JSON.stringify([...oldArray, newLink])
    }
    printLink()
}

const printLink = () => {
    savedList.innerHTML = ''
    const savedLinks = JSON.parse(localStorage.links)
    savedLinks.forEach(link => {
        const { name, url } = link
        savedList.innerHTML += `
        <li class="link">
            <div class="word">
                <a href="${url}" target="_blank">${name}</a>
            </div>
            <button class="delete-link-btn" onclick="deleteLink('${name}', '${url}')">x</button>
        </li>`
    })
}

const clearLinks = () => {
    localStorage.removeItem('links')
    savedList.innerHTML = ''
    document.getElementById('link-name').value = ''
    document.getElementById('link-URL').value = ''
}

const deleteLink = (removeName, removeUrl) => {
    const storedLinks = JSON.parse(localStorage.links)
    storedLinks.filter(link => {
        if (link.name == removeName && link.url == removeUrl) {
            const index = storedLinks.indexOf(link)
            storedLinks.splice(index, 1)
            localStorage.links = JSON.stringify(storedLinks)
            printLink()
        }
    })
}

!localStorage.links ? savedList.innerHTML = '' : printLink()