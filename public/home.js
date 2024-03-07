import io from '/socket.io/socket.io.js';
const socket = io();

socket.on('productAdded', (product) => {
    const productList = document.getElementById('productList');
    const listItem = document.createElement('li');
    listItem.textContent = product;
    productList.appendChild(listItem);
});


export default socket;