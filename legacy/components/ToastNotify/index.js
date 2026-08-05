import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import { metrics } from '@lassets/styles';

import { Container, Notify, NotifyMessage } from './styles';

const TOAST_VISIBLE_MS = 4000;

/** Alinhado à tab bar em legacy/navigation/Routes.js e BottomSheet. */
function resolveTabBarBottomInset(insetsBottom) {
	const tabBarBaseHeight = Platform.OS === 'android' ? 64 : 80;
	return tabBarBaseHeight + insetsBottom;
}

const stylesToastNotify = colors =>
	StyleSheet.create({
		hasError: {
			backgroundColor: colors.toastError || '#ff4757',
		},
		hasSuccess: {
			backgroundColor: colors.success || '#2ed573',
		},
	});

function ToastNotify({ toastNotify, toastNotifyHide }) {
	const insets = useSafeAreaInsets();
	const theme = useTheme();
	const styles = stylesToastNotify(theme?.colors || {});
	const { show, message, error } = toastNotify;
	const hideTimeoutRef = useRef(null);

	useEffect(() => {
		if (!show) {
			return undefined;
		}

		clearTimeout(hideTimeoutRef.current);
		hideTimeoutRef.current = setTimeout(() => {
			toastNotifyHide();
		}, TOAST_VISIBLE_MS);

		return () => {
			clearTimeout(hideTimeoutRef.current);
		};
	}, [show, toastNotifyHide]);

	const bottom = metrics.baseMargin + resolveTabBarBottomInset(insets.bottom);

	return (
		<Container pointerEvents="box-none" style={{ bottom }}>
			{show === true ? (
				<Notify style={[error === true ? styles.hasError : styles.hasSuccess]}>
					<NotifyMessage>{message}</NotifyMessage>
				</Notify>
			) : null}
		</Container>
	);
}

ToastNotify.defaultProps = {
	toastNotify: {
		error: false,
		show: false,
		message: '',
	},
};

ToastNotify.propTypes = {
	toastNotify: PropTypes.shape({
		error: PropTypes.bool.isRequired,
		show: PropTypes.bool.isRequired,
		message: PropTypes.string.isRequired,
	}),
	toastNotifyHide: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	toastNotify: state.toastNotify,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(ToastNotifyActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotify);
