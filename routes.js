const express = require('express');
const router = express.Router();
const pool = require('./db');
const { body, query, validationResult } = require('express-validator');


router.post(
    '/addSchool',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('address').notEmpty().withMessage('Address is required'),
        body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
        body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, address, latitude, longitude } = req.body;
        try {
            await pool.query(
                'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
                [name, address, latitude, longitude]
            );
            res.json({ message: 'School added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        }
    }
);

// List Schools API
router.get(
    '/listSchools',
    [
        query('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude required'),
        query('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { lat, lng } = req.query;
        try {
            const [rows] = await pool.query(
                `SELECT *,
                (6371 * acos(
                    cos(radians(?)) * cos(radians(latitude)) *
                    cos(radians(longitude) - radians(?)) +
                    sin(radians(?)) * sin(radians(latitude))
                )) AS distance
                FROM schools
                ORDER BY distance ASC`,
                [lat, lng, lat]
            );
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        }
    }
);

module.exports = router;
