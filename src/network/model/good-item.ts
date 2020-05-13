export interface Item {
	operation: string
	address: string
	checkedTime: string
	id: number
}
export interface GoodItemsModel {
	goodCode: string
	GoodItemModel: Array<Item>
}
