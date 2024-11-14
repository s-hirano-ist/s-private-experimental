"use server";
import { NotFound } from "@/components/not-found";
import { GenerateUrl } from "@/features/dump/actions/generate-url";
import Image from "next/image";

type Props = { id: string };

export async function ImageContainer({ id }: Props) {
	const response = await GenerateUrl(id);
	if (!response.success) return <NotFound />;
	return <Image src={response.data} width={300} height={96} alt="" />;
}
