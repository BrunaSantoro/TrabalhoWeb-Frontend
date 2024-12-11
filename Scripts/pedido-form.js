const apiBaseUrl = 'http://localhost:8080';
const urlParams = new URLSearchParams(window.location.search);
const pedidoId = urlParams.get('id');

async function carregarClientes() {
  try {
    const response = await fetch(`${apiBaseUrl}/clientes`);
    const clientes = await response.json();

    const clienteSelect = document.getElementById('cliente');
    clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.value = cliente.id;
      option.textContent = cliente.nome;
      clienteSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
}

async function carregarPedido() {
  if (pedidoId) {
    try {
      const response = await fetch(`${apiBaseUrl}/pedidos/${pedidoId}`);
      const pedido = await response.json();

      document.getElementById('descricao').value = pedido.descricao;
      document.getElementById('valor').value = pedido.valor;
      document.getElementById('status').value = pedido.status;
      document.getElementById('cliente').value = pedido.cliente ? pedido.cliente.id : '';
      document.getElementById('form-title').innerText = 'Editar Pedido';
    } catch (error) {
      console.error('Erro ao carregar pedido:', error);
    }
  }
}

document.getElementById('pedido-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const pedido = {
    descricao: document.getElementById('descricao').value,
    valor: parseFloat(document.getElementById('valor').value),
    status: document.getElementById('status').value,
    cliente: {
      id: parseInt(document.getElementById('cliente').value)
    }
  };

  try {
    const response = await fetch(
      pedidoId ? `${apiBaseUrl}/pedidos/${pedidoId}` : `${apiBaseUrl}/pedidos`,
      {
        method: pedidoId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      }
    );

    if (response.ok) {
      alert('Pedido salvo com sucesso!');
      window.location.href = 'pedidos.html';
    } else {
      alert('Erro ao salvar pedido.');
    }
  } catch (error) {
    console.error('Erro ao salvar pedido:', error);
  }
});

carregarClientes();
carregarPedido();
