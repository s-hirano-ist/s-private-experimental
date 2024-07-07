export function ErrorView() {
	return (
		<div className="w-full p-2 text-center font-extrabold text-primary-grad ring ring-primary-grad">
			<div className="text-9xl">
				<span className="hidden font-light sm:inline">---</span>
				500
				<span className="hidden font-light sm:inline">---</span>
			</div>
			<div className="text-sm">------Internal server error------</div>
		</div>
	);
}
