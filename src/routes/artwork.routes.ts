import { Request, Response } from 'express';
import { Router } from 'express';
import prisma from '../db/index'; 

const router = Router();

// CREATE: Add a new artwork
router.post('/artworks', (req: Request, res: Response) => {
  const { title, artistId, year, price, imageUrl } = req.body;

  prisma.artwork.create({ 
    data: { title, artistId, year, price, imageUrl } 
  })
    .then((response: any) => res.status(201).json(response))
    .catch((error: Error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Failed to create artwork' });
    });
});

// READ: Get all artworks
router.get('/artworks', (req: Request, res: Response) => {
  prisma.artwork.findMany({ include: { artist: true } })
    .then((artworks: any[]) => res.status(200).json(artworks))
    .catch((error: Error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Failed to fetch artworks' });
    });
});

// READ: Get a specific artwork by ID
router.get('/artworks/:id', (req: Request, res: Response) => {
  prisma.artwork.findUnique({
    where: { id: req.params.id },
    include: { artist: true },
  })
    .then((artwork: any) => {
      if (!artwork) {
        return res.status(404).json({ message: 'Artwork not found' });
      }
      res.status(200).json(artwork);
    })
    .catch((error: Error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Failed to fetch artwork' });
    });
});

// UPDATE: Update an artwork by ID
router.put('/artworks/:id', (req: Request, res: Response) => {
  const { title, artistId, year, price, status, imageUrl } = req.body;

  prisma.artwork.update({
    where: { id: req.params.id },
    data: { title, artistId, year, price, imageUrl},
  })
    .then((updatedArtwork: any) => res.status(200).json(updatedArtwork))
    .catch((error: Error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Failed to update artwork' });
    });
});

// DELETE: Delete an artwork by ID
router.delete('/artworks/:id', (req: Request, res: Response) => {
  prisma.artwork.delete({ where: { id: req.params.id } })
    .then((deletedArtwork: any) => res.status(200).json(deletedArtwork))
    .catch((error: Error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Failed to delete artwork' });
    });
});

export default router;
