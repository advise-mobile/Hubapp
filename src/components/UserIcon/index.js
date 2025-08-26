import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import {Icon, IconText, IconImage} from './styles';

import {AVATAR, TOKEN} from 'helpers/StorageKeys';

const UserIcon = props => {
	const [initials, setInitials] = useState();
	const [avatar, setAvatar] = useState();
	const picture = useSelector(state => state.user.picture);

	useEffect(() => {
		console.log('UserIcon - picture do Redux:', picture ? 'Existe' : 'Não existe');

		// Prioriza o picture do Redux se existir
		if (picture) {
			console.log('UserIcon - Usando picture do Redux');
			setAvatar(picture);
		} else {
			// Fallback para AsyncStorage
			console.log('UserIcon - Buscando no AsyncStorage');
			AsyncStorage.getItem(AVATAR).then(image => {
				console.log(
					'UserIcon - AsyncStorage retornou:',
					image ? 'Imagem encontrada' : 'Sem imagem',
				);
				setAvatar(image);
			});
		}
	}, [picture]);

	useEffect(() => {
		// Gera iniciais apenas se não houver avatar
		if (!avatar) {
			generateInitials();
		}
	}, [avatar]);

	const generateInitials = () => {
		if (props.name) {
			let splittedName = props.name.split(' ');
			let initials =
				splittedName.length == 1
					? splittedName[0][0]
					: `${splittedName[0][0]}${splittedName[splittedName.length - 1][0]}`;
			setInitials(initials);
		} else {
			AsyncStorage.getItem(TOKEN).then(token => {
				if (token) {
					const userInfos = jwtDecode(token);
					let splittedName = userInfos.nome.split(' ');
					let initials =
						splittedName.length == 1
							? splittedName[0][0]
							: `${splittedName[0][0]}${splittedName[splittedName.length - 1][0]}`;
					setInitials(initials);
				}
			});
		}
	};

	return (
		<Icon {...props} active={props.avatar ? true : false}>
			{avatar ? (
				<IconImage
					source={{uri: `data:image/png;charset=utf-8;base64,${avatar}`}}
					size={props.size || false}
				/>
			) : (
				<IconText>{initials}</IconText>
			)}
		</Icon>
	);
};

export default UserIcon;
