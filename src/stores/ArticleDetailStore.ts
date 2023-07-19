import { action, makeObservable, observable } from "mobx";
import { request } from "../utils/request";
import Loading from "../components/widget/Loading";

export default class ArticleDetailStore {

    constructor() {
        makeObservable(this);
    }

    @observable detail = {} as Article;

    @action
    setArticleDetail(data: Article) {
        this.detail = data || [];
    }

    requestArtilceDetail = async (id: number) => {
        Loading.show();

        try {
            const params = { id };
            const { data } = await request('articleDetail', params);

            this.setArticleDetail(data || {});
        } catch (error) {
            console.log(error);
        } finally {
            Loading.hide();
        }
    }
};
