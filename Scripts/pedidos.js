const apiBaseUrl = 'http://localhost:8080';

async function carregarPedidos() {
  try {
    const response = await fetch(`${apiBaseUrl}/pedidos`);
    const pedidos = await response.json();

    const tbody = document.getElementById('pedidos-tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo existente

    pedidos.forEach(pedido => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${pedido.descricao}</td>
        <td>R$ ${pedido.valor.toFixed(2)}</td>
        <td>${pedido.status}</td>
        <td>${pedido.cliente ? pedido.cliente.nome : 'Sem Cliente'}</td>
        <td>
          <a href="pedido-form.html?id=${pedido.id}">Editar</a> |
          <button onclick="removerPedido(${pedido.id})">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error);
  }
}

async function removerPedido(id) {
  if (confirm('Tem certeza que deseja excluir este pedido?')) {
    try {
      const response = await fetch(`${apiBaseUrl}/pedidos/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Pedido excluído com sucesso!');
        carregarPedidos();
      } else {
        alert('Erro ao excluir pedido.');
      }
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  }
}

carregarPedidos();
