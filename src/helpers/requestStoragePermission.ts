import { PermissionsAndroid, Platform } from 'react-native';

export async function requestStoragePermission(): Promise<boolean> {
	try {
		if (Platform.OS === 'android') {
			if (Platform.Version >= 33) {
				return true;
			}

			const status = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				{
					title: 'Permissão necessária',
					message:
						'O app precisa de acesso ao armazenamento para baixar arquivos.',
					buttonPositive: 'OK',
				},
			);

			return status === PermissionsAndroid.RESULTS.GRANTED;
		}

		return true;
	} catch {
		return false;
	}
}
