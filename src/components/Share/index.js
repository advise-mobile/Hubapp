import { Share } from 'react-native';

const ShareCustom = ({ message, title }) =>
  Share.share(
    {
      message,
      title,
    },
  );

export { ShareCustom as Share };
