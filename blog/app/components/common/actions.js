export const fetchStart = (type) => ({ type });

export const fetchSucceed = (type, info) => ({ type, info });

export const fetchFail = (type, message) => ({type, message});

export const fetchInfo = (url, actionTypes, callback) => {
	return (dispatch) => {
		if(actionTypes.length !== 3) {
			throw new Error("Confirm action type");
		}

		dispatch(fetchStart(actionTypes[0]));

		fetch(url, { credentials: 'include' }).then((res) => {
			if(res.status !== 200) {
				throw new Error('Load Failed, Status:' + res.status);
			}
			res.json().then((data) => {
				if(data.status == 0) {
					dispatch(fetchFail(actionTypes[2], data.message));
				}

				if(data._info) {
					dispatch(fetchSucceed(actionTypes[1], data._info));
				}
				else {
					let {status, message, ...info} = data;
					dispatch(fetchSucceed(actionTypes[1], info));
				}
				
				if(callback) callback();
			}).catch((error) => {
				dispatch(fetchFail(actionTypes[2], error));
			})
		}).catch((error) => {
			dispatch(fetchFail(actionTypes[2], error));
		});
	}
}