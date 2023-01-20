
function galleryFactory(data, index) {
    const { id, photographerId, title, image, video, date, price, likes } = data;

    function getMediaCardDOM() {
        // gestion media : photo ou video
        if (data.hasOwnProperty('image')) {
            return getImage();
        } else if (data.hasOwnProperty('video')) {
            return getVideo();
        } else {
            console.log('Type média inconnu');
            return 'ERREUR TYPE MEDIA INCONNU';
        }
    }

    function getImage() {

        /*******************************************/
        const Classicone1 = 'fa-regular';
        const Classicone2 = 'fa-heart';
        /*******************************************/

        // Alimentation du cartouche : likes
        const Nb_likes = document.querySelector('.Nb_likes');
        Nb_likes.innerHTML = parseInt(Nb_likes.innerHTML) + likes;
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');
        const mediaPath = `assets/images/photos/${image}`;
        media = document.createElement('img');
        media.setAttribute('src', mediaPath);
        media.setAttribute('alt', title);
        thumbnail.appendChild(media);
        media.addEventListener('click', () => {
            lightBoxPhoto(index);
        });

        // bloc 'Légende'
        const legend = document.createElement('div');
        legend.classList.add('legend');
        thumbnail.appendChild(legend);
        // Légende du média
        const legendText = document.createElement('p');
        legendText.classList.add('legendText');
        legendText.innerHTML = title;
        legend.appendChild(legendText);

        // Bloc nommbre de 'like' + icone 'coeur'
        const nblove = document.createElement('div');
        nblove.classList.add('nblove');
        legend.appendChild(nblove);
        // Nombre de 'likes'
        const Nb = document.createElement('div');
        Nb.classList.add('Nb');
        nblove.appendChild(Nb);
        Nb.innerHTML = likes;
        // Icone like
        const love = document.createElement('div');
        love.classList.add('love');
        nblove.appendChild(love);
        const tag_i = document.createElement('i');
        tag_i.classList.add(Classicone1, Classicone2);
        love.appendChild(tag_i);

        return thumbnail;
    }

    function getVideo() {

        /*******************************************/
        const Classicone1 = 'fa-regular';
        const Classicone2 = 'fa-heart';
        /*******************************************/

        // Alimentation du cartouche : likes
        const Nb_likes = document.querySelector('.Nb_likes');
        Nb_likes.innerHTML = parseInt(Nb_likes.innerHTML) + likes;

        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');
        const mediaPath = `assets/images/videos/${video}`;
        media = document.createElement('video');
        media.setAttribute('src', mediaPath);
        media.setAttribute('alt', title);
        thumbnail.appendChild(media);
        media.addEventListener('click', () => {
            lightBoxVideo(index);
        });
        // bloc 'Légende'
        const legend = document.createElement('div');
        legend.classList.add('legend');
        thumbnail.appendChild(legend);
        // Légende du média
        const legendText = document.createElement('p');
        legendText.classList.add('legendText');
        legendText.innerHTML = title;
        legend.appendChild(legendText);

        // Bloc nommbre de 'like' + icone 'coeur'
        const nblove = document.createElement('div');
        nblove.classList.add('nblove');
        legend.appendChild(nblove);

        // Nombre de 'likes'
        const Nb = document.createElement('div');
        Nb.classList.add('Nb');
        nblove.appendChild(Nb);
        Nb.innerHTML = likes;

        // Icone like
        const love = document.createElement('div');
        love.classList.add('love');
        nblove.appendChild(love);
        const tag_i = document.createElement('i');
        tag_i.classList.add(Classicone1, Classicone2);
        tag_i.setAttribute('alt', 'likes');
        love.appendChild(tag_i);

        return thumbnail;
    }
    return { id, photographerId, title, image, video, likes, date, price, getMediaCardDOM };

    function lightBoxVideo(index) {
        // Navigation au clavier : touches "Flèche gauche" et "Fleche droite"
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && lightbox.classList.contains('show')) {
                if (medias.length <= (index + 1)) {
                    if (medias[0].hasOwnProperty('video')) {
                        lightBoxVideo(0);
                    } else {
                        lightBoxPhoto(0);
                    }
                } else {
                    if (medias[(index + 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index + 1));
                    } else {
                        lightBoxPhoto((index + 1));
                    }
                }
            };
            if (e.key === 'ArrowLeft' && lightbox.classList.contains('show')) {
                if (index <= 1) {
                    if (medias[medias.length - 1].hasOwnProperty('video')) {
                        lightBoxVideo(medias.length - 1);
                    } else {
                        lightBoxPhoto(medias.length - 1);
                    }
                } else {
                    if (medias[(index - 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index - 1));
                    } else {
                        lightBoxPhoto((index - 1));
                    }
                }
            };
        });
        // Navigation à la souris : click sur chevrons "gauche" (previous) ou "droite" (next)
        const next = document.querySelector('.next');
        next.onclick = () => {
            if (medias.length <= (index + 1)) {
                if (medias[0].hasOwnProperty('video')) {
                    lightBoxVideo(0);
                } else {
                    lightBoxPhoto(0);
                }
            } else {
                if (medias[(index + 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index + 1));
                } else {
                    lightBoxPhoto((index + 1));
                }
            }
        }
        const previous = document.querySelector('.previous');
        previous.onclick = () => {
            if (index <= 1) {
                if (medias[medias.length - 1].hasOwnProperty('video')) {
                    lightBoxVideo(medias.length - 1);
                } else {
                    lightBoxPhoto(medias.length - 1);
                }
            } else {
                if (medias[(index - 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index - 1));
                } else {
                    lightBoxPhoto((index - 1));
                }
            }
        }
        const lightbox = document.querySelector('.lightbox_container');
        const lightBoxMedia = document.querySelector('.media');
        lightBoxMedia.innerHTML = '';
        const tagMmedia = document.createElement('video');
        const mediaPath = `assets/images/videos/${medias[index].video}`;
        tagMmedia.setAttribute('controls', '');
        tagMmedia.setAttribute('autoplay', '');
        tagMmedia.setAttribute('muted', '');
        tagMmedia.setAttribute('src', mediaPath);
        tagMmedia.setAttribute('alt', title);
        lightBoxMedia.appendChild(tagMmedia);
        const legend = document.querySelector('.lightbox_legend');
        legend.innerText = (index + 1) + '/' + medias.length + ' - ' + medias[index].title + ' - ' + medias[index].date + ' - ' + medias[index].price + '€';
        lightbox.classList.remove('hidden');
        lightbox.classList.add('show');
    }

    function lightBoxPhoto(index) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && lightbox.classList.contains('show')) {
                if (medias.length <= (index + 1)) {
                    if (medias[0].hasOwnProperty('video')) {
                        lightBoxVideo(0);
                    } else {
                        lightBoxPhoto(0);
                    }
                } else {
                    if (medias[(index + 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index + 1));
                    } else {
                        lightBoxPhoto((index + 1));
                    }
                }
            };
            if (e.key === 'ArrowLeft' && lightbox.classList.contains('show')) {
                if (index <= 1) {
                    if (medias[medias.length - 1].hasOwnProperty('video')) {
                        lightBoxVideo(medias.length - 1);
                    } else {
                        lightBoxPhoto(medias.length - 1);
                    }
                } else {
                    if (medias[(index - 1)].hasOwnProperty('video')) {
                        lightBoxVideo((index - 1));
                    } else {
                        lightBoxPhoto((index - 1));
                    }
                }
            };
        });
        const next = document.querySelector('.next');
        next.onclick = () => {
            if (medias.length <= (index + 1)) {
                if (medias[0].hasOwnProperty('video')) {
                    lightBoxVideo(0);
                } else {
                    lightBoxPhoto(0);
                }
            } else {
                if (medias[(index + 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index + 1));
                } else {
                    lightBoxPhoto((index + 1));
                }
            }
        }
        const previous = document.querySelector('.previous');
        previous.onclick = () => {
            if (index <= 1) {
                if (medias[medias.length - 1].hasOwnProperty('video')) {
                    lightBoxVideo(medias.length - 1);
                } else {
                    lightBoxPhoto(medias.length - 1);
                }
            } else {
                if (medias[(index - 1)].hasOwnProperty('video')) {
                    lightBoxVideo((index - 1));
                } else {
                    lightBoxPhoto((index - 1));
                }
            }
        }

        const lightbox = document.querySelector('.lightbox_container');
        const lightBoxMedia = document.querySelector('.media');
        lightBoxMedia.innerHTML = '';
        const tagMmedia = document.createElement('img');
        const mediaPath = `assets/images/photos/${medias[index].image}`;
        tagMmedia.setAttribute('src', mediaPath);
        tagMmedia.setAttribute('alt', title);
        lightBoxMedia.appendChild(tagMmedia);
        const legend = document.querySelector('.lightbox_legend');
        legend.innerText = (index + 1) + '/' + medias.length + ' - ' + medias[index].title + ' - ' + medias[index].date + ' - ' + medias[index].price + '€';
        lightbox.classList.remove('hidden');
        lightbox.classList.add('show');
    }


}



