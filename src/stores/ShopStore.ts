import { action, makeObservable, observable } from "mobx";
import { request } from "../utils/request";
import { getItem } from "../utils/Storage";
import Loading from "../components/widget/Loading";

const SIZE = 10;

export default class ShopStore {

    constructor() {
        makeObservable(this);
    }

    @observable top10Category: GoodsCategory[] = [];

    page: number = 1;

    @observable goodsList: GoodsSimple[] = [];

    @observable refreshing: boolean = false;

    @observable loadingFinish: boolean = false;

    @action
    setTop10Category(list: GoodsCategory[]) {
        this.top10Category = list;
    }

    @action
    setGoodsList(list: GoodsSimple[]) {
        this.goodsList = list;
    }

    @action
    setRefreshing(refreshing: boolean) {
        this.refreshing = refreshing;
    }

    @action
    setFinish(isFinish: boolean) {
        this.loadingFinish = isFinish;
    }

    resetPage() {
        this.page = 1;
    }

    requestShopList = async () => {
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
            const { data } = await request('goodsList', params);
            this.setFinish(false);
            if (data?.length) {
                if (this.page === 1) {
                    this.setGoodsList(data || []);
                } else {
                    this.setGoodsList([...this.goodsList, ...data]);
                }
                this.page = this.page + 1;
            } else {
                if (this.page === 1) {
                    this.setGoodsList([]);
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

    requestTop10CateGory = async () => {
        try {
            const { data } = await request('top10Category', {});
            this.setTop10Category(data || []);
        } catch (error) {
            console.log(error);
        }
    }
};
