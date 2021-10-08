import {Share} from 'react-native';

const ShareCustom = async (data, onShare) => {
	const res = await Share.share(data);

	if (res.action == Share.sharedAction) onShare();
};

export {ShareCustom as Share};
