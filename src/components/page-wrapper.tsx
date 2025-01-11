import { cn } from "@/lib/utils";
import React from "react";

const PageWrapper = ({
  children,
  className,
  style,
  ...props
}: React.ComponentPropsWithoutRef<"main">) => {
  return (
    <main
      className={cn(
        "grow xs:border-x-[1px] border-neutral-11 max-w-[708px] relative min-h-screen",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </main>
  );
};

export default PageWrapper;
