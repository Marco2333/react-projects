import {SERVER_ADDRESS} from "../config/config";

export const fetchStart = (type) => ({
    type
});

export const fetchSucceed = (type, info) => ({
    type,
    info
});

export const fetchFail = (type, message) => ({
    type,
    message
});

export const fetchInfo = (url, actionTypes, callback) => {
    return (dispatch) => {
		if(actionTypes.length !== 3) {
			throw new Error("Confirm action type");
		}
        dispatch(fetchStart(actionTypes[0]));

        fetch(url).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
                dispatch(fetchFail(actionTypes[2], "LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(fetchFail(actionTypes[2], responseJson.message));
				}

				if(responseJson._info) {
					dispatch(fetchSucceed(actionTypes[1], responseJson._info));
				}
				else {
					let {status, message, ...info} = responseJson;
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