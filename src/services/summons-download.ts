import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import { ApiUrl } from '@constants/urls';
import { TOKEN } from '@lhelpers/StorageKeys';
import type {
	SummonsPdfDownloadMode,
	SummonsPdfDownloadResult,
} from '@models/summons-download';

const dirs = RNFetchBlob.fs.dirs;

function buildDownloadUrl(idMovProcessoCliente: number): string {
	const queryParams = new URLSearchParams();
	queryParams.set('ids', String(idMovProcessoCliente));
	queryParams.set('tipoArquivo', 'pdf');

	return `${ApiUrl.SUMMONS_DOWNLOAD}?${queryParams.toString()}`;
}

export async function downloadSummonsPdf(
	idMovProcessoCliente: number,
	mode: SummonsPdfDownloadMode = 'save',
): Promise<SummonsPdfDownloadResult | void> {
	const token = await AsyncStorage.getItem(TOKEN);

	if (!token) {
		throw new Error('Missing auth token for summons PDF download.');
	}

	const fileName = `${Date.now()}.pdf`;
	const path =
		Platform.OS === 'ios'
			? `${dirs.DocumentDir}/${fileName}`
			: `${dirs.DownloadDir}/${fileName}`;

	const response = await RNFetchBlob.config({
		path,
		addAndroidDownloads:
			mode === 'save'
				? {
						useDownloadManager: true,
						notification: true,
						mediaScannable: true,
						description: 'Intimação disponibilizada via Advise Hub App',
						path: `${dirs.DownloadDir}/${fileName}`,
					}
				: undefined,
	}).fetch('GET', buildDownloadUrl(idMovProcessoCliente), {
		Authorization: `Bearer ${token}`,
	});

	if (mode === 'share') {
		const file = await RNFetchBlob.fs.readFile(response.data, 'base64');
		return { file, fileName };
	}

	if (Platform.OS === 'ios') {
		await RNFetchBlob.fs.writeFile(path, response.data, 'base64');
		RNFetchBlob.ios.openDocument(path);
	}
}
