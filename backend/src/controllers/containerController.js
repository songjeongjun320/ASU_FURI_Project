const sql = require('mssql/msnodesqlv8');

const getAllContainers = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM containers`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching containers' });
  }
};

const getContainerByNumber = async (req, res) => {
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
};

const createContainer = async (req, res) => {
  const { number, date, time, inOut, size, driver } = req.body;
  try {
    const result = await sql.query`
      INSERT INTO containers (number, date, time, inOut, size, driver)
      VALUES (${number}, ${date}, ${time}, ${inOut}, ${size}, ${driver})
    `;
    const insertedResult = await sql.query`SELECT SCOPE_IDENTITY() AS id`;
    res.status(201).json({ id: insertedResult.recordset[0].id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: 'Error creating container' });
  }
};

module.exports = { getAllContainers, getContainerByNumber, createContainer };
