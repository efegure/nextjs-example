import { prisma } from "@/lib/prisma";
import PlantForm from "../components/PlantForm";

export const dynamic = "force-dynamic";

export default async function AddPlant() {
  const users = await prisma.user.findMany();
  const plants = await prisma.plant.findMany();

  return (
    <div>
      add-plant page
      {users.map((u) => (
        <div key={u.id}>
          {u.email}
          {u.name}
        </div>
      ))}
      {plants.map((p) => (
        <div key={p.id}>
          {p.expectedHumidty}
          {p.locationId}
          {p.name}
          {p.type}
        </div>
      ))}
      <PlantForm></PlantForm>
    </div>
  );
}
