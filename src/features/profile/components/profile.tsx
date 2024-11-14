import { StatusCodeView } from "@/components/status-code-view";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ERROR_MESSAGES } from "@/constants";
import { loggerError } from "@/pino";
import prisma from "@/prisma";

type Props = {
	username: string;
};

export async function Profile({ username }: Props) {
	try {
		const { Profile } = await prisma.users.findUniqueOrThrow({
			where: { username },
			select: { Profile: true },
		});

		return (
			<>
				<p className="px-6 pt-2 font-bold text-primary">PROFILE</p>
				{!Profile ? (
					<StatusCodeView statusCode="204" />
				) : (
					<div className="gap-2 p-2 sm:p-4">
						<Card>
							<CardHeader>
								<CardTitle>{Profile.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="truncate">
									{Profile.bio}
								</CardDescription>
								{Profile.avatarUrl}
							</CardContent>
						</Card>
					</div>
				)}
			</>
		);
	} catch (error) {
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "Profile",
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
