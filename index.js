const domain = 'localhost:3000';

// EVENT LISTENERS
// button
console.log(document.getElementById('list-btn').innerHTML);
document.getElementById('list-btn').addEventListener('click', () => {
    let orders = fetchList();
    for(let i = 0; i < orders.length; i++) {
        const order = document.createElement('p');
        order.innerHTML(`${orders[i].name}`);
        document.body.appendChild(order);
    }
});

fetchList = async () => {
    const response = await fetch('/order-list');
    console.log('fetchlist: ',response);
    console.log(JSON.parse(JSON.stringify(response)));
    return response;
}
