app.controller('maquinaTuringController', maquinaTuringController);

maquinaTuringController.$inject = ['$scope', 'estadoService', 'fitaService', '$interval'];

function maquinaTuringController($scope, estadoService, fitaService, $interval) {

    var estadosFinais = [];
    var estados = [];
    var estadoInicial = estadoService.criarEstado("0");
    var estadoAtual = estadoInicial;
    $scope.fita = "Aqui fica a palavra";
    $scope.passos = 0;
    $scope.estadoAtual = "0";


    $scope.operar = function (palavra) {
        if (estadoService.getEstados().length !== 1) {
            escreverPalavra(palavra);
            execucaoRapida();
            printResultado();
        } else {
            window.alert("Primeiro instale o programa!");
        }
    }

    $scope.resetar = function () {
        fitaService.novaFita();
        estadoService.resetar();
        estadoInicial = estadoService.criarEstado("0");
        estados = [];
        $scope.passos = 0;
        $scope.estadoAtual = "0";
        $scope.fita = "Aqui fica a palavra"
        window.alert('Programa desinstalado');
    }

    var printResultado = function () {
        var fitaFinal = "";
        var fitaList = fitaService.getFita();
        for (let index = 0; index < fitaList.length; index++) {
            if (fitaList[index] === '_') {
                fitaFinal += ' '
            } else {
                fitaFinal += fitaList[index];
            }
        }
        $scope.fita = fitaFinal;
    }

    function percorrerPorPassos() {

        estados = estadoService.getEstados();
        $scope.estadoAtual = estadoAtual.nome;
        var transicao = estadoService.getTransicao(estadoAtual.nome, fitaService.getSimboloAtual());
        if (transicao == null) {
            transicao = estadoService.getTransicao(estadoAtual.nome, "*");
            if (transicao == null) {
                window.alert('Alfabeto não suportado');
                return;
            }
        }

        if (transicao.simboloEscrita !== "*") {
            fitaService.escreverSimbolo(transicao.simboloEscrita);
        }
        fitaService.andar(transicao.direcao);
        if (!transicao.novoEstado.nome !== "*") {
            estadoAtual = transicao.novoEstado;
        }

        $scope.passos++;
        printResultado();
    }

    var estadoAtualEstaEmEstadosFinais = function () {
        for (let index = 0; index < estadosFinais.length; index++) {
            if (estadosFinais[index].nome === estadoAtual.nome) {
                return true;
            }
        }
        return false;
    }

    $scope.instalarPrograma = function (arquivo) {
        criarSintaxe(arquivo);        
        window.alert('Programa instalado!');
    }

    $scope.passoApasso = function (palavra) {
        if(estadoService.getEstados().length !== 1) {
            if (fitaService.getFita().length !== 0) {                
                percorrerPorPassos();                
            } else {
                escreverPalavra(palavra);
            }
        } else {
            window.alert("Primeiro instale o programa!");
        }
    }

    var execucaoRapida = function () {
        while (!estadoAtualEstaEmEstadosFinais()) {
            percorrerPorPassos();
        }
    }

    var criarSintaxe = function (arquivo) {

        var funcoesTransicao = arquivo.split("\n");
        for (let index = 0; index < funcoesTransicao.length; index++) {
            if (funcoesTransicao[index] !== "" && funcoesTransicao[index][0] !== ";") {
                var linha = funcoesTransicao[index].split(" ");
                var estadoPrimario = linha[0];
                var simboloLeitura = linha[1];
                var simboloEscrita = linha[2];
                var direcao = linha[3];
                var estadoSecundario = linha[4];
                adicionarTransicao(estadoPrimario, simboloLeitura, simboloEscrita, direcao, estadoSecundario);
            }
        }
    }


    var adicionarTransicao = function (nomeEstadoPrimario, simboloLeitura, simboloEscrita, direcao, nomeEstadoSecundario) {
        var estadoPrimario = criarEstado(nomeEstadoPrimario);
        var estadoSecundario = criarEstado(nomeEstadoSecundario);

        var transicao = {};
        transicao.simboloLeitura = simboloLeitura;
        transicao.simboloEscrita = simboloEscrita;
        transicao.direcao = direcao;
        transicao.novoEstado = estadoSecundario;
        estadoService.adicionarTransicao(nomeEstadoPrimario, transicao);
    }

    var criarEstado = function (nomeEstado) {
        var estado = estadoService.criarEstado(nomeEstado);
        if (nomeEstado.includes("halt")) {
            estadosFinais.push(estado);
        }

        estados.push(estado);
        return estado;
    }

    var escreverPalavra = function (palavra) {
        fitaService.novaFita();
        $scope.passos = 0;
        estadoAtual = estadoInicial;
        fitaService.escreverPalavra(palavra);
    }

}