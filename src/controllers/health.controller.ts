import { Request, Response } from "express";
import { prisma } from "../prisma";
import { validateHealthData } from "../validators/health.validator";


export async function createHealthData(
  req: Request,
  res: Response
) {

  const error = validateHealthData(req.body);

  if (error) {
    return res.status(400).json({
      error
    });
  }


  const healthData = await prisma.healthData.create({
    data: {
      targetDietDaily: req.body.targetDietDaily,
      levelActivity: req.body.levelActivity,
      userId: req.userId!
    }
  });


  return res.status(201).json(healthData);
}



export async function getHealthData(
  req: Request,
  res: Response
) {

  const healthData = await prisma.healthData.findFirst({
    where: {
      userId: req.userId!,
      isActive:true
    }
  });


  return res.json(healthData);
}

export async function updateHealthData(
  req: Request,
  res: Response
) {
  const error = validateHealthData(req.body);

  if (error) {
    return res.status(400).json({
      error,
    });
  }

  const healthData = await prisma.healthData.findFirst({
    where: {
      userId: req.userId!,
      isActive: true,
    },
  });

  if (!healthData) {
    return res.status(404).json({
      error: "Dados de saúde não encontrados",
    });
  }

  const updated = await prisma.healthData.update({
    where: {
      id: healthData.id,
    },
    data: {
      targetDietDaily: req.body.targetDietDaily,
      levelActivity: req.body.levelActivity,
    },
  });

  return res.json(updated);
}
