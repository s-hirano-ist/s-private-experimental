import { SmallCard } from "@/components/stack/small-card";
import { StatusCodeView } from "@/components/status-code-view";
import { Separator } from "@/components/ui/separator";
import { ERROR_MESSAGES } from "@/constants";
import { NotAllowedError } from "@/error-classes";
import { getUserId } from "@/features/auth/utils/get-session";
import { loggerError } from "@/pino";
import prisma from "@/prisma";

// accessed path's username.scope === private || user's own page
async function getNewsAndContents(username: string) {
	const userId = await getUserId();

	const user = await prisma.users.findUniqueOrThrow({ where: { id: userId } });
	if (user.role === "UNAUTHORIZED") throw new NotAllowedError();

	const newsAndContents = await prisma.users.findUniqueOrThrow({
		where: { username },
		select: {
			scope: true,
			News: {
				select: {
					id: true,
					title: true,
					quote: true,
					url: true,
					Category: { select: { name: true } },
				},
			},
			Contents: {
				select: {
					id: true,
					title: true,
					quote: true,
					url: true,
				},
			},
		},
	});
	if (newsAndContents.scope === "PRIVATE" && username !== user.username)
		throw new NotAllowedError();

	return newsAndContents;
}

type Props = {
	username: string;
};

export async function ProfileContents({ username }: Props) {
	try {
		const { News, Contents } = await getNewsAndContents(username);

		return (
			<>
				<p className="px-6 pt-2 font-bold text-primary">NEWS</p>
				{News.length === 0 ? (
					<StatusCodeView statusCode="204" />
				) : (
					<div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
						{News.map((d) => {
							return (
								<SmallCard
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
								<SmallCard
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
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "ProfileContents",
				status: 500,
			},
			error,
		);
		return (
			<div className="flex flex-col items-center">
				<StatusCodeView statusCode="500" />
			</div>
		);
	}
}
