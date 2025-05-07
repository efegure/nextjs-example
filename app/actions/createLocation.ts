"use server";

import { prisma } from "@/lib/prisma";

export async function createLocation(data: {
  name: string;
  lat: number;
  long: number;
  ownerId: number;
}) {
  await prisma.location.create({ data });
}
