import {createRef} from 'react';

import {CommonActions} from '@react-navigation/native';

export const navigationRef = createRef();

export function navigate(routeName, params = {}) {
	navigationRef.current?.dispatch(
		CommonActions.navigate({
			name: routeName,
			params,
		}),
	);
}

export function goBack() {
	navigationRef.current?.dispatch(CommonActions.goBack());
}

export function reset(routes) {
	navigationRef.current?.dispatch(
		CommonActions.reset({
			index: 0,
			routes: [{name: routes}],
		}),
	);
}
