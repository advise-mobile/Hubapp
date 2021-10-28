import React, {forwardRef, useRef, useState, useCallback} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import useDebouncedEffect from 'use-debounced-effect';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

import {colors} from 'assets/styles';

import {
	Content,
	Search,
	SearchContent,
	SearchButton,
	ReportersContainer,
	ReportersList,
	Item,
	ItemText,
} from './styles';

import JurisprudenceActions from 'store/ducks/Jurisprudence';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default ReportersModal = forwardRef((props, ref) => {
	const dispatch = useDispatch();

	const inputRef = useRef();

	const [search, setSearch] = useState('');

	const loading = useSelector(state => state.jurisprudence.loadingReporters);
	const reporters = useSelector(state => state.jurisprudence.reporters);

	useDebouncedEffect(
		() => {
			if (!search) return;

			dispatch(
				JurisprudenceActions.reportersRequest({
					term: search,
				}),
			);
		},
		200,
		[search],
	);

	const renderItem = useCallback(
		({item}) => (
			<Item onPress={() => selectReporter(item.nomeRelator)}>
				<ItemText>{item.nomeRelator}</ItemText>
			</Item>
		),
		[reporters],
	);

	const selectReporter = useCallback(name => {
		props.selectReporter(name);

		ref.current?.close();
	}, []);

	const clearReporters = useCallback(() => dispatch(JurisprudenceActions.clearReporters()));

	const clearSearch = useCallback(() => {
		clearReporters();
		setSearch('');
	});

	return (
		<Modal
			ref={ref}
			title="Buscar relator"
			onClose={() => {
				setSearch('');
				clearReporters();
			}}
			onOpen={() => setTimeout(() => inputRef.current?.focus(), 1000)}>
			<Content>
				<SearchContent>
					<Search
						ref={inputRef}
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Busque um relator"
						placeholderTextColor={colors.grayLight}
						value={search}
						onChangeText={typedSearch =>
							typedSearch ? setSearch(typedSearch) : setSearch(typedSearch) & clearReporters()
						}
						keyboardType="email-address"
						returnKeyType="send"
					/>

					{search.length > 0 && (
						<SearchButton onPress={clearSearch}>
							<MaterialIcons size={20} name="close" color={colors.fadedBlack} />
						</SearchButton>
					)}
				</SearchContent>
				<ReportersContainer>
					{loading ? <Spinner /> : <ReportersList data={reporters} renderItem={renderItem} />}
				</ReportersContainer>
			</Content>
		</Modal>
	);
});
