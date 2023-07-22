// place files you want to import through the `$lib` alias in this folder.
export type Player = {
	initiative: number; // initiative
	name: string;
};

export type PlayerIndex = number;

export type GameContext = {
	currentPlayer: PlayerIndex;
	players: Player[];
};
