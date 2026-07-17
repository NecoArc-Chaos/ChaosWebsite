/**
 * Format relative time for diary moments
 * @param dateString ISO date string
 * @param minutesAgo text for minutes
 * @param hoursAgo text for hours
 * @param daysAgo text for days
 * @param secondsAgo text for seconds
 */
export function formatRelativeTime(
	dateString: string,
	minutesAgo: string,
	hoursAgo: string,
	daysAgo: string,
	secondsAgo: string,
): string {
	const date = new Date(dateString);
	const diffInMs = Date.now() - date.getTime();
	const diffInSeconds = Math.floor(diffInMs / 1000);
	const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	let relative = "";
	if (diffInDays > 0) {
		relative = `${diffInDays}${daysAgo}`;
	} else if (diffInHours > 0) {
		relative = `${diffInHours}${hoursAgo}`;
	} else if (diffInMinutes > 0) {
		relative = `${diffInMinutes}${minutesAgo}`;
	} else {
		relative = `${diffInSeconds}${secondsAgo}`;
	}

	const pad = (n: number) => (n < 10 ? "0" + n : n);
	const exact =
		date.getFullYear() +
		"-" +
		pad(date.getMonth() + 1) +
		"-" +
		pad(date.getDate()) +
		" " +
		pad(date.getHours()) +
		":" +
		pad(date.getMinutes()) +
		":" +
		pad(date.getSeconds());

	return relative + " · " + exact;
}
