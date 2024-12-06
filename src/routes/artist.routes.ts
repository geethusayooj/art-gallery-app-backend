import { Request, Response } from 'express';
import { Router } from 'express';
import prisma from '../db/index'; 

const router = Router();

// CREATE: Add a new artist
router.post('/artists', (req: Request, res: Response) => {
  const { name, bio, birthYear } = req.body;

  prisma.artist.create({
    data: { name, bio, birthYear },
  })
    .then((artist: any) => res.status(201).json(artist))
    .catch((error: Error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Failed to create artist' });
    });
});

// READ: Get all artists
router.get('/artists', (req: Request, res: Response) => {
  prisma.artist.findMany({
    include: { artworks: true }, // Include related artworks
  })
    .then((artists: any[]) => res.status(200).json(artists))
    .catch((error: Error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Failed to fetch artists' });
    });
});

// READ: Get a specific artist by ID
router.get('/artists/:id', (req: Request, res: Response) => {
  prisma.artist.findUnique({
    where: { id: req.params.id },
    include: { artworks: true }, // Include related artworks
  })
    .then((artist: any) => {
      if (!artist) {
        return res.status(404).json({ message: 'Artist not found' });
      }
      res.status(200).json(artist);
    })
    .catch((error: Error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Failed to fetch artist' });
    });
});



export default router;
