const url = 'https://go-wash-api.onrender.com/api/.../...';

async function listarEnderecos() {
    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error("Token de autenticação não encontrado.");
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error("Erro ao buscar endereços:", response.status, await response.json());
            return;
        }

        const enderecosData = await response.json();
        console.log("Resposta da API:", enderecosData);

        const listaEnderecos = document.getElementById('lista-enderecos');
        listaEnderecos.innerHTML = '';

        const enderecos = enderecosData.data || [];

        enderecos.forEach(endereco => {
            const li = document.createElement('li');
            li.style.position = 'relative';

            li.innerHTML = `
                <button class="delete-button" data-id="${endereco.id}" style="position: absolute; top: 10px; left: 10px; background: transparent; border: none; cursor: pointer;">
                    🗑️
                </button>
                <h3>${endereco.title}</h3>
                <p>CEP: ${endereco.cep}</p>
                <p>Endereço: ${endereco.address}, ${endereco.number}</p>
                <p>Complemento: ${endereco.complement || 'Nenhum'}</p>
                <button class="edit-button" data-id="${endereco.id}">
                    🖉 Editar
                </button>
            `;
            listaEnderecos.appendChild(li);
        });

        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const enderecoId = event.target.getAttribute('data-id');
                window.location.href = `atualizarendereco.html?id=${enderecoId}`;
            });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const enderecoId = event.target.getAttribute('data-id');
                const confirmDelete = confirm('Tem certeza de que deseja deletar este endereço?');

                if (confirmDelete) {
                    deletarEndereco(enderecoId); 
                }
            });
        });

    } catch (error) {
        console.error("Erro ao listar endereços:", error);
    }
}

window.onload = listarEnderecos;
