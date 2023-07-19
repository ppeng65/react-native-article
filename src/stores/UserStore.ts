import { action, makeObservable, observable } from "mobx";
import { flow } from "mobx";
import { request } from "../utils/request";
import { setItem } from "../utils/Storage";
import Loading from "../components/widget/Loading";

class UserStore {

    constructor() {
        makeObservable(this);
    }

    @observable userInfo: any;

    @action
    setUserInfo(userInfo: any) {
        this.userInfo = userInfo;
    }

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
                this.setUserInfo(data);
                callback?.(true);
            } else {
                this.setUserInfo(null);
                callback?.(false);
            }
        } catch (error) {
            console.log(error);
            this.setUserInfo(null);
            callback?.(false);
        } finally {
            Loading.hide();
        }
    })
}

export default new UserStore();