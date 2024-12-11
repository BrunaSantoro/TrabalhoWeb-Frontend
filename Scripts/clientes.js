const apiBaseUrl = 'http://localhost:8080'; // URL do backend

async function carregarClientes() {
  try {
    const response = await fetch(`${apiBaseUrl}/clientes`);
    const clientes = await response.json();

    const tbody = document.getElementById('clientes-tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo existente

    clientes.forEach(cliente => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.endereco || 'Não informado'}</td>
        <td>
          <a href="cliente-form.html?id=${cliente.id}">Editar</a> |
          <button onclick="removerCliente(${cliente.id})">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
}

async function removerCliente(id) {
  if (confirm('Tem certeza que deseja excluir este cliente?')) {
    try {
      const response = await fetch(`${apiBaseUrl}/clientes/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Cliente excluído com sucesso!');
        carregarClientes();
      } else {
        alert('Erro ao excluir cliente.');
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  }
}

carregarClientes();
