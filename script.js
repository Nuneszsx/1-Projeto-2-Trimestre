// Array que vai guardar os produtos que o usuário escolher
let carrinho = [];

// Função para abrir e fechar a barra lateral do carrinho
function toggleCarrinho() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('active');
}

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(nome, preco) {
    // Adiciona o objeto do produto ao array
    carrinho.push({ nome, preco });
    
    // Atualiza a interface da loja
    atualizarCarrinho();
}

// Função que atualiza o contador, a lista de itens e o valor total
function atualizarCarrinho() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Atualiza o ícone do contador
    cartCount.innerText = carrinho.length;

    // Se o carrinho estiver vazio
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
        cartTotal.innerText = 'R$ 0,00';
        return;
    }

    // Limpa o contêiner de itens antes de redesenhar
    cartItems.innerHTML = '';
    let total = 0;

    // Percorre o array e cria o HTML para cada item do carrinho
    carrinho