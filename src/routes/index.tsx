import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { SearchInput } from "@/components/ui/search-input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCharacters } from "@/data/demo.characters";

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return await getCharacters();
	},
	pendingComponent: LoadingState,
});

function LoadingState() {
	return (
		<main className="h-screen flex items-center justify-center bg-background">
			<div className="text-center">
				<p className="text-muted-foreground animate-pulse">
					Loading characters...
				</p>
			</div>
		</main>
	);
}

type SortOrder = "asc" | "desc" | null;

function App() {
	const characters = Route.useLoaderData();
	const parentRef = useRef<HTMLDivElement>(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [healthFilters, setHealthFilters] = useState<string[]>([]);
	const [sortOrder, setSortOrder] = useState<SortOrder>(null);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

	const filteredAndSortedData = useMemo(() => {
		let result = [...characters];

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(char) =>
					char.name.toLowerCase().includes(query) ||
					char.location.toLowerCase().includes(query),
			);
		}

		if (healthFilters.length > 0) {
			result = result.filter((char) => healthFilters.includes(char.health));
		}

		if (sortOrder) {
			result.sort((a, b) => {
				return sortOrder === "asc" ? a.power - b.power : b.power - a.power;
			});
		}

		return result;
	}, [characters, searchQuery, healthFilters, sortOrder]);

	const rowVirtualizer = useVirtualizer({
		count: filteredAndSortedData.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 49,
		overscan: 5,
	});

	const columns = [
		{ key: "checkbox", label: "", width: "60px" },
		{ key: "name", label: "Name", width: "200px" },
		{ key: "location", label: "Location", width: "120px" },
		{ key: "health", label: "Health", width: "120px" },
		{ key: "power", label: "Power", width: "100px" },
	] as const;

	const minWidth = columns.reduce(
		(sum, col) => sum + Number.parseInt(col.width, 10),
		0,
	);

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedIds(new Set(filteredAndSortedData.map((char) => char.id)));
		} else {
			setSelectedIds(new Set());
		}
	};

	const handleSelectRow = (id: string, checked: boolean) => {
		const newSelected = new Set(selectedIds);
		if (checked) {
			newSelected.add(id);
		} else {
			newSelected.delete(id);
		}
		setSelectedIds(newSelected);
	};

	const handleToggleSort = () => {
		setSortOrder((current) => {
			if (current === null) return "asc";
			if (current === "asc") return "desc";
			return null;
		});
	};

	const handleSubmit = () => {
		const selectedArray = Array.from(selectedIds);
		console.log("Selected character IDs:", selectedArray);
	};

	const handleToggleViewed = () => {
		const newViewedIds = new Set(viewedIds);
		for (const id of selectedIds) {
			if (viewedIds.has(id)) {
				newViewedIds.delete(id);
			} else {
				newViewedIds.add(id);
			}
		}
		setViewedIds(newViewedIds);
	};

	const allSelected =
		filteredAndSortedData.length > 0 &&
		selectedIds.size === filteredAndSortedData.length;
	const someSelected = selectedIds.size > 0 && !allSelected;

	const healthFilterOptions = [
		{ value: "Healthy", label: "Healthy" },
		{ value: "Injured", label: "Injured" },
		{ value: "Critical", label: "Critical" },
	];

	return (
		<main className="h-screen flex flex-col px-4 py-3 gap-3 bg-background">
			<div className="flex items-center gap-3">
				<div className="flex-1">
					<SearchInput
						placeholder="Search Characters..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<Button
					onClick={handleToggleViewed}
					disabled={selectedIds.size === 0}
					variant="secondary"
				>
					{Array.from(selectedIds).some((id) => !viewedIds.has(id))
						? "Mark as Viewed"
						: "Mark as Unviewed"}
				</Button>
				<Button onClick={handleSubmit} disabled={selectedIds.size === 0}>
					Submit
				</Button>
			</div>

			<div className="flex-1 border border-border overflow-hidden flex flex-col relative">
				<div ref={parentRef} className="flex-1 overflow-auto bg-card">
					<div
						className="sticky top-0 z-10 bg-muted border-b border-border grid"
						style={{
							gridTemplateColumns: columns.map((col) => col.width).join(" "),
							minWidth: `${minWidth}px`,
						}}
					>
						{columns.map((column) => (
							<div
								key={column.key}
								className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2"
							>
								{column.key === "checkbox" ? (
									<Checkbox
										checked={allSelected}
										indeterminate={someSelected}
										onChange={(e) =>
											handleSelectAll((e.target as HTMLInputElement).checked)
										}
									/>
								) : (
									<>
										<span>{column.label}</span>
										{column.key === "health" && (
											<FilterDropdown
												options={healthFilterOptions}
												selectedValues={healthFilters}
												onChange={setHealthFilters}
												label="Filter by health status"
											/>
										)}
										{column.key === "power" && (
											<button
												type="button"
												onClick={handleToggleSort}
												className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
												aria-label="Sort by power"
											>
												{sortOrder === "asc" ? (
													<ChevronUp className="h-4 w-4" />
												) : sortOrder === "desc" ? (
													<ChevronDown className="h-4 w-4" />
												) : (
													<ChevronDown className="h-4 w-4 opacity-30" />
												)}
											</button>
										)}
									</>
								)}
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
							const character = filteredAndSortedData[virtualRow.index];
							const isSelected = selectedIds.has(character.id);
							const isViewed = viewedIds.has(character.id);

							return (
								<div
									key={virtualRow.key}
									className={`grid border-b border-border hover:bg-muted/50 absolute top-0 left-0 w-full transition-opacity ${
										isViewed ? "opacity-60" : ""
									}`}
									style={{
										gridTemplateColumns: columns
											.map((col) => col.width)
											.join(" "),
										height: `${virtualRow.size}px`,
										transform: `translateY(${virtualRow.start}px)`,
										minWidth: `${minWidth}px`,
									}}
								>
									<div className="px-4 py-3 flex items-center">
										<Checkbox
											checked={isSelected}
											onChange={(e) =>
												handleSelectRow(
													character.id,
													(e.target as HTMLInputElement).checked,
												)
											}
										/>
									</div>
									<div className="px-4 py-3 text-sm font-medium text-foreground overflow-hidden text-ellipsis">
										{character.name}
									</div>
									<div className="px-4 py-3 text-sm text-muted-foreground overflow-hidden text-ellipsis">
										{character.location}
									</div>
									<div className="px-4 py-3 text-sm overflow-hidden text-ellipsis">
										<Badge
											variant={
												character.health.toLowerCase() as
													| "healthy"
													| "injured"
													| "critical"
											}
											className="uppercase tracking-wider text-xs"
										>
											{character.health}
										</Badge>
									</div>
									<div className="px-4 py-3 text-sm text-muted-foreground overflow-hidden text-ellipsis">
										{character.power.toLocaleString()}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Scroll to top and bottom buttons */}
				<div className="absolute bottom-4 right-4 flex flex-col gap-2">
					{(() => {
						if (!parentRef.current) return null;
						const scrollPosition = parentRef.current.scrollTop;
						const maxScroll =
							parentRef.current.scrollHeight - parentRef.current.clientHeight;

						return (
							<>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Button
												size="icon"
												variant="outline"
												onClick={() =>
													parentRef.current?.scrollTo({
														top: 0,
														behavior: "smooth",
													})
												}
												disabled={scrollPosition <= 10}
												className="shadow-lg"
											>
												<ChevronUp className="h-4 w-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent side="left">
											<p>Scroll to Top</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Button
												size="icon"
												variant="outline"
												onClick={() =>
													parentRef.current?.scrollTo({
														top: parentRef.current.scrollHeight,
														behavior: "smooth",
													})
												}
												disabled={scrollPosition >= maxScroll - 10}
												className="shadow-lg"
											>
												<ChevronDown className="h-4 w-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent side="left">
											<p>Scroll to Bottom</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</>
						);
					})()}
				</div>
			</div>
		</main>
	);
}
