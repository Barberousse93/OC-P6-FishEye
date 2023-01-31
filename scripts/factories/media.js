/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable indent */

// eslint-disable-next-line no-unused-vars
function galleryFactory(data, index) {
    const { id, photographerId, image, title, date, video, price, likes } = data

    function getMediaCardDOM() {
        // gestion media : photo ou video
        if (data.hasOwnProperty('image')) {
            return getImage()
        } else if (data.hasOwnProperty('video')) {
            return getVideo()
        } else {
            console.log('Type média inconnu')
            return 'ERREUR TYPE MEDIA INCONNU'
        }
    }

    function getImage() {
        /*******************************************/
        const Classicone1 = 'fa-regular'
        const Classicone2 = 'fa-heart'
        /*******************************************/

        // Alimentation du cartouche : likes
        const Nb_likes = document.querySelector('.Nb_likes')
        Nb_likes.innerHTML = parseInt(Nb_likes.innerHTML) + likes
        const thumbnail = document.createElement('div')
        thumbnail.classList.add('thumbnail')
        thumbnail.setAttribute('aria-labelledby', title)
        const mediaPath = `assets/images/photos/${image}`
        media = document.createElement('img')
        media.setAttribute('src', mediaPath)
        media.setAttribute('alt', title)
        media.setAttribute('tabindex', '0')
        thumbnail.appendChild(media)

        // Navigation à la souris
        media.addEventListener('click', () => {
            const pageMain = document.querySelector('main')
            pageMain.setAttribute('aria-hidden', true)
            pageMain.setAttribute('tabindex', '-1')
            const header = document.querySelector('header')
            header.setAttribute('aria-hidden', true)
            header.setAttribute('tabindex', '-1')
            lightBoxPhoto(index)
        })

        // Navigation au clavier : touche "Enter" si la vignette a le focus
        media.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const pageMain = document.querySelector('main')
                pageMain.setAttribute('aria-hidden', true)
                const header = document.querySelector('header')
                header.setAttribute('aria-hidden', true)
                lightBoxPhoto(index)
            }
        })

        // bloc "Légende" du média dans la galerie
        const legend = document.createElement('div')
        legend.classList.add('legend')
        thumbnail.appendChild(legend)
        // Légende du média
        const legendText = document.createElement('p')
        legendText.classList.add('legendText')
        legendText.innerHTML = title
        legend.appendChild(legendText)

        // Bloc nommbre de "like" + icone "coeur"
        const nblove = document.createElement('div')
        nblove.classList.add('nblove')
        legend.appendChild(nblove)
        // Nombre de "likes"
        const Nb = document.createElement('div')
        Nb.classList.add('Nb')
        nblove.appendChild(Nb)
        Nb.innerHTML = likes
        // Icone like
        const love = document.createElement('div')
        love.classList.add('love')
        love.setAttribute('role', 'button')
        // love.setAttribute("tabindex", "0");
        nblove.appendChild(love)
        const tag_i = document.createElement('span')
        tag_i.classList.add(Classicone1, Classicone2)
        tag_i.setAttribute('aria-label', 'Aimer cette photo')
        tag_i.setAttribute('tabindex', '0')
        love.appendChild(tag_i)

        return thumbnail
    }

    function getVideo() {
        /*******************************************/
        const Classicone1 = 'fa-regular'
        const Classicone2 = 'fa-heart'
        /*******************************************/

        // Alimentation du cartouche : likes
        const Nb_likes = document.querySelector('.Nb_likes')
        Nb_likes.innerHTML = parseInt(Nb_likes.innerHTML) + likes
        const thumbnail = document.createElement('div')
        thumbnail.classList.add('thumbnail')
        thumbnail.setAttribute('aria-labelledby', title)
        const mediaPath = `assets/images/videos/${video}`
        media = document.createElement('video')
        media.setAttribute('src', mediaPath)
        media.setAttribute('alt', title)
        media.setAttribute('aria-label', title)
        media.setAttribute('tabindex', '0')
        thumbnail.appendChild(media)

        // Navigation à la souris
        media.addEventListener('click', () => {
            const pageMain = document.querySelector('main')
            pageMain.setAttribute('aria-hidden', true)
            pageMain.setAttribute('tabindex', '-1')
            const header = document.querySelector('header')
            header.setAttribute('aria-hidden', true)
            header.setAttribute('tabindex', '-1')
            lightBoxVideo(index)
        })

        // Navigation au clavier : Touche "Enter" si la vignette à le focus
        media.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const pageMain = document.querySelector('main')
                pageMain.setAttribute('aria-hidden', true)
                const header = document.querySelector('header')
                header.setAttribute('aria-hidden', true)
                lightBoxPhoto(index)
            }
        })
        // bloc "Légende"
        const legend = document.createElement('div')
        legend.classList.add('legend')
        thumbnail.appendChild(legend)
        // Légende du média
        const legendText = document.createElement('p')
        legendText.classList.add('legendText')
        legendText.innerHTML = title
        legend.appendChild(legendText)

        // Bloc nommbre de "like" + icone "coeur"
        const nblove = document.createElement('div')
        nblove.classList.add('nblove')
        legend.appendChild(nblove)

        // Nombre de "likes"
        const Nb = document.createElement('div')
        Nb.classList.add('Nb')
        nblove.appendChild(Nb)
        Nb.innerHTML = likes

        // Icone like
        const love = document.createElement('div')
        love.classList.add('love')
        love.setAttribute('role', 'button')
        // love.setAttribute("tabindex", "0");
        nblove.appendChild(love)
        const tag_i = document.createElement('span')
        tag_i.classList.add(Classicone1, Classicone2)
        tag_i.setAttribute('aria-label', 'Aimer cette vidéo')
        tag_i.setAttribute('tabindex', '0')
        love.appendChild(tag_i)

        return thumbnail
    }
    return { id, photographerId, image, title, date, video, price, likes, getMediaCardDOM }

    //* Gestion de la LightBox *//

    function lightBoxVideo(index) {
        // Navigation au clavier : touches "Flèche gauche" et "Fleche droite"
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && lightbox.classList.contains('show')) {
                if (medias.length <= (index + 1)) {
                    if (medias[0].hasOwnProperty('video')) {
                        lightBoxVideo(0)
                    } else {
                        lightBoxPhoto(0)
                    }
                } else {
                    if (medias[(index + 1)].hasOwnProperty('video')) {
                        lightBoxVideo(index + 1)
                    } else {
                        lightBoxPhoto(index + 1)
                    }
                }
            }
            if (e.key === 'ArrowLeft' && lightbox.classList.contains('show')) {
                if (index <= 1) {
                    if (medias[medias.length - 1].hasOwnProperty('video')) {
                        lightBoxVideo(medias.length - 1)
                    } else {
                        lightBoxPhoto(medias.length - 1)
                    }
                } else {
                    if (medias[(index - 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index - 1))
                    } else {
                        lightBoxPhoto((index - 1))
                    }
                }
            };
        })

        // Navigation à la souris : click sur chevrons "gauche" (previous) ou "droite" (next)
        const next = document.querySelector('.next')
        next.onclick = () => {
            if (medias.length <= (index + 1)) {
                if (medias[0].hasOwnProperty('video')) {
                    lightBoxVideo(0)
                } else {
                    lightBoxPhoto(0)
                }
            } else {
                if (medias[(index + 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index + 1))
                } else {
                    lightBoxPhoto((index + 1))
                }
            }
        }

        const previous = document.querySelector('.previous')
        previous.onclick = () => {
            if (index <= 1) {
                if (medias[medias.length - 1].hasOwnProperty('video')) {
                    lightBoxVideo(medias.length - 1)
                } else {
                    lightBoxPhoto(medias.length - 1)
                }
            } else {
                if (medias[(index - 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index - 1))
                } else {
                    lightBoxPhoto((index - 1))
                }
            }
        }

        // Navigation au clavier : Touche "Enter" si le bouton next à le focus
        next.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (medias.length <= (index + 1)) {
                    if (medias[0].hasOwnProperty('video')) {
                        lightBoxVideo(0)
                        next.focus()
                    } else {
                        lightBoxPhoto(0)
                        next.focus()
                    }
                } else {
                    if (medias[(index + 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index + 1))
                        next.focus()
                    } else {
                        lightBoxPhoto((index + 1))
                        next.focus()
                    }
                }
            };
        })

        // Navigation au clavier : Touche "Enter" si le bouton previous à le focus
        previous.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (index <= 1) {
                    if (medias[medias.length - 1].hasOwnProperty('video')) {
                        lightBoxVideo(medias.length - 1)
                        previous.focus()
                    } else {
                        lightBoxPhoto(medias.length - 1)
                        previous.focus()
                    }
                } else {
                    if (medias[(index - 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index - 1))
                        previous.focus()
                    } else {
                        lightBoxPhoto((index - 1))
                        previous.focus()
                    }
                }
            }
        })

        // Constitution du DOM de la LightBox et affichage
        const lightbox = document.querySelector('.lightbox_container')
        const lightBoxMedia = document.querySelector('.media')
        lightBoxMedia.setAttribute('tabindex', '0')
        const main = document.querySelector('main')
        const header = document.querySelector('header')
        lightBoxMedia.innerHTML = ''
        const tagMmedia = document.createElement('video')
        const mediaPath = `assets/images/videos/${medias[index].video}`
        tagMmedia.setAttribute('controls', '')
        // tagMmedia.setAttribute("autoplay", "");
        tagMmedia.setAttribute('muted', '')
        tagMmedia.setAttribute('src', mediaPath)
        tagMmedia.setAttribute('alt', medias[index].title)
        tagMmedia.setAttribute('aria-label', 'Vidéo ' + (index + 1) + ' sur ' + medias.length + '. Titre : ' + medias[index].title + '. Date de prise de vue : ' + medias[index].date + '. Prix : ' + medias[index].price + '€.')
        lightBoxMedia.appendChild(tagMmedia)
        const legend = document.querySelector('.lightbox_legend')
        legend.innerText = (index + 1) + '/' + medias.length + ' - ' + medias[index].title + ' - ' + medias[index].date + ' - ' + medias[index].price + '€'
        legend.setAttribute('tabindex', '-1')
        lightbox.classList.remove('hidden')
        lightbox.classList.add('show')
        lightbox.focus()
        main.setAttribute('aria-hidden', true)
        main.setAttribute('tabindex', '-1')
        header.setAttribute('tabindex', '-1')
        GestFocus()
    }

    function lightBoxPhoto(index) {
        // Navigation au clavier : Fleches gauche/droite
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && lightbox.classList.contains('show')) {
                if (medias.length <= (index + 1)) {
                    if (medias[0].hasOwnProperty('video')) {
                        lightBoxVideo(0)
                    } else {
                        lightBoxPhoto(0)
                    }
                } else {
                    if (medias[(index + 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index + 1))
                    } else {
                        lightBoxPhoto((index + 1))
                    }
                }
            };
            if (e.key === 'ArrowLeft' && lightbox.classList.contains('show')) {
                if (index <= 1) {
                    if (medias[medias.length - 1].hasOwnProperty('video')) {
                        lightBoxVideo(medias.length - 1)
                    } else {
                        lightBoxPhoto(medias.length - 1)
                    }
                } else {
                    if (medias[(index - 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index - 1))
                    } else {
                        lightBoxPhoto((index - 1))
                    }
                }
            };
        })

        // Navigation à la souris
        const next = document.querySelector('.next')
        next.onclick = () => {
            if (medias.length <= (index + 1)) {
                if (medias[0].hasOwnProperty('video')) {
                    lightBoxVideo(0)
                } else {
                    lightBoxPhoto(0)
                }
            } else {
                if (medias[(index + 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index + 1))
                } else {
                    lightBoxPhoto((index + 1))
                }
            }
        }
        const previous = document.querySelector('.previous')
        previous.onclick = () => {
            if (index <= 1) {
                if (medias[medias.length - 1].hasOwnProperty('video')) {
                    lightBoxVideo(medias.length - 1)
                } else {
                    lightBoxPhoto(medias.length - 1)
                }
            } else {
                if (medias[(index - 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index - 1))
                } else {
                    lightBoxPhoto((index - 1))
                }
            }
        }

        // Navigation au clavier : Touche "Enter" si le bouton next à le focus
        next.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (medias.length <= (index + 1)) {
                    if (medias[0].hasOwnProperty('video')) {
                        lightBoxVideo(0)
                        next.focus()
                    } else {
                        lightBoxPhoto(0)
                        next.focus()
                    }
                } else {
                    if (medias[(index + 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index + 1))
                        next.focus()
                    } else {
                        lightBoxPhoto((index + 1))
                        next.focus()
                    }
                }
            };
        })

        // Navigation au clavier : Touche "Enter" si le bouton previous à le focus
        previous.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (index <= 1) {
                    if (medias[medias.length - 1].hasOwnProperty('video')) {
                        lightBoxVideo(medias.length - 1)
                        previous.focus()
                    } else {
                        lightBoxPhoto(medias.length - 1)
                        previous.focus()
                    }
                } else {
                    if (medias[(index - 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index - 1))
                        previous.focus()
                    } else {
                        lightBoxPhoto((index - 1))
                        previous.focus()
                    }
                };
            };
        })

        // Constitution du DOM de la LightBox et affichage
        const lightbox = document.querySelector('.lightbox_container')
        const lightBoxMedia = document.querySelector('.media')
        lightBoxMedia.setAttribute('tabindex', '0')
        const main = document.querySelector('main')
        const header = document.querySelector('header')
        lightBoxMedia.innerHTML = ''
        const tagMmedia = document.createElement('img')
        const mediaPath = `assets/images/photos/${medias[index].image}`
        tagMmedia.setAttribute('src', mediaPath)
        tagMmedia.setAttribute('alt', medias[index].title)
        tagMmedia.setAttribute('aria-label', 'Photo ' + (index + 1) + ' sur ' + medias.length + '. Titre : ' + medias[index].title + '. Date de prise de vue : ' + medias[index].date + '. Prix : ' + medias[index].price + '€.')
        lightBoxMedia.appendChild(tagMmedia)
        const legend = document.querySelector('.lightbox_legend')
        legend.setAttribute('tabindex', '-1')
        legend.innerText = (index + 1) + '/' + medias.length + ' - ' + medias[index].title + ' - ' + medias[index].date + ' - ' + medias[index].price + '€'
        lightbox.classList.remove('hidden')
        lightbox.classList.add('show')
        lightbox.focus()
        main.setAttribute('aria-hidden', true)
        header.setAttribute('aria-hidden', true)
        main.setAttribute('tabindex', '-1')
        header.setAttribute('tabindex', '-1')
        GestFocus()
    }
}

function GestFocus() {
    /* Navigation à la souris (utilisaiton de la touche "TAB" et "Shift + TAB") :
    "boucle" sur les contrôles */
    const media_modal = document.querySelector('.lightbox_container')
    const focusableElements = document.querySelectorAll('.media, .close span, .previous span, .next span')
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    firstElement.focus()
    media_modal.addEventListener('keydown', tabKey)
    function tabKey(e) {
        const isTabPressed = e.key === 'Tab'
        if (!isTabPressed) {
            return
        }
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus()
                e.preventDefault()
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus()
                e.preventDefault()
            }
        }
    }
}
