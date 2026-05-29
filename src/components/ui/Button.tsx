import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "nc-interactive nc-press inline-flex items-center justify-center rounded-lg font-medium",
        "disabled:opacity-50 disabled:active:transform-none",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        variant === "primary" &&
          "bg-[var(--color-brand)] text-white shadow-sm hover:bg-[var(--color-brand-dark)] hover:shadow-md",
        variant === "secondary" &&
          "border border-gray-300 bg-white hover:border-[var(--color-brand)]/30 hover:bg-[var(--color-brand-light)]/40",
        variant === "ghost" && "text-gray-600 hover:bg-gray-100",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
