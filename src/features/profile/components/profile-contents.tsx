import { getUnexportedContents } from "@/apis/prisma/fetch-contents";
import { getUnexportedNews } from "@/apis/prisma/fetch-news";
import { DumpCard } from "@/components/stack/dump-card";
import { StatusCodeView } from "@/components/status-code-view";
import { Separator } from "@/components/ui/separator";

export async function ProfileContents() {
	try {
		const unexportedNews = await getUnexportedNews();
		const unexportedContents = await getUnexportedContents();

		return (
			<>
				<p className="font-bold px-6 pt-2 text-primary">NEWS</p>
				{unexportedNews.length === 0 ? (
					<StatusCodeView statusCode="204" />
				) : (
					<div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
						{unexportedNews.map((d) => {
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
				<p className="font-bold px-6 pt-2 text-primary">NOTES</p>
				{unexportedContents.length === 0 ? (
					<StatusCodeView statusCode="204" />
				) : (
					<div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
						{unexportedContents.map((d) => {
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
