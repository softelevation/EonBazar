import SimpleToast from "react-native-simple-toast";

export default Toast = {
    show(message) {
        setTimeout(() => {
            SimpleToast.showWithGravity(message, SimpleToast.SHORT, SimpleToast.CENTER)
        }, 1000)
    }
}
