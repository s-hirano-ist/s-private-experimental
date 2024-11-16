import { Button } from "@/components/ui/button";
import { UnexpectedError } from "@/error-classes";
import { useToast } from "@/hooks/use-toast";
import { deleteNews } from "../actions/delete-news";

type Props = { id: number | undefined };

export function DeleteNewsButton({ id }: Props) {
	const { toast } = useToast();

	if (!id) throw new UnexpectedError();

	const handleButtonClick = async () => {
		const response = await deleteNews(id);
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
