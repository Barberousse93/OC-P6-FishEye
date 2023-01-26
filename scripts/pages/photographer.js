/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
// Variable globale
let medias = []

// Masquage du loader quand la page est chargée complètement.
window.onload = () => {
    const loader = document.querySelector('.loader_container')
    loader.classList.add('hidden')
}

async function getPhotographer (ID) {
    // Récupérer les données du photographe sélectionné.
    // paramètre : ID transmis dans l'URL
    try {
        let photographers = []
        const JSONFile = 'data/photographers.json'

        const res = await fetch(JSONFile)
        if (res.ok) {
            const data = await res.json()
            photographers = data.photographers

            const photographer = photographers.find(photographers => photographers.id == ID)
            return photographer
        }
    } catch (err) {
        console.log(err)
        return new Error(err)
    }
}

function displayPhotographer (data) {
    const main = document.getElementById('main')
    const photographerModel = photographerFactory(data)
    const userCardDOM = photographerModel.makeHeader()
    main.appendChild(userCardDOM)
}

async function displayGallery (data) {
    const main = document.getElementById('main')
    const gallerySection = document.createElement('section')
    gallerySection.classList.add('gallery')
    gallerySection.setAttribute('tabindex', '0')
    gallerySection.setAttribute('aria-label', 'Galerie médias')
    main.appendChild(gallerySection)
    data.forEach((media, index) => {
        // eslint-disable-next-line no-undef
        const mediaCard = galleryFactory(media, index)
        const mediaCardDOM = mediaCard.getMediaCardDOM()
        gallerySection.appendChild(mediaCardDOM)
    })
}

async function init () {
    // Extraction de l'ID du photographe à traiter.
    const params = (new URL(document.location)).searchParams
    const photographerID = params.get('id')

    // Récupère les datas du photographe sélectionné
    const photographer = await getPhotographer(photographerID)
    // Génère le header de la page du Photographe
    displayPhotographer(photographer)
    // Ajoute le nom du photographe dans le header de la modale de contact
    const contactPhotographer = document.querySelector('.modal header h2')
    contactPhotographer.innerHTML = 'Contactez-moi : ' + '</br>' + photographer.name

    sortSection()

    let mediasGallery = []
    mediasGallery = await getMedias(photographerID)
    displayGallery(mediasGallery)

    GestionLikes()
}

init()

function GestionLikes () {
    // gestion du "click" sur les coeurs de la galerie
    // Incrémentation / décrémentation des scores de chaque média (nbLikesMedia) et
    // score global du Photographe (nbLikesPhotographer)
    const likes = document.querySelectorAll('.love i')
    likes.forEach(item => item.addEventListener('click', () => {
        item.classList.toggle('checked')

        const nbLikesPhotographer = document.querySelector('.Nb_likes')
        const nbLikesMedia = item.parentElement.parentElement.firstChild
        let tampon1 = parseInt(nbLikesPhotographer.innerText)
        let tampon2 = parseInt(nbLikesMedia.innerText)

        if (item.classList.contains('checked')) {
            tampon1++
            nbLikesPhotographer.innerText = tampon1++
            tampon2++
            nbLikesMedia.innerText = tampon2
        } else {
            item.removeAttribute('aria-alert')
            tampon1--
            nbLikesPhotographer.innerText = tampon1
            tampon2--
            nbLikesMedia.innerText = tampon2
        }
    }))
    likes.forEach(item => item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            item.classList.toggle('checked')
            const nbLikesPhotographer = document.querySelector('.Nb_likes')
            const nbLikesMedia = item.parentElement.parentElement.firstChild
            let tampon1 = parseInt(nbLikesPhotographer.innerText)
            let tampon2 = parseInt(nbLikesMedia.innerText)

            if (item.classList.contains('checked')) {
                tampon1++
                nbLikesPhotographer.innerText = tampon1++
                tampon2++
                nbLikesMedia.innerText = tampon2
            } else {
                tampon1--
                nbLikesPhotographer.innerText = tampon1
                tampon2--
                nbLikesMedia.innerText = tampon2
            }
        }
    }))
}

async function getMedias (ID) {
    medias = []
    // const PhotographerMedias = []

    const JSONFile = 'data/photographers.json'

    await fetch(JSONFile)
        .then(function (res) {
            if (res.ok) {
                return res.json()
            }
        })
        .then(function (data) {
            medias = data.media.filter(media => media.photographerId == ID)
        })
        .catch(function (err) {
            console.log(err)
        })

    // PhotographerMedias = medias
    return medias
}

//* ***************** Ligthbox ******************//

// Bouton close
// Navigation à la souris
const close = document.querySelector('.close')
const lightbox = document.querySelector('.lightbox_container')
close.addEventListener('click', () => {
    const pageMain = document.querySelector('main')
    const header = document.querySelector('header')
    pageMain.setAttribute('aria-hidden', false)
    pageMain.setAttribute('tabindex', '0')
    header.setAttribute('aria-hidden', false)
    header.setAttribute('tabindex', '0')
    lightbox.classList.add('hidden')
    lightbox.classList.remove('show')
})

// Navigation au clavier si le bouton close a le focus
close.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const pageMain = document.querySelector('main')
        const header = document.querySelector('header')
        pageMain.setAttribute('aria-hidden', false)
        pageMain.setAttribute('tabindex', '0')
        header.setAttribute('aria-hidden', false)
        header.setAttribute('tabindex', '0')
        lightbox.classList.add('hidden')
        lightbox.classList.remove('show')
    }
})

// Navigation au clavier : Touche "Escape"
window.addEventListener('keydown', (e) => {
    // Si key = escape : dechargement de la lightbox
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        const pageMain = document.querySelector('main')
        const header = document.querySelector('header')
        pageMain.setAttribute('aria-hidden', false)
        pageMain.setAttribute('tabindex', '0')
        header.setAttribute('aria-hidden', false)
        header.setAttribute('tabindex', '0')
        lightbox.classList.add('hidden')
        lightbox.classList.remove('show')
    }
})

//* ************ Tri constitution du DOM *************//

function sortSection () {
    const main = document.getElementById('main')
    const sortSection = document.createElement('section')
    sortSection.classList.add('sort_container')
    main.appendChild(sortSection)

    // Liste "Trier par"
    const div1 = document.createElement('div')
    sortSection.appendChild(div1)
    const sortLabel = document.createElement('label')
    sortLabel.setAttribute('for', 'sortBy')
    sortLabel.innerText = 'Trier par : '
    div1.appendChild(sortLabel)
    const sortSelect = document.createElement('select')
    sortSelect.setAttribute('name', 'sortBy')
    sortSelect.setAttribute('id', 'sortBy')
    sortSelect.setAttribute('aria-label', 'Tri principal')
    sortSelect.addEventListener('change', () => {
        sorting()
    })
    sortSection.appendChild(sortSelect)

    div1.appendChild(sortSelect)
    const sortOption0 = document.createElement('option')
    sortOption0.setAttribute('value', 'none')
    sortOption0.innerText = 'Pas de tri'
    sortSelect.appendChild(sortOption0)
    const sortOption1 = document.createElement('option')
    sortOption1.setAttribute('value', 'likes')
    sortOption1.innerText = 'Popularité'
    sortSelect.appendChild(sortOption1)
    const sortOption2 = document.createElement('option')
    sortOption2.setAttribute('value', 'date')
    sortOption2.innerText = 'Date'
    sortSelect.appendChild(sortOption2)
    const sortOption3 = document.createElement('option')
    sortOption3.setAttribute('value', 'title')
    sortOption3.innerText = 'Titre'
    sortSelect.appendChild(sortOption3)
    const sortOption4 = document.createElement('option')
    sortOption4.setAttribute('value', 'price')
    sortOption4.innerText = 'Prix'
    sortSelect.appendChild(sortOption4)

    // Liste ordre
    const div2 = document.createElement('div')
    div2.classList.add('divOrderBy')
    sortSection.appendChild(div2)
    const orderLabel = document.createElement('label')
    orderLabel.setAttribute('for', 'order')
    orderLabel.innerText = 'Ordre : '
    div2.appendChild(orderLabel)
    const orderSelect = document.createElement('select')
    orderSelect.setAttribute('name', 'orderBy')
    orderSelect.setAttribute('id', 'orderBy')
    orderSelect.setAttribute('aria-label', 'Ordre de tri')
    orderSelect.addEventListener('change', () => {
        sorting()
    })
    div2.appendChild(orderSelect)
    const orderOption1 = document.createElement('option')
    orderOption1.setAttribute('value', 'ASC')
    orderOption1.innerText = 'Ascendant'
    orderSelect.appendChild(orderOption1)
    const orderOption2 = document.createElement('option')
    orderOption2.setAttribute('value', 'DESC')
    orderOption2.innerText = 'Descendant'
    orderSelect.appendChild(orderOption2)
    div2.classList.add('hidden')
}

//* ***************** Algorithme de tri ******************//
async function sorting () {
    const params = (new URL(document.location)).searchParams
    const ID = params.get('id')
    data = await getMedias(ID)
    const divOrderBy = document.querySelector('.divOrderBy')
    const sortBy = document.getElementById('sortBy').value
    if (sortBy !== 'none') {
        divOrderBy.classList.remove('hidden')
    } else {
        divOrderBy.classList.add('hidden')
    }
    const orderBy = document.getElementById('orderBy').value

    switch (orderBy) {
        case 'ASC':
            switch (sortBy) {
                case 'likes':
                    data.sort((a, b) => a.likes - b.likes)
                    break
                case 'title':
                    data.sort((a, b) => {
                        if (a.title > b.title) {
                            return 1
                        }
                        if (a.title < b.title) {
                            return -1
                        }
                        return 0
                    })
                    break
                case 'date':
                    data.sort((a, b) => {
                        if (a.date > b.date) {
                            return 1
                        }
                        if (a.date < b.date) {
                            return -1
                        }
                        return 0
                    })
                    break
                case 'price':
                    data.sort((a, b) => a.price - b.price)
                    break
            }
            break
        case 'DESC':
            switch (sortBy) {
                case 'likes':
                    data.sort((a, b) => b.likes - a.likes)
                    break
                case 'title':
                    data.sort((a, b) => {
                        if (a.title < b.title) {
                            return 1
                        }
                        if (a.title > b.title) {
                            return -1
                        }
                        return 0
                    })
                    break
                case 'date':
                    data.sort((a, b) => {
                        if (a.date < b.date) {
                            return 1
                        }
                        if (a.date > b.date) {
                            return -1
                        }
                        return 0
                    })
                    break
                case 'price':
                    data.sort((a, b) => b.price - a.price)
                    break
            }
            break
    }

    const Nb_likes = document.querySelector('.Nb_likes')
    Nb_likes.innerText = 0
    const gallery = document.querySelector('.gallery')
    gallery.remove()
    await displayGallery(data)
    GestionLikes()
}
