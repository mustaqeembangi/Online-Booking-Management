import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props {
  href?: string;
  variant?: "primary" | "outline" | "ink";
  size?: "md" | "lg";
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  external?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  disabled?: boolean;
}

const variants = {
  primary: "bg-brand text-ink hover:bg-[#82cd58]",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  ink: "bg-ink text-white hover:bg-[#1f3329]",
};
const sizes = { md: "h-11 px-5 text-[15px]", lg: "h-14 px-7 text-base" };

export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  external,
  type = "button",
  onClick,
  disabled,
}: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <>
      {icon}
      {children}
    </>
  );
  if (href) {
    const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
    return isExternal ? (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
