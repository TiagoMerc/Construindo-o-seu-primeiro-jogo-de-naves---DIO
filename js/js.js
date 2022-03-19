/**
 Primeira função do jogo 
 */

function start() {
  // Inicio da função start()

  $('#inicio').hide()

  $('#fundoGame').append("<div id='jogador' class='anima1'></div>")
  $('#fundoGame').append("<div id='inimigo1' class='anima2'></div>")
  $('#fundoGame').append("<div id='inimigo2'></div>")
  $('#fundoGame').append("<div id='amigo' class='anima3'></div>")
  $("#fundoGame").append("<div id='placar'></div>");
  $("#fundoGame").append("<div id='energia'></div>");

  //Principais variáveis do jogo

  var podeAtirar = true
  var fimdejogo = false
  var pontos=0;
  var salvos=0;
  var perdidos=0;
  var energiaAtual=3;
  var jogo = {}
  var velocidade = 5
  var posicaoY = parseInt(Math.random() * 334) //O inimigo pode estar posicionado tanto no 0 quanto 334. Função Math.random

  var TECLA = {
    /*Valor decimal de cada tecla */
    W: 87, //Movimentar o helicopteto para baixo
    S: 83, //Realizar os disparos
    D: 68 //
  }

  //Usar outras teclas, usar keycode
  jogo.pressionou = []

 //Sons 
  var somDisparo=document.getElementById("somDisparo");
var somExplosao=document.getElementById("somExplosao");
var musica=document.getElementById("musica");
var somGameover=document.getElementById("somGameover");
var somPerdido=document.getElementById("somPerdido");
var somResgate=document.getElementById("somResgate");

//Música em loop
musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
musica.play();


  //Verifica se o usuário pressionou alguma tecla

  $(document).keydown(function (e) {
    //Identifica se o usuário pressionou uma tecla
    jogo.pressionou[e.which] = true //Usuário pressionou uma tecla, o valor é true
  })

  $(document).keyup(function (e) {
    //Identifica que nelhuma tecla foi pressionada pelo usuário
    jogo.pressionou[e.which] = false //Se o usuário não pressionou uma tecla, o valor é false
  })

  //Game Loop

  jogo.timer = setInterval(
    loop,
    30
  ) /*temporizador, onde indica a função loop e o tempo de 30 milissegundos */

  function loop() {
    movefundo()
    movejogador() //Função move jogador
    moveinimigo1()
    moveinimigo2()
    moveamigo()
    colisao()
    placar();
    energia();

  } // Fim da função loop()

  //Função que movimenta o fundo do jogo

  function movefundo() {
    esquerda = parseInt(
      $('#fundoGame').css('background-position')
    ) /* Converte string em um número inteiro, pegando o valor atual do fundo da div*/
    $('#fundoGame').css(
      'background-position',
      esquerda - 1
    ) /*Andando um pix para a esquerda */

    /* Para o fundo passar mais rápido, mudar o valor acima "esquerda-1"*/
  } // fim da função movefundo()

  function movejogador() {
    if (jogo.pressionou[TECLA.W]) {
      //Para a helicoptero ir para cima
      var topo = parseInt($('#jogador').css('top'))
      $('#jogador').css('top', topo - 10)

      //Limitar movimento do helicoptero na div fundo
      if (topo <= 0) {
        $('#jogador').css('top', topo + 10)
      }
    }

    if (jogo.pressionou[TECLA.S]) {
      //Para a helicoptero ir para baixo (desce)

      var topo = parseInt($('#jogador').css('top'))
      $('#jogador').css('top', topo + 10)

      //Limitar movimento do helicoptero na div fundo, não deixar ele descer muito

      if (topo >= 434) {
        $('#jogador').css('top', topo - 10)
      }
    }

    if (jogo.pressionou[TECLA.D]) {
      //Atirar
      //Chama função Disparo
      disparo()
    }
  } // fim da função movejogador()

  //Função move inimigo
  function moveinimigo1() {
    posicaoX = parseInt($('#inimigo1').css('left'))
    $('#inimigo1').css('left', posicaoX - velocidade)
    $('#inimigo1').css('top', posicaoY)

    if (posicaoX <= 0) {
      posicaoY = parseInt(Math.random() * 334)
      $('#inimigo1').css('left', 694)
      $('#inimigo1').css('top', posicaoY) //reposicionando
    }
  } //Fim da função moveinimigo1()

  //Move inimigo 2
  function moveinimigo2() {
    posicaoX = parseInt($('#inimigo2').css('left')) //div inimigo 2, pega a div e subtrai, caminha 3 unidas para esquerda
    $('#inimigo2').css('left', posicaoX - 3)

    if (posicaoX <= 0) {
      //Tiver variável menor e igual a 0, reposiciona o inimigo 2 no lado direito da "div"
      $('#inimigo2').css('left', 775)
    }
  } // Fim da função moveinimigo2()

  //Função move amigo
  function moveamigo() {
    posicaoX = parseInt($('#amigo').css('left')) //var numa posição que é a left, que atualiza com a  posiçãoX"
    $('#amigo').css('left', posicaoX + 1)

    if (posicaoX > 906) {
      //volta pro 0

      $('#amigo').css('left', 0)
    }
  } // fim da função moveamigo()

  //Função disparo
  function disparo() {
    if (podeAtirar == true) {
      //idica que o usuario pode realizar o tiro
      somDisparo.play(); //Som de tiro
      podeAtirar = false //O usuário não pode realizar o tiro se essa função estiver em execução

      topo = parseInt($('#jogador').css('top')) //Saber a posição do helicoptero para o tiro sair dele
      posicaoX = parseInt($('#jogador').css('left')) //Saber a posição do helicoptero para o tiro sair dele

      //Onde vai ser o local inicial do tiro
      tiroX = posicaoX + 190
      topoTiro = topo + 37
      $('#fundoGame').append("<div id='disparo'></div") //div disparo

      //posicionar a div
      $('#disparo').css('top', topoTiro)
      $('#disparo').css('left', tiroX)

    var tempoDisparo = window.setInterval(executaDisparo, 30) // fazer a div caminhar
    } //Fecha podeAtirar

    function executaDisparo() {
      posicaoX = parseInt($('#disparo').css('left'))
      $('#disparo').css('left', posicaoX + 15) //tiro mais rápido ou lenta

      if (posicaoX > 900) {
        //Depois de caminhar pela tella, a div é cancelada
        window.clearInterval(tempoDisparo)
        tempoDisparo = null
        $('#disparo').remove() //Depois que o disparo foi removido da tela, o usuário vai poder atirar novamente
        podeAtirar = true //Atirar novamente
      }
    } // Fecha executaDisparo()
  } // Fecha disparo()

  /*   //Função Colisão
  function colisao() {
    var colisao1 = ($("#jogador").collision($("#inimigo1"))); //VAr com div jogador que colidi com a div inimigo1
    // jogador com o inimigo1
  //IMPORTANTE: Se a variável for preenchida, é porque houver colisão
    console.log(colisao1); //Teste 
  
  } //Fim da função colisao() */

  function colisao() {
    var colisao1 = $('#jogador').collision($('#inimigo1')) //Entre jogador e inimigo 1
    // jogador com o inimigo1

    var colisao2 = $('#jogador').collision($('#inimigo2'))
    var colisao3 = $('#disparo').collision($('#inimigo1'))
    var colisao4 = $('#disparo').collision($('#inimigo2'))
    var colisao5 = $('#jogador').collision($('#amigo'))
    var colisao6 = $('#inimigo2').collision($('#amigo'))

    if (colisao1.length > 0) {

      energiaAtual--;
      inimigo1X = parseInt($('#inimigo1').css('left'))
      inimigo1Y = parseInt($('#inimigo1').css('top'))
      explosao1(inimigo1X, inimigo1Y) //Chamar a função

      posicaoY = parseInt(Math.random() * 334)
      $('#inimigo1').css('left', 694)
      $('#inimigo1').css('top', posicaoY)
    }

    // jogador com o inimigo2
    if (colisao2.length > 0) {
      //Pega a posição do inimigo 2 e armazena nas duas variaveis e executa uma função com nome explosão 2
      energiaAtual--;
      inimigo2X = parseInt($('#inimigo2').css('left'))
      inimigo2Y = parseInt($('#inimigo2').css('top'))
      explosao2(inimigo2X, inimigo2Y)

      $('#inimigo2').remove()

      reposicionaInimigo2()
    }

    // Disparo com o inimigo1

    if (colisao3.length > 0) {

      velocidade=velocidade+0.3; //Aumenta a dificuldade
      pontos=pontos+100;//placar 
      inimigo1X = parseInt($('#inimigo1').css('left')) //pega as posicções do inimigo
      inimigo1Y = parseInt($('#inimigo1').css('top'))

      explosao1(inimigo1X, inimigo1Y) //reposiciona
      $('#disparo').css('left', 950) //

      posicaoY = parseInt(Math.random() * 334)
      $('#inimigo1').css('left', 694)
      $('#inimigo1').css('top', posicaoY)
    }

    // Disparo com o inimigo2

    if (colisao4.length > 0) {

      pontos=pontos+50; //Placar
      inimigo2X = parseInt($('#inimigo2').css('left'))
      inimigo2Y = parseInt($('#inimigo2').css('top'))
      $('#inimigo2').remove()

      explosao2(inimigo2X, inimigo2Y)
      $('#disparo').css('left', 950)

      reposicionaInimigo2()
    }

    // jogador com o amigo

    if (colisao5.length > 0) {

      salvos++; //Placar
      somResgate.play(); //Som
      reposicionaAmigo()
      $('#amigo').remove()
    }

    //Inimigo2 com o amigo

    if (colisao6.length > 0) {

      
      perdidos++; //placar
      amigoX = parseInt($('#amigo').css('left')) //posição atual da div amigo
      amigoY = parseInt($('#amigo').css('top'))
      explosao3(amigoX, amigoY)
      $('#amigo').remove()

      reposicionaAmigo()
    }
  } //Fim da função colisao()

  //Função explosão
  //Explosão 1
  function explosao1(inimigo1X, inimigo1Y) {

    somExplosao.play();
    $('#fundoGame').append("<div id='explosao1'></div") //div indicando a explosão
    $('#explosao1').css('background-image', 'url(/imgs/explosao.png)')
    var div = $('#explosao1')
    div.css('top', inimigo1Y)
    div.css('left', inimigo1X)
    div.animate({ width: 200, opacity: 0 }, 'slow') //Fica com 200px de largura, aparece e vai sumindo aos poucos

    var tempoExplosao = window.setInterval(removeExplosao, 1000)

    function removeExplosao() {
      //Remove explosão
      div.remove()
      window.clearInterval(tempoExplosao)
      tempoExplosao = null
    }
  } // Fim da função explosao1()

  //Reposiciona o Inimigo 2

  //Reposiciona Inimigo2

  function reposicionaInimigo2() {
    var tempoColisao4 = window.setInterval(reposiciona4, 5000) //reposicionar o inimigo em 5segundos

    function reposiciona4() {
      window.clearInterval(tempoColisao4)
      tempoColisao4 = null

      if (fimdejogo == false) {
        $('#fundoGame').append('<div id=inimigo2></div')
      }
    }
  }

  //Explosão 2, posição do inimigo 2
  //Explosão2
  function explosao2(inimigo2X, inimigo2Y) {

    somExplosao.play();
    $('#fundoGame').append("<div id='explosao2'></div")
    $('#explosao2').css('background-image', 'url(/imgs/explosao.png)')
    var div2 = $('#explosao2')
    div2.css('top', inimigo2Y)
    div2.css('left', inimigo2X)
    div2.animate({ width: 200, opacity: 0 }, 'slow')

    var tempoExplosao2 = window.setInterval(removeExplosao2, 1000)

    function removeExplosao2() {
      div2.remove()
      window.clearInterval(tempoExplosao2)
      tempoExplosao2 = null
    }
  } // Fim da função explosao2()

  //Reposiciona Amigo

  function reposicionaAmigo() {
    var tempoAmigo = window.setInterval(reposiciona6, 6000)

    function reposiciona6() {
      window.clearInterval(tempoAmigo)
      tempoAmigo = null

      if (fimdejogo == false) {
        $('#fundoGame').append("<div id='amigo' class='anima3'></div>")
      }
    }
  } // Fim da função reposicionaAmigo()

  //Explosão3

  function explosao3(amigoX, amigoY) {

    somPerdido.play(); //Som
    $('#fundoGame').append("<div id='explosao3' class='anima4'></div")
    $('#explosao3').css('top', amigoY)
    $('#explosao3').css('left', amigoX)
    var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000)
    function resetaExplosao3() {
      $('#explosao3').remove()
      window.clearInterval(tempoExplosao3)
      tempoExplosao3 = null
    }
  } // Fim da função explosao3

  //Placar do jogo
  function placar() {
	
    $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
    
  } //fim da função placar()


  //Barra de energia

function energia() {
	
  if (energiaAtual==3) {
    
    $("#energia").css("background-image", "url(/imgs/energia3.png)");
  }

  if (energiaAtual==2) {
    
    $("#energia").css("background-image", "url(/imgs/energia2.png)");
  }

  if (energiaAtual==1) {
    
    $("#energia").css("background-image", "url(/imgs/energia1.png)");
  }

  if (energiaAtual==0) {
    
    $("#energia").css("background-image", "url(/imgs/energia0.png)");
    
    //Game Over
  }

} // Fim da função energia()

} // Fim da função start
