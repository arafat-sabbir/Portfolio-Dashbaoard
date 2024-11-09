import { ReactNode } from "react";

const Container = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default Container;
