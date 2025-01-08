async function buscarEndereco() {
    const cep = document.getElementById('cep').value;
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                document.getElementById('endereco').value = data.logradouro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('bairro').value = data.bairro;
            }
        } catch (error) {
            alert('Erro ao buscar CEP.');
        }
    } else {
        alert('Por favor, insira um CEP válido.');
    }

}
const botao = document.getElementById("btn-cep");
const cep = document.getElementById("cep");

// Detecta quando o valor no campo de texto atinge o comprimento máximo
cep.addEventListener("input", () => {
    if (cep.value.length === cep.maxLength) {
        // Ativa o botão automaticamente
        botao.click();
    }
});

// Adiciona um evento ao botão para demonstrar que foi "clicado"
botao.addEventListener("click", (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    buscarEndereco();
});


function mostrarItensSistema() {
    const sistema = document.getElementById('sistema').value;
    const itensContainer = document.getElementById('itensContainer');
    if (sistema) {
        itensContainer.style.display = 'block';
    } else {
        itensContainer.style.display = 'none';
    }
}

function adicionarItem() {
    const tabela = document.getElementById('itensTabela');
    const novaLinha = tabela.insertRow();
    const nomeCell = novaLinha.insertCell(0);
    const quantidadeCell = novaLinha.insertCell(1);
    const valorUnitarioCell = novaLinha.insertCell(2);
    const valorTotalCell = novaLinha.insertCell(3);

    nomeCell.innerHTML = `<input type="text" placeholder="Nome do Produto" required>`;
    quantidadeCell.innerHTML = `<input type="number" placeholder="Quantidade" min="1" value="1" oninput="calcularValor(this)" required>`;
    valorUnitarioCell.innerHTML = `<input type="number" placeholder="Valor Unitário" min="0" step="0.01" oninput="calcularValor(this)" required>`;
    valorTotalCell.innerHTML = `<input type="number" placeholder="Valor Total" readonly>`;
}

function calcularValor(input) {
    const linha = input.closest('tr');
    const quantidade = linha.cells[1].querySelector('input').value || 0;
    const valorUnitario = linha.cells[2].querySelector('input').value || 0;
    const valorTotal = linha.cells[3].querySelector('input');
    valorTotal.value = (quantidade * valorUnitario).toFixed(2);
}
const whatsInput = document.getElementById("whats");

whatsInput.addEventListener("input", () => {
    let valor = whatsInput.value;

    // Remove todos os caracteres não numéricos
    valor = valor.replace(/\D/g, "");

    // Adiciona os parênteses e o traço conforme o número cresce
    if (valor.length > 0) valor = "(" + valor;
    if (valor.length > 3) valor = valor.slice(0, 3) + ") " + valor.slice(3);
    if (valor.length > 10) valor = valor.slice(0, 10) + "-" + valor.slice(10);

    // Atualiza o valor do campo
    whatsInput.value = valor;
});
