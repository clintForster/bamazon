var inquire = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "LocalHost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

inquire.prompt([
    {
        type: 'list',
        name: 'Menu',
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }
]).then((response) => {

    switch (response.Menu) {

        case 'View Products for Sale':
            viewProducts();
            break;
        case 'View Low Inventory':
            lowInventory();
            break;
        case 'Add to Inventory':
            addInventory();
            break;
        case 'Add New Product':
            addProduct();
            break;
    }


});

function log(response) {
    for (var i = 0; i < response.length; i++) {
        console.log("\n" + response[i].item_id + ") " + response[i].product_name);
        console.log("Cost: " + response[i].price);
        console.log("Number available: " + response[i].stock_quantity);
    }
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        log(response);
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, response) {
        if (err) throw err;
        log(response);
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        log(response);
    });
    setTimeout(function () {
        inquire.prompt([
            {
                type: 'input',
                name: 'addWhat',
                message: 'Which item would you like to add more of?'
            }
        ]).then((response) => {

            connection.query("UPDATE products SET stock_quantity = stock_quantity + 1 WHERE item_id = ?", response.addWhat, (err, response) => {
                if (err) throw err;
                console.log("More inventory added!");
            });


        });
    }, 250);
}

function addProduct() {

    inquire.prompt([
        {
            type: 'input',
            name: 'newItem',
            message: 'What new item would you like to post?'
        },
        {
            type: 'input',
            name: 'whatDepartment',
            message: 'What department is this item considered a part of?'
        },
        {
            type: 'input',
            name: 'whatPrice',
            message: 'What would you like the price of this item to be?',
            validate: ans =>{
                if(isNaN(ans) || ans < 0)
                    return false;
                return true;
            }
        },
        {
            type: 'input',
            name: 'howMuch',
            message: 'How many units of that item would you like to add?',
            validate: ans =>{
                if(isNaN(ans) || ans < 0 || ans % 1 !==0)
                    return false;
                return true;
            }
        }
    ]).then(function (response) {
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)", [response.newItem, response.whatDepartment, response.whatPrice, response.howMuch], function (err, response) {
            if (err) throw err;
            console.log("\nNew item added!");
        });
    });

}