// Rota = endereço completo da requisição
// Recurso = Entidade a ser acessada
// Request Param: filtro único logo após '/'
// Query Param multiplos filtros
// Request body: params para ciração/atualização

//GET: buscar info do backend   '/users/5' = user 5
// POST: criar nova | PUT: atualizar | DELETE

import express from 'express';
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';

const routes = express.Router();
const pointsController = new PointsController();// criação de ponto
const itemsController = new ItemsController();//leitura de itens

routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

routes.get('/items', itemsController.index);
/*
routes.get('/', (request, response) => {
    return response.json({message: "Hello"});
});
*/
export default routes;