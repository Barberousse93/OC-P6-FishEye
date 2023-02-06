/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable indent */

function eventTri (choixTri, choixOrdre, listeTri, listeOrdre, itemTri, itemOrdre, divOrdre) {
// Liste de choix "trier par"
// Evénement 'click' : affichage/masquage de la liste déroulante +
// focus sur le premier élément de la liste
choixTri.addEventListener('click', () => {
    listeTri.classList.toggle('hidden')
    if (choixTri.getAttribute('aria-expanded') === 'false') {
        choixTri.setAttribute('aria-expanded', 'true')
        itemTri[0].focus()
    } else {
        choixTri.setAttribute('aria-expanded', 'false')
    }
    // Fermer la liste 'ordre' si ouverte
    if (!listeOrdre.classList.contains('hidden')) {
        listeOrdre.classList.add('hidden')
    }
})

// Evénement 'Enter' : affichage/masquage de la liste déroulante +
// focus sur le premier élément de la liste
choixTri.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        listeTri.classList.toggle('hidden')
        if (choixTri.getAttribute('aria-expanded') === 'false') {
            choixTri.setAttribute('aria-expanded', 'true')
            itemTri[0].focus()
        } else {
            choixTri.setAttribute('aria-expanded', 'false')
            listeTri.classList.toggle('hidden')
        }

        // Fermer la liste 'ordre' si ouverte
    if (!listeOrdre.classList.contains('hidden')) {
        listeOrdre.classList.add('hidden')
    }
    }
})

// Ajout des événements 'click' et "Enter" sur les élément de la liste
for (let i = 0; i <= itemTri.length - 1; i++) {
    itemTri[i].addEventListener('click', () => {
        choixTri.setAttribute('value', itemTri[i].getAttribute('value'))
        choixTri.innerText = itemTri[i].innerText
        sorting()
        listeTri.classList.toggle('hidden')
        choixTri.setAttribute('aria-expanded', 'false')
        if (choixTri.getAttribute('value') === 'none') {
            divOrdre.classList.add('hidden')
        } else {
            divOrdre.classList.remove('hidden')
        }
    })
    itemTri[i].addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            choixTri.setAttribute('value', itemTri[i].getAttribute('value'))
            choixTri.innerText = itemTri[i].innerText
            sorting()
            listeTri.classList.toggle('hidden')
            choixTri.setAttribute('aria-expanded', 'false')
            if (choixTri.getAttribute('value') === 'none') {
                divOrdre.classList.add('hidden')
            } else {
                divOrdre.classList.remove('hidden')
            }
        }
    })
}

// Liste de choix "Ascendant/descendant"
choixOrdre.addEventListener('click', () => {
    listeOrdre.classList.toggle('hidden')
    if (choixOrdre.getAttribute('aria-expanded') === 'false') {
        choixOrdre.setAttribute('aria-expanded', 'true')
        itemOrdre[0].focus()
    } else {
        choixOrdre.setAttribute('aria-expanded', 'false')
    }

    // Fermer la liste 'tri' si ouverte
    if (!listeTri.classList.contains('hidden')) {
        listeTri.classList.add('hidden')
    }
})

choixOrdre.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        listeOrdre.classList.toggle('hidden')
        if (choixOrdre.getAttribute('aria-expanded') === 'false') {
            choixOrdre.setAttribute('aria-expanded', 'true')
            itemOrdre[0].focus()
        } else {
            choixOrdre.setAttribute('aria-expanded', 'false')
            listeOrdre.classList.toggle('hidden')
        }

        // Fermer la liste 'tri' si ouverte
    if (!listeTri.classList.contains('hidden')) {
        listeTri.classList.add('hidden')
    }
    }
})

for (let i = 0; i <= itemOrdre.length - 1; i++) {
    itemOrdre[i].addEventListener('click', () => {
        choixOrdre.setAttribute('value', itemOrdre[i].getAttribute('value'))
        choixOrdre.innerText = itemOrdre[i].innerText
        sorting()
        listeOrdre.classList.toggle('hidden')
        choixOrdre.setAttribute('aria-expanded', 'false')
    })
    itemOrdre[i].addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            choixOrdre.setAttribute('value', itemOrdre[i].getAttribute('value'))
            choixOrdre.innerText = itemOrdre[i].innerText
            sorting()
            listeOrdre.classList.toggle('hidden')
            choixOrdre.setAttribute('aria-expanded', 'false')
        }
    })
}
}

/* ***************** Algorithme de tri ******************/
async function sorting () {
    const params = (new URL(document.location)).searchParams
    const ID = params.get('id')
    data = await getMedias(ID)
    const sortBy = document.getElementById('choixTri').value
    const orderBy = document.getElementById('choixOrdre').value

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
