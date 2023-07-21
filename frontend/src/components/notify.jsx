import { toast } from 'react-toastify';

const notifyOk = (message) => toast.success(message);
const notifyConnectionErr = (errorMessage) => toast.error(errorMessage);

export { notifyOk, notifyConnectionErr };
