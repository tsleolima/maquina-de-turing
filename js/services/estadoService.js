app.service('estadoService', estadoService);

estadoService.$inject = []

function estadoService() {

    var estados = [];

    this.getEstados = function () {
        return estados;
    }

    this.criarEstado = function (nomeEstado) {   
        var estadoPesquisado = buscaEstado(nomeEstado);  

        if(estadoPesquisado == false){                        
            var estado = {};
            estado.transicoes = [];
            estado.nome = nomeEstado;
            estados.push(estado);                        
            return estado;
        }
        
        return estadoPesquisado;
    }

    this.getTransicao = function (nomeEstado, simboloFita) {
        var estado = buscaEstado(nomeEstado);
        for (let index = 0; index < estado.transicoes.length; index++) {
            if(estado.transicoes[index].simboloLeitura === simboloFita){
                return estado.transicoes[index];
            }
        }
        return null;
    }

    function buscaEstado(nomeEstado) {
        for (let index = 0; index < estados.length; index++) {
            if (estados[index].nome === nomeEstado) {
                return estados[index];                
            }
        }
        return false;
    }

    this.adicionarTransicao = function(nomeEstado,transicao){
        var estado = buscaEstado(nomeEstado);
        estado.transicoes.push(transicao);
    }

}
