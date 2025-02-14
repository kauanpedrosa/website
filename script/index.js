window.onload = function() {
    console.log("Página Home Carregada"); 

    let accessToken = localStorage.getItem('access_token');
    console.log("Access Token:", accessToken); 
    
    let specialButton = document.getElementById('specialButton');

    if (accessToken) {
        specialButton.style.display = 'block';  
    } else {
        specialButton.style.display = 'none';  
    }

    /* Sessão de Logout */

    document.getElementById('login').addEventListener('click', function() {
        if(accessToken) {
            console.log("Usuariojá esta logado")
            window.location.href = '../project-DWEB/index.html'

        } else {
            console.log('O usuário não esta logado, redirecionando para a pagina de login.')
            window.location.href = '../project-DWEB/view/login.html'
        }
       
    });

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('access_token');
        console.log("deslogado")
});
};

