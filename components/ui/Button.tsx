import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({ children, variant = "primary", size = "lg", className = "", onClick, href, type }: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 select-none pointer-events-auto";

  const sizeStyles = {
    sm: "h-8 px-4 text-xs font-semibold max-h-8",
    md: "h-10 lg:h-9 px-5 text-sm font-semibold max-h-10 lg:max-h-9",
    lg: "h-11 lg:h-10 px-6 text-sm font-semibold max-h-[44px] lg:max-h-10",
  };

  const variantStyles = {
    primary: "bg-brand-accent hover:bg-brand-mid text-white hover:shadow-lg",
    secondary: "border-2 border-brand-accent hover:bg-brand-accent/5 text-brand-accent bg-transparent",
    dark: "bg-brand-accent hover:bg-brand-mid text-white hover:shadow-lg",
    outline: "border border-brand-accent/30 hover:bg-brand-accent/5 text-brand-accent",
  };

  const classes = `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
