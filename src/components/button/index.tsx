import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-[4px] gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    {
        variants: {
            intent: {
                primary: 'text-white bg-main400 hover:bg-main500 focus:ring-main500',
                secondary: 'text-main300 border border-1 border-main300 bg-transparent hover:transparent focus:ring-main300',
                tertiary: 'text-main300 bg-transparent hover:transparent focus:ring-main300',
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-5 text-sm",
                lg: "h-11 px-8 text-base min-w-[140px]",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            intent: 'primary',
            size: 'default',
        }
    }
)

interface ButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    disabled?: boolean,
}

interface Props extends ButtonProps, VariantProps<typeof buttonVariants> { }

export const Button = ({ children, ...props }: Props) => {

    const handleClick = () => {
        if (props.disabled) return;
        if (props.onClick) props.onClick();
    }

    return (
        <button className={buttonVariants(props)} onClick={handleClick}>
            {children}
        </button>
    )
}