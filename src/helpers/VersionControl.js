/** ARQUIVO PARA CONTROLE DE VERSIONAMENTO DO APP.
 *  A IDÉIA E COLOCAR OS SCRIPTS QUE DEVEM SER EXECUTADOS ASSIM QUE O APP ATUALIZAR.
 * POR EXEMPLO, NA PRÓXIMA VERSÃO, EU PRECISO QUE O USUÁRIO DESLOGUE, LIMPE TODAS OS STORAGES RELACIONADOS A LOGIN/TOKEN E ETC.
 * A CHAMADA DESSAS FUNÇÕES FICARÁ NA PÁGINA 'INITIAL', QUE É AONDE ACONTECE O PRIMEIRO ACESSO DO USUÁRIO.
 */

import { VERSION, TOKEN, REFRESH_TOKEN, AVATAR, EXPIRES_TOKEN } from 'helpers/StorageKeys';

import AsyncStorage from "@react-native-async-storage/async-storage"

const versions = {
  "1.1.2": async () => {
    const currentVersion = await AsyncStorage.getItem(VERSION);

    if (currentVersion === "1.1.2") return;

    await AsyncStorage.multiRemove([TOKEN, REFRESH_TOKEN, AVATAR, EXPIRES_TOKEN]);

    await AsyncStorage.setItem(VERSION, "1.1.2");

  }
}

export const exec = async version => {
  if (!versions[version]) return;

  const fun = versions[version];

  await fun();
}
