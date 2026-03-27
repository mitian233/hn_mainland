import type { Story } from '../types/story';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export async function fetchTopStoryIds(limit: number): Promise<number[]> {
	const response = await fetch(`${BASE_URL}/topstories.json`);
	if (!response.ok) {
		throw new Error(`Failed to fetch top stories: ${response.status}`);
	}

	const ids = (await response.json()) as number[];
	return ids.slice(0, limit);
}

export async function fetchStory(id: number): Promise<Story> {
	const response = await fetch(`${BASE_URL}/item/${id}.json`);
	if (!response.ok) {
		throw new Error(`Failed to fetch story ${id}: ${response.status}`);
	}

	return (await response.json()) as Story;
}

export async function fetchTopStories(limit: number): Promise<Story[]> {
	const ids = await fetchTopStoryIds(limit);
	const stories = await Promise.all(ids.map((id) => fetchStory(id)));
	return stories.filter((story): story is Story => Boolean(story && story.title && story.by));
}
