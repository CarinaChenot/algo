// Déclaration des variables
var colors = ['piece rouge', 'piece jaune', 'piece vert', 'piece bleu', 'piece orange', 'piece blanc', 'piece violet', 'piece fuchsia'];
var trial = 11;
var col = 1;
var model = setModel(colors);
console.log(model);

// Récupération des éléments du DOM
var suppr = document.querySelector('.suppr');
var check = document.querySelector('.check');
var restart = document.querySelector('.restart');
var select = document.querySelectorAll('.colors div');
var rows = document.querySelectorAll('.table tr');


/* Tirage du modèle aléatoire */
function setModel(colors) {
    var model = [];
    for (var i = 0; i < 4; i++) {
        do {
            aleaColor = Math.floor(Math.random() * 8);
            var verif = verification(model, aleaColor);
        } while (!verif);
        model.push(aleaColor);
    }
    for (var i = 0; i < model.length; i++) {
        model[i] = colors[model[i]];
    }
    return model;
}

/* Vérifier que la couleur tirée n'est pas déjà dans le modèle */
function verification(model, aleaColor) {
    for (var i = 0; i < model.length; i++) {
        if (model[i] == aleaColor) {
            return false;
        }
    }
    return true;
}

/* Choisir couleur et la placer */
for (var i = 0; i < select.length; i++) {
    select[i].addEventListener('click', function() {
        if (col > 4) { // si on est au 4ème td...
            return; // ...on annule la fonction = on ajoute pas de pion
        }
        /* sinon on en ajoute un en ajoutant la classe du pion qu'on a cliqué dessus
        pion rouge cliqué -> classe "rouge" ajoutée */
        rows[trial].children[col].className = this.className;
        col++; // on passe au prochain td
    });
}

/* Check ligne */
check.addEventListener('click', function() {
    if (col < 5) { // s'il n'y a pas 4 jetons la suite de la fonction s'applique pas à cause du return
        return;
    }
    // Vérification
    var rightPlace = 0; // variable qui stocke le nb de pions de la bonne couleur ET à la bonne place
    var rightColor = 0; // variable qui stocke le nb de pions de la bonne couleur
    for (var i = 1; i < (rows[trial].children.length - 1); i++) { // on boucle dans les td
        if (rows[trial].children[i].className === model[i - 1]) { // si le $ème td correspond au $ème index du modèle
            rightPlace++; // alors ils sont à la même place, on incrémente la variable
            continue; // n'exécute pas le code en dessous et passe direct au prochain i++
        }
        // Si le pion n'est pas à la bonne place on regarde si la couleur est quand même présente dans le modèle
        for (var j = 0; j < model.length; j++) { // on boucle dans le modèle
            if (rows[trial].children[i].className === model[j]) { // on compare la couleur du pion à chaque couleur du modèle
                rightColor++; // si la couleur est présente dans le modèle on incrémente la variable
            }
        }
    }
    // On affiche le résultat dans le DOM
    rows[trial].children[5].innerHTML = 'Bonne couleur : ' + rightColor + '<br/>Bonne place et bonne couleur : ' + rightPlace;
    col = 1; // reset le numéro de colonne
    trial--; // enlever 1 essai (on remonte d'un tr)
    if (rightPlace === 4) { // si le nb de pions bien placés est de 4 affiche message gagné
        document.querySelector('.win').innerHTML = '<h1>Vous avez trouvé la combinaison secrète !</h1>';
    }
});

/* Supprimer la ligne actuelle */
suppr.addEventListener('click', function() {
    for (var j = 1; j < (rows[trial].children.length); j++) {
        rows[trial].children[j].classList = "";
    } // on boucle sur les enfants du tr (donc les td) pour leur enlever les classes
    col = 1;
});

/* Recommencer une nouvelle partie */
restart.addEventListener('click', function() {
    window.location.reload();
});
