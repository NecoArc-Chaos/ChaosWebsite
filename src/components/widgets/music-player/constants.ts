import type { Song } from "./types";

export const STORAGE_KEY_VOLUME = "music-player-volume";

export const DEFAULT_VOLUME = 0.7;

export const LOCAL_PLAYLIST: Song[] = [
	{
		id: 1,
		title: "welcome to valhalla",
		artist: "Garoad",
		cover: "assets/music/cover/welcome to valhalla.jpg",
		url: "assets/music/url/welcome to valhalla.mp3",
		duration: 188,
	},
	{
		id: 2,
		title: "Safe Haven",
		artist: "Garoad",
		cover: "assets/music/cover/Safe Haven.jpg",
		url: "assets/music/url/Safe Haven.mp3",
		duration: 159,
	},
	{
		id: 3,
		title: "Every Day Is Night",
		artist: "Garoad",
		cover: "assets/music/cover/Every Day Is Night.jpg",
		url: "assets/music/url/Every Day Is Night.mp3",
		duration: 220,
	},
	{
		id: 4,
		title: "Your Love Is a Drug",
		artist: "Garoad",
		cover: "assets/music/cover/your love is a drug.jpg",
		url: "assets/music/url/your love is a drug.mp3",
		duration: 180,
	},
];

export const DEFAULT_SONG: Song = {
	title: "Sample Song",
	artist: "Sample Artist",
	cover: "/favicon/favicon.ico",
	url: "",
	duration: 0,
	id: 0,
};

export const DEFAULT_METING_API =
	"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r";
export const DEFAULT_METING_ID = "14164869977";
export const DEFAULT_METING_SERVER = "netease";
export const DEFAULT_METING_TYPE = "playlist";

export const ERROR_DISPLAY_DURATION = 3000;
export const SKIP_ERROR_DELAY = 1000;

