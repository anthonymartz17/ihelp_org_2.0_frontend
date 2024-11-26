import React from "react";

export default function SearchBar({ onSearch }) {
	return (
		<form className="w-[25em]">
			<label
				htmlFor="default-search"
				className="mb-2 body-text sr-only dark:text-white"
			>
				Search
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<span className="material-symbols-outlined text-dark opacity-40">
						search
					</span>
				</div>
				<input
					onChange={onSearch}
					type="search"
					id="search"
					className="block w-full p-2 ps-10 body-text border border-greylight rounded-lg  focus:border-dark outline-none"
					placeholder="Search..."
					required
				/>
			</div>
		</form>
	);
}
