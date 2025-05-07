"use server";

import { prisma } from "@/lib/prisma";

export async function deletePlant(id: number) {
  await prisma.plant.delete({ where: { id } });
}
