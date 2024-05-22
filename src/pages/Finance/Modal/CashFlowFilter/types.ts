export interface DataFilterProps {
    dataSaldo?: string,
    dataFim?: string,
    period?:number
}

export interface FilterProps {
    handleSubmitFilters: (item:DataFilterProps) => void;
    handleClearFilters: () => void;
}