import React from "react";

export default function AlertModal({
	title = "Alert",
	message,
	onCancel,
	onConfirm,
}) {
	return (
		<div
			id="default-modal"
			tabindex="-1"
			className=" bg-dark/80 fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
		>
			<div className="relative p-4 w-full max-w-2xl max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-dark">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							{title}
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<span onClick={onCancel} className="material-symbols-outlined">
								close
							</span>
						</button>
					</div>

					<div className="p-4 md:p-5 space-y-4">
						<p className="text-base leading-relaxed text-white ">{message}</p>
					</div>

					<div className="flex items-center gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
						<button
							onClick={onConfirm}
							type="button"
							className="btn bg-primary text-light"
						>
							I accept
						</button>
						<button
							onClick={onCancel}
							type="button"
							className="btn  text-light border-2"
						>
							Decline
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
