import { action, makeObservable, observable } from "mobx";
import { request } from "../utils/request";
import Loading from "../components/widget/Loading";

const SIZE = 10;

export default class MessageStore {

    constructor() {
        makeObservable(this);
    }

    page: number = 1;

    @observable messageList: MessageListItem[] = [];

    @observable refreshing: boolean = false;

    @observable loadingFinish: boolean = false;

    @observable unread = {} as UnRead;

    @action
    setMessageList(list: MessageListItem[]) {
        this.messageList = list || [];
    }

    @action
    setRefreshing(refreshing: boolean) {
        this.refreshing = refreshing;
    }

    @action
    setFinish(isFinish: boolean) {
        this.loadingFinish = isFinish;
    }

    @action
    setUnRead(obj: UnRead) {
        this.unread = obj;
    }

    resetPage() {
        this.page = 1;
    }

    requestMessageList = async () => {
        if (this.refreshing) {
            return;
        }
        Loading.show();

        try {
            this.setRefreshing(true);
            const params = {
                page: this.page,
                size: SIZE
            };
            const { data } = await request('messageList', params);
            this.setFinish(false);
            if (data?.length) {
                if (this.page === 1) {
                    this.setMessageList(data);
                } else {
                    this.setMessageList([...this.messageList, ...data]);
                }
                this.page = this.page + 1;
            } else {
                if (this.page === 1) {
                    this.setMessageList([]);
                } else {
                    this.setFinish(true);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.setRefreshing(false);
            Loading.hide();
        }
    }

    requestUnRead = async () => {
        try {
            const { data } = await request('unread', {});
            this.setUnRead(data || {});
        } catch (error) {
            console.log(error);
        }
    }
};
