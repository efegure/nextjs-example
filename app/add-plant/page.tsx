import PlantForm from "../components/PlantForm";
import { Card } from "@/components/ui/card";
import Header from "../components/Header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AddPlant({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Assume you are Bob
  const currentUser = await prisma.user.findFirst({
    where: {
      name: {
        equals: "Bob",
      },
    },
  });
  const locations = await prisma.location.findMany({
    where: {
      ownerId: {
        equals: currentUser?.id,
      },
    },
  });

  const toBeEditedPlant = (await searchParams)?.id
    ? await prisma.plant.findFirst({
        where: {
          id: {
            equals: parseInt((await searchParams)?.id as string),
          },
        },
      })
    : null;

  return (
    <div className="flex flex-col w-full h-full ">
      <Header></Header>
      {/* {users.map((u) => (
        <div key={u.id}>
          {u.email}
          {u.name}
        </div>
      ))} */}
      {/* {plants.map((p) => (
        <div key={p.id}>
          {p.expectedHumidty}
          {p.locationId}
          {p.name}
          {p.type}
        </div>
      ))} */}
      <Card className="p-8 flex flex-col m-auto">
        <span className="font-bold text-xl">Add Plant</span>
        <PlantForm
          locations={locations}
          currentUserId={currentUser?.id ?? 0}
          toBeEdited={toBeEditedPlant}
        ></PlantForm>
      </Card>
    </div>
  );
}
