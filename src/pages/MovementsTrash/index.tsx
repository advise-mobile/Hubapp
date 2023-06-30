import React, {useState, useRef, useCallback, useEffect, useMemo} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SwipeListView } from 'react-native-swipe-list-view';

import {Container, Warp, Actions, ActionButton} from 'assets/styles/global';

import Header from '@components/Header';

import Filters from './Filters';

import {
	Heading,
	FolderTitle,
	Button,
	Movement,
	MovementHeader,
	MovementHeading,
	MovementResume,
	MovementAction,
	MovementTags,
	Tag,
	TagText,
	NotFound,
	Image,
	NotFoundText,
	NotFoundDescription,
} from './styles';

import { useNavigation } from '@react-navigation/native';

import Spinner from '@components/Spinner';

import ConfirmModal from '@components/ConfirmModal';

import { Animated } from 'react-native';


// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

// Hook custom para pegar as movimentacoes na lixeira
import { useGetMovementsTrash, useMovementRecover, useMovementDelete } from '@services/hooks/MovimentsTrash/useMovementsTrash'

import { ItemProps } from '@pages/MovementsTrash/types'

const movementsRef = {};

import { DataFilterProps } from '@pages/MovementsTrash/Filters/types'; 

export default MovementsTrash = () => {

	
	const navigation = useNavigation();
	
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	const notFound = colorUseTheme.name === 'dark'
	? require('assets/images/not_found/movements_white.png')
	: require('assets/images/not_found/movements.png');

	const {isLoadingRecover, recoverMoviment} = useMovementRecover();
	const {isLoadingDelete, deleteMovement} = useMovementDelete();

	

	const filtersRef = useRef(null);
	const listRef = useRef(null);
	const confirmationModalRef = useRef();
	const confirmationModalRecoverRef = useRef();
	
	const [currentPage, setCurrentPage] = useState(1);

	const [formattedData, setFormattedData] = useState({});

	const [currentItem, setCurrentItem] = useState<ItemProps>();
	
	const {movementsTrash, loading, getData} = useGetMovementsTrash({page:currentPage});

	const [movements, setMovements] = useState<ItemProps[]>(movementsTrash);
	
	
	useEffect(() => { 
		setMovements(movementsTrash)
	}, [movementsTrash]);

	useEffect(() => { 
	// - monitora ação de enviae os dados para api para restaurar/excluir o movimento
	}, [isLoadingRecover,isLoadingDelete]);

	const openRow = useCallback(
		(item: ItemProps )   =>
		{		
			!listRef.current?._rows[item.id].isOpen
				? listRef.current?._rows[item.id].manuallySwipeRow(-150)
				: closeOpenedRow(item)
				
		},[listRef],

		
	);

	const closeOpenedRow = useCallback((item: ItemProps) => listRef.current?._rows[item.id].closeRow(),[]);

	const handleModalCancel = useCallback(() => confirmationModalRef.current?.close(),[]);

	const handleModalRecoverCancel = useCallback(() => confirmationModalRecoverRef.current?.close(),[]);

	const handleModalSubmit = useCallback(async() => {
		
		if(currentItem){
			const trash = await deleteMovement(currentItem,handleModalCancel);		
			if(trash){
				await getData({
					page:1
				})
			}
		}
	},[currentItem]);

	const handleModalRecoverSubmit = useCallback(async() => {
		if(currentItem){
			const recover = await recoverMoviment(currentItem, handleModalRecoverCancel);
			if(recover){
				await getData({
					page:1
				})
			}
		}
	},[currentItem]);

	const handleDelete = useCallback((item:ItemProps) => {
		
		setCurrentItem(item)
		confirmationModalRef.current?.open();			
	},[]);

	const handleRecover = useCallback((item:ItemProps) => {
		setCurrentItem(item)
		confirmationModalRecoverRef.current?.open();
	},[]);

	const renderHiddenItem = useCallback(
		
		({ item }: { item: ItemProps })   => (
			<Actions
				as={Animated.View}
				style={{
					overflow: 'hidden',
				}}>
				<ActionButton onPress={() => handleRecover(item)}>
					<MaterialIcons
						name={'arrow-circle-up'}
						size={24}
						color={colors.fadedBlack}
					/>
				</ActionButton>
				<ActionButton onPress={() => handleDelete(item)}>
					<MaterialIcons
						name={'delete-forever'}
						size={24}
						color={colors.fadedBlack}
					/>
				</ActionButton>
			</Actions>
	),[]);

	const renderConfirmation = useMemo(
		() =>   		
			<ConfirmModal
				ref={confirmationModalRef}
				onCancel={handleModalCancel}
				onSubmit={handleModalSubmit} 
				cancelText='Cancelar'
				submitText='Sim, quero excluir'
				title='Deseja excluir?'
				description='Ao excluir um movimento, você elimina todas as informações referentes a este documento. A ação de excluir é definitiva e irreversível.'
				loading={isLoadingDelete}
			/>
		,
		[currentItem,isLoadingDelete],
	);

	const renderConfirmationRecover = useMemo(
		() =>   		
			<ConfirmModal
				ref={confirmationModalRecoverRef}
				onCancel={handleModalRecoverCancel}
				onSubmit={handleModalRecoverSubmit} 
				cancelText='Cancelar'
				submitText='Sim, quero restaurar'
				title='Deseja restaurar?'
				description='Ao restaurar um movimento, ele ira voltar para sua lista de movimentações.'
				loading={isLoadingRecover}
			/>
		,
		[currentItem,isLoadingRecover],
	);

	const renderItem = useCallback(
		(  { item }: { item: ItemProps })   => (
			<Animated.View>
				<Movement>
					<MovementHeader>
						<MovementHeading
							numberOfLines={1}
							onPress={() => openRow(item)}
							underlayColor={colors.white}
							activeOpacity={1}
							read={item.lido}> 
						{item.title}
						</MovementHeading>
						<MovementAction onPress={() => openRow(item)}>
							<MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} />
						</MovementAction>
					</MovementHeader>
					 <MovementResume
						numberOfLines={2}
						onPress={() => openRow(item)}
						underlayColor={colors.white}
						activeOpacity={1}>
						{item.resumo}
					</MovementResume>

					<MovementTags
						onPress={() => openRow(item)}
						underlayColor={colors.white}
						activeOpacity={1}>
						{!item.lido && (
							<Tag background={colors.blue200}>
								<TagText>{item.idTipoMovProcesso === -1 ? 'Não lido' : 'Não lida'}</TagText>
							</Tag>
						)}

						{item.idTipoMovProcesso === -1 && (
							<>
								<Tag background={item.lido ? colors.gray : colors.orange200}>
									<TagText>Andamento</TagText>
								</Tag>
								{item.numeroProcesso && (
									<Tag background={colors.gray}>
										<TagText>Proc.: {item.numeroProcesso}</TagText>
									</Tag>
								)}
							</>
						)}

						{item.idTipoMovProcesso === -2 && (
							<>
								<Tag background={item.lido ? colors.gray : colors.amber}>
									<TagText>Publicado em: {item.dataPublicacao}</TagText>
								</Tag>

								{item.palavrasChaves?.map(
									keyword =>
										keyword.idPalavraChavePrincipal === undefined && (
											<Tag background={item.lido ? colors.gray : colors.green}
												key={keyword.id}>
												<TagText>{keyword.palavraChave}</TagText>
											</Tag>
										),
								)}
								{item.numeroProcesso ? (
									<Tag background={colors.gray}>
										<TagText>Proc.: {item.numeroProcesso}</TagText>
									</Tag>
								) : (
									<Tag background={colors.gray}>
										<TagText>Proc.: Não identificado</TagText>
									</Tag>
								)}
							</>
						)}
					</MovementTags>
				</Movement>
			</Animated.View>
		),
		[movements],
	);

	/** FILTERS */
	const openFilters = () => filtersRef.current?.open();

	const handleSubmitFilters = useCallback(async (data: DataFilterProps) => {

		filtersRef.current?.close();
	
		await getData({
			page:1,
			itens:data
		})
	}, []);

	/** RENDER FILTERS */
	const renderFilters = useMemo(
		() => (
			<Filters ref={filtersRef} handleSubmitFilters={handleSubmitFilters}/>
		),
		[formattedData],
	);

	const refresh = useCallback(async () => {
		await getData({
			page:1
		})
	}, []);

	return (
		<Container>
			<Warp>
				<Header title="Movimentações" />
				<Heading>
					<Button
						onPress={() => {
							setCurrentPage(1);
							navigation.goBack();
						}}>
						<MaterialIcons name="arrow-back" size={20} color={colors.fadedBlack} />
					</Button>
					<FolderTitle>Lixeira</FolderTitle>
					<Button onPress={() => {openFilters()}}>
						<MaterialIcons  name="filter-list" size={20} color={colors.fadedBlack} />
					</Button>
				</Heading>
				{
					loading ? <Spinner	/> : 
						
						movements.length > 0 ? (
							<SwipeListView
								onRefresh={refresh}
								refreshing={loading}
								ref={listRef}
								data={movements}
								disableRightSwipe
								previewRowKey={'2'}
								rightOpenValue={-300}
								stopRightSwipe={-300}
								closeOnRowOpen={false}
								renderItem={renderItem}
								previewOpenValue={-300}
								previewOpenDelay={2000}
								useNativeDriver={false}								
								renderHiddenItem={renderHiddenItem}
								keyExtractor={(item:ItemProps) => item.id.toString()}
								removeClippedSubviews={true}
								maxToRenderPerBatch={5}
								updateCellsBatchingPeriod={100}
								initialNumToRender={20}
							/>
							
						) : (
							<NotFound>
								<Image source={notFound} />
								<NotFoundText>Não há resultados</NotFoundText>
								<NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
							</NotFound>
						)	
				}
				{renderFilters}
				{renderConfirmation}
				{renderConfirmationRecover}
				</Warp>
		</Container>
	);
};
