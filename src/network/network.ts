import Taro from "@tarojs/taro";

import { GoodItemsModel, Item, KeyValue } from "./model";

import { formatDate } from "../utils/date_helper";

import { GoodItems, acceptModel, arriveModel, provideModel } from "./model/scene3.json"

class NetworkManager {
    static host: string = "http://localhost:8085/wxapp";

    static async getGoodItems() {
        return GoodItems
    }

    static async getAcceptModel() {
        return acceptModel
    }

    static async getArriveModel() {
        return arriveModel
    }

    static async getProvideModel() {
        return provideModel
    }
}

export { NetworkManager, GoodItemsModel, Item, KeyValue };
