/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
GestFocusContact()

// Affichage de la fenétre
// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById('contact_modal')
    const pageMain = document.querySelector('main')
    pageMain.setAttribute('aria-hidden', true)
    pageMain.setAttribute('tabindex', '-1')
    modal.style.display = 'block'
    modal.setAttribute('tabindex', '0')
    modal.focus()
}
// Fermeture de la fenétre
// Navigation à la souris (appel via attribut HMTL "onclick")
function closeModal() {
    const modal = document.getElementById('contact_modal')
    RAZ()
    modal.style.display = 'none'
    modal.setAttribute('tabindex', '-1')
    const pageMain = document.querySelector('main')
    pageMain.setAttribute('aria-hidden', false)
    pageMain.setAttribute('tabindex', '0')
    pageMain.focus()
}

// Navigation au clavier : Touche "Escape"
const modal = document.getElementById('contact_modal')
window.addEventListener('keydown', (e) => {
    // Si key = esc : dechargement de la modale
    if (modal.style.display === 'block' && (e.key === 'Escape')) {
        closeModal()
    }
})

// Navigation au clavier : Touche "Enter" si le bouton close a le focus
const close_Modal = document.querySelector('.modal header img')
close_Modal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        closeModal()
    }
})

function RAZ() {
    // réinitialisation du formulaire.
    const form = document.querySelector('form')
    for (let i = 0; i < form.length; i++) {
        form[i].value = ''
        form[i].classList.remove('invalid')
        form[i].setAttribute('aria-invalid', 'false')
    }
    const collMsgErr = document.querySelectorAll('.formErr')
    collMsgErr.forEach(element => {
        element.classList.remove('show')
        element.classList.add('hidden')
    })
}

// Validation champs prénom et nom (non vide au moins 2 caractères)
function validerText(text) {
    const regex = /^[a-zA-Z]+(([- ])?[a-zA-Z])+$/
    return regex.test(text)
};

function validerMail(mail) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(mail)
};

function funcConsole() {
    const champsForm = document.getElementsByTagName('input')
    for (let i = 0; i < champsForm.length; i++) {
        if (champsForm[i].type === 'text' || champsForm[i].type === 'email' || champsForm[i].type === 'date' || champsForm[i].type === 'number') {
            console.log(champsForm[i].name, champsForm[i].value)
        } else if (champsForm[i].type === 'radio') {
            console.log(champsForm[i].value, champsForm[i].checked)
        } else if (champsForm[i].type === 'checkbox') {
            console.log(champsForm[i].id, champsForm[i].checked)
        };
    };
    const message = document.querySelector('#message')
    console.log(message.id, message.value)
};

const firstName = document.querySelector('#firstName')
const firstNameErr = document.querySelector('#firstNameErr')
firstName.addEventListener('change', () => {
    const isValidate = validerText(firstName.value) && firstName.value.length >= 2
    if (!isValidate) {
        firstName.classList.add('invalid')
        firstName.setAttribute('aria-invalid', 'true')
        firstNameErr.classList.add('show')
        firstNameErr.setAttribute('role', 'alert')
        firstNameErr.classList.remove('hidden')
        firstName.focus()
    } else {
        firstName.classList.remove('invalid')
        firstName.setAttribute('aria-invalid', 'false')
        firstNameErr.removeAttribute('role')
        firstNameErr.classList.add('hidden')
        firstNameErr.classList.remove('show')
    }
})
const lastName = document.querySelector('#lastName')
const lastNameErr = document.querySelector('#lastNameErr')
lastName.addEventListener('change', () => {
    const isValidate = validerText(lastName.value) && lastName.value.length >= 2
    if (!isValidate) {
        lastName.classList.add('invalid')
        lastName.setAttribute('aria-invalid', 'true')
        lastNameErr.setAttribute('role', 'alert')
        lastNameErr.classList.add('show')
        lastNameErr.classList.remove('hidden')
        lastName.focus()
    } else {
        lastName.classList.remove('invalid')
        lastName.setAttribute('aria-invalid', 'false')
        lastNameErr.removeAttribute('role')
        lastNameErr.classList.add('hidden')
        lastNameErr.classList.remove('show')
    }
})
const mail = document.querySelector('#eMail')
const eMailErr = document.querySelector('#eMailErr')
mail.addEventListener('change', () => {
    const isValidate = validerMail(mail.value)
    if (!isValidate) {
        mail.classList.add('invalid')
        mail.setAttribute('aria-invalid', 'true')
        eMailErr.setAttribute('role', 'alert')
        eMailErr.classList.add('show')
        eMailErr.classList.remove('hidden')
        mail.focus()
    } else {
        mail.classList.remove('invalid')
        mail.setAttribute('aria-invalid', 'false')
        eMailErr.removeAttribute('role')
        eMailErr.classList.add('hidden')
        eMailErr.classList.remove('show')
    }
})

const message = document.querySelector('#message')
const messageErr = document.querySelector('#messageErr')
message.addEventListener('change', () => {
    const isValidate = message.value.length > 20
    if (!isValidate) {
        message.classList.add('invalid')
        message.setAttribute('aria-invalid', 'true')
        messageErr.setAttribute('role', 'alert')
        messageErr.classList.add('show')
        messageErr.classList.remove('hidden')
        message.focus()
    } else {
        message.classList.remove('invalid')
        message.setAttribute('aria-invalid', 'false')
        messageErr.removeAttribute('role')
        messageErr.classList.add('hidden')
        messageErr.classList.remove('show')
    }
})

const button = document.querySelector('#contact_button')
button.addEventListener('click', (e) => {
    e.preventDefault()
    let nbInvalid = 0
    const champsForm = document.getElementsByTagName('input')
    const message = document.querySelector('#message')
    for (let i = 0; i < champsForm.length; i++) {
        if (champsForm[i].classList.contains('invalid') || champsForm[i].value.length === 0) {
            nbInvalid++
            champsForm[i].classList.add('invalid')
            champsForm[i].nextElementSibling.classList.add('show')
            champsForm[i].nextElementSibling.classList.remove('hidden')
            champsForm[i].nextElementSibling.setAttribute('role', 'alert')
        }
    }
    if (message.classList.contains('invalid') || message.value.length === 0) {
        message.classList.add('invalid')
        message.nextElementSibling.classList.add('show')
        message.nextElementSibling.classList.remove('hidden')
        message.nextElementSibling.setAttribute('role', 'alert')
        nbInvalid++
    }

    if (nbInvalid === 0) {
        funcConsole()
        closeModal()
    }
})

function GestFocusContact() {
    const contact_modal = document.querySelector('#contact_modal')
    const focusableElements = contact_modal.querySelectorAll('input, img, textarea,  button')
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    firstElement.focus()
    contact_modal.addEventListener('keydown', tabKey)
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
