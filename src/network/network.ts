import Taro from "@tarojs/taro";

import { GoodItemsModel, Item, KeyValue, UserInfo } from "./model";

import { formatDate } from "../utils/date_helper";

import { GoodItems, acceptModel, arriveModel, provideModel, userInfosModel } from "./model/scene3.json"

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

    static async login(userInfo: UserInfo) {
        let res = '';
        let exist = false;
        let password = false;
        let result = await userInfosModel.map(v => {
            if (userInfo.acount==v.acount) {
                exist = true
                if (userInfo.password==v.password) {
                    password = true
                }
            }
        });
        if (exist) {
            if (password) {
                res = "000000"
            } else {
                res = "990001"
            }
        } else {
            res = "990002"
        }
        return res
    }
}

export { NetworkManager, GoodItemsModel, Item, KeyValue };
