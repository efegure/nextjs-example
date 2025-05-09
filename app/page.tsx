import Link from "next/link";
import PlantTable from "./components/PlantTable";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className=" flex flex-col">
      <div className="flex flex-row px-6 py-3 gap-4">
        <Link href="/add-plant">
          <Button>Add Plant</Button>
        </Link>
        <Link href="/add-location">
          <Button>Add Location</Button>
        </Link>
      </div>
      <div className="p-20">
        <Suspense>
          <PlantTable></PlantTable>
        </Suspense>
      </div>
    </div>
  );
}
