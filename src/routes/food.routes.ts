import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
import { prisma } from '../prisma';

export const foodRouter = Router();

//foods/
foodRouter.get('/', requireAuth, async (req, res) => {
  const search = String(req.query.search ?? '');
  const foods = await prisma.food.findMany({
    where: {
      userId: req.userId!,
      name: {
        contains: search,
      }
    },
    take: 10,
    orderBy: {
      name: 'asc',
    },
  });

  return res.json(foods);
});


foodRouter.post('/', requireAuth, async (req, res) => {
  const {
    name,
    caloriesPer100g,
    carbsPer100g,
    proteinPer100g,
    fatPer100g,
  } = req.body;

  if (
    !name ||
    caloriesPer100g < 0 ||
    carbsPer100g < 0 ||
    proteinPer100g < 0 ||
    fatPer100g < 0
  ) {
    return res.status(400).json({
      error: "Dados inválidos para cadastro do alimento"
    });
  }

  const food = await prisma.food.create({
    data: {
      name,
      caloriesPer100g,
      carbsPer100g,
      proteinPer100g,
      fatPer100g,
      userId: req.userId!,
    },
  });

  return res.status(201).json(food);
});

foodRouter.put('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);

  const {
    name,
    caloriesPer100g,
    carbsPer100g,
    proteinPer100g,
    fatPer100g,
  } = req.body;


  if (
    !name ||
    caloriesPer100g < 0 ||
    carbsPer100g < 0 ||
    proteinPer100g < 0 ||
    fatPer100g < 0
  ) {
    return res.status(400).json({
      error: "Dados inválidos para atualização do alimento"
    });
  }


  const food = await prisma.food.findFirst({
    where: {
      id,
      userId: req.userId!,
    },
  });


  if (!food) {
    return res.status(404).json({
      error: "Alimento não encontrado"
    });
  }


  const updatedFood = await prisma.food.update({
    where: {
      id,
    },
    data: {
      name,
      caloriesPer100g,
      carbsPer100g,
      proteinPer100g,
      fatPer100g,
    },
  });


  return res.json(updatedFood);
});