let contagem = [] //uma array vazia que receberá os valores para armazenar
let salveAcao //uma variável vazia, tipo não definido

const MAX_VISOR_CHAR = 10 //define o numero máximo de caracteres na tela para 10;

//função de recebimento de valores através das teclas de números.
function AddNumero(num) {
  document.getElementById('total').removeAttribute('hidden') //remove o atributo hidden da tag HTML
  if (document.getElementById('total').innerHTML.length < MAX_VISOR_CHAR) {
    document.getElementById('total').innerHTML += num
  } //enquanto o total de caracteres for menor que 10, o usuário pode adicionar novos números
}

//função que defino o que acontece quando uma tecla de ação é ativada
function AcaoCalculo(action) { //a função recebe a propriedade action, que defini as expressões das teclas de acao
  var numeroAtual = document.getElementById('total').innerHTML //variável recebe o que está sendo impresso no visor total
  if (numeroAtual.length === 0) {return} 
  //caso nenhum número tenha sido digitado, nada será feito, caso contrário a array contagem recebe o valor digitado:
  contagem.push(Number(document.getElementById('total').innerHTML))
  document.getElementById('acumulador').removeAttribute('hidden')
  document.getElementById('acumulador').innerHTML += `${document.getElementById('total').innerHTML} ${action}` //o visor acumulador recebe o valor do visor total (número digitado) + operador selecionado em uma das teclas de ação
  document.getElementById('total').innerHTML = "" //o visor total que recebe os valores volta a ser vazio para receber novo valor
  contagem.push(action) //array contagem recebe ação selecionada
}

//função para acrescentar ponto no número digitado
function AddPonto() {
  var numeroAtual = document.getElementById('total').innerHTML
  if (!numeroAtual.includes('.')) {
    document.getElementById('total').innerHTML += '.'
  } //caso o número não tenha um ponto já adicionado, receberá o ponto, caso contrário o ponto não será adicionado novamente, podendo ter apenas um ponto
}

// função para gerar resultado quando a tecla = for ativada
function Resultado() {
  numeroAcumulado = document.getElementById('acumulador').innerHTML //valor acumulado no visor acumulador
  numeroAtual = document.getElementById('total').innerHTML //valor atual digitado no visor total
  if(numeroAcumulado[numeroAcumulado.length - 1] === '=' && numeroAtual.length > 0) {
    document.getElementById('total').innerHTML = ProcessAction(Number(numeroAtual), Number(numeroAtual), salveAcao).toString().substring(0, MAX_VISOR_CHAR) //se houver pelo menos valor no visor acumulador e um novo valor digitado no visor total, a açao será processada a partir das expressões aritméticas de cada tecla de ação 
  }
  if(contagem.length === 0) {return} //se contagem estiver vazia, não há retorno, caso contrário:
  contagem.push(Number(document.getElementById('total').innerHTML)) //contagem recebe o novo valor digitado
  document.getElementById('acumulador').innerHTML += `${document.getElementById('total').innerHTML} =`  //o visor acumulador recebe o novo valor digitado com um sinal de igual pra indicar o resultado da operaçao
  ProcessResult() //a função que processa o resultado é chamada para o cálculo acontecer.
}

//função que calcula a operacao que será realizada quando tecla = for ativada  
function ProcessResult() {
  //valores iniciais para as variávels action, atual e total
  let action = null
  let atual = null
  let total = 0; 
  if(isNaN(contagem[contagem.length - 1])) {
    contagem.pop()
  } 
  contagem.forEach(n => { 
    if(!isNaN(n)) { 
      if(atual == null) {
        atual = n 
      } else { 
        total += ProcessAction(atual, n, action)
        atual = null 
      }
    } else { 
      action = n
      salveAcao = n
    }
  })
  if(atual != null) {
    total = ProcessAction(total, atual, action)
  } 
  document.getElementById('total').innerHTML = total.toString().substring(0, MAX_VISOR_CHAR) //o visor total recebe o resultado do que estava no visor acumulador e o novo valor digitado após operação.
  contagem = [] //a array volta a ficar vazia para nova operação
}

//função para definir as operações a partir das teclas de ação
function ProcessAction(num1, num2, action) {
  switch (action) {
    case '+': return num1 + num2
    case '-': return num1 - num2
    case 'x': return num1 * num2
    case '/': return num1 / num2
  }
}

//definindo função para tecla CE
function LimpaEntradaAtual() {
  document.getElementById('total').innerHTML = ''
} //ao clicar em CE, limpa apenas o visor total

//definindo função para a tecla C
function LimpaTudo() {
  document.getElementById('total').innerHTML = ''
  document.getElementById('acumulador').innerHTML = ''
  contagem = []
} //ao clicar em C, limpa o visor total, o visor acumulado e a array contagem que armazena os dados 

//definindo função para a tecla %
function Percentagem() {
  var numeroAtual = document.getElementById('total').innerHTML
  if (numeroAtual !== '') {
    document.getElementById('total').innerHTML = Number(document.getElementById('total').innerHTML) / 100
  }  
} //Ao clicar em %, se houver um número no visor total, ele será dividido por 100

function InverteSinal() {
  var numeroAtual = document.getElementById('total').innerHTML
  if (numeroAtual !== '') {
    document.getElementById('total').innerHTML = Number(document.getElementById('total').innerHTML) * -1
  }
} //Ao clicar em +/-, se houver um número no visor total, ele será multiplicado por -1, assim mudando seu sinal

