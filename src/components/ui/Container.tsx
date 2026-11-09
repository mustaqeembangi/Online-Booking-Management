import type { ElementType, ReactNode } from "react";

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={`w-full px-[var(--gutter)] ${className}`}>
      {children}
    </Tag>
  );
}
