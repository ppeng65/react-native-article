import { action, makeObservable, observable } from "mobx";
import { request } from "../utils/request";
import Loading from "../components/widget/Loading";

const SIZE = 10;

export default class MineStore {

    constructor() {
        makeObservable(this);
    }

    @observable info: any = {};

    @observable noteList: ArticleSimple[] = []

    @observable collectionList: ArticleSimple[] = [];

    @observable favorateList: ArticleSimple[] = [];

    @observable refreshing: boolean = false;

    @action
    setInfo(obj: any) {
        this.info = obj || {};
    }

    @action
    setNoteList(list: ArticleSimple[]) {
        this.noteList = list || [];
    }

    @action
    setCollectionList(list: ArticleSimple[]) {
        this.collectionList = list || [];
    }

    @action
    setFavorateList(list: ArticleSimple[]) {
        this.favorateList = list || [];
    }

    @action
    setRefreshing(refreshing: boolean) {
        this.refreshing = refreshing;
    }

    requestAll = async () => {
        Loading.show();
        this.setRefreshing(true);

        await this.requestInfo();
        await this.requestNoteList();
        await this.requestCollectionList();
        await this.requestFavorateList();

        this.setRefreshing(false);
        Loading.hide();
    }

    requestInfo = async () => {
        try {
            const { data } = await request('accountInfo', {});
            this.setInfo(data || {});
        } catch (error) {
            console.log(error);
        }
    }

    requestNoteList = async () => {
        try {
            const { data } = await request('noteList', {});
            this.setNoteList(data || []);
        } catch (error) {
            console.log(error);
        }
    }

    requestCollectionList = async () => {
        try {
            const { data } = await request('collectionList', {});
            this.setCollectionList(data || []);
        } catch (error) {
            console.log(error);
        }
    }

    requestFavorateList = async () => {
        try {
            const { data } = await request('favorateList', {});
            this.setFavorateList(data || []);
        } catch (error) {
            console.log(error);
        }
    }
};
