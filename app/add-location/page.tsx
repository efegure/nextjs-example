import { Card } from "@/components/ui/card";
import { LocationForm } from "../components/LocationForm";
import Header from "../components/Header";

export default function LocationPage() {
  return (
    <div className="flex flex-row w-full h-full ">
      <Header></Header>
      <Card className="p-8 flex flex-col m-auto">
        <span className="font-bold text-xl">Add Location</span>
        <LocationForm></LocationForm>
      </Card>
    </div>
  );
}
