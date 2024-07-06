import { Button } from "@/components/ui/button";
import {
	Toast,
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast";
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

const meta = {
	title: "Components/UI/Toast",
	component: Toast,
	tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const ToastExample = () => {
	const [open, setOpen] = useState(false);

	return (
		<ToastProvider>
			<Button onClick={() => setOpen(true)}>Show Toast</Button>
			<Toast open={open} onOpenChange={setOpen}>
				<ToastTitle>Notification Title</ToastTitle>
				<ToastDescription>This is a toast notification.</ToastDescription>
			</Toast>
			<ToastViewport />
		</ToastProvider>
	);
};

export const Default: Story = {
	render: () => <ToastExample />,
};

export const Destructive: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [open, setOpen] = useState(false);

		return (
			<ToastProvider>
				<Button onClick={() => setOpen(true)} variant="destructive">
					Show Destructive Toast
				</Button>
				<Toast open={open} onOpenChange={setOpen} variant="destructive">
					<ToastTitle>Error Notification</ToastTitle>
					<ToastDescription>
						This is a destructive toast notification.
					</ToastDescription>
					<ToastClose />
				</Toast>
				<ToastViewport />
			</ToastProvider>
		);
	},
};

export const WithAction: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [open, setOpen] = useState(false);

		return (
			<ToastProvider>
				<Button onClick={() => setOpen(true)}>Show Toast with Action</Button>
				<Toast open={open} onOpenChange={setOpen}>
					<ToastTitle>Notification Title</ToastTitle>
					<ToastDescription>
						This is a toast notification with an action.
					</ToastDescription>
					<ToastAction
						altText="Undo"
						onClick={() => alert("Action performed!")}
					>
						Undo
					</ToastAction>
					<ToastClose />
				</Toast>
				<ToastViewport />
			</ToastProvider>
		);
	},
};

export const CustomStyles: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [open, setOpen] = useState(false);

		return (
			<ToastProvider>
				<Button onClick={() => setOpen(true)}>Show Custom Styled Toast</Button>
				<Toast
					open={open}
					onOpenChange={setOpen}
					className="bg-blue-500 text-white"
				>
					<ToastTitle>Custom Styled Notification</ToastTitle>
					<ToastDescription>
						This is a toast notification with custom styles.
					</ToastDescription>
					<ToastClose />
				</Toast>
				<ToastViewport />
			</ToastProvider>
		);
	},
};
