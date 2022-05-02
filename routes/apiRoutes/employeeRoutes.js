const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/employees', (req, res) => {
    const sql = `SELECT employees.*, roles.title AS job_title, roles.salary, departments.name AS department_name, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    JOIN employees manager ON employees.manager_id = manager.id;
    `;
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