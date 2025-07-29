"use client";

import { Button } from "~/components/ui/button";
import { ArrowRightIcon } from "~/components/ui/arrow-right";
import { useTheme } from "~/lib/theme-context";

interface ContactButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ContactButton({ onClick, size = "default", className }: ContactButtonProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Button
      variant="holographic"
      onClick={onClick}
      className={className}
      
    >
      <div className="flex items-center gap-2">
        Contact
        <ArrowRightIcon className="-rotate-45" />
      </div>
    </Button>
  );
} 