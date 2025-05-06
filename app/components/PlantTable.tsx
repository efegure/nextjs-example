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

export default async function PlantTable() {
  const plants = await prisma.plant.findMany();

  return (
    <Card className="flex flex-col gap-5 p-8">
      <span className="text-xl font-bold">My Plants</span>

      <Table>
        <TableCaption>A list of your plants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Weekly Water Need(ML)</TableHead>
            <TableHead>Expected Humidity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plants.map((plant) => (
            <TableRow key={plant.id}>
              <TableCell className="font-medium">{plant.id}</TableCell>
              <TableCell>{plant.type}</TableCell>
              <TableCell>{plant.weeklyWaterNeedML}</TableCell>
              <TableCell className="text-right">
                {plant.expectedHumidty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
