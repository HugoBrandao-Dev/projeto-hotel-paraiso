/*
  Arquivo de configuração dos Endpoints para o Back-End.
*/ 

class BackEnd {
  static baseURL = 'http://localhost:4000'

  static POST_USER() {
    return `${ this.baseURL }/users`
  }

  static POST_LOGIN() {
    return `${ this.baseURL }/login`
  }
}

module.exports = BackEnd