/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable indent */

function eventTri (listeTri, libelleTri, listeItemsTri, listeOrdre, libelleOrdre, listeItemsOrdre, itemTri, itemOrdre, divOrdre) {
// Liste de choix "trier par"
// Evénement 'click' : affichage/masquage de la liste déroulante +
// focus sur le premier élément de la liste
listeTri.addEventListener('click', () => {
    listeItemsTri.classList.toggle('hidden')
    const Icone = document.querySelector('#listeTri .icone')
    if (listeTri.getAttribute('aria-expanded') === 'false') {
        listeTri.setAttribute('aria-expanded', 'true')
        Icone.classList.remove('dropdownIcone')
        Icone.classList.add('dropupIcone')
        itemTri[0].focus()
    } else {
        listeTri.setAttribute('aria-expanded', 'false')
        Icone.classList.add('dropdownIcone')
        Icone.classList.remove('dropupIcone')
    }
    // Fermer la liste 'ordre' si ouverte
    if (!listeItemsOrdre.classList.contains('hidden')) {
        listeItemsOrdre.classList.add('hidden')
    }
})

// Evénement 'Enter' : affichage/masquage de la liste déroulante +
// focus sur le premier élément de la liste
listeTri.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const Icone = document.querySelector('#listeTri .icone')
        listeItemsTri.classList.toggle('hidden')
        if (listeTri.getAttribute('aria-expanded') === 'false') {
            listeTri.setAttribute('aria-expanded', 'true')
            Icone.classList.remove('dropdownIcone')
            Icone.classList.add('dropupIcone')
            itemTri[0].focus()
        } else {
            listeTri.setAttribute('aria-expanded', 'false')
            listeItemsTri.classList.toggle('hidden')
            Icone.classList.add('dropdownIcone')
            Icone.classList.remove('dropupIcone')
        }

        // Fermer la liste 'ordre' si ouverte
    if (!listeItemsOrdre.classList.contains('hidden')) {
        listeItemsOrdre.classList.add('hidden')
    }
    }
})

// Ajout des événements 'click' et "Enter" sur les élément de la liste
for (let i = 0; i <= itemTri.length - 1; i++) {
    itemTri[i].addEventListener('click', (e) => {
        e.stopPropagation()
        listeTri.setAttribute('value', itemTri[i].getAttribute('value'))
        libelleTri.innerText = itemTri[i].innerText
        sorting()
        listeItemsTri.classList.toggle('hidden')
        listeTri.setAttribute('aria-expanded', 'false')
        const Icone = document.querySelector('#listeTri .icone')
        Icone.classList.add('dropdownIcone')
        Icone.classList.remove('dropupIcone')
        if (listeTri.getAttribute('value') === 'none') {
            divOrdre.classList.add('hidden')
            listeOrdre.classList.add('hidden')
        } else {
            divOrdre.classList.remove('hidden')
            listeOrdre.classList.remove('hidden')
        }
    })
    itemTri[i].addEventListener('keydown', (e) => {
        e.stopPropagation()
        if (e.key === 'Enter') {
            e.stopPropagation()
            listeTri.setAttribute('value', itemTri[i].getAttribute('value'))
            libelleTri.innerText = itemTri[i].innerText
            sorting()
            listeItemsTri.classList.toggle('hidden')
            listeTri.setAttribute('aria-expanded', 'false')
            const Icone = document.querySelector('#listeTri .icone')
            Icone.classList.add('dropdownIcone')
            Icone.classList.remove('dropupIcone')
            if (listeTri.getAttribute('value') === 'none') {
                divOrdre.classList.add('hidden')
                listeOrdre.classList.add('hidden')
            } else {
                divOrdre.classList.remove('hidden')
                listeOrdre.classList.remove('hidden')
            }
        }
    })
}

// Liste de choix "Ascendant/descendant"
listeOrdre.addEventListener('click', (e) => {
    listeItemsOrdre.classList.toggle('hidden')
    const Icone2 = document.querySelector('#listeOrdre .icone')
    if (listeOrdre.getAttribute('aria-expanded') === 'false') {
        listeOrdre.setAttribute('aria-expanded', 'true')
        Icone2.classList.remove('dropdownIcone')
        Icone2.classList.add('dropupIcone')
        itemOrdre[0].focus()
    } else {
        listeOrdre.setAttribute('aria-expanded', 'false')
        Icone2.classList.add('dropdownIcone')
        Icone2.classList.remove('dropupIcone')
    }

    // Fermer la liste 'tri' si ouverte
    if (!listeItemsTri.classList.contains('hidden')) {
        listeItemsTri.classList.add('hidden')
    }
})

listeOrdre.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const Icone2 = document.querySelector('#listeOrdre .icone')
        listeItemsOrdre.classList.toggle('hidden')
        if (listeOrdre.getAttribute('aria-expanded') === 'false') {
            listeOrdre.setAttribute('aria-expanded', 'true')
            Icone2.classList.remove('dropdownIcone')
            Icone2.classList.add('dropupIcone')
            itemOrdre[0].focus()
        } else {
            listeOrdre.setAttribute('aria-expanded', 'false')
            listeItemsOrdre.classList.toggle('hidden')
            Icone2.classList.add('dropdownIcone')
            Icone2.classList.remove('dropupIcone')
        }

        // Fermer la liste 'tri' si ouverte
    if (!listeItemsTri.classList.contains('hidden')) {
        listeItemsTri.classList.add('hidden')
    }
    }
})

for (let i = 0; i <= itemOrdre.length - 1; i++) {
    itemOrdre[i].addEventListener('click', (e) => {
        e.stopPropagation()
        listeOrdre.setAttribute('value', itemOrdre[i].getAttribute('value'))
        libelleOrdre.innerText = itemOrdre[i].innerText
        sorting()
        listeItemsOrdre.classList.toggle('hidden')
        listeOrdre.setAttribute('aria-expanded', 'false')
        const Icone2 = document.querySelector('#listeOrdre .icone')
        Icone2.classList.add('dropdownIcone')
        Icone2.classList.remove('dropupIcone')
    })
    itemOrdre[i].addEventListener('keydown', (e) => {
        e.stopPropagation()
        if (e.key === 'Enter') {
            listeOrdre.setAttribute('value', itemOrdre[i].getAttribute('value'))
            libelleOrdre.innerText = itemOrdre[i].innerText
            sorting()
            listeItemsOrdre.classList.toggle('hidden')
            listeOrdre.setAttribute('aria-expanded', 'false')
            const Icone2 = document.querySelector('#listeOrdre .icone')
            Icone2.classList.add('dropdownIcone')
            Icone2.classList.remove('dropupIcone')
        }
    })
}
}

/* ***************** Algorithme de tri ******************/
async function sorting () {
    const params = (new URL(document.location)).searchParams
    const ID = params.get('id')
    data = await getMedias(ID)

    const sortBy = document.querySelector('#listeTri').getAttribute('value')
    console.log(sortBy)
    const orderBy = document.querySelector('#listeOrdre').getAttribute('value')
    console.log(orderBy)
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
