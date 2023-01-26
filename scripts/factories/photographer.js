/* eslint-disable indent */
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
function photographerFactory (data) {
    // Récupération des données de "data"
    const { name, portrait, city, country, tagline, price, id } = data
    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM () {
        // Constitution du DOM
        const tagA = document.createElement('a')
        const linkNewPage = `./photographer.html?id=${id}`
        tagA.setAttribute('href', linkNewPage)
        tagA.setAttribute('tabindex', '0')

        const article = document.createElement('article')
        tagA.appendChild(article)
        tagA.setAttribute('role', 'navigation')
        const img = document.createElement('img')
        img.setAttribute('src', picture)
        img.setAttribute('alt', 'Portrait de ' + name)
        img.setAttribute('aria-label', 'Naviguer vers la page de ' + name)
        const h2 = document.createElement('h2')
        const h3 = document.createElement('h3')
        const h4 = document.createElement('h4')
        const p = document.createElement('p')
        h2.textContent = name
        h3.textContent = city + ', ' + country
        h4.textContent = tagline
        p.textContent = price + '€/jour'
        article.appendChild(img)
        article.appendChild(h2)
        article.appendChild(h3)
        article.appendChild(h4)
        article.appendChild(p)
        return (tagA)
    }

    function makeHeader () {
        // Constitution du DOM du header
        // Section 'header'
        const photographHeader = document.createElement('section')
        // main.appendChild(photographHeader);
        photographHeader.classList.add('photograph-header')
        photographHeader.setAttribute('tabindex', '0')

        // Bloc 'identité'
        const photographerIdentity = document.createElement('div')
        photographHeader.appendChild(photographerIdentity)
        photographerIdentity.classList.add('photographerIdentity')

        const photographerName = document.createElement('h2')
        photographerIdentity.appendChild(photographerName)
        photographerName.classList.add('photographerName')

        const photographerCity = document.createElement('h3')
        photographerIdentity.appendChild(photographerCity)
        photographerCity.classList.add('photographerCity')

        const photographerTagLine = document.createElement('h4')
        photographerIdentity.appendChild(photographerTagLine)
        photographerTagLine.classList.add('photographerTagLine')

        // Alimentation des zones HTML
        photographerName.innerHTML = name
        photographerCity.innerHTML = city + ', ' + country
        photographerTagLine.innerHTML = tagline

        // Bouton "Contactez-moi"
        const contact_button = document.createElement('button')
        photographHeader.appendChild(contact_button)
        contact_button.classList.add('contact_button')
        contact_button.setAttribute('onclick', 'displayModal()')
        contact_button.setAttribute('type', 'button')
        contact_button.setAttribute('role', 'button')
        contact_button.setAttribute('aria-label', 'Ouvrir le formulaire de contact')
        contact_button.innerHTML = 'Contactez-moi'

        // Portrait du Photographe
        const photographerPortrait = document.createElement('div')
        photographHeader.appendChild(photographerPortrait)
        photographerPortrait.classList.add('photographerPortrait')
        const imgPortrait = document.createElement('img')
        imgPortrait.setAttribute('src', picture)
        imgPortrait.setAttribute('alt', 'Portrait de ' + name)
        photographerPortrait.appendChild(imgPortrait)

        // Alimentation du cartouche : Tarif
        const tarif = document.querySelector('.tarif')
        tarif.innerHTML = price + '€/jour'

        return photographHeader
    }
    return { name, picture, city, country, tagline, price, id, getUserCardDOM, makeHeader }
}
