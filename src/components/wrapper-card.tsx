import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

type WrapperCardProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const WrapperCard: React.FC<WrapperCardProps> = ({
  children,
  className,
  style,
  ...props
}) => {
  return (
    <React.Fragment>
      <div
        className={cn(
          "rounded-full border border-neutral-10 bg-gradient-to-b from-brand-dark to-neutral-11",
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default WrapperCard;
