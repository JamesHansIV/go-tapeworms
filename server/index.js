const domain = 'localhost:3000';

// EVENT LISTENERS
// button
document.getElementById('list-btn').addEventListener('click', () => {
    let orders = fetchList();
    for(let i = 0; i < orders.length; i++) {
        const order = document.createElement('p');
        order.innerHTML(`${orders[i].name}`);
        document.body.appendChild(order);
    }
});

fetchList = async () => {
    await fetch('/order-list')
        .then(response=>response.json())
        .then(data=>console.log(data));
}
