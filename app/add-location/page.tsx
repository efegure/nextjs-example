import { Card } from "@/components/ui/card";
import { LocationForm } from "../components/LocationForm";
import Header from "../components/Header";
import { prisma } from "@/lib/prisma";

export default async function LocationPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  // Assume you are Bob
  const currentUser = await prisma.user.findFirst({
    where: {
      name: {
        equals: "Bob",
      },
    },
  });

  const toBeEditedLocation = (await searchParams?.id)
    ? await prisma.location.findFirst({
        where: {
          id: {
            equals: parseInt(searchParams?.id),
          },
        },
      })
    : null;

  return (
    <div className="flex flex-row w-full h-full ">
      <Header></Header>
      <Card className="p-8 flex flex-col m-auto">
        <span className="font-bold text-xl">Add Location</span>
        <LocationForm
          currentUserId={currentUser?.id ?? 0}
          toBeEdited={toBeEditedLocation}
        ></LocationForm>
      </Card>
    </div>
  );
}
