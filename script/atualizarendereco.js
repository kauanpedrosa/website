const params = new URLSearchParams(window.location.search);
const enderecoId = params.get('id');

const url = `https://go-wash-api.onrender.com/api/.../.../${enderecoId}`;

async function carregarEndereco() {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error("Erro ao carregar o endereço:", response.status);
            return;
        }

        const endereco = await response.json();
        document.getElementById('edit-title').value = endereco.data.title;
        document.getElementById('edit-cep').value = endereco.data.cep;
        document.getElementById('edit-address').value = endereco.data.address;
        document.getElementById('edit-number').value = endereco.data.number;
        document.getElementById('edit-complement').value = endereco.data.complement || '';
    } catch (error) {
        console.error("Erro ao carregar o endereço:", error);
    }
}

async function atualizarEndereco() {
    const token = localStorage.getItem('access_token');
    const saveButton = document.getElementById('save-button');

    saveButton.value = "Carregando...";
    saveButton.disabled = true;

    const updatedData = {
        title: document.getElementById('edit-title').value,
        cep: document.getElementById('edit-cep').value,
        address: document.getElementById('edit-address').value,
        number: document.getElementById('edit-number').value,
        complement: document.getElementById('edit-complement').value
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            console.error("Erro ao atualizar o endereço:", response.status);
            return;
        }

        alert("Endereço atualizado com sucesso!");
        window.location.href = 'listendereco.html'; 
    } catch (error) {
        console.error("Erro ao atualizar o endereço:", error);
    } finally {
        saveButton.disabled = false; 
    }
}

window.onload = () => {
    carregarEndereco();

    const saveButton = document.getElementById('save-button');
    if (saveButton) {
        saveButton.addEventListener('click', atualizarEndereco);
    } else {
        console.error("Botão 'Salvar' não encontrado.");
    }
};
