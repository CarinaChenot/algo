var colors = ['rouge', 'jaune', 'vert', 'bleu', 'orange', 'blanc', 'violet', 'fuschia'];

function setCombinaison() {
    var model = [];
    for (var i = 0; i < 4; i++) {
        if (i == 0) {
            aleaColor = Math.floor(Math.random() * 8);
            model.push(aleaColor);
        } else {
            do {
                aleaColor = Math.floor(Math.random() * 8);
                var verif = verification(model, aleaColor);
            } while (!verif);
            model.push(aleaColor);
        }
    }
}
setCombinaison();

function verification(model, aleaColor) {
    for (var i = 0; i < model.length; i++) {
        if (model[i] == aleaColor) {
            return false;
        }
    }
    return true;
}
