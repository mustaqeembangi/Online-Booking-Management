import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props {
  href?: string;
  variant?: "primary" | "outline" | "ink" | "white" | "glass";
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
  primary: "bg-brand text-ink hover:bg-white",
  outline: "border border-ink/25 text-ink hover:bg-ink hover:text-white hover:border-ink",
  ink: "bg-ink text-white hover:bg-brand hover:text-ink",
  white: "bg-white text-ink hover:bg-brand",
  glass: "glass text-white hover:bg-white hover:text-ink",
};
const sizes = { md: "h-12 px-6 text-[15px]", lg: "h-14 px-8 text-base" };

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
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.97] disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;
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
