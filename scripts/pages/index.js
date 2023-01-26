// Masquage du loader quand la page est chargée.
window.onload = () => {
    const loader = document.querySelector(".loader_container");
    loader.classList.add("hidden");
};

async function getPhotographers() {

    // //Fonction nommée
    //     function test(parametre){

    // }

    // //fonciton anonyme : contexte propre ("this" de la fonction)
    // let test=function (parametre){

    // }

    // //fonciton fléchée : récupère la contexte précédent ("this" de la classe)
    // let test=(parametre)=>{

    // }

    try {
        let photographers = [];
        const JSONFile = "data/photographers.json";

        let res = await fetch(JSONFile);
        if (res.ok) {
            let data = await res.json();
            photographers = data.photographers;
        }
        return photographers;
    }

    catch (err) {
        console.log(err);
        return new Error(err);
    }

}

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    // Cration des cards des photogrpahes
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {

    // pour utilisation de Promise //
    // getPhotographers().then((photographers)=>{
    //     displayData(photographers);
    // };


    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    // Affiche les Photographes
    displayData(photographers);
}

init();

