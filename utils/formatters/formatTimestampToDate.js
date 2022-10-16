const formatTimestamptoDate = (timestamp) => {
	const dateData = new Date(timestamp.seconds * 1000);
	const monthName = {
		0: "January",
		1: "February",
		2: "March",
		3: "April",
		4: "May",
		5: "June",
		6: "July",
		7: "August",
		8: "September",
		9: "October",
		10: "November",
		11: "December",
	}
	return {
		date: dateData.getDate(),
		month: monthName[dateData.getMonth()],
		year: dateData.getFullYear(),
		hours: dateData.getHours(),
		minutes: dateData.getMinutes()
	};
};


export default formatTimestamptoDate;
