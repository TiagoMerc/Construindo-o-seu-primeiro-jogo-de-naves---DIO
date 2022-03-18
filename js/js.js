/**
 Primeira função do jogo 
 */

function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

//Principais variáveis do jogo
	
var jogo = {};
	
//Game Loop

jogo.timer = setInterval(loop,30); /*temporizador, onde indica a função loop e o tempo de 30 milissegundos */

function loop() {

movefundo();

} // Fim da função loop()

//Função que movimenta o fundo do jogo
	
function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position")); /* Converte string em um número inteiro, pegando o valor atual do fundo da div*/
	$("#fundoGame").css("background-position",esquerda-1); /*Andando um pix para a esquerda */
	
  /* Para o fundo passar mais rápido, mudar o valor acima "esquerda-1"*/
	} // fim da função movefundo()


} // Fim da função start