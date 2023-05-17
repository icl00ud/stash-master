class Usuario {
    constructor(id, user, password, email) {
        if (id === null || id === undefined || id === '')
            throw new Error('Id Inválido!')

        if(user === '' || user === null || user === undefined)
            throw new Error('Usuário Inválido!')

        if(password === '' || password === null || password === undefined)
            throw new Error('Senha Inválida!')
        
        if(email === '' || password === null || password === undefined)
            throw new Error('E-mail Inválido!')

        this.id = id;
        this.user = user;
        this.password = password;
        this.email = email;
    }
}

module.exports = {
    Usuario
};