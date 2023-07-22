import type { Player } from '$lib';

export function comparePlayers<T extends Player>(obj1: T, obj2: T): boolean {
	const keys1 = Object.keys(obj1) as (keyof T)[];
	const keys2 = Object.keys(obj2) as (keyof T)[];

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	return true;
}
