import { getProfile } from "@/apis/prisma/fetch-profile";
import { StatusCodeView } from "@/components/status-code-view";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Props = {
	username: string;
};

export async function Profile({ username }: Props) {
	try {
		const { Profile } = await getProfile(username);

		return (
			<>
				<p className="px-6 pt-2 font-bold text-primary">PROFILE</p>
				{!Profile ? (
					<StatusCodeView statusCode="204" />
				) : (
					<div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
						<Card className="hover:bg-secondary">
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
						);
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
