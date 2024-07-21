export function StatusCodeView({
	statusCode,
	statusMessage,
}: { statusCode: number; statusMessage: string }) {
	return (
		<div className="w-full p-2 text-center font-extrabold text-primary-grad">
			<div className="text-9xl">
				<span className="hidden font-light sm:inline">---</span>
				{String(statusCode)}
				<span className="hidden font-light sm:inline">---</span>
			</div>
			<div className="text-sm">------{statusMessage}------</div>
		</div>
	);
}
