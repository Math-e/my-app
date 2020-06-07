import React, { useEffect, useState } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';


interface Item {//precisa informar tipo manualmente
    id: number,
    title: string,
    image_url: string;
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([]);// ???????
    useEffect(() => {
        api.get('/items').then((response) => {
            setItems(response.data);
        });
    }, []);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="E-coleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Home
                </Link>
            </header>

            <form>
                <h1>Cadastro de ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="field">
                        <label htmlFor="name">E-mail</label>
                        <input type="email" name="email" id="email" />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-22.768536, -42.9319647]} zoom={15}>
                        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[-22.768536, -42.9319647]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione...</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione...</option>
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map((item) => (
                        <li key={item.id}>
                            <img src={item.image_url} alt={item.title}></img>
                            <span>{item.title}</span>
                        </li>
                        ))}
                    </ul>
                </fieldset>
                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;