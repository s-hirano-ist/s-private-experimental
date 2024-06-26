type Props = {
	title: string;
	description: string;
};
export function Header({ title, description }: Props) {
	return (
		<header className="sticky top-0 z-50 w-full bg-primary p-4">
			<p className="text-2xl font-semibold">{title}</p>
			<p>{description}</p>
			{/* <nav>TODO: add dark mode toggle button</nav> */}
		</header>
	);
}
