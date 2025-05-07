"use server";

import { prisma } from "@/lib/prisma";

export async function updatePlant(
  data: {
    name: string;
    type: string;
    expectedHumidty: number;
    weeklyWaterNeedML: number;
    locationId: number;
    ownerId: number;
  },
  id: number
) {
  await prisma.plant.update({
    where: {
      id: id,
    },
    data,
  });
}
