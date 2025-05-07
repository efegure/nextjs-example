import { Card } from "@/components/ui/card";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeletePlantButton from "./DeletePlantButton";

export default async function PlantTable() {
  const plants = await prisma.plant.findMany();

  return (
    <Card className="flex flex-col gap-5 p-8">
      <span className="text-xl font-bold">My Plants</span>

      <Table>
        <TableCaption>A list of your plants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead className="text-center">Weekly Water Need(ML)</TableHead>
            <TableHead className="text-center">Expected Humidity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plants.map((plant) => (
            <TableRow key={plant.id}>
              <TableCell className="font-medium">{plant.id}</TableCell>
              <TableCell className="font-medium">{plant.name}</TableCell>
              <TableCell>{plant.type}</TableCell>
              <TableCell className="text-center">
                {plant.weeklyWaterNeedML}
              </TableCell>
              <TableCell className="text-center">
                {plant.expectedHumidty}
              </TableCell>
              <TableCell className="text-center">
                {plant.expectedHumidty}
              </TableCell>
              <TableCell className="text-center">
                <Link href={"/add-plant?id=" + plant.id}>Edit</Link>
              </TableCell>
              <TableCell className="text-center">
                <DeletePlantButton id={plant.id}></DeletePlantButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
