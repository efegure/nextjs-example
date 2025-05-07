"use client";
import { Button } from "@/components/ui/button";
import { deletePlant } from "../actions/deletePlant";
import { useRouter } from "next/navigation";

export default function DeletePlantButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <Button
      className="text-xs bg-red-600"
      onClick={() => {
        deletePlant(id);
        // bad way to do it :(
        router.refresh();
      }}
    >
      Delete
    </Button>
  );
}
