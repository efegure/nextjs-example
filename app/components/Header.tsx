import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-row mx-6 my-3">
      <Link href="/">
        <Button>Back</Button>
      </Link>
    </div>
  );
}
