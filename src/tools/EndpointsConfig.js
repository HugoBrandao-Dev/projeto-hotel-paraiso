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

  // Endpoint de cadastro de uma reserva.
  static POST_RESERVE() {
    return `${ this.baseURL }/reserves`
  }

  // Endpoint de listagem de reservas.
  static GET_RESERVES() {
    return `${ this.baseURL }/reserves`
  }

  static GET_RESERVE(id) {
    return `${ this.baseURL }/reserves/${ id }`
  }
}

module.exports = BackEnd