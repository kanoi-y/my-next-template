import { cn } from "@my-next-template/ui/lib/utils";
import type * as React from "react";

type LabelProps = React.ComponentProps<"label"> & {
	htmlFor: string;
	"aria-label"?: string;
};

function Label({
	className,
	htmlFor,
	"aria-label": ariaLabel,
	...props
}: LabelProps) {
	return (
		<label
			aria-label={ariaLabel}
			className={cn(
				"flex select-none items-center gap-2 text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
				className
			)}
			data-slot="label"
			htmlFor={htmlFor}
			{...props}
		/>
	);
}

export { Label };
