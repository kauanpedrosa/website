async function deletarEndereco(enderecoId) {
    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error("Token de autenticação não encontrado.");
        return;
    }

    try {
        const response = await fetch(`https://go-wash-api.onrender.com/api/.../.../${enderecoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Cookie': 'gowash_session=0hGqRHf0q38ETNgEcJGce30LcPtuPKo48uKtb7Oj' 
            }
        });

        if (!response.ok) {
            console.error("Erro ao deletar endereço:", response.status, await response.json());
            return;
        }

        alert('Endereço deletado com sucesso!');
        listarEnderecos(); 
    } catch (error) {
        console.error("Erro ao tentar deletar o endereço:", error);
    }
}
