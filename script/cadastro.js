const url = 'https://go-wash-api.onrender.com/api/user';

async function cadastro() {
    const button = document.getElementById("cadastrar-btn");
    button.value = "Carregando...";
    button.disabled = true; 

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let birthday = document.getElementById('birthday').value;
    let terms = await document.getElementById('terms').checked;

    if (!name || !email || !password || !cpf_cnpj || !birthday) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        button.value = "Cadastrar-se";
        button.disabled = false; 
        return;
    }

    if (!terms) {
        alert('Aceite os Termos para Continuar');
        button.value = "Cadastrar-se";
        button.disabled = false; 
        return;
    }

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "name": name,
                "email": email,
                "user_type_id": 1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": terms,
                "birthday": birthday,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta);
            alert(resposta.data);
            window.location = "../view/login.html";
        } else {
            let respostaErrors = await api.json();
            if (respostaErrors.data.errors.email) {
                alert(respostaErrors.data.errors.email[0]);
            } else if (respostaErrors.data.errors.cpf_cnpj) {
                alert(respostaErrors.data.errors.cpf_cnpj[0]);
            } else if (respostaErrors.data.errors.name) {
                alert(respostaErrors.data.errors.name[0]);
            } else if (respostaErrors.data.errors.password) {
                alert(respostaErrors.data.errors.password[0]);
            } else {
                alert("Erro desconhecido. Por favor, tente novamente.");
            }
        }
    } finally {
        button.value = "Cadastrar-se";
        button.disabled = false;
    }
}
