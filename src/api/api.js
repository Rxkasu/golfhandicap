import { validateJson } from '../validate-json.js';

import express, { json } from 'express';
import cors from 'cors';
import { promises, readFile } from 'fs';
const fsp = promises;
import { join } from 'path';

const app = express();
app.use(cors());
app.use(json());

app.get('/api', (req, res) => {
    console.log("HTTP GET /api received");
    let data = {
        "version": "0.0.1",
        "name": "api", 
        "description": "API for the application"
    }
    res.status(200).send(data);
});

app.post('/login', async (req, res) => {
    console.log("HTTP POST /login received");
    let login = req.body;
    console.log(login);
    let email = login.email;
    let password = login.password;
    let data;
    try {
        data = await readFiles('json/users');
    }
    catch(err) {
        returnError(res, err);
        return;
    }
    let user = data.find(user => user.email === email);
    console.log(user);
    if (user) {
        if (user.password === password) {
            res.status(200).json(user.user_id);
        }
        else {
            res.status(401).json('Password is incorrect!');
        }
    }
    else {
        res.status(404).json('User not found!');
    }
});

app.post('/register', async (req, res) => {
    console.log("HTTP POST /register received");
    let register = req.body;
    let data;
    try {
        data = await readFiles('json/users');
    }
    catch(err) {
        returnError(res, err);
        return;
    }
    if(data.length > 100) {
        res.status(403).json('Maximum number of users reached!');
        return;
    }
    const user_id = data.reduce((max, user) => {
        return (user.user_id > max.user_id) ? user : max;
    }).user_id + 1;
    console.log(user_id);

    let user = data.find(user => user.email === register.email);
    if (user) {
        res.status(409).json('User already exists');
    }
    else {
        try {
            let user = {
                "user_id": user_id,
                "email": register.email,
                "password": register.password
            }
            await fsp.writeFile('json/users/' + user.user_id + '.json', JSON.stringify(user));

            let player = {
                "user_id": user_id,
                "surname": register.surname,
                "first_name": register.first_name,
                "games": []
            }
            await fsp.writeFile('json/players/' + user.user_id + '.json', JSON.stringify(player));
        }
        catch(err) {
            returnError(res, err);
            return;
        }
        res.status(201).json('User created');
    }
});

app.get('/user/:user_id', async (req, res) => {
    console.log(`HTTP GET /user/${req.params.user_id} received`);
    let user_id = Number(req.params.user_id);
    let data;
    try {
        data = await readFiles('json/users');
    }
    catch(err) {
        returnError(res, err);
        return;
    }
    let user = data.find(user => user.user_id === user_id);
    if (user) {
        try {
            let players = await readFiles('json/players');
            let player = players.find(player => player.user_id === user_id);
            if(player) {
                res.status(200).json(player);
            }
            else {
                res.status(404).json('User not fully initialized!');
            }
        }
        catch(err) {
            returnError(res, err);
            return;
        }
    }
    else {
        res.status(404).json('User doesnt exist!');
    }
});

app.put('/user/:user_id', async (req, res) => {
    console.log(`HTTP PUT /user/${req.params.user_id} received`);
    let newUser = req.body;
    console.log(newUser);


    if(!validateJson(newUser)) {
        res.status(400).json('Invalid JSON data!');
        return;
    }

    let user_id = Number(req.params.user_id);
    if(newUser.user_id !== user_id) {
        res.status(400).json('User ID doesnt match!');
        return;
    }

    let data;
    try {
        data = await readFiles('json/users');
    }
    catch(err) {
        returnError(res, err);
        return;
    }

    let user = data.find(user => user.user_id === user_id);
    if (user) {
        try {
            let player = {
                "user_id": user_id,
                "surname": newUser.surname,
                "first_name": newUser.first_name,
                "games": newUser.games,
            }
            await fsp.writeFile('json/players/' + user_id + '.json', JSON.stringify(player));
        }
        catch(err) {
            returnError(res, err);
            return;
        }
        res.status(200).json('User updated!');
    }
    else {
        res.status(404).json('User doesnt exist!');
    }
});

app.delete('/user/:user_id', async (req, res) => {
    console.log(`HTTP DELETE /user/${req.params.user_id} received`);
    let user_id = Number(req.params.user_id);
    let data;
    try {
        data = await readFiles('json/users');
    }
    catch(err) {
        returnError(res, err);
        return;
    }
    let user = data.find(user => user.user_id === user_id);
    if (user) {
        try {
            await fsp.unlink('json/users/' + user_id + '.json');
            await fsp.unlink('json/players/' + user_id + '.json');
            res.status(200).json('User deleted!');
        }
        catch(err) {
            returnError(res, err);
            return;
        }
    }
    else {
        res.status(404).json('User doesnt exist!');
    }
});

app.listen(30000, () => {
    console.log("Server is running on port" + 30000);
});

function returnError(res, err) {
    console.log(err);
    res.status(500).json('Internal server error occured.');
}

async function readFiles(dirname) {
    const data = [];
    const files = await fsp.readdir(dirname);
    await Promise.all(files.map(async filename => {
        const full = join(dirname, filename);
        const content = await fsp.readFile(full, {encoding: 'utf8'}, (err, data) => {
            if (err) {
                throw new Error(err);
            }
        });
        data.push(JSON.parse(content));
    }));
    return data;
}
