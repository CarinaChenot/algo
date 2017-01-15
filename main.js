var lancer = document.querySelector('button');
var dices = document.getElementsByClassName('dice');
var rank = 0;
var sorted = true

/* Lancer les dés au clic */
lancer.addEventListener('click', function() {
    var posX = [];
    var posY = [];
    var tempX;
    var tempY;
    var ok = false;
    for(var i = 0; i<5; i++){           //on enlève la classe de tri pour pouvoir trier si on relance sans recharger la page
        dices[i].classList.remove()
    }

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
    addNumber(dices);
    sorting(dices, rank);
    unSorting(dices, rank);
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

/* Attribuer une valeur au dées */
function addNumber(dices){
    for (var i = 0; i<5; i++){
        var number = Math.floor(Math.random() * 5 + 1);
        dices[i].innerHTML = number;
    }
}
/* Au clic sur les dés ça affecte les classes h0, h1, h2, h3, h4 */

function sorting(dices, rank) {
    for (var j=0; j<5; j++){
        dices[j].addEventListener('click', function(){
          if (sorted){
            this.style.transform = 'rotate(0)'; //rotation pour avoir le dé de face
            this.classList.add('h'+ rank); //on lui ajoute le h de 0 à 5
            rank++;
          }
        });
    }
}

/*au clic les dés reviennent à leur position */
 function unSorting(dices, rank){
    for (var j=0; j<5; j++){
        dices[j].addEventListener('click', function(){
          if (!sorted){
            this.classList.remove('h'+ rank); //on lui ajoute le h de 0 à 5
          }
        });
    }
 
 }