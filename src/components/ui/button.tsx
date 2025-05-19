import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-none shadow-[inset_0_0_10px_rgba(255,255,255,0.3)]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]",
        outline: "bg-background text-foreground hover:bg-accent hover:text-accent-foreground shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-none",
        link: "text-primary underline-offset-4 hover:underline shadow-none",
        mini: "h-8 p-0 bg-transparent shadow-none",
        gradient:
          "bg-[linear-gradient(45deg,var(--gradient-lime),var(--gradient-ocean),var(--gradient-wine),var(--gradient-rust))] animate-gradient-flow text-white",
        holographic:
          "relative text-black bg-white overflow-hidden shadow-[inset_0_0_10px_rgba(255,255,255,0.7)] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_0%_0%,theme(colors.holographic.teal)_0%,transparent_50%)] after:absolute after:inset-0 after:-z-10 after:bg-[radial-gradient(circle_at_100%_0%,theme(colors.holographic.blue)_0%,transparent_50%)] [&>span]:absolute [&>span]:inset-0 [&>span:-z-10] [&>span:nth-child(1)]:bg-[radial-gradient(circle_at_0%_100%,theme(colors.holographic.pink)_0%,transparent_50%)] [&>span:nth-child(2)]:bg-[radial-gradient(circle_at_100%_100%,theme(colors.holographic.purple)_0%,transparent_50%)]",
        holographicDark:
          "relative text-white bg-gray-900/80 overflow-hidden shadow-[inset_0_0_10px_rgba(255,255,255,0.15)] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_0%_0%,theme(colors.holographic.darkTeal)_0%,transparent_70%)] after:absolute after:inset-0 after:-z-10 after:bg-[radial-gradient(circle_at_100%_0%,theme(colors.holographic.darkBlue)_0%,transparent_70%)] [&>span]:absolute [&>span]:inset-0 [&>span:-z-10] [&>span:nth-child(1)]:bg-[radial-gradient(circle_at_0%_100%,theme(colors.holographic.darkPink)_0%,transparent_70%)] [&>span:nth-child(2)]:bg-[radial-gradient(circle_at_100%_100%,theme(colors.holographic.darkPurple)_0%,transparent_70%)]",
      },
      effect: {
        expandIcon: "group gap-0 relative",
        ringHover:
          "transition-all duration-300 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2",
        shine:
          "before:animate-shine relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat background-position_0s_ease",
        shineHover:
          "relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] before:duration-1000",
        gooeyRight:
          "relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-white/40 before:transition-transform before:duration-1000  hover:before:translate-x-[0%] hover:before:translate-y-[0%]",
        gooeyLeft:
          "relative z-0 overflow-hidden transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l from-white/40 after:transition-transform after:duration-1000  hover:after:translate-x-[0%] hover:after:translate-y-[0%]",
        underline:
          "relative !no-underline after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300",
        hoverUnderline:
          "relative !no-underline after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300",
        gradientSlideShow:
          "bg-[size:400%] bg-[linear-gradient(-45deg,var(--gradient-lime),var(--gradient-ocean),var(--gradient-wine),var(--gradient-rust))] animate-gradient-flow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface IconProps {
  icon: React.ElementType;
  iconPlacement: "left" | "right";
}

interface IconRefProps {
  icon?: never;
  iconPlacement?: undefined;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export type ButtonIconProps = IconProps | IconRefProps;

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonIconProps
>(
  (
    {
      className,
      variant,
      effect,
      size,
      icon: Icon,
      iconPlacement,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Add extra spans for the holographic variant to hold the bottom gradients
    const holographicSpans =
      variant === "holographic" ? (
        <>
          <span></span>
          <span></span>
        </>
      ) : null;

    return (
      <Comp
        className={cn(buttonVariants({ variant, effect, size, className }))}
        ref={ref}
        {...props}
      >
        {holographicSpans}
        {Icon &&
          iconPlacement === "left" &&
          (effect === "expandIcon" ? (
            <div className="group-hover:translate-x-100 w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:pr-2 group-hover:opacity-100">
              <Icon />
            </div>
          ) : (
            <Icon />
          ))}
        <Slottable>{props.children}</Slottable>
        {Icon &&
          iconPlacement === "right" &&
          (effect === "expandIcon" ? (
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
              <Icon />
            </div>
          ) : (
            <Icon />
          ))}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
