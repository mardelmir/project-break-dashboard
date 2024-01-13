const savedList = document.getElementById('linkList')
const linkNameInput = document.getElementById('link-name')
const linkUrlInput = document.getElementById('link-URL')

const verifyLinks = () => { !localStorage.links ? savedList.innerHTML = '' : printLink() }

const saveLink = () => {
    const linkName = linkNameInput.value
    let linkUrl = linkUrlInput.value

    if (!linkName || !linkUrl) { return } else {
        linkUrl.includes('http://') || linkUrl.includes('https://') ? linkUrl : linkUrl = `https://${linkUrl}`

        const newLink = {
            name: linkName,
            url: linkUrl
        }

        if (!localStorage.links) {
            const linksArray = JSON.stringify([newLink])
            localStorage.setItem('links', linksArray)
        } else {
            const storedLinks = JSON.parse(localStorage.links)
            localStorage.links = JSON.stringify([...storedLinks, newLink])
        }
        clearInput()
        printLink()
    }
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

const clearInput = () => {
    linkNameInput.value = ''
    linkUrlInput.value = ''
    linkNameInput.focus()
}

const deleteLink = (removeName, removeUrl) => {
    const storedLinks = JSON.parse(localStorage.links)
    const updatedLinks = storedLinks.filter(link => link.name !== removeName && link.url !== removeUrl)
    localStorage.links = JSON.stringify(updatedLinks)
    printLink()
}

const clearStoredLinks = () => { localStorage.removeItem('links'), printLink() }

verifyLinks()
linkNameInput.addEventListener('keydown', (press) => { if (press.key === 'Enter') { saveLink() } })
linkUrlInput.addEventListener('keydown', (press) => { if (press.key === 'Enter') { saveLink() } })