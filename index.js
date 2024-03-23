const express = require('express');
const socket = require('socket.io');
const path = require('path')
const app = express();
const server = app.listen(3000, () => {
    console.log(`Server Runing at http://localhost:${4000}`);

});

const io = socket(server);
app.use(express.static(path.join(__dirname)));



io.on('connection', (socket) => {
    
    // taking user name;
    socket.on('nameOfPerson',(nameOfPerson)=>{
        
        console.log(`A user has connected server ${nameOfPerson}`);
        io.emit('new Person conneected',nameOfPerson);
        socket.nameOfPerson = nameOfPerson;
    })
    socket.on('Chat App', (message, nameOfPerson) => {
        io.emit('Chat App', message, nameOfPerson);
    });

    // display afet name discoonect
    socket.on('disconnect', () => {
        console.log(`User ${socket.nameOfPerson} disConnected`);
        if(socket.nameOfPerson){
            io.emit('nameOfPerson',socket.nameOfPerson);
        }
        
    });
});



