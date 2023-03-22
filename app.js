class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) {//This faz referencia a propria despesa, e vamos percorrer todos os elementos do objeto
            //console.log(i, this[i]);//this[i] vai recuperar os atributos/values, no i recupera as keys
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;//Retorna true se for tudo válido
    }
}

class BD {

    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0); //Criar key ID com o value 0
        }
    }

    getNextId() {
        let nextId = localStorage.getItem('id');
        return parseInt(nextId) + 1;
    }

    storeExpense(d) {//Vem de despesa -> d, nome de var diferente mesmo objeto

        //localStorage.setItem('despesa',JSON.stringify(d));//Sempre que a despesa for inserida na chave 'despesa' substitui o valor dela
        let id = this.getNextId();

        //Guardar com id value e em string JSON para puder manusar de servidor/client
        localStorage.setItem(id, JSON.stringify(d));

        localStorage.setItem('id', id);//Vai settar a key id com o value que tem mais um 

    };

    getAllExpenses() {
        let despesas = [];
        let id = localStorage.getItem('id') //Resgatar id como key e assim ir buscar o seu value;

        //Recuperar todas as despesas registadas no local storage
        for (let i = 0; i <= id; i++) {
            //recuprerar despesa e passar de string JSON para objeto JS
            let despesa = JSON.parse(localStorage.getItem(i));

            //Pode haver indices removidos
            //Pular esses indices
            if (despesa == null) {
                continue // Pula para a proxima itercao do for 
            }

            //Armazena todas num array despesas
            despesas.push(despesa);
        }
        //Para receber o array de despesas
        return despesas;
    }

    search(despesa) {
        let expensesFiltered = [];
        //Usar funcao ja criada para resgatar todas as despesas
        expensesFiltered = this.getAllExpenses();

        //Ano
        if (despesa.ano != '') {
            console.log('ano')
            expensesFiltered = expensesFiltered.filter(d => d.ano == despesa.ano);
        }
        //Mes
        if (despesa.mes != '') {
            console.log('mes')
            expensesFiltered = expensesFiltered.filter(d => d.mes == despesa.mes);
        }
        //dia
        if (despesa.dia != '') {
            console.log('dia')
            expensesFiltered = expensesFiltered.filter(d => d.dia == despesa.dia);
        }
        //tipo
        if (despesa.tipo != '') {
            console.log('tipo')
            expensesFiltered = expensesFiltered.filter(d => d.tipo == despesa.tipo);
        }

        //descricao
        if (despesa.descricao != '') {
            console.log('desc')
            expensesFiltered = expensesFiltered.filter(d => d.descricao == despesa.descricao);
        }
        //valor
        if (despesa.valor != '') {
            console.log('valor')
            expensesFiltered = expensesFiltered.filter(d => d.valor == despesa.valor);
        }

        console.log(expensesFiltered);

    }
}

//Criação de um objeto para manusear as funcoes que temos inserdias na classe
let bd = new BD()



function submitExpense() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    //Output dos valores na consola
    /* console.log(ano, mes, dia, tipo, descricao, valor); */

    //Criacao de objeto
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);//Valor resgatados do valor dos inputs

    //Ver objeto criado
    /* console.log(despesa); */

    //Validar os daods
    if (despesa.validarDados()) {

        document.getElementById('modal-title').innerHTML = 'Success Inserting Expense';
        document.getElementById('modal-title').className = 'modal-title text-success';
        document.getElementById('modal-body').innerHTML = 'Your expense was inserted with success';
        document.getElementById('button').className = 'btn btn-success';
        document.getElementById('button').innerHTML = 'Save Changes';


        //Faz a funcao no objeto bd, passando como parametro a despesa
        $('#storeExpense').modal('show');
        //bd.storeExpense(despesa);

        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    } else {

        document.getElementById('modal-title').innerHTML = 'Error Inserting Expense';
        document.getElementById('modal-title').className = 'modal-title text-danger';
        document.getElementById('modal-body').innerHTML = 'Your expense has inputs not filled!';
        document.getElementById('button').className = 'btn btn-danger';
        document.getElementById('button').innerHTML = 'Fill Inputs';
        //Dialogo de erro
        $('#storeExpense').modal('show');
    };
}


//Listar As Despesas
//Vai ser onload da pagina consulta

function listExpenses() {
    //Criação de array
    let despesas = [];
    //Receber cada despesa  armazenar no array despesas
    despesas = bd.getAllExpenses();

    var listExpenses = document.getElementById('tableExpense');


    //percorrer array despesas  listar na devida tr e tds os valores
    despesas.forEach(function (despesa) {//Despesa como a var i, para aceder a cada indice
        //Criar linha tr
        let line = listExpenses.insertRow();

        //Criar colunas

        line.insertCell(0).innerHTML = `${despesa.dia}/${despesa.mes}/${despesa.ano}`;//Data

        //Trocar o tipo por algo com texto atraves de if
        if (despesa.tipo == 1) { despesa.tipo = 'Alimentação' }
        if (despesa.tipo == 2) { despesa.tipo = 'Educação' }
        if (despesa.tipo == 3) { despesa.tipo = 'Lazer' }
        if (despesa.tipo == 4) { despesa.tipo = 'Saúde' }
        if (despesa.tipo == 5) { despesa.tipo = 'Transporte' }


        line.insertCell(1).innerHTML = despesa.tipo;//Tipo
        line.insertCell(2).innerHTML = despesa.descricao;//Descricao
        line.insertCell(3).innerHTML = despesa.valor;//Valor

    })

}

function searchExpenses() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

    bd.search(despesa);
}