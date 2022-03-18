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

  //Principais variáveis do jogo

  var podeAtirar = true
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
    colisao();
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

  function disparo() {
    if (podeAtirar == true) {
      //idica que o usuario pode realizar o tiro

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

  //Função Colisão
  function colisao() {
    var colisao1 = ($("#jogador").collision($("#inimigo1"))); //VAr com div jogador que colidi com a div inimigo1
    // jogador com o inimigo1
  //IMPORTANTE: Se a variável for preenchida, é porque houver colisão
    console.log(colisao1); //Teste 
  
  } //Fim da função colisao()
} // Fim da função start
