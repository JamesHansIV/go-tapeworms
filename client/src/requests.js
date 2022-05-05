const fetchList = async () => {
    // console.log('fetchlist called');
    await fetch('/order-list')
        .then(response=>response.json())
        .then(data=>console.log(data));
}

export default fetchList;