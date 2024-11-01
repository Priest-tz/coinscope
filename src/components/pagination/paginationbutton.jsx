export const PaginationButton = ({
	children,
	onClick,
	disabled,
	className,
}) => (
	<button
		onClick={onClick}
		disabled={disabled}
		className={`p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 ${className}`}>
		{children}
	</button>
);
