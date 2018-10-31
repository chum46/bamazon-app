# Bamazon CLI App

Bamazon is an Amazon-like storefront that takes in a customer's order and updates stock quantities from the store inventory.

## Setup

Install MySQL -  visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to install this package

To run the customer interface, follow the steps below in your command line:

	git clone https://github.com/chum46/bamazon-app
	cd bamazon-app
	npm install
	node bamazonCustomer.js

## Instructions

1. In your terminal run `node bamazon-app/`
    * The store will open and a list of items will be displayed with the following information:

        ```
       * Product number, a unique ID for each item.
       * Name of the item
       * Department Category
       * Price
       * Quantity Available in stock
        ```

2. Enter a product number you wish to purchase

3. Enter the quantity you wish to purchase

4. Your total will be displayed and the transaction will be completed. 
