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

	const rowVirtualizer = useVirtualizer({
		count: characters.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 49,
		overscan: 5,
	});

	return (
		<main className="h-screen flex flex-col px-4 py-3">
			<div className="flex-1 border border-gray-200 rounded overflow-hidden flex flex-col">
				<div className="bg-gray-50 border-b border-gray-200">
					<div className="grid grid-cols-[minmax(80px,100px)_minmax(120px,1fr)_minmax(100px,120px)_minmax(100px,120px)_minmax(80px,100px)] min-w-max">
						<div className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
							ID
						</div>
						<div className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
							Name
						</div>
						<div className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
							Location
						</div>
						<div className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
							Health
						</div>
						<div className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
							Power
						</div>
					</div>
				</div>
				<div ref={parentRef} className="flex-1 overflow-auto bg-white">
					<div
						style={{
							height: `${rowVirtualizer.getTotalSize()}px`,
							position: "relative",
							minWidth: "max-content",
						}}
					>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							const character = characters[virtualRow.index];
							return (
								<div
									key={virtualRow.key}
									className="grid grid-cols-[minmax(80px,100px)_minmax(120px,1fr)_minmax(100px,120px)_minmax(100px,120px)_minmax(80px,100px)] border-b border-gray-200 hover:bg-gray-50 absolute top-0 left-0 w-full min-w-max"
									style={{
										height: `${virtualRow.size}px`,
										transform: `translateY(${virtualRow.start}px)`,
									}}
								>
									<div className="px-4 py-3 text-sm text-gray-700 overflow-hidden text-ellipsis">
										{character.id}
									</div>
									<div className="px-4 py-3 text-sm font-medium text-gray-900 overflow-hidden text-ellipsis">
										{character.name}
									</div>
									<div className="px-4 py-3 text-sm text-gray-700 overflow-hidden text-ellipsis">
										{character.location}
									</div>
									<div className="px-4 py-3 text-sm text-gray-700 overflow-hidden text-ellipsis">
										{character.health}
									</div>
									<div className="px-4 py-3 text-sm text-gray-700 overflow-hidden text-ellipsis">
										{character.power}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	);
}
