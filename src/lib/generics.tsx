"use client";

import React, { useRef, useState } from "react";

type ButtonProps = {
  style: React.CSSProperties;
  // children: JSX.Element;
  children: React.ReactNode;
  className: string;
  // borderRadius: {
  //   topLeft: number;
  //   topRight: number;
  //   bottomRight: number;
  //   bottomLeft: number;
  // };
  borderRadius: Record<string, number>;
  onClick: (test: string) => number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  type: "submit" | "button" | "reset" | undefined;
  autoFocus: boolean;
};

type ButtonProps2 = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

function Button({
  style,
  children,
  className,
  borderRadius,
  onClick,
  setCount,
  type,
  autoFocus,
  ...rest
}: ButtonProps) {
  return (
    <button
      style={style}
      className={className}
      onClick={() => {
        setCount((prev) => prev + 1);
        return onClick("Sadiq");
      }}
      type={type}
      autoFocus={autoFocus}
      {...rest}
    >
      {children}
    </button>
  );
}

type User = {
  name: string;
  age: number;
};

function Button2({
  type,
  autoFocus,
  children,
  variant,
  ...rest
}: ButtonProps2) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const name = user?.name;

  return (
    <button type={type} autoFocus={autoFocus} ref={ref} {...rest}>
      {children}
    </button>
  );
}

function Home() {
  const onClick = (test: string) => 5;
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen flex justify-center items-center">
      <Button
        style={{
          backgroundColor: "blue",
          fontSize: 24,
          color: "white",
          padding: "1rem 2rem",
          borderRadius: 8,
          borderColor: "transparent",
        }}
        borderRadius={{
          topLeft: 5,
          topRight: 5,
          bottomRight: 10,
          bottomLeft: 10,
        }}
        className=""
        onClick={onClick}
        setCount={setCount}
        type="submit"
        autoFocus={true}
      >
        Click Me!
      </Button>
    </main>
  );
}

const buttonTextOptions = [
  "Click Me",
  "Click me Again!",
  "Click me one more time!",
] as const;

type Session = {
  sessionId: string;
  fullname: string;
  phoneNum: string;
  selfie: string;
};

type Guest = Omit<Session, "phoneNum">;

// use ts-reset
