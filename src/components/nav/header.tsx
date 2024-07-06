import Image from "next/image";

type Props = {
	title: string;
	description: string;
};

export function Header({ title, description }: Props) {
	return (
		<header className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary to-primary-grad p-4 text-white">
			<div className="flex justify-start gap-4">
				<Image src="/apple-icon.png" width={50} height={50} alt="Icon" />
				<div>
					<p className="text-2xl font-semibold">{title}</p>
					<p>{description}</p>
				</div>
				{/* <nav>TODO: add dark mode toggle button</nav> */}
			</div>
		</header>
	);
}
