class Fornecedor {
    constructor(idProvider, name, address, email, phone){
        if(idProvider === null || idProvider === undefined || idProvider === '')
            throw new Error('Id Inválido!')

        if(name === null || name === undefined || name === '')
            throw new Error('Nome Inválido!')

        if(address === null || address === undefined || address === '')
            throw new Error('Endereço Inválido!')
        
        if(email === null || email === undefined || email === '')
            throw new Error('E-mail Inválido!')

        if(phone === null || phone === undefined || phone === '')
            throw new Error('Telefone Inválido!')

        this.idProvider = idProvider;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }   
}

module.exports = {
    Fornecedor
};