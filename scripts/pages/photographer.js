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
    const likes = document.querySelectorAll('.love span')
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
    sortSection.classList.add('sortBar')
    main.appendChild(sortSection)

    // Liste déroulante "Trier par"
    const divTri = document.createElement('div')
    divTri.setAttribute('id', 'tri')
    divTri.classList.add('tri')
    sortSection.appendChild(divTri)

    const divEntete = document.createElement('div')
    divEntete.classList.add('entete')
    divTri.appendChild(divEntete)

    const labelTri = document.createElement('label')
    labelTri.setAttribute('for', 'listeTri')
    labelTri.classList.add('label')
    labelTri.setAttribute('aria-label', 'Trier par')
    labelTri.innerText = 'Trier par : '
    divEntete.appendChild(labelTri)

    const choixTri = document.createElement('button')
    choixTri.setAttribute('id', 'choixTri')
    choixTri.classList.add('itemListe')
    choixTri.setAttribute('role', 'listbox')
    choixTri.setAttribute('aria-haspopup', 'listbox')
    choixTri.setAttribute('aria-expanded', 'false')
    choixTri.setAttribute('value', 'none')
    choixTri.innerText = 'Pas de tri'
    divEntete.appendChild(choixTri)

    const listeTri = document.createElement('ul')
    listeTri.setAttribute('id', 'listeTri')
    listeTri.classList.add('hidden')
    divTri.appendChild(listeTri)

    const itemListe0 = document.createElement('li')
    itemListe0.setAttribute('id', '0')
    itemListe0.classList.add('itemListe')
    itemListe0.setAttribute('tabindex', '0')
    itemListe0.setAttribute('value', 'none')
    itemListe0.setAttribute('aria-label', 'Pas de tri')
    itemListe0.innerText = 'Pas de tri'
    listeTri.appendChild(itemListe0)

    const itemListe1 = document.createElement('li')
    itemListe1.setAttribute('id', '1')
    itemListe1.classList.add('itemListe')
    itemListe1.setAttribute('tabindex', '0')
    itemListe1.setAttribute('value', 'likes')
    itemListe1.setAttribute('aria-label', 'Tri par popularité')
    itemListe1.innerText = 'Popularité'
    listeTri.appendChild(itemListe1)

    const itemListe2 = document.createElement('li')
    itemListe2.setAttribute('id', '2')
    itemListe2.classList.add('itemListe')
    itemListe2.setAttribute('tabindex', '0')
    itemListe2.setAttribute('value', 'date')
    itemListe2.setAttribute('aria-label', 'Tri par date')
    itemListe2.innerText = 'Date'
    listeTri.appendChild(itemListe2)

    const itemListe3 = document.createElement('li')
    itemListe3.setAttribute('id', '3')
    itemListe3.classList.add('itemListe')
    itemListe3.setAttribute('tabindex', '0')
    itemListe3.setAttribute('value', 'title')
    itemListe3.setAttribute('aria-label', 'Tri par titre')
    itemListe3.innerText = 'Titre'
    listeTri.appendChild(itemListe3)

    const itemListe4 = document.createElement('li')
    itemListe4.setAttribute('id', '4')
    itemListe4.classList.add('itemListe')
    itemListe4.setAttribute('tabindex', '0')
    itemListe4.setAttribute('value', 'price')
    itemListe4.setAttribute('aria-label', 'Tri par prix')
    itemListe4.innerText = 'Prix'
    listeTri.appendChild(itemListe4)

    // Liste "ordre de tri"
    const divOrdre = document.createElement('div')
    divOrdre.setAttribute('id', 'ordre')
    divOrdre.classList.add('tri')
    divOrdre.classList.add('hidden')
    sortSection.appendChild(divOrdre)

    const divEntete2 = document.createElement('div')
    divEntete2.classList.add('entete')
    divOrdre.appendChild(divEntete2)

    const labelOrdre = document.createElement('label')
    labelOrdre.setAttribute('for', 'listeTri')
    labelOrdre.classList.add('label')
    labelOrdre.setAttribute('aria-label', 'Ordre de tri')
    labelOrdre.innerText = 'Ordre de tri : '
    divEntete2.appendChild(labelOrdre)

    const choixOrdre = document.createElement('button')
    choixOrdre.setAttribute('id', 'choixOrdre')
    choixOrdre.classList.add('itemListe')
    choixOrdre.setAttribute('role', 'listbox')
    choixOrdre.setAttribute('aria-haspopup', 'listbox')
    choixOrdre.setAttribute('aria-expanded', 'false')
    choixOrdre.setAttribute('value', 'ASC')
    choixOrdre.innerText = 'Ascendant'
    divEntete2.appendChild(choixOrdre)

    const listeOrdre = document.createElement('ul')
    listeOrdre.setAttribute('id', 'listeTri')
    listeOrdre.classList.add('hidden')
    divOrdre.appendChild(listeOrdre)

    const itemListe00 = document.createElement('li')
    itemListe00.setAttribute('id', '00')
    itemListe00.classList.add('itemListe')
    itemListe00.setAttribute('tabindex', '0')
    itemListe00.setAttribute('value', 'ASC')
    itemListe00.setAttribute('aria-label', 'Ordre Ascendant')
    itemListe00.innerText = 'Ascendant'
    listeOrdre.appendChild(itemListe00)

    const itemListe01 = document.createElement('li')
    itemListe01.setAttribute('id', '01')
    itemListe01.classList.add('itemListe')
    itemListe01.setAttribute('tabindex', '0')
    itemListe01.setAttribute('value', 'DESC')
    itemListe01.setAttribute('aria-label', 'Ordre descendant')
    itemListe01.innerText = 'Descendant'
    listeOrdre.appendChild(itemListe01)

    eventTri(choixTri, choixOrdre, listeTri, listeOrdre, [itemListe0, itemListe1, itemListe2, itemListe3, itemListe4], [itemListe00, itemListe01], divOrdre)
}
