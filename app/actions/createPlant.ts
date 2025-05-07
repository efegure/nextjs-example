"use server";

import { prisma } from "@/lib/prisma";

export async function createPlant(data: {
  name: string;
  type: string;
  expectedHumidty: number;
  weeklyWaterNeedML: number;
  locationId: number;
  ownerId: number;
}) {
  await prisma.plant.create({ data });
}
