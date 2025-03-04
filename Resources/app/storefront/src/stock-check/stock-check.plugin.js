const { PluginBaseClass } = window;
import AppClient from 'src/service/app-client.service.ts';

export default class StockCheck extends PluginBaseClass {
    client;
    shopId;
    targetNode;
    productNumber;
    stockData;

    async init() {        
        this.productNumber = this.el.innerText;
        if (!this.productNumber) {
            return;
        }

        this.client = new AppClient("ShopwareStoreTracker");
        await this.getStockData();
    }

    async getStockData() {
        const requestUrl = `http://localhost:8001/stock-status/${this.productNumber}`;
        const response = await this.client.get(requestUrl);
        console.log(await response.json());
    }
}