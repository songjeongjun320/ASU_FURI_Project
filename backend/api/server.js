const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const config = {
    server: 'DESKTOP-6R7ARLC,1433', 
    database: 'container_management',
    options: {
      encrypt: true,
      trustServerCertificate: true,
      instanceName: 'SQLEXPRESS'
    },
    driver: 'msnodesqlv8',
    trustedConnection: true
  };


// Connect database
sql.connect(config).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.error("Database connection failed:", err);
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Container Management API');
});

// GET all containers
app.get('/api/containers', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM containers`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching containers' });
    }
});

// GET a specific container
app.get('/api/containers/:number', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM containers WHERE number = ${req.params.number}`;
        if (result.recordset.length === 0) {
            res.status(404).json({ error: 'Container not found' });
        } else {
            res.json(result.recordset[0]);
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching container' });
    }
});

// POST a new container
app.post('/api/containers', async (req, res) => {
    const { number, date, time, inOut, size, driver } = req.body;
    try {
        const result = await sql.query`
            INSERT INTO containers (number, date, time, inOut, size, driver)
            VALUES (${number}, ${date}, ${time}, ${inOut}, ${size}, ${driver});
            SELECT SCOPE_IDENTITY() AS id;
        `;
        res.status(201).json({ id: result.recordset[0].id, ...req.body });
    } catch (err) {
        res.status(500).json({ error: 'Error creating container' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
