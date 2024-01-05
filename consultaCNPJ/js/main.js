function pesquisaCNPJ(){
    let cnpj = document.getElementById('cnpj').value;
    if(cnpj != "" || cnpj != null | cnpj != undefined){
        const cnpjForm = document.getElementById('cnpjField');
        cnpjForm.addEventListener('submit', function(event){
            event.preventDefault();
            let formataCnpj = cnpj.toString().replace(/\D/g, '');

            let url = "https://brasilapi.com.br/api/cnpj/v1/" + formataCnpj;
    
            let userRequest = new XMLHttpRequest();
            userRequest.open("GET", encodeURI(url), false);
            userRequest.setRequestHeader("OData-MaxVersion", "4.0");
            userRequest.setRequestHeader("OData-Version", "4.0");
            userRequest.setRequestHeader("Accept", "application/json");
            userRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            userRequest.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            userRequest.send();

            if (userRequest.status === 200) {
                var data = JSON.parse(userRequest.responseText);
                if (data != null) {
                    function getQsa(){
                        let tamanho = data.qsa.length;
                        let teste = new Array();
                        for (let index = 0; index < tamanho; index++) {
                            teste.push(" " + data.qsa[index].nome_socio + "\n");
                        }
                        return teste;
                    }
                    document.getElementById('results').innerHTML = '<br><h3>Dados encontrados:</h3><br><div><ul class="list-group list-group-flush"><li class="list-group-item">Razão Social: ' + data.razao_social + '</li><li class="list-group-item">Nome Fantasia: ' + data.nome_fantasia + '</li><li class="list-group-item">Situação cadastral: ' + data.descricao_situacao_cadastral + '</li><li class="list-group-item">Data situação cadastral: ' + data.data_situacao_cadastral.toString().substring(8,10) + '/' + data.data_situacao_cadastral.toString().substring(5,7) + '/' + data.data_situacao_cadastral.toString().substring(0,4) + '</li><li class="list-group-item">Código de natureza jurídica: ' + data.codigo_natureza_juridica + '</li><li class="list-group-item">Data início atividade: ' + data.data_inicio_atividade + '</li><li class="list-group-item">Código CNAE Fiscal: ' + data.cnae_fiscal + '</li><li class="list-group-item">Descrição CNAE Fiscal: ' + data.cnae_fiscal_descricao + '</li><li class="list-group-item">Data início atividade: ' + data.data_inicio_atividade + '</li><li class="list-group-item">Nome Sócio(s): ' + getQsa() + '</li></ul></div>';
                }
            }

        });
    }
}