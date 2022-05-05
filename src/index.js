const express = require ('express');
const router = require ('./routes/teams')
const morgan = require ('morgan')
const server = express();

//SETTINGS
server.set ('PORT', 5000);

//MIDDLEWARES
server.use(morgan('dev'))
server.use(express.json());
server.use(express.urlencoded({extended:false}));

//ROUTES
server.use('/api/teams', router)

//INITILIAZATION
server.listen(server.get ('PORT'), () => {
    console.log(`Server on PORT ${server.get('PORT')}`)
}); 