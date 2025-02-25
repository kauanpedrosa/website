const url = 'https://go-wash-api.onrender.com/api/.../...';

async function endereco() {
    const button = document.getElementById("cadastrar-endereco");
    button.value = "Carregando...";
    button.disabled = true;

    let title = document.getElementById('title').value;
    let cep = document.getElementById('cep').value;
    let address = document.getElementById('address').value;
    let number = document.getElementById('number').value;
    let complement = document.getElementById('complement').value;
    let token = localStorage.getItem('access_token'); 

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": complement || ""
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (api.ok) {
            alert("Endereço cadastrado com sucesso!");
            window.location = "../view/listendereco.html";  
        } else {
            let respostaErrors = await api.json();
            console.log("Resposta de erro:", respostaErrors); 

            if (respostaErrors.data.errors.title) {
                alert(respostaErrors.data.errors.title[0]);
            } else if (respostaErrors.data.errors.cep) {
                alert(respostaErrors.data.errors.cep[0]);
            } else if (respostaErrors.data.errors.address) {
                alert(respostaErrors.data.errors.address[0]);
            } else if (respostaErrors.data.errors.number) {
                alert(respostaErrors.data.errors.number[0]);
            } else {
                alert("Erro desconhecido. Por favor, tente novamente.");
            }
        }
    } finally {
        button.value = "Cadastrar";
        button.disabled = false;
    }
}
