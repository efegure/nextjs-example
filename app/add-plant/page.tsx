import PlantForm from "../components/PlantForm";
import { Card } from "@/components/ui/card";
import Header from "../components/Header";

export const dynamic = "force-dynamic";

export default async function AddPlant() {
  // const users = await prisma.user.findMany();
  // const plants = await prisma.plant.findMany();

  return (
    <div className="flex flex-col w-full h-full ">
      <Header></Header>
      {/* {users.map((u) => (
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
      ))} */}
      <Card className="p-8 flex flex-col m-auto">
        <span className="font-bold text-xl">Add Plant</span>
        <PlantForm></PlantForm>
      </Card>
    </div>
  );
}
