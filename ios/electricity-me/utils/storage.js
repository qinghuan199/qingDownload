function isNumber(value) {
	return typeof value === 'number' && !isNaN(value);
}


function isEmpty(input) {
	if (isNumber(input)) {
		return false;
	}
	if (input == undefined || input == '' || input == null || input.length == 0 || JSON.stringify(input) ==
		"{}") {
		return true;
	} else {
		return false;
	}
}

class minCache {
	setStorage(key, value) {
		uni.setStorageSync(key, JSON.stringify(value));
		return true;
	}

	getStorage(key) {
		let returnData = uni.getStorageSync(key)
		if (!isEmpty(returnData)) {
			returnData = JSON.parse(returnData)
		}
		return returnData;
	}
}

export default new minCache();