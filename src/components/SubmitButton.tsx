import { ArrowRight, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { BottomGradient } from "./BottomGradient";

const SubmitButton = ({
  loading,
  children,
}: {
  loading: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <Button
      disabled={loading}
      className="bg-gradient-to-br relative group/btn from-black dark:from-black dark:to-black to-neutral-600 dark:bg-black w-full text-white gap-2 items-center justify-center flex rounded-md h-10 font-medium max-w-32 ml-auto"
    >
      {children || "Submit"}
      {loading ? (
        <Loader size={22} className="animate-spin" />
      ) : (
        <ArrowRight size={22} />
      )}
      <BottomGradient />
    </Button>
  );
};

export default SubmitButton;
