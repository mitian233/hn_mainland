export interface Story {
	id: number;
	title: string;
	by: string;
	score: number;
	time: number;
	url?: string;
	type: string;
	descendants?: number;
}
