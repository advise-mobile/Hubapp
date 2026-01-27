const endpoints = {
  LOGIN: {
    PATHS: {
      POST: "/login/v1/token",
      LOGOUT: "/login/v1/log-out",
      FORGOT: "/login/v1/redefinir-senha"
    }
  },
  DEADLINES: {
    PATHS: {
      GET: "eventos-agenda",
      PUT: "eventos-agenda",
      POST: "eventos-agenda",
      ATIVAR: "eventos-agenda/ativar",
      INATIVAR: "eventos-agenda/inativar",
      VINCULAR: "eventos-agenda/vincular-movimento",
      DESVINCULAR: "eventos-agenda/desvincular-movimento",
      DIAS_EVENTOS: "eventos-agenda/dias-mes-evento",
      TOTAL: "eventos-agenda/total"
    }
  },
  DEADLINES_TYPE: {
    PATHS: {
      GET: "tipos-repeticao-eventos"
    }
  },
  BRIEFCASE: {
    PATHS: {
      GET: "pastas-usuarios-clientes",
      POST: "pastas-usuarios-clientes",
      PUT: "pastas-usuarios-clientes",
      INATIVAR: "pastas-usuarios-clientes/inativar",
      DELETE: "pastas-usuarios-clientes/desvincular-movimento",
      FORWARD: "pastas-usuarios-clientes/encaminhar",
      SET: "pastas-usuarios-clientes/vincular-movimento",
      KEYWORDS: "pastas-usuarios-clientes/palavras-chave",
      PROCESSES: "pastas-usuarios-clientes/processos"
    }
  },
  USER_CLIENTS: {
    PATHS: {
      GET: "usuarios-clientes",
      PUT: "usuarios-clientes",
      CHANGE_PASSWORD: "usuarios/usuario-logado-alterar-senha",
      CHANGE_EMAIL: "usuarios/usuario-logado-alterar-email"
    }
  },
  CONTRACTS: {
    PATHS: {
      GET: "contratos"
    }
  },
  PICTURES: {
    PATHS: {
      GET: "pessoas",
      POST: "pessoas-fotos",
      DELETE: "pessoas-fotos"
    }
  }
}
