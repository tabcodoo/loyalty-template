import axios from 'axios';
import {API} from '@constants';
import DropdownHolder from 'services/DropDownHolder';
import {useSelector} from 'react-redux';
import i18n from 'i18n-js';
import ba from 'translation/ba';

class AxiosWrapper {
    axios_instance: any;
    request_retry: boolean;

    constructor() {
        this.axios_instance = axios.create({});
        this.axios_instance.defaults.baseURL = `${API}`;

        this.request_retry = false;
        this.axios_instance.interceptors.response.use(
            (response) => Promise.resolve(response),
            /**
             * Error handling for response
             */
            (error) => {
                if (error.message === 'Network Error') {
                    DropdownHolder.dropDown.alertWithType('info', '', i18n.t(`errors.noInternet`));
                    return;
                }
                /**
                 * Error handling for response
                 */

                if (
                    error.response.status == 400 &&
                    (error.response.data.errorCode === 16 || error.response.data.errorCode === 500)
                ) {
                    return null;
                }
                if (error.response.data.errorCode == 103) {
                    if (error?.config?.headers?.Authorization !== 'Bearer ') {
                        DropdownHolder.dropDown.alertWithType(
                            'error',
                            '',
                            i18n.t(`errors.err_103`),
                        );
                    }

                    return Promise.reject(error);
                } else if (error.response.status == 500) {
                    return Promise.reject(error);
                } else if (error.response.status == 401) {
                    if (error?.config?.headers?.Authorization !== 'Bearer ') {
                        DropdownHolder.dropDown.alertWithType(
                            'error',
                            '',
                            i18n.t(`errors.unauthorized`),
                        );
                    }

                    return Promise.reject(error);
                }
                let message = '';
                if (!error.response.data.errors) {
                    if (`err_${error.response.data.errorCode}` in ba.errors) {
                        message = i18n.t(`errors.err_${error.response.data.errorCode}`);
                    } else {
                        message = i18n.t('errors.generalError');
                    }
                } else {
                    error.response.data.errors.forEach((msg) => {
                        message += `${msg} \n`;
                    });
                }
                DropdownHolder.dropDown.alertWithType('error', '', message);
                return Promise.reject(error);
            },
        );
    }

    setToken = (token, language = 'ba') =>
        (this.axios_instance.defaults.headers = {
            Authorization: `Bearer ${token}`,
            'Accept-Language': language,
        });

    resetToken = () => (this.axios_instance.defaults.headers = {});
    setDefaultHeaders = (headers) => (this.axios_instance.defaults.headers = headers);
    get = (path, language) => {
        const languageQuery = path.includes('?')
            ? `&Language=${language}`
            : `?Language=${language}`;
        const finalPath = language ? path + languageQuery : path;
        return this.axios_instance.get(finalPath);
    };
    post = (path, data) =>
        this.axios_instance.post(path, data, {
            'Content-Type': 'application/json',
        });

    put = (path, data) => this.axios_instance.put(path, data);
    delete = (path, reqObj) => this.axios_instance.delete(path, reqObj);
}

// const axiosFunction = () => {
//     const locale = useSelector((state) => state?.user?.language);

//     // const Axios = new AxiosWrapper(locale);
//     return <AxiosWrapper>
// }
const Axios = new AxiosWrapper();

export default Axios;
