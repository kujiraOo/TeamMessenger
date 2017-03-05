// filterAction
export function viewBy(string) { //VIEW_SENT or VIEW_RECEIVED
	return {
		type: `VIEW_${string.toUpperCase()}`
	}
}
