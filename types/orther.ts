export enum Espece {
	MONSTERA = 'MONSTERA',
	FICUS_ELASTICA = 'FICUS_ELASTICA',
	SANSEVIERIA = 'SANSEVIERIA',
	POTHOS = 'POTHOS',
	CALATHEA = 'CALATHEA',
	ALOE_VERA = 'ALOE_VERA',
	SPATHIPHYLLUM = 'SPATHIPHYLLUM',
	ZZ_PLANT = 'ZZ_PLANT',
	CACTUS = 'CACTUS',
	DRACAENA = 'DRACAENA',
}

export interface WateringNeedResponse {
	id: number;
	frequencyInDays: string;
	quantityInLiters: number | null;
	createdAt: string;
	updatedAt: string;
}

export interface WateringHistoryResponse {
	id: number;
	wateringDate: string;
	notes: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface PlantResponse {
	id: number;
	name: string;
	imageUrl: string;
	purchaseDate: string;
	espece: Espece;
	wateringNeeds: WateringNeedResponse[];
	wateringHistories: WateringHistoryResponse[];
	createdAt: string;
	updatedAt: string;
}
export interface PlantRequest {
	name: string;
	imageUrl: string;
	purchaseDate: string;
	espece: Espece;
}

export interface WateringHistoryRequest {
	wateringDate: string;
	notes?: string;
}

export interface WateringNeedRequest {
	frequencyInDays: number;
	quantityInLiters: number;
}
