const express = require('express');
const bodyParser = require('body-parser');

const {PORT}=require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const {User}= require('./models/index');
const bcrypt=require('bcrypt');

const UserService = require('./services/user-service');

const app =express();

const prepareAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api',apiRoutes);

    app.listen(PORT, async()=>{
        console.log(`Server started on port: ${PORT}`);
        
        const service = new UserService();
        // const newToken = service.createToken({email:'hulk@admin.com',id:1});
        // console.log(newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1bGtAYWRtaW4uY29tIiwiaWQiOjEsImlhdCI6MTcxMTkwNzk3NywiZXhwIjoxNzExOTExNTc3fQ.zsGiFpdzWgFmv_SbSWO-tnP8yYzH4dY19CDYHSFwnnA';
        // const response =service.verifyToken(token);
        // console.log(response);

       });
}

prepareAndStartServer();