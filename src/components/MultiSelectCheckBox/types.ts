export interface MultiSelectCheckBoxProps {
    dataCheckeds:Array<number>,
    data:ItemProps[];
    onChangeSelected: (item: Array<number>) => void;
    
}

export interface ItemProps {
    id: number;
    description: string; 
    isChecked: boolean;
}

export interface DataProps {
    item:ItemProps
}