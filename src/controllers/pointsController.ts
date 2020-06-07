import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController{

    //pesquisa filtrada
    async index(request:Request, response: Response){
        const {city, uf, items} = request.query;
        const parsedItems = String(items).split(',').map(item => (item.trim()));
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct().select('points.*');

        return response.json(points);
    }

    async show(request: Request, response: Response){
        const { id } = request.params;// = request.params.id
        const point = await knex('points').where('id', id).first;

        if (!point){
            return response.status(400).json({message: 'Ponto não encotrado'});
        }
        // SELECT items.title FROM items
        // JOIN point_items ON items.id = point_items.item_id
        // WHERE point_items.pointid = {id}
        const items = await knex('items')
            .join('point_items', 'item.id', '=', 'point_items.item_id')
            .where('point_items.point_id',id)
            .select('items.title');

        return response.json({point, items});
    }

    async create(request: Request, response: Response){
        const {
            name, email,
            latitude, longitude,
            city, uf,
            items
        } = request.body;
    
        const transaction = await knex.transaction(); // sincroniza dados ao confirmar no final
        
        const point = {
            image: 'temp-image',
            name, email,
            latitude, longitude,
            city, uf
        }
        const ids = await transaction('points').insert(point);
        const point_id = ids[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        });
    
        await transaction('point_items').insert(pointItems);
        await transaction.commit();

        return response.json({
            id: point_id,
            point,
        });
    }
}

export default PointsController;