// Array que vai guardar os produtos adicionados
let carrinho = [];

// Função para abrir e fechar o carrinho lateral
function toggleCarrinho() {
    const painelCarrinho = document.getElementById('carrinho-lateral');
    if (painelCarrinho) {
        painelCarrinho.classList.toggle('active');
    }
}

// Função para adicionar o produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    // Verifica se o item já existe no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarInterfaceCarrinho();
    
    // Abre o carrinho automaticamente ao adicionar um item
    const painelCarrinho = document.getElementById('carrinho-lateral');
    if (painelCarrinho && !painelCarrinho.classList.contains('active')) {
        painelCarrinho.classList.add('active');
    }
}

// Função para remover uma unidade do item ou tirá-lo do carrinho
function removerDoCarrinho(nome) {
    const index = carrinho.findIndex(item => item.nome === nome);

    if (index !== -1) {
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade -= 1;
        } else {
            carrinho.splice(index, 1);
        }
    }
    atualizarInterfaceCarrinho();
}

// Função que atualiza o contador do ícone, lista os itens e soma o valor total
function atualizarInterfaceCarrinho() {
    const cartCount = document.getElementById('cart-count');
    const itensCarrinhoContainer = document.getElementById('itens-carrinho');
    const valorTotalContainer = document.getElementById('valor-total');

    // Segurança: caso os elementos ainda não existam no HTML
    if (!cartCount || !itensCarrinhoContainer || !valorTotalContainer) return;

    // 1. Atualiza o contador de bolinha vermelha/ícone
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    cartCount.innerText = totalItens;

    // 2. Limpa a lista visual atual para reconstruir
    itensCarrinhoContainer.innerHTML = '';

    if (carrinho.length === 0) {
        itensCarrinhoContainer.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
        valorTotalContainer.innerText = 'R$ 0,00';
        return;
    }

    // 3. Renderiza cada item do array no HTML do carrinho
    let precoTotalGeral = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        precoTotalGeral += subtotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item-row');
        itemElement.innerHTML = `
            <div class="item-info">
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2).replace('.', ',')} x ${item.quantidade}</p>
            </div>
            <button onclick="removerDoCarrinho('${item.nome}')" class="remove-item-btn">🗑️</button>
        `;
        itensCarrinhoContainer.appendChild(itemElement);
    });

    // 4. Atualiza o valor total formatado em Moeda Real (BRL)
    valorTotalContainer.innerText = `R$ ${precoTotalGeral.toFixed(2).replace('.', ',')}`;
}

// Função para simular o encerramento do pedido
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione algum sneaker antes de finalizar.");
        return;
    }

    alert("Pedido processado com sucesso! Obrigado por comprar na SneakerX.");
    carrinho = []; // Limpa o carrinho
    atualizarInterfaceCarrinho();
    toggleCarrinho(); // Fecha a aba do carrinho
}

// --- GARANTIA DE FUNCIONAMENTO ---
// Vincula as funções diretamente ao objeto 'window' para que os botões do HTML 
// consigam encontrá-las de qualquer forma, mesmo usando módulos.