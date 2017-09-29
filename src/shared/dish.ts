import { Comment } from './comment';

export interface Dish {
	id: number;
	name: string;
	image: string;
	label: string;
	price: string;
	featured: boolean;
	description: string;
	comments: Comment[];
}