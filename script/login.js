const url = 'https://go-wash-api.onrender.com/.../...';

async function login() {
    const button = document.getElementById("loginButton");
    button.value = "Carregando...";
    button.disabled = true; 

    let email = document.getElementById("email").value;
    let password = document.getElementById('password').value;

    if (!email) {
        alert('Email é Obrigatório');
        button.value = "Login";
        button.disabled = false; 
        return;
    }

    if (!password) {
        alert('Senha é Obrigatório');
        button.value = "Login";
        button.disabled = false; 
        return;
    }

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password,
                "user_type_id": 1,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            
            let accessToken = resposta.access_token;
            let user = resposta.user;

            localStorage.setItem('access_token', accessToken); 
            localStorage.setItem('user', JSON.stringify(user)); 

            console.log("Token de acesso salvo:", accessToken); 
            alert(`Login realizado com sucesso!`);
            window.location = "../index.html";  
        } else {

            let respostaErrors = await api.json();
            console.log("Resposta de erro:", respostaErrors);

            if (respostaErrors.data && respostaErrors.data.errors) {
                alert(respostaErrors.data.errors); 
            } else {
                alert("Erro desconhecido. Por favor, tente novamente.");
            }
        }
    } finally {
        button.value = "Login";
        button.disabled = false;
    }
}

function pegartoken() {
    let accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        console.log("Token de Acesso já presente:", accessToken);
    } else {
        console.log("Token não encontrado.");
    }
}

pegartoken();
