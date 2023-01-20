
// Affichage de la fenétre
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}
// Fermeture de la fenétre 
function closeModal() {
    const modal = document.getElementById("contact_modal");
    RAZ();
    modal.style.display = "none";
}

const modal = document.getElementById("contact_modal");
window.addEventListener('keydown', (e) => {
    // Si key = esc : dechargement de la modale
    if (modal.style.display === 'block' && (e.key === "Escape")) {
        closeModal();
    }
});

function RAZ() {
    const form = document.querySelector('form');
    for (let i = 0; i < form.length; i++) {
        form[i].value = '';
        form[i].classList.remove('invalid');
    }
}

// Validation champs prénom et nom (non vide au moins 2 caractères)
function validerText(text) {
    let regex = /^[a-zA-Z]+(([- ])?[a-zA-Z])+$/;
    return regex.test(text);
};

function validerMail(mail) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(mail);
}

function funcConsole() {
    let champsForm = document.getElementsByTagName('input');
    for (let i = 0; i < champsForm.length; i++) {
        if (champsForm[i].type == 'text' || champsForm[i].type == 'email' || champsForm[i].type == 'date' || champsForm[i].type == 'number') {
            console.log(champsForm[i].name, champsForm[i].value);
        } else if (champsForm[i].type == 'radio') {
            console.log(champsForm[i].value, champsForm[i].checked);
        } else if (champsForm[i].type == 'checkbox') {
            console.log(champsForm[i].id, champsForm[i].checked)
        };
    };
    const message = document.querySelector('#message');
    console.log(message.id, message.value);
};

const firstName = document.querySelector('#firstName');
firstName.addEventListener('change', () => {
    let isValidate = validerText(firstName.value) && firstName.value.length >= 2;
    if (!isValidate) {
        firstName.classList.add('invalid');
    } else {
        firstName.classList.remove('invalid');
    }

})
const name = document.querySelector('#lastName');
name.addEventListener('change', () => {
    let isValidate = validerText(name.value) && name.value.length >= 2;
    if (!isValidate) {
        name.classList.add('invalid');
    } else {
        name.classList.remove('invalid');
    }

})
const mail = document.querySelector('#eMail');
mail.addEventListener('change', () => {
    let isValidate = validerMail(mail.value);
    if (!isValidate) {
        mail.classList.add('invalid');
    } else {
        mail.classList.remove('invalid');
    }

})

const message = document.querySelector('#message');
message.addEventListener('change', () => {
    let isValidate = message.value.length > 20;
    if (!isValidate) {
        message.classList.add('invalid');
    } else {
        message.classList.remove('invalid');
    }

})

const button = document.querySelector('#contact_button');
button.addEventListener('click', (e) => {
    e.preventDefault();
    let nbInvalid = 0;
    let champsForm = document.getElementsByTagName('input');
    const message = document.querySelector('#message');
    for (let i = 0; i < champsForm.length; i++) {
        if (champsForm[i].classList.contains('invalid') || champsForm[i].value.length === 0) {
            alert('Champs ' + champsForm[1].name + ' invalide.');
            nbInvalid++;
            champsForm[i].classList.add('invalid');
            break;
        }
    }
    if (message.classList.contains('invalid') || message.value.length === 0) {
        message.classList.add('invalid');
        alert('Champ ' + message.name + ' invalide.');
        nbInvalid++;
    }

    if (nbInvalid === 0) {
        funcConsole();
        closeModal();
    }
});