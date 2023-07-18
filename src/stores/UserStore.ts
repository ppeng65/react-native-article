import { request } from "../utils/request";
import { flow } from "mobx";
import { setItem } from "../utils/Storage";
import Loading from "../components/widget/Loading";

class UserStore {

    userInfo: any;

    // requestLogin = async (phone: string, pwd: string, callback: (success: boolean) => void) => {
    //     try {
    //         const params = {
    //             name: phone,
    //             pwd
    //         };
    //         const { data} = await request('login', params);
    //         if (data) {
    //             this.userInfo = data;
    //             callback?.(true);
    //         } else {
    //             this.userInfo = null;
    //             callback?.(false);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         this.userInfo = null;
    //         callback?.(false);
    //     }
    // };
    requestLogin = flow(function * (
        this: UserStore,
        phone: string,
        pwd: string,
        callback: (success: boolean) => void
    ) {
        try {
            Loading.show();
            const params = {
                name: phone,
                pwd
            };
            const { data} = yield request('login', params);
            if (data) {
                setItem('userInfo', data);
                this.userInfo = data;
                callback?.(true);
            } else {
                this.userInfo = null;
                callback?.(false);
            }
        } catch (error) {
            console.log(error);
            this.userInfo = null;
            callback?.(false);
        } finally {
            Loading.hide();
        }
    })
}

export default new UserStore();