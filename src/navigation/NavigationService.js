import { createRef } from 'react';

import { CommonActions } from '@react-navigation/native';

export const navigationRef = createRef();

export function navigate(routeName, params = {}) {
  navigationRef.current?.dispatch(
    CommonActions.navigate({
      name: routeName
    })
  );
}
