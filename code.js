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
  // Aqui eu puxo a api e no fim do link uso "${}" para chamar tipoMoeda e completar o link //
    .then(function(response) {
    
        setTimeout(() => {
          
          response.json().then(function(data) { // Resposta da API//
            tipoMoeda = tipoMoeda.replace("-","") 
            // ^ Aqui é o pulo do gato, ao chamar tipoMoeda estou substituindo o traço "-" de value na HTML, ex: BRL-USD por BRLUSD //
            let cotacaoMoeda = parseFloat(data[tipoMoeda]["bid"]);
            // Dessa forma quando chamo os dados da API (data.BRLUSD.bid) o tipoMoeda sera sempre o atual, chamando os dados da moeda selecionada //
            let real = campoReal.value;
            let valorConvertido = 0
            if (tipoMoeda == "BTCBRL"){
              valorConvertido = (real / cotacaoMoeda).toFixed(5);
            }
            else{
              valorConvertido = (real * cotacaoMoeda).toFixed(5);
            }   
            moedaConvertida.value = valorConvertido;
                        
           document.querySelector("#loading").style.display = 'none';
           document.querySelector("#result").style.display = 'block';

          });
        }, 200)
        
    })
    .catch(function(error) {
        console.log(error);
    });
  
}

document.querySelector(".convertButton").addEventListener("click", converterDinheiro);
//campoReal.addEventListener("input", converterDinheiro);
