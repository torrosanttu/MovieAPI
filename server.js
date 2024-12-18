import express from 'express';
import {pgPool} from './pg_connections.js';

const app = express();

app.use(express.json());

let genres = [];
let movies = [];
let users = [];
let reviews = [];

app.listen(3001, ()=>{
    console.log('server is running');
})

// Genres Endpoints
app.post('/genres', async (req, res) => {
    const { GenreName } = req.body;
    try {
        const result = await pgPool.query(
            'INSERT INTO Genre (GenreName) VALUES ($1) RETURNING *',
            [GenreName]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/genres', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM Genre');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/genres/:name', async (req, res) => {
    const { name } = req.params;
    try {
        await pgPool.query('DELETE FROM Genre WHERE GenreName = $1', [name]);
        res.json({ message: 'Genre deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Movies Endpoints
app.post('/movies', async (req, res) => {
    const { MovieName, GenreName, Review } = req.body;
    try {
        const result = await pgPool.query(
            'INSERT INTO Movie (MovieName, GenreName, Review) VALUES ($1, $2, $3) RETURNING *',
            [MovieName, GenreName, Review]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/movies', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM Movie');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/movies/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const result = await pgPool.query('SELECT * FROM Movie WHERE MovieName = $1', [name]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Movie not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/movies/:name', async (req, res) => {
    const { name } = req.params;
    try {
        await pgPool.query('DELETE FROM Movie WHERE MovieName = $1', [name]);
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Users Endpoints
app.post('/users', async (req, res) => {
    const { Username, Password, UserAge, UserCountry } = req.body;
    try {
        const result = await pgPool.query(
            'INSERT INTO Userss (Username, Password, UserAge, UserCountry) VALUES ($1, $2, $3, $4) RETURNING *',
            [Username, Password, UserAge, UserCountry]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM Userss');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const result = await pgPool.query('SELECT * FROM Userss WHERE Username = $1', [username]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/users/:username', async (req, res) => {
    const { username } = req.params;
    try {
        await pgPool.query('DELETE FROM Userss WHERE Username = $1', [username]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Reviews Endpoints
app.post('/reviews', async (req, res) => {
    const { ReviewID, MovieName, Username, Stars } = req.body;
    try {
        const result = await pgPool.query(
            'INSERT INTO Review (ReviewID, MovieName, Username, Stars) VALUES ($1, $2, $3, $4) RETURNING *',
            [ReviewID, MovieName, Username, Stars]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM Review');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pgPool.query('SELECT * FROM Review WHERE ReviewID = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Review not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pgPool.query('DELETE FROM Review WHERE ReviewID = $1', [id]);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});