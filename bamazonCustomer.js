var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "BamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("\n");
  console.log("------------------------");
  console.log("Welcome to Bamazon");
  console.log("------------------------");
  displayItems();
});

function displayItems() {
  connection.query("SELECT * FROM bamazonTable", function (err, res) {
    console.log("\n");
    for (var i = 0; i < res.length; i++) {
      console.log("#" + res[i].item_id + " | " + res[i].product_name + " | " +
        res[i].department_name + " | Price: $" + res[i].price + " | Qty: " +
        res[i].stock_quantity + "\n");
    }
    promptID();
  })
};

function promptID() {
  inquirer.prompt([
    {
      type: 'input',
      name: "promptID",
      message: "To select an item to purchase, enter the product number: "
    }])
    .then(function (answers) {
      var itemID = answers.promptID;
      if (answers.promptID > 10 || answers.promptID < 1) {
        console.log("Invalid product number");
        promptID();
      }
      connection.query("SELECT * FROM bamazonTable where item_id=" +
        itemID, function (err, res) {
          if (res[0].stock_quantity == 0) {
            console.log("Sorry, this item is out of stock.");
            displayItems();
          }
          else {
            promptQty(itemID)
          }

        })
    });
};

function promptQty(itemID) {
  inquirer.prompt([
    {
      name: "promptQty",
      message: "How many of these would you like to buy?"
    }])
    .then(function (answers) {
      var quantity = answers.promptQty;

      connection.query("SELECT * FROM bamazonTable where item_id=" + itemID, function (err, res) {

        var stockQuantity = res[0].stock_quantity;
        var productName = res[0].product_name;
        var productPrice = res[0].price;
        var total = res[0].price * quantity;

        if (quantity > stockQuantity) {
          console.log("Insufficient quantity! There are " + stockQuantity + " available");
          promptQty(itemID);
        }
        else {

          if (quantity == 1) {
            console.log("=========================================");
            console.log("Thank you for your purchase. Transaction Complete.");
            console.log("You ordered " + quantity + " " + productName + " for $" + productPrice + ".");
            console.log("Your total is $" + total + ".");
            console.log("Transaction Complete.")
            console.log("=========================================");

            updateQty(itemID, productName, quantity, stockQuantity)
            reprompt();
          }

          else if (quantity > 1) {
            console.log("=========================================");
            console.log("Thank you for your purchase.");
            console.log("You ordered " + quantity + " " + productName + "s for $" + productPrice + " each.");
            console.log("Your total is $" + total + ".");
            console.log("Transaction Complete.")
            console.log("=========================================");

            updateQty(itemID, productName, quantity, stockQuantity)
            reprompt();
          }
          else if (quantity == 0) {
            console.log("You entered 0. No items were purchased.");
            reprompt();
          }
          else {
            console.log("Please enter a quantity or 0 to restart.");
            promptQty(itemID);
          }
        }
      })
    })
};

function updateQty(itemID, productName, quantity, stockQuantity) {

  var updatedQuantity = stockQuantity - quantity;
  console.log("ItemID: " + itemID+" | "+ productName);
  console.log("Updated Inventory Quantity " + updatedQuantity+"\n");

  var sql = "UPDATE bamazonTable SET stock_quantity = '" + updatedQuantity + "' WHERE item_id = '" + itemID + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
}

function reprompt() {
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase something else? "
  }]).then(function (ans) {
    if (ans.reply) {
      displayItems();
    } else {
      console.log("Thank you, See you next time!");
    }
  });
}
