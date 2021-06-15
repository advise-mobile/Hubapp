import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from 'services/Api';
import jwtDecode from 'jwt-decode';

export const getLoggedUser = async () => {
  const token = await AsyncStorage.getItem('@Advise:token') || null;

  return jwtDecode(token);
};

export const getAppByProductAdvise = async () => {
  await getLogin();

  const user = await getLoggedUser();

  await AsyncStorage.setItem('@IdProdutoAdvise', user.idProdutoAdvise);
};

export const getUserPermissions = () => Api.get(
  `core/v1/permissoes-usuario-cliente?ativo=true&campos=idFuncionalidade,idUsuarioClienteXFuncionalidade,quantidadePermitida,quantidadeUtilizada&registrosPorPagina=-1`
);


export const PermissionsMap = {
  movements: {
    createDiary: -1, // Cadastrar diários
    createKeyword: -2, // Cadastrar palavras-chave
    createSearchVariation: -3, // Cadastrar variações de pesquisa
    createExclusionVariation: -4, // Cadastrar variações de exclusão
    combinedSearch: -5, // Cadastrar busca combinada
    downloadPublications: -6, // Gerar publicações em arquivo
    recordPublications: -7, // Consultar publicações
    createProcess: -8, // Cadastrar processos
    createMovements: -9, // Consultar andamentos
    createManualMovements: -10, // Cadastrar andamentos manuais
    transformProcessIntoManual: -11, // Transformar processo automático em manual
    downloadMovements: -12, // Gerar andamentos em arquivo
    transformProcessIntoAutomatic: -16, // Transformar processo manual em automático
    processesWithAutomaticMovementsSearch: -32, // Processos com busca automática de andamentos
    searchAutomaticMovements: -31 // Pesquisar andamentos automáticos
  },
  publications: {
    createDiary: -1, // Cadastrar diários
    createKeyword: -2, // Cadastrar palavras-chave
    createSearchVariation: -3, // Cadastrar variações de pesquisa
    createExclusionVariation: -4, // Cadastrar variações de exclusão
    combinedSearch: -5, // Cadastrar busca combinada
    downloadPublications: -6, // Gerar publicações em arquivo
    recordPublications: -7 // Consultar publicações
  },
  processes: {
    createProcess: -8, // Cadastrar processos
    createMovements: -9, // Consultar andamentos
    createManualMovements: -10, // Cadastrar andamentos manuais
    transformProcessIntoManual: -11, // Transformar processo automático em manual
    downloadMovements: -12, // Gerar andamentos em arquivo
    transformProcessIntoAutomatic: -16, // Transformar processo manual em automático
    processesWithAutomaticMovementsSearch: -32, // Processos com busca automática de andamentos
    searchAutomaticMovements: -31 // Pesquisar andamentos automáticos
  },
  insurance: {
    createInsurance: -18 // Contratar seguro
  },
  jurisprudence: {
    searchJurisprudence: -19, // Pesquisar jurisprudência
    downloadJurisprudence: -20 // Gerar jurisprudência em arquivo
  },
  schedule: {
    createSchedule: -21, // Criar agenda
    recordSchedule: -22, // Consultar agenda
    createAppointments: -23 // Cadastrar compromissos em agenda
  },
  finances: {
    financesLowsMaintenance: -50, // Manutenção de Baixas Financeiras
    financesLowsConsultation: -49, // Consultar Baixas Financeiras
    financesAccountJumps: -48, // Consultar Saldos de Contas Financeiras
    financesPostingsMaintenance: -47, // Manutenção de Lançamentos Financeiros
    financesPostingsConsultation: -46, // Consultar Lançamentos Financeiros
    financesAccountsMaintenance: -45, // Manutenção de Contas Financeiras
    financesAccountsConsultation: -44, // Consultar Contas Financeiras
    financesCategoriesMaintenance: -43, // Manutenção de Categorias
    financesCategoriesConsultation: -42, // Consultar Categorias
    financesMaintenance: -41, // Manutenção de Financeiros
    financesConsultation: -40 // Consultar Financeiros
  },
  contacts: {
    createContactList: -24, // Criar lista de contato
    createContactType: -25, // Criar tipos de contato
    createContact: -26, // Criar contatos
    recordContacts: -27, // Consultar contatos
    createContactActivity: -28, // Cadastrar atividades de contato
    recordContactActivity: -29 // Ver atividades de contatos
  },
  custummers: {
    createUsers: -30 // Cadastrar usuários
  },
  people: {
    contactListMaintenance: -29, // Manutenção de Lista de Contatos
    consultContactList: -28, // Consultar Lista de Contatos
    maintainingMarkers: -27, // Manutenção de Marcadores
    consultBookmarks: -26, // Consultar Marcadores
    contactMaintenance: -25, // Manutenção de Contatos
    consultContacts: -24 // Consultar Contatos
  }
};

export const PermissionsGroups = {
  MOVEMENTS: "movements",
  PUBLICATIONS: "publications",
  PROCESSES: "processes",
  INSURANCE: "insurance",
  JURISPRUDENCE: "jurisprudence",
  SCHEDULE: "schedule",
  FINANCES: "finances",
  CONTACTS: "contacts",
  CUSTUMMERS: "custummers",
  PEOPLE: "people",
};

export const checkPermission = async permissionGroup => {
  const userPermissions = await AsyncStorage.getItem('@Advise:permissions');

  let permissions = JSON.parse(userPermissions);

  if (!userPermissions) {
    let user = await getLoggedUser();

    let { data } = await getUserPermissions(user.idUsuarioCliente);

    await AsyncStorage.setItem('@Advise:permissions', JSON.stringify(data));

    permissions = data;
  }

  if (!permissions) return false;

  const permissionsId = permissions.itens.map(permission => permission.idFuncionalidade);

  const hasPermission = Object.values(PermissionsMap[permissionGroup]).filter(funcionalidade => permissionsId.includes(funcionalidade));

  if (hasPermission.length <= 0) return false;

  return true;

};
