const domain = 'localhost:3000';

const getOrderList = async () => {
    console.log("requesting order list...");

    let url = domain + '/order-list';
    let orders = [];

    fetch(url)
        .then(response => response.json())
        .then(orders => console.log)

    
    //change to hide list
    let btn = document.getElementById("list-btn");
    btn.value = "Hide List";
};