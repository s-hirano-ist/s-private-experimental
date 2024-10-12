import { getProfile } from "@/apis/prisma/fetch-profile";
import { DumpCard } from "@/components/stack/dump-card";
import { StatusCodeView } from "@/components/status-code-view";
import { Separator } from "@/components/ui/separator";

type Props = {
	username: string;
};

export async function ProfileContents({ username }: Props) {
	try {
		const { News, Contents } = await getProfile(username);

		return (
			<>
				<p className="px-6 pt-2 font-bold text-primary">NEWS</p>
				{News.length === 0 ? (
					<StatusCodeView statusCode="204" />
				) : (
					<div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
						{News.map((d) => {
							return (
								<DumpCard
									key={d.id}
									id={d.id}
									title={d.title}
									quote={d.quote}
									url={d.url}
									category={d.Category.name}
								/>
							);
						})}
					</div>
				)}
				<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
				<p className="px-6 pt-2 font-bold text-primary">NOTES</p>
				{Contents.length === 0 ? (
					<StatusCodeView statusCode="204" />
				) : (
					<div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
						{Contents.map((d) => {
							return (
								<DumpCard
									key={d.id}
									id={d.id}
									title={d.title}
									quote={d.quote}
									url={d.url}
								/>
							);
						})}
					</div>
				)}
			</>
		);
	} catch (error) {
		console.error("Unexpected error.", error);
		return (
			<div className="flex flex-col items-center">
				<StatusCodeView statusCode="500" />
			</div>
		);
	}
}
