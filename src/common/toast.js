import SimpleToast from 'react-native-simple-toast';

export const Toast = (message) => {
  return SimpleToast.showWithGravity(
    message,
    SimpleToast.LONG,
    SimpleToast.CENTER,
  );
};
