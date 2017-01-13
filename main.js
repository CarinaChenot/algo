var lancer = document.querySelector('button');
var dices = document.getElementsByClassName('dice');

/* Lancer les dés au clic */
lancer.addEventListener('click', function() {
    var posX = [];
    var posY = [];
    var tempX;
    var tempY;
    var ok = false;
    for (var i = 0; i < 5; i++) {
        do {
            tempX = Math.round(Math.random() * 4 + 1); /* Tirer une position x et y aléatoire */
            tempY = Math.round(Math.random() * 4 + 1);
            ok = verification(posX, posY, tempX, tempY); /* Vérifier si elle n'est pas déjà prise */
        } while (!ok);

        if (verification) { /* Si elle n'est pas déjà prise on ajoute la nouvelle position au tableau */
            posX.push(tempX);
            posY.push(tempY);
        }
    }
    giveClasses(dices, posX, posY); /* On attribue les classes en fonction des positions */
});

/* Vérifier si la position n'est pas déjà prise */

function verification(posX, posY, tempX, tempY) {
    for (var i = 0; i <= posX.length-1; i++) {
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
        dices[i].style.transform = 'rotate('+ deg +'deg)'; // Rotation des dés
        dices[i].className = "dice " + "x" + posX[i] + " y" + posY[i];
    }
}

/* Au clic sur les dés ça affecte les classes h0, h1, h2, h3, h4 */
