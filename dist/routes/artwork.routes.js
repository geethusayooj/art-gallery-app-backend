"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../db/index"));
const router = (0, express_1.Router)();
// CREATE: Add a new artwork
router.post('/artworks', (req, res) => {
    const { title, artistId, year, price } = req.body;
    index_1.default.artwork.create({
        data: { title, artistId, year, price }
    })
        .then((response) => res.status(201).json(response))
        .catch((error) => {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create artwork' });
    });
});
// READ: Get all artworks
router.get('/artworks', (req, res) => {
    index_1.default.artwork.findMany({ include: { artist: true } })
        .then((artworks) => res.status(200).json(artworks))
        .catch((error) => {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to fetch artworks' });
    });
});
// READ: Get a specific artwork by ID
router.get('/artworks/:id', (req, res) => {
    index_1.default.artwork.findUnique({
        where: { id: req.params.id },
        include: { artist: true },
    })
        .then((artwork) => {
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.status(200).json(artwork);
    })
        .catch((error) => {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to fetch artwork' });
    });
});
// UPDATE: Update an artwork by ID
router.put('/artworks/:id', (req, res) => {
    const { title, artistId, year, price, status } = req.body;
    index_1.default.artwork.update({
        where: { id: req.params.id },
        data: { title, artistId, year, price },
    })
        .then((updatedArtwork) => res.status(200).json(updatedArtwork))
        .catch((error) => {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to update artwork' });
    });
});
// DELETE: Delete an artwork by ID
router.delete('/artworks/:id', (req, res) => {
    index_1.default.artwork.delete({ where: { id: req.params.id } })
        .then((deletedArtwork) => res.status(200).json(deletedArtwork))
        .catch((error) => {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to delete artwork' });
    });
});
exports.default = router;
