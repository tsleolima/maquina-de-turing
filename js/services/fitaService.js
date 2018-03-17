app.service('fitaService', fitaService);

function fitaService() {

    var palavra = [];
    var cabecote = 0;

    this.getFita = function () {
        return palavra;
    } 

    this.escreverPalavra = function (palavraAdd) {        
        for (let index = 0; index < palavraAdd.length; index++) {
            if (palavraAdd[index] === ' ') {
                palavra.push('_');
            } else {
                palavra.push(palavraAdd[index]);
            }
        }
        cabecote = 0;
    }

    this.getSimboloAtual = function () {
        return palavra[cabecote];
    }

    this.novaFita = function () {
        palavra = [];
        cabecote = 0;
    }

    this.andar = function (direcao) {        
        if (direcao === 'l') {
            andarParaEsquerda();
        } else if (direcao === "r") {
            andarParaDireita();
        }
    }

    var andarParaEsquerda = function () {
        if (cabecote === 0) {
            cabecote ++;
            palavra.splice(0, 0, '_');
        }
        cabecote--;
    }

    var andarParaDireita = function () {
        if (cabecote === palavra.length - 1) {
            palavra.push('_');
        }
        cabecote++;
    }

    this.escreverSimbolo = function (simbolo) {
        palavra[cabecote] = simbolo;
    }
}