import {Request, Response} from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response){
        const items = await knex('items').select('*'); //SELECT * FROM items
    
        const serializedItems = items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3000/uploads/${item.image}`,
            };
        }); //serialização de dados para o front-end
    
        return response.json(serializedItems);
    }
}

export default ItemsController;