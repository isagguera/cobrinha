let canvas = document.getElementById("snake");
let contexto = canvas.getContext("2d");
let caixa = 32;
let snake = [];

snake[0] = {
    x: 8 * caixa,
    y: 8 * caixa
};

let direcao = "direita";

let comida = {
    x: Math.floor(Math.random() * 15 + 1) * caixa,
    y: Math.floor(Math.random() * 15 + 1) * caixa
};

function criarFundo(){
    contexto.fillStyle = "black";
    contexto.fillRect(0, 0, 16 * caixa, 16 * caixa);
}

function criarCobrinha(){
    for(let i = 0; i < snake.length; i++){
        contexto.fillStyle = "green";
        contexto.fillRect(snake[i].x, snake[i].y, caixa, caixa);
    }
}

function desenharComida(){
    contexto.fillStyle = "red";
    contexto.fillRect(comida.x, comida.y, caixa, caixa);
}

document.addEventListener('keydown', atualizarDirecao);

function atualizarDirecao(evento){
    if(evento.key === 'ArrowLeft' && direcao != 'direita') direcao = 'esquerda';
    if(evento.key === 'ArrowUp' && direcao != 'baixo') direcao = 'cima';
    if(evento.key === 'ArrowRight' && direcao != 'esquerda') direcao = 'direita';
    if(evento.key === 'ArrowDown' && direcao != 'cima') direcao = 'baixo';
}

function reiniciarJogo() {
    // Resetar o estado do jogo
    snake = [];
    snake[0] = {
        x: 8 * caixa,
        y: 8 * caixa
    };
    direcao = "direita";
    comida = {
        x: Math.floor(Math.random() * 15 + 1) * caixa,
        y: Math.floor(Math.random() * 15 + 1) * caixa
    };

    // Oculta a tela de fim de jogo
    document.getElementById("game-over").style.display = "none";

    // Reinicia o loop do jogo
    jogo = setInterval(iniciarJogo, 100);
}

function iniciarJogo(){
    if (snake[0].x > 15 * caixa && direcao == 'direita') snake[0].x = 0;
    if (snake[0].x < 0 && direcao == 'esquerda') snake[0].x = 16 * caixa;
    if (snake[0].y > 15 * caixa && direcao == 'baixo') snake[0].y = 0;
    if (snake[0].y < 0 && direcao == 'cima') snake[0].y = 16 * caixa;

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            document.getElementById("game-over").style.display = "block";
        }
    }

    criarFundo();
    criarCobrinha();
    desenharComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direcao == 'direita') snakeX += caixa;
    if(direcao == 'esquerda') snakeX -= caixa;
    if(direcao == 'cima') snakeY -= caixa;
    if(direcao == 'baixo') snakeY += caixa;

    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * caixa;
        comida.y = Math.floor(Math.random() * 15 + 1) * caixa;
    }

    let novaCabeca = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(novaCabeca);
}

let jogo = setInterval(iniciarJogo, 100);