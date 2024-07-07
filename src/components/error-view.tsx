export function ErrorView() {
	return (
		<div className="m-4 p-2 text-center font-extrabold text-primary-grad ring ring-primary-grad">
			<div className="text-9xl">
				<span className="font-light">---</span>
				500
				<span className="font-light">---</span>
			</div>
			<div className="text-sm">------Internal server error------</div>
		</div>
	);
}
