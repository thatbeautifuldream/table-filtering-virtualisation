import { createFileRoute } from "@tanstack/react-router";
import { getCharacters } from "@/data/demo.characters";

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => await getCharacters(),
});

function App() {
	const characters = Route.useLoaderData();

	return (
		<main className="h-screen flex flex-col px-4 py-3">
			<div className="flex-1 overflow-auto border border-gray-200 rounded">
				<table className="min-w-full divide-y divide-gray-200 relative">
					<thead className="bg-gray-50 sticky top-0 z-10">
						<tr>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
								ID
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
								Name
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
								Location
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
								Health
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
								Power
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{characters.map((character) => (
							<tr key={character.id} className="hover:bg-gray-50">
								<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
									{character.id}
								</td>
								<td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
									{character.name}
								</td>
								<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
									{character.location}
								</td>
								<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
									{character.health}
								</td>
								<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
									{character.power}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
