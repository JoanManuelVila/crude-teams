const { request } = require('express');
const { response } = require('express');
const express = require ('express');
const router = new express.Router();
let teams = require ('../teams.json');

//GET all the teams
router.get('/', (request, response) => {
    return response.json(teams)
})

//GET one team by id
router.get('/:id', (request, response) => {
    const { id } = request.params;
    const teamFound = teams.find(team => team.id === id)
    if(!teamFound){
        return response.status(404).json({
            message: 'The team not found'
        })
    }
    return response.status(200).json(teamFound)
})
//UPDATE  a team by id
router.put('/:id', (request, response) => {
    const { id } = request.params;
    const teamFound = teams.find(team => team.id === id);
    const index = teams.indexOf(teamFound);
    if(index == -1) {
        return response.status(404).json({
            message: 'The team not found'
        })
    }
    const { nombre, presidente, pais, fundacion } = request.body;
    const newTeam = {
        id,
        nombre: nombre ||teamFound.nombre,
        presidente: presidente ||teamFound.presidente,
        pais: pais ||teamFound.pais,
        fundacion: fundacion ||teamFound.fundacion
    }
    teams[index] = newTeam
    return response.status(200).json({
        message: 'The team update',
        newTeam
    })
    

})
//CREATE a team 
router.post('/', (request, response) =>{
    const { nombre, presidente, pais, fundacion } = request.body;
    if(!nombre ||!presidente ||!pais ||!fundacion){
        return response.status(400).json({
            message: 'Must provide nombre, presidente, pais, fundacion'
        })
    }
    const lastIdString = (teams[teams.length - 1]).id
    const lastId = parseInt(lastIdString)
    const id = (lastId + 1).toString()
    const newTeam = {
        id,
        nombre,
        presidente,
        pais,
        fundacion,
    }
    teams.push(newTeam);
    return response.status(200).json({
        message:'Team created',
        newTeam
    })
})

//DELETE team by id
router.delete('/:id', (request, response) =>{
    const { id } = request.params;
    const teamFound = teams.find(team => team.id === id)
    const index = teams.indexOf(teamFound);
    if(index > -1){
        teams.splice(index, 1)
        return response.status(200).json({
            message: 'Team deleted',
            deleteTeam: teamFound
        })
    }
    return response.status(404).json({
        message: 'Team not found'
    })
})

module.exports = router;