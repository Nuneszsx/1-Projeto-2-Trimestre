let carrinho = [];

// Abre e fecha o carrinho lateral
function toggleCarrinho() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}

// Adiciona o produto ao array do carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarInterfaceCarrinho();
}

// Atualiza a lista visual, o contador e o valor total
function atualizarInterfaceCarrinho() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Atualiza número no ícone
    cartCount.innerText = carrinho.length;

    // Se estiver vazio
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
        cartTotal.innerText = 'R$ 0,00';
        return;
    }

    // Limpa a lista antes de reconstruir
    cartItems.innerHTML = '';
    let total = 0;

    // Cria a lista de produtos comprados
    carrinho.forEach((item) => {
        total += item.preco;
        
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.nome}</span>
            <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
        `;
        cartItems.appendChild(itemDiv);
    });

    // Atualiza o valor total
    cartTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Simulação de finalização
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra realizada com sucesso! Obrigado por comprar na SneakerX.");
    carrinho = []; // Limpa o carrinho
    atualizarInterfaceCarrinho();
    toggleCarrinho(); // Fecha a barra lateral
}
