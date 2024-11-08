import { FiPlus } from "react-icons/fi";
import { Button } from "./ui/button";
import Link from "next/link";

const AddButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link href={href} className="w-full flex justify-end my-10">
      <Button className="w-[200px] ml-auto" variant="outline">
        {text} <FiPlus />
      </Button>
    </Link>
  );
};

export default AddButton;
