/*
  Arquivo de configuração dos Endpoints para o Back-End.
*/ 

class BackEnd {
  static baseURL = 'http://localhost:4000'

  // Endpoint de cadastro de usuário.
  static POST_USER() {
    return `${ this.baseURL }/users`
  }

  // Endpoint de login.
  static POST_LOGIN() {
    return `${ this.baseURL }/login`
  }

  // Endpoint de validação de Token.
  static POST_VALIDATE() {
    return `${ this.baseURL }/validate`
  }

  // Endpoint de listagem de apartamentos.
  static GET_APARTMENTS() {
    return `${ this.baseURL }/apartments`
  }

  // Endpoint de busca de apartamento pelo ID.
  static GET_APARTMENT(id) {
    return `${ this.baseURL }/apartments/${ id }`
  }
}

module.exports = BackEnd