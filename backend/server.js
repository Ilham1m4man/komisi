// Import dependencies
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sales_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Create table perhitungan if not exists
const createPerhitunganTable = `
    CREATE TABLE IF NOT EXISTS perhitungan (
        id INT AUTO_INCREMENT PRIMARY KEY,
        marketing VARCHAR(255) NOT NULL,
        bulan VARCHAR(7) NOT NULL,
        omzet INT NOT NULL,
        commission_percent FLOAT NOT NULL,
        commission_nominal INT NOT NULL
    );
`;
db.query(createPerhitunganTable, err => {
    if (err) console.error('Error creating perhitungan table:', err);
});

// Function to calculate commission and insert into perhitungan table
const calculateCommission = () => {
    const query = `
        INSERT INTO perhitungan (marketing, bulan, omzet, commission_percent, commission_nominal)
        SELECT m.name AS marketing, DATE_FORMAT(p.date, '%Y-%m') AS bulan,
               SUM(p.grand_total) AS omzet,
               CASE 
                   WHEN SUM(p.grand_total) >= 500000000 THEN 10
                   WHEN SUM(p.grand_total) >= 200000000 THEN 5
                   WHEN SUM(p.grand_total) >= 100000000 THEN 2.5
                   ELSE 0
               END AS commission_percent,
               (SUM(p.grand_total) * (CASE 
                   WHEN SUM(p.grand_total) >= 500000000 THEN 10
                   WHEN SUM(p.grand_total) >= 200000000 THEN 5
                   WHEN SUM(p.grand_total) >= 100000000 THEN 2.5
                   ELSE 0
               END) / 100) AS commission_nominal
        FROM penjualan p
        JOIN marketing m ON p.marketing_Id = m.id
        GROUP BY m.name, bulan;
    `;

    db.query(query, err => {
        if (err) console.error('Error calculating commission:', err);
    });
};

// Route to get commission per marketing per month
app.get('/api/commission', (req, res) => {
    const query = `SELECT * FROM perhitungan`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching commission data:', err);
            res.status(500).json({ error: 'Database query failed' });
        } else {
            res.json(results);
        }
    });
});

// CRUD Routes for Marketing
app.post('/api/marketing', (req, res) => {
    const { name } = req.body;
    const query = `INSERT INTO marketing (name) VALUES (?)`;
    db.query(query, [name], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database insert failed' });
        } else {
            res.json({ message: 'Marketing added successfully', id: result.insertId });
        }
    });
});

app.get('/api/marketing', (req, res) => {
    const query = `SELECT * FROM marketing`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
        } else {
            res.json(results);
        }
    });
});

app.put('/api/marketing/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const query = `UPDATE marketing SET name = ? WHERE id = ?`;
    db.query(query, [name, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Database update failed' });
        } else {
            res.json({ message: 'Marketing updated successfully' });
        }
    });
});

app.delete('/api/marketing/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM marketing WHERE id = ?`;
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Database delete failed' });
        } else {
            res.json({ message: 'Marketing deleted successfully' });
        }
    });
});

// CRUD Routes for Sales
app.post('/api/sales', (req, res) => {
    const { transaction_number, marketing_Id, date, cargo_fee, total_balance, grand_total } = req.body;
    const query = `INSERT INTO penjualan (transaction_number, marketing_Id, date, cargo_fee, total_balance, grand_total) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [transaction_number, marketing_Id, date, cargo_fee, total_balance, grand_total], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database insert failed' });
        } else {
            calculateCommission();
            res.json({ message: 'Sale recorded successfully', id: result.insertId });
        }
    });
});

app.get('/api/sales', (req, res) => {
    const query = `SELECT * FROM penjualan`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
        } else {
            res.json(results);
        }
    });
});

app.put('/api/sales/:id', (req, res) => {
    const { transaction_number, marketing_Id, date, cargo_fee, total_balance, grand_total } = req.body;
    const { id } = req.params;
    const query = `UPDATE penjualan SET transaction_number = ?, marketing_Id = ?, date = ?, cargo_fee = ?, total_balance = ?, grand_total = ? WHERE id = ?`;
    db.query(query, [transaction_number, marketing_Id, date, cargo_fee, total_balance, grand_total, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Database update failed' });
        } else {
            calculateCommission();
            res.json({ message: 'Sale updated successfully' });
        }
    });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
