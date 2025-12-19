import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { getCharacters } from "@/data/demo.characters";

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => await getCharacters(),
});

function App() {
	const characters = Route.useLoaderData();
	const parentRef = useRef<HTMLDivElement>(null);

	const columns = [
		{ key: "id", label: "ID", width: "100px" },
		{ key: "name", label: "Name", width: "200px" },
		{ key: "location", label: "Location", width: "120px" },
		{ key: "health", label: "Health", width: "120px" },
		{ key: "power", label: "Power", width: "100px" },
	] as const;

	const minWidth = columns.reduce(
		(sum, col) => sum + parseInt(col.width, 10),
		0,
	);

	const rowVirtualizer = useVirtualizer({
		count: characters.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 49,
		overscan: 5,
	});

	return (
		<main className="h-screen flex flex-col px-4 py-3">
			<div className="flex-1 border border-gray-200 rounded overflow-hidden flex flex-col">
				<div ref={parentRef} className="flex-1 overflow-auto bg-white">
					<div
						className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 grid"
						style={{
							gridTemplateColumns: columns.map((col) => col.width).join(" "),
							minWidth: `${minWidth}px`,
						}}
					>
						{columns.map((column) => (
							<div
								key={column.key}
								className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
							>
								{column.label}
							</div>
						))}
					</div>
					<div
						style={{
							height: `${rowVirtualizer.getTotalSize()}px`,
							position: "relative",
							minWidth: `${minWidth}px`,
						}}
					>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							const character = characters[virtualRow.index];
							return (
								<div
									key={virtualRow.key}
									className="grid border-b border-gray-200 hover:bg-gray-50 absolute top-0 left-0 w-full"
									style={{
										gridTemplateColumns: columns
											.map((col) => col.width)
											.join(" "),
										height: `${virtualRow.size}px`,
										transform: `translateY(${virtualRow.start}px)`,
										minWidth: `${minWidth}px`,
									}}
								>
									{columns.map((column) => (
										<div
											key={column.key}
											className={`px-4 py-3 text-sm overflow-hidden text-ellipsis ${
												column.key === "name"
													? "font-medium text-gray-900"
													: "text-gray-700"
											}`}
										>
											{character[column.key]}
										</div>
									))}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	);
}
