import { Card } from "@/components/ui/card";
import { LocationForm } from "../components/LocationForm";
import Header from "../components/Header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LocationPage({
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
  const id = (await searchParams)?.id;
  const toBeEditedLocation = (await searchParams)?.id
    ? await prisma.location.findFirst({
        where: {
          id: {
            equals: parseInt(id as string),
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
