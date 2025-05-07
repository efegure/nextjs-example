"use server";

import { prisma } from "@/lib/prisma";

export async function deleteLocation(id: number) {
  await prisma.location.delete({ where: { id } });
}
