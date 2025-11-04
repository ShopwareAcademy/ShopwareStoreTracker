// <plugin root>/src/Resources/app/storefront/src/main.js
// Import all necessary Storefront plugins
import StockCheck from './stock-check/stock-check.plugin.js';

// Register your plugin via the existing PluginManager
const PluginManager = window.PluginManager;
PluginManager.register('StockCheck', StockCheck, '[data-stock-check]');
