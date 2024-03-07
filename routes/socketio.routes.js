import express from 'express';
import { Server } from 'socket.io';

const socketioRouter = (io) => {
    const router = express.Router();

    io.on('connection', (socket) => {
        socket.on('addProduct', (productName) => {
            
            io.emit('productAdded', productName);
        });

        socket.on('deleteProduct', (productId) => {

            io.emit('productDeleted', productId);
        });
    });

    return router;
};

export default socketioRouter;