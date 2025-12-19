import { faker } from "@faker-js/faker";
import { createServerFn } from "@tanstack/react-start";

export type Character = {
	id: string;
	name: string;
	location: "Konoha" | "Suna" | "Kiri" | "Iwa" | "Kumo";
	health: "Healthy" | "Injured" | "Critical";
	power: number;
};

const LOCATIONS: Character["location"][] = [
	"Konoha",
	"Suna",
	"Kiri",
	"Iwa",
	"Kumo",
];

const HEALTH_STATUSES: Character["health"][] = [
	"Healthy",
	"Injured",
	"Critical",
];

export function generateCharacters(count: number = 1000): Character[] {
	return Array.from({ length: count }, (_, index) => ({
		id: `ch_${String(index + 1).padStart(3, "0")}`,
		name: faker.person.fullName(),
		location: faker.helpers.arrayElement(LOCATIONS),
		health: faker.helpers.arrayElement(HEALTH_STATUSES),
		power: faker.number.int({ min: 100, max: 10_000 }),
	}));
}

export const characters = generateCharacters(1000);

export const getCharacters = createServerFn({
	method: "GET",
}).handler(async () => characters);
