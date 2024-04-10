export default async function formatDate(date: Date) {
	const formattedDate: string = `${new Date(
		date
	).getDate()} ${await monthPromise(
		new Date(date).getMonth() + 1
	)} ${new Date(date).getFullYear()}`;
	console.log(formattedDate);

	return formattedDate;
}

async function monthPromise(monthAsNumber: number) {
	const monthAsString: string = await new Promise((resolve, reject) => {
		switch (monthAsNumber) {
			case 1:
				resolve("January");
				break;
			case 2:
				resolve("February");
				break;
			case 3:
				resolve("March");
				break;
			case 4:
				resolve("April");
				break;
			case 5:
				resolve("May");
				break;
			case 6:
				resolve("June");
				break;
			case 7:
				resolve("July");
				break;
			case 8:
				resolve("August");
				break;
			case 9:
				resolve("September");
				break;
			case 10:
				resolve("October");
				break;
			case 11:
				resolve("November");
				break;
			case 12:
				resolve("December");
				break;
			default:
				reject("An error occured");
				break;
		}
	});
	return monthAsString;
}
