import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import {colors} from 'assets/styles';
import {Container, Notify, NotifyMessage} from './styles';

const styles = StyleSheet.create({
	hasError: {
		backgroundColor: colors.toastError,
	},

	hasSuccess: {
		backgroundColor: colors.success,
	},
});

class ToastNotify extends Component {
	componentDidUpdate() {
		this.hidenMessage();
	}

	hidenMessage = () => {
		const {show} = this.props.toastNotify;

		if (show) {
			setTimeout(() => {
				this.props.toastNotifyHide();
			}, 4000);
		}
	};

	render() {
		const {show, message, error} = this.props.toastNotify;

		return (
			<Container>
				{show === true ? (
					<Notify style={[error === true ? styles.hasError : styles.hasSuccess]}>
						<NotifyMessage>{message}</NotifyMessage>
					</Notify>
				) : null}
			</Container>
		);
	}
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

const mapDispatchToProps = dispatch => bindActionCreators(ToastNotifyActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotify);
