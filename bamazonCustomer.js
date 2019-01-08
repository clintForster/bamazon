var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

var connection = mysql.createConnection({
    host: "LocalHost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon",
});

connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});

function afterConnection() {

    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        for (var i = 0; i < response.length; i++) {
            console.log(chalk.magentaBright("\n" + response[i].item_id + ")"), chalk.rgb(255, 255, 204)(response[i].product_name));
            console.log(chalk.greenBright(response[i].price));
        }
        console.log("\n");
    });

    // ask if this is the best way to avoid asynchronous behavior
    setTimeout(function () {

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Enter the ID of the item you would like to buy: "
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to buy: "
            }
        ]).then(function (results) {
            connection.query("SELECT * FROM products WHERE item_id =" + results.id, function (err, response) {
                if (err) throw err;
                var chosenId = results.id;
                var stock = response[0].stock_quantity;
                if (results.quantity > stock) {
                    console.log("Insufficient Quantity!");
                } else {
                    stock -= results.quantity;
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [stock, chosenId], function (err, eee) {
                        if (err) throw err;
                        console.log(eee);
                        var price = response[0].price * results.quantity;
                        console.log("\nTotal cost: " + price);
                    });

                }
            });

        });

    }, 250);

}