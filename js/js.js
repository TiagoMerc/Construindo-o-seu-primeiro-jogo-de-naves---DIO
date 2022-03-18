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

  var jogo = {}

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
    }
  } // fim da função movejogador()
} // Fim da função start
