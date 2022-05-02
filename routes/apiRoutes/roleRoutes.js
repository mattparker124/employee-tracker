const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/roles', (req, res) => {
    const sql = `SELECT roles.*, departments.name
                AS department_name
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;