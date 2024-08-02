// routes/containerRoutes.js
const express = require('express');
const router = express.Router();
const sql = require('mssql/msnodesqlv8');

// GET all containers
router.get('/', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM containers`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching containers' });
    }
});

// GET a specific container
router.get('/:number', async (req, res) => {
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

module.exports = router;
