export interface UserClientFeatureCreditItem {
	qtdUtilizada?: number;
	qtdContratada?: number | null;
}

export interface UserClientFeatureCreditListResponse {
	itens?: UserClientFeatureCreditItem[];
}
