var lancer = document.querySelector('button');
var dices = document.getElementsByClassName('dice');
var sorted = false;

/* Lancer les dés au clic */
lancer.addEventListener('click', function() {
    var posX = [];
    var posY = [];
    var tempX;
    var tempY;
    var ok = false;
    for (var i = 0; i < 5; i++) { //on enlève la classe de tri pour pouvoir trier si on relance sans recharger la page
        dices[i].classList.remove()
    }

    for (var i = 0; i < 5; i++) {
        do {
            tempX = Math.round(Math.random() * 4 + 1); /* Tirer une position x et y aléatoire */
            tempY = Math.round(Math.random() * 4 + 1);
            ok = verification(posX, posY, tempX, tempY); /* Vérifier si elle n'est pas déjà prise */
        } while (!ok); /* Tant que la verification retourne faux on retire une position aléatoire */

        if (verification) { /* Si elle n'est pas déjà prise on ajoute la nouvelle position au tableau */
            posX.push(tempX);
            posY.push(tempY);
        }
    }
    giveClasses(dices, posX, posY); /* On attribue les classes en fonction des positions */
    addNumber(dices);
    sorting(dices, posX, posY);
});

/* Vérifier si la position n'est pas déjà prise */
function verification(posX, posY, tempX, tempY) {
    for (var i = 0; i <= posX.length - 1; i++) {
        if (posX[i] == tempX && posY[i] == tempY) {
            return false;
        }
    }
    return true;
}

/* Attribuer les classes en fonction de la position */
function giveClasses(dices, posX, posY) {
    for (var i = 0; i < 5; i++) {
        var deg = Math.floor(Math.random() * 360);
        dices[i].style.transform = 'rotate(' + deg + 'deg)'; // Rotation des dés
        dices[i].className = "dice " + "x" + posX[i] + " y" + posY[i];
    }
}

/* Attribuer une valeur au dées */
function addNumber(dices) {
    for (var i = 0; i < 5; i++) {
        var number = Math.floor(Math.random() * 5 + 1);
        dices[i].innerHTML = number;
    }
}
/* Au clic sur les dés ça affecte les classes h0, h1, h2, h3, h4 */
function sorting(dices, posX, posY) {
    var rank = 0;
    for (var i = 0; i < dices.length; i++) {
        dices[i].addEventListener('click', bindClick(i));
    }
    function bindClick(i) {
        return function() {
            if (!dices[i].classList.contains('top')) { // si le dé n'est pas en haut
                this.style.transform = 'rotate(0)'; // on remet la rotation à 0
                this.classList.add('h' + rank); // on le positionne en ajoutant la classe h de 0 à 4
                this.classList.add('top'); // on met un marqueur indiquant qu'il est un haut
                rank++; // on incrémente la valeur du h
            } else if (dices[i].classList.contains('top')) { // si le dé est en haut
                this.classList = "dice " + "x" + posX[i] + " y" + posY[i]; // on le repositionne au même endroit sur le plateau
                var deg = Math.floor(Math.random() * 360);
                this.style.transform = 'rotate(' + deg + 'deg)'; // on remet la rotation
                rank--; // on décrémente la valeur du h
                /* Manque décaler les h */
            }
        };
    }
}