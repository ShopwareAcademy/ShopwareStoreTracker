const { PluginBaseClass } = window;
import AppClient from 'src/service/app-client.service.ts';

export default class StockCheck extends PluginBaseClass {
    client;
    shopId;
    productNumber;
    stockData;

    async init() {
        this.productNumber = window.location.pathname.substring(
            (window.location.pathname.lastIndexOf('/') + 1)
        );

        this.client = new AppClient("ShopwareStoreTracker");
        this.stockData = await this.getStockData();
        this.displayStockData();
    }

    async getStockData() {
        if (!this.productNumber) {
            return;
        }

        const requestUrl = `http://localhost:8001/stock-status/${this.productNumber}`;
        const response = await this.client.get(requestUrl);
        return await response.json();
    }

    displayStockData() {
        if (!this.stockData) {
            return;
        }

        // Check for the parent node which will hold the elements we want to create
        const buyBox = document.querySelector('.cms-element-buy-box');
        if (!buyBox) {
            return;
        }

        // Get the template node contents and make a copy
        const contentClone = this.el.content.cloneNode(true);

        // Set up any nodes and variables we will want to use when iterating the stock data
        const stockList = contentClone.querySelector('.product-stock__list');
        const stockItem = contentClone.querySelector('.product-stock__item');
        stockItem.classList.add('product-stock__item');
        let stockItemClone = null;
        let stockItemHeading;
        let stockItemAddress;
        let stockItemQuantity;
        
        // Loop through the stock data and input relevant information into the appropriate node
        for (const stockInfo of this.stockData) {
            stockItemClone = stockItem.cloneNode();

            stockItemHeading = document.createElement('h4');
            stockItemHeading.textContent = stockInfo.name;
            stockItemClone.appendChild(stockItemHeading);

            stockItemAddress = document.createElement('p');
            stockItemAddress.textContent = 'Address: ' + stockInfo.address;
            stockItemClone.appendChild(stockItemAddress);

            stockItemQuantity = document.createElement('span');
            stockItemQuantity.textContent = 'Quantity: ' + stockInfo.stockQuantity;
            stockItemClone.appendChild(stockItemQuantity);

            stockList.appendChild(stockItemClone);
        }
        
        // remove initial template li
        stockItem.remove();
        // Inject final result into the buy-box
        buyBox.appendChild(stockList);
    }
}