import SimpleToast from 'react-native-simple-toast';
import {showMessage, hideMessage} from 'react-native-flash-message';

export const Toast = (message, color, duration) => {
  // return SimpleToast.showWithGravity(
  //   message,
  //   SimpleToast.LONG,
  //   SimpleToast.CENTER,
  // );
  return showMessage({
    message: message,
    backgroundColor: color,
  });
};

Toast.defaultProps = {
  type: 'default',
  color: '#42444A',
};
