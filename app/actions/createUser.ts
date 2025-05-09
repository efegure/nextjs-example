"use server";

import { prisma } from "@/lib/prisma";

export async function createUser(data: { name: string; email: string }) {
  await prisma.user.create({ data });
}
