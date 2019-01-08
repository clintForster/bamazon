var mysql = require("mysql");
var express = require("express");
var inquire = require("inquirer");

var connection = mysql.createConnection({
    host: "LocalHost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});

function afterConnection() {

    inquire.prompt([
        {
            type: "list",
            name: "Menu",
            choices: [
                "View Product Sales by Department",
                "Create New Department"
            ]
        }
    ]).then((response) => {
        switch (response.Menu) {
            case 'View Product Sales by Department':
                printSales();
                break;
            case 'Create New Department':
                createDepartment();
                break;
        }
    });

}

function printSales() {
    connection.query("SELECT * FROM departments", function (err, response) {
        connection.query("SELECT * FROM products", function (err, results) {

            if (err) throw err;
            console.log(response);
            console.log("| department_id | department_name | over_head_costs | product_sales | total_profit |");
            console.log("| ------------- | --------------- | --------------- | ------------- | ------------ |");
            for (var i = 0; i < response.length; i++) {
                var profit = response[i].over_head_costs - results[i].product_sales;
                console.log("| " + response[i].department_id + "             | " + response[i].department_name + "        | " + response[i].over_head_costs + "           | " + results[i].product_sales + "          | " + profit + "       |");
            }
        });
    });
}

function createDepartment() {

        inquire.prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'What new Department would you like to create?'
            },
            {
                type: 'input',
                name: 'overHead',
                message: 'What are the over_head_costs of this department?'
            }
        ]).then(function (response) {
            connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?,?)", [response.newDepartment, response.overHead], function (err, response) {
                if (err) throw err;
                console.log("\nNew department added!");
            });
        });
    
    }