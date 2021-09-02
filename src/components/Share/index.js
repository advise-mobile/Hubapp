import { Share } from 'react-native';

const ShareCustom = async ({ message, title }, onShare) =>{
  const res = await Share.share(
    {
      message,
      title,
    },
  );

  if (res.action == Share.sharedAction) onShare();
};

export { ShareCustom as Share };
