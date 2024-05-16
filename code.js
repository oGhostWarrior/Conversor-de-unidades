const campoReal = document.querySelector("#real");
const moedaConvertida = document.querySelector("#valorConvertido");

document.querySelector("#loading").style.display = 'none';

function converterDinheiro(){
  
  var tipoMoeda = document.querySelector("#mySelect").value
  // Aqui indico que o valor de mySelect no HTML irá pertencer a tipoMoeda, perceba que:
  // ("#mySelect").value onde # puxa a id e .value o valor que essa possuir.
  
  document.querySelector("#result").style.display = 'none';
  document.querySelector("#loading").style.display = 'block';
  
  fetch(`https://economia.awesomeapi.com.br/last/${tipoMoeda}`, {method:'get'})
  // Aqui eu puxo a api e no fim do link uso "${tipoMoeda}" para chamar tipoMoeda na var acima e completar o link, lembrando que tipoMoeda possui os valores do mySelect no HTML//
  // Entao o Link é completado desta forma: "...com.br/last/BRL-USD" ou "...com.br/last/BTC-BRL" assim por diante.//
    .then(function(response) {
    
        setTimeout(() => {
          
          response.json().then(function(data) { 
            //Resposta da API//
            tipoMoeda = tipoMoeda.replace("-","") 
            // ^ Aqui é o pulo do gato, ao chamar tipoMoeda estou substituindo o traço "-" de value, ex: BRL-USD por BRLUSD //
            // Isso é necessario pois a API trabalha entregando o valor de data que estamos consultando desta forma//
            let cotacaoMoeda = parseFloat(data[tipoMoeda]["bid"]);
            // Dessa forma quando chamo os dados da API (data.BRLUSD.bid) o tipoMoeda sera sempre o atual, chamando os dados da moeda selecionada//
            let real = campoReal.value;
            let valorConvertido = 0
            if (tipoMoeda == "BTCBRL"){
              //Essa condição if existe pois a API trabalha com BitCoin em apenas uma direção, assim como estamos convertendo Real paa BitCoin é necessario dividir ao inves de multiplicar.//
              valorConvertido = (real / cotacaoMoeda).toFixed(5);
            }
            else{
              valorConvertido = (real * cotacaoMoeda).toFixed(5);
            }   
            moedaConvertida.value = valorConvertido;
                        
           document.querySelector("#loading").style.display = 'none';
           document.querySelector("#result").style.display = 'block';
            //Elementos de estilo, ao clicar em converter acontece um pequeno delay e a tela é bloqueada por um breve momento//
          });
        }, 200)
        
    })
    .catch(function(error) {
        console.log(error);
    });
  
}

document.querySelector(".convertButton").addEventListener("click", converterDinheiro);
//Essa parte do codigo demonstra como o JS manipula o HTML, mesmo sem chamada de função no codigo do HTML é possivel criar uma chamada de função para o mesmo.
