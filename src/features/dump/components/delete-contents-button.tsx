import { Button } from "@/components/ui/button";
import { UnexpectedError } from "@/error-classes";
import { useToast } from "@/hooks/use-toast";
import { deleteContents } from "../actions/delete-contents";

type Props = { id: number | undefined };

export function DeleteContentsButton({ id }: Props) {
	const { toast } = useToast();

	if (!id) throw new UnexpectedError();

	const handleButtonClick = async () => {
		const response = await deleteContents(id);
		toast({
			variant: response.success ? "default" : "destructive",
			description: response.message,
		});
	};

	return (
		<Button onClick={handleButtonClick} className="w-full">
			削除
		</Button>
	);
}
