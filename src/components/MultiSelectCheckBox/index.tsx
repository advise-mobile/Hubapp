import React, { useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';

import { MultiSelectCheckBoxProps, DataProps,ItemProps } from './types';

import { List, Card ,Container,Label } from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default  MultiSelectCheckBox = ({ dataCheckeds, onChangeSelected, data}:MultiSelectCheckBoxProps) => {
        // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

    const [options, setOptions] = useState<DataProps[]>(data);
    const [checkAll, setCheckAll] = useState<boolean>(false);

    const handleChange = (item:ItemProps, checked:boolean) => {

        const newOptions:ItemProps[] = options.map((data:ItemProps) => {
            if (item.id === data.id) {
                return { ...data, isChecked: checked };
            }
            return data;
        });
    
        const dataChecked = newOptions.filter((check:ItemProps) => {
            return check.isChecked === true
        }).map(item => {
            return item.id
        });

        setCheckAll(dataChecked.length === newOptions.length );
        onChangeSelected(dataChecked);
        setOptions(newOptions)
    };

    const handleChangeAll = ( checked : boolean) => {

        const newOptions:ItemProps[] = options.map((data:ItemProps) => {
            return { ...data, isChecked: checked };
        });
    
        const dataChecked = newOptions.filter((check:ItemProps) => {
            return check.isChecked === true
        }).map(item => {
            return item.id
        });

        setCheckAll(checked);
        onChangeSelected(dataChecked);
        setOptions(newOptions)
    };

    const renderItem =  ({item} : DataProps) => {
        return (
            <Card>
                <CheckBox
                    lineWidth={1.5}
                    boxType={'square'}
                    value={item.isChecked}
                    onValueChange={(newValue:boolean)=>{handleChange(item,newValue)}}
                    animationDuration={0.2}
                    tintColor={colors.primary}
                    onCheckColor={colors.white}
                    onFillColor={colors.primary}
                    onTintColor={colors.primary}
                    tintColors={{ true: colors.primary }}
                    style={{ width: 18, height: 18, marginRight: 12 }}
                    />                        
                    <Label>{item.description}</Label>
            </Card>
        );
    }

    const renderFlatList = (data: DataProps[]) => {
        return (
            <List
                data={data}
                renderItem={renderItem}
            />
        );
    }

    useEffect(()=>{
        
        const currentData =  data.map((item) => {
            return { ...item, isChecked: dataCheckeds.some((check) => check === item.id) };  
        });
    
        setCheckAll(dataCheckeds.length === data.length);
        setOptions(currentData);
    },[dataCheckeds])

    return (
        <Container>
            <Card>
                <CheckBox
                    lineWidth={1.5}
                    boxType={'square'}
                    value={checkAll}
                    onValueChange={handleChangeAll}
                    animationDuration={0.2}
                    tintColor={colors.primary}
                    onCheckColor={colors.white}
                    onFillColor={colors.primary}
                    onTintColor={colors.primary}
                    tintColors={{ true: colors.primary }}
                    style={{ width: 18, height: 18, marginRight: 12 }}
                />                        
                <Label>Todas</Label>
            </Card>
            {renderFlatList(options)}
        </Container>
    );
}

