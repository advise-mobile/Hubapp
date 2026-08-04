export interface UserClientFeatureCreditItem {
	qtdUtilizada?: number;
	qtdTotalContratado?: number | null;
}

export interface UserClientFeatureCreditListResponse {
	itens?: UserClientFeatureCreditItem[];
}
