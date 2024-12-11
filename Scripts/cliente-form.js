const apiBaseUrl = 'http://localhost:8080';
const urlParams = new URLSearchParams(window.location.search);
const clienteId = urlParams.get('id');

async function carregarCliente() {
  if (clienteId) {
    try {
      const response = await fetch(`${apiBaseUrl}/clientes/${clienteId}`);
      const cliente = await response.json();

      document.getElementById('nome').value = cliente.nome;
      document.getElementById('cpf').value = cliente.cpf;
      document.getElementById('telefone').value = cliente.telefone;
      document.getElementById('endereco').value = cliente.endereco;
      document.getElementById('form-title').innerText = 'Editar Cliente';
    } catch (error) {
      console.error('Erro ao carregar cliente:', error);
    }
  }
}

document.getElementById('cliente-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const cliente = {
    nome: document.getElementById('nome').value,
    cpf: document.getElementById('cpf').value,
    telefone: document.getElementById('telefone').value,
    endereco: document.getElementById('endereco').value
  };

  try {
    const response = await fetch(
      clienteId ? `${apiBaseUrl}/clientes/${clienteId}` : `${apiBaseUrl}/clientes`,
      {
        method: clienteId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      }
    );

    if (response.ok) {
      alert('Cliente salvo com sucesso!');
      window.location.href = 'clientes.html';
    } else {
      alert('Erro ao salvar cliente.');
    }
  } catch (error) {
    console.error('Erro ao salvar cliente:', error);
  }
});

carregarCliente();
