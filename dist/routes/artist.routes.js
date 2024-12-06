"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../db/index"));
const router = (0, express_1.Router)();
// CREATE: Add a new artist
router.post('/artists', (req, res) => {
    const { name, bio, birthYear } = req.body;
    index_1.default.artist.create({
        data: { name, bio, birthYear },
    })
        .then((artist) => res.status(201).json(artist))
        .catch((error) => {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create artist' });
    });
});
// READ: Get all artists
router.get('/artists', (req, res) => {
    index_1.default.artist.findMany({
        include: { artworks: true }, // Include related artworks
    })
        .then((artists) => res.status(200).json(artists))
        .catch((error) => {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to fetch artists' });
    });
});
// READ: Get a specific artist by ID
router.get('/artists/:id', (req, res) => {
    index_1.default.artist.findUnique({
        where: { id: req.params.id },
        include: { artworks: true }, // Include related artworks
    })
        .then((artist) => {
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json(artist);
    })
        .catch((error) => {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to fetch artist' });
    });
});
exports.default = router;
