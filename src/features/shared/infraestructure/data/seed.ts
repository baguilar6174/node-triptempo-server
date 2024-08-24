import {
	type Region,
	type Province,
	type City,
	type Route,
	type TransportationProvider,
	type Schedule
} from '@prisma/client';

import { ONE, THREE, TWO } from '../../../../core';
import { prisma } from './postgres';

type CreateScheduleDTO = Omit<Schedule, 'id'>;

export enum REGIONS {
	COSTA = ONE,
	SIERRA = TWO,
	ORIENTE = THREE
}

export enum PROVINCES {
	AZUAY = '01',
	BOLIVAR = '02',
	CANAR = '03',
	CARCHI = '04',
	COTOPAXI = '05',
	CHIMBORAZO = '06',
	EL_ORO = '07',
	ESMERALDAS = '08',
	GUAYAS = '09',
	IMBABURA = '10',
	LOJA = '11',
	LOS_RIOS = '12',
	MANABI = '13',
	MORONA_SANTIAGO = '14',
	NAPO = '15',
	PASTAZA = '16',
	PICHINCHA = '17',
	TUNGURAHUA = '18',
	ZAMORA_CHINCHIPE = '19',
	GALAPAGOS = '20',
	SUCUMBÍOS = '21',
	ORELLANA = '22',
	SANTO_DOMINGO = '23',
	SANTA_ELENA = '24'
}

// Código provincia + código cantón
export enum CITIES {
	CUENCA = `${PROVINCES.AZUAY}01`,
	RIOBAMBA = `${PROVINCES.CHIMBORAZO}01`,
	MACHALA = `${PROVINCES.EL_ORO}01`,
	GUAYAQUIL = `${PROVINCES.GUAYAS}01`,
	QUITO = `${PROVINCES.PICHINCHA}01`,
	HUAQUILLAS = `${PROVINCES.EL_ORO}07`,
	MANTA = `${PROVINCES.MANABI}08`,
	CATAMAYO = `${PROVINCES.LOJA}03`
}

export enum PROVIDERS {
	COOP_PATRIA = 'PATRIA',
	COOP_CHIMBORAZO = 'CHIMBORAZO',
	COOP_TRANS_VENCEDORES = 'TRANS_VENCEDORES',
	COOP_SANTA = 'SANTA'
}

export enum ROUTES {
	RIOBAMBA_QUITO_COOP_PATRIA = `${CITIES.RIOBAMBA}-${CITIES.QUITO}-${PROVIDERS.COOP_PATRIA}`,
	QUITO_RIOBAMBA_COOP_PATRIA = `${CITIES.QUITO}-${CITIES.RIOBAMBA}-${PROVIDERS.COOP_PATRIA}`,
	RIOBAMBA_QUITO_COOP_CHIMBORAZO = `${CITIES.RIOBAMBA}-${CITIES.QUITO}-${PROVIDERS.COOP_CHIMBORAZO}`,
	RIOBAMBA_CUENCA_COOP_PATRIA = `${CITIES.RIOBAMBA}-${CITIES.CUENCA}-${PROVIDERS.COOP_PATRIA}`,
	RIOBAMBA_MACHALA_COOP_PATRIA = `${CITIES.RIOBAMBA}-${CITIES.MACHALA}-${PROVIDERS.COOP_PATRIA}`,
	CUENCA_RIOBAMBA_COOP_PATRIA = `${CITIES.CUENCA}-${CITIES.RIOBAMBA}-${PROVIDERS.COOP_PATRIA}`,
	RIOBAMBA_GUAYAQUIL_COOP_PATRIA = `${CITIES.RIOBAMBA}-${CITIES.GUAYAQUIL}-${PROVIDERS.COOP_PATRIA}`,
	RIOBAMBA_HUAQUILLAS_COOP_PATRIA = `${CITIES.RIOBAMBA}-${CITIES.HUAQUILLAS}-${PROVIDERS.COOP_PATRIA}`,
	HUAQUILLAS_RIOBAMBA_COOP_PATRIA = `${CITIES.HUAQUILLAS}-${CITIES.RIOBAMBA}-${PROVIDERS.COOP_PATRIA}`,
	RIOBAMBA_MANTA_TRANS_VENCEDORES = `${CITIES.RIOBAMBA}-${CITIES.MANTA}-${PROVIDERS.COOP_TRANS_VENCEDORES}`,
	MANTA_RIOBAMBA_TRANS_VENCEDORES = `${CITIES.MANTA}-${CITIES.RIOBAMBA}-${PROVIDERS.COOP_TRANS_VENCEDORES}`,
	CATAMAYO_RIOBAMBA_SANTA = `${CITIES.CATAMAYO}-${CITIES.RIOBAMBA}-${PROVIDERS.COOP_SANTA}`
}

export const regions: Region[] = [
	{ name: 'Litoral o Costa', id: REGIONS.COSTA },
	{ name: 'Sierra o Interandina', id: REGIONS.SIERRA },
	{ name: 'Oriente o Amazonía', id: REGIONS.ORIENTE }
];

export const provinces: Province[] = [
	// Costa region
	{ name: 'El Oro', regionId: REGIONS.COSTA, id: PROVINCES.EL_ORO },
	{ name: 'Esmeraldas', regionId: REGIONS.COSTA, id: PROVINCES.ESMERALDAS },
	{ name: 'Guayas', regionId: REGIONS.COSTA, id: PROVINCES.GUAYAS },
	{ name: 'Los Ríos', regionId: REGIONS.COSTA, id: PROVINCES.LOS_RIOS },
	{ name: 'Manabí', regionId: REGIONS.COSTA, id: PROVINCES.MANABI },
	{ name: 'Santa Elena', regionId: REGIONS.COSTA, id: PROVINCES.SANTA_ELENA },
	{ name: 'Santo Domingo de los Tsachilas', regionId: REGIONS.COSTA, id: PROVINCES.SANTO_DOMINGO },
	// Sierra region
	{ name: 'Azuay', regionId: REGIONS.SIERRA, id: PROVINCES.AZUAY },
	{ name: 'Bolívar ', regionId: REGIONS.SIERRA, id: PROVINCES.BOLIVAR },
	{ name: 'Cañar', regionId: REGIONS.SIERRA, id: PROVINCES.CANAR },
	{ name: 'Carchi', regionId: REGIONS.SIERRA, id: PROVINCES.CARCHI },
	{ name: 'Cotopaxi', regionId: REGIONS.SIERRA, id: PROVINCES.COTOPAXI },
	{ name: 'Chimborazo', regionId: REGIONS.SIERRA, id: PROVINCES.CHIMBORAZO },
	{ name: 'Imbabura', regionId: REGIONS.SIERRA, id: PROVINCES.IMBABURA },
	{ name: 'Loja', regionId: REGIONS.SIERRA, id: PROVINCES.LOJA },
	{ name: 'Pichincha', regionId: REGIONS.SIERRA, id: PROVINCES.PICHINCHA },
	{ name: 'Tungurahua', regionId: REGIONS.SIERRA, id: PROVINCES.TUNGURAHUA },
	// Oriente region
	{ name: 'Morona Santiago', regionId: REGIONS.ORIENTE, id: PROVINCES.MORONA_SANTIAGO },
	{ name: 'Napo', regionId: REGIONS.ORIENTE, id: PROVINCES.NAPO },
	{ name: 'Orellana', regionId: REGIONS.ORIENTE, id: PROVINCES.ORELLANA },
	{ name: 'Pastaza', regionId: REGIONS.ORIENTE, id: PROVINCES.PASTAZA },
	{ name: 'Sucumbíos', regionId: REGIONS.ORIENTE, id: PROVINCES.SUCUMBÍOS },
	{ name: 'Zamora Chinchipe', regionId: REGIONS.ORIENTE, id: PROVINCES.ZAMORA_CHINCHIPE }
];

const dateFields = { createdAt: new Date(), updatedAt: new Date() };

export const cities: City[] = [
	{ id: CITIES.CUENCA, name: 'Cuenca', provinceId: PROVINCES.AZUAY, ...dateFields },
	{ id: CITIES.RIOBAMBA, name: 'Riobamba', provinceId: PROVINCES.CHIMBORAZO, ...dateFields },
	{ id: CITIES.MACHALA, name: 'Machala', provinceId: PROVINCES.EL_ORO, ...dateFields },
	{ id: CITIES.GUAYAQUIL, name: 'Guayaquil', provinceId: PROVINCES.GUAYAS, ...dateFields },
	{ id: CITIES.QUITO, name: 'Quito', provinceId: PROVINCES.PICHINCHA, ...dateFields },
	{ id: CITIES.HUAQUILLAS, name: 'Huaquillas', provinceId: PROVINCES.EL_ORO, ...dateFields },
	{ id: CITIES.MANTA, name: 'Manta', provinceId: PROVINCES.MANABI, ...dateFields },
	{ id: CITIES.CATAMAYO, name: 'Catamayo', provinceId: PROVINCES.LOJA, ...dateFields }
];

export const transportationProviders: TransportationProvider[] = [
	{
		id: PROVIDERS.COOP_PATRIA,
		name: 'Cooperativa Patria',
		logo: null,
		details: null,
		...dateFields
	},
	{
		id: PROVIDERS.COOP_CHIMBORAZO,
		name: 'Cooperativa Chimborazo',
		logo: null,
		details: null,
		...dateFields
	},
	{
		id: PROVIDERS.COOP_TRANS_VENCEDORES,
		name: 'Trans Vencedores',
		logo: null,
		details: null,
		...dateFields
	},
	{
		id: PROVIDERS.COOP_SANTA,
		name: 'Santa',
		logo: null,
		details: null,
		...dateFields
	}
];

export const routes: Route[] = [
	{
		id: ROUTES.RIOBAMBA_QUITO_COOP_PATRIA,
		startCityId: CITIES.RIOBAMBA,
		endCityId: CITIES.QUITO,
		transportationProviderId: PROVIDERS.COOP_PATRIA,
		distance: 166,
		estimatedTravelTime: 3.5,
		price: 5.5,
		...dateFields
	},
	{
		id: ROUTES.QUITO_RIOBAMBA_COOP_PATRIA,
		startCityId: CITIES.QUITO,
		endCityId: CITIES.RIOBAMBA,
		transportationProviderId: PROVIDERS.COOP_PATRIA,
		distance: 166,
		estimatedTravelTime: 3.5,
		price: 5.5,
		...dateFields
	},
	{
		id: ROUTES.RIOBAMBA_QUITO_COOP_CHIMBORAZO,
		startCityId: CITIES.RIOBAMBA,
		endCityId: CITIES.QUITO,
		transportationProviderId: PROVIDERS.COOP_CHIMBORAZO,
		distance: 166,
		estimatedTravelTime: 3.5,
		price: 5.5,
		...dateFields
	},
	{
		id: ROUTES.RIOBAMBA_CUENCA_COOP_PATRIA,
		startCityId: CITIES.RIOBAMBA,
		endCityId: CITIES.CUENCA,
		transportationProviderId: PROVIDERS.COOP_PATRIA,
		distance: 262,
		estimatedTravelTime: 6,
		price: 9.4,
		...dateFields
	},
	{
		id: ROUTES.RIOBAMBA_MACHALA_COOP_PATRIA,
		startCityId: CITIES.RIOBAMBA,
		endCityId: CITIES.MACHALA,
		transportationProviderId: PROVIDERS.COOP_PATRIA,
		distance: 313,
		estimatedTravelTime: 6,
		price: 8,
		...dateFields
	},
	{
		id: ROUTES.CUENCA_RIOBAMBA_COOP_PATRIA,
		startCityId: CITIES.CUENCA,
		endCityId: CITIES.RIOBAMBA,
		transportationProviderId: PROVIDERS.COOP_PATRIA,
		distance: 262,
		estimatedTravelTime: 6,
		price: 9.4,
		...dateFields
	},
	{
		id: ROUTES.RIOBAMBA_GUAYAQUIL_COOP_PATRIA,
		startCityId: CITIES.RIOBAMBA,
		endCityId: CITIES.GUAYAQUIL,
		transportationProviderId: PROVIDERS.COOP_PATRIA,
		distance: 227,
		estimatedTravelTime: 5,
		price: 9,
		...dateFields
	},
	{
		id: ROUTES.RIOBAMBA_HUAQUILLAS_COOP_PATRIA,
		startCityId: CITIES.RIOBAMBA,
		endCityId: CITIES.HUAQUILLAS,
		transportationProviderId: PROVIDERS.COOP_PATRIA,
		distance: 370,
		estimatedTravelTime: 8,
		price: 11.5,
		...dateFields
	},
	{
		id: ROUTES.HUAQUILLAS_RIOBAMBA_COOP_PATRIA,
		startCityId: CITIES.HUAQUILLAS,
		endCityId: CITIES.RIOBAMBA,
		transportationProviderId: PROVIDERS.COOP_PATRIA,
		distance: 370,
		estimatedTravelTime: 8,
		price: 12.5,
		...dateFields
	},
	{
		id: ROUTES.RIOBAMBA_MANTA_TRANS_VENCEDORES,
		startCityId: CITIES.RIOBAMBA,
		endCityId: CITIES.MANTA,
		transportationProviderId: PROVIDERS.COOP_TRANS_VENCEDORES,
		distance: 422,
		estimatedTravelTime: 9,
		price: 14.2,
		...dateFields
	},
	{
		id: ROUTES.MANTA_RIOBAMBA_TRANS_VENCEDORES,
		startCityId: CITIES.MANTA,
		endCityId: CITIES.RIOBAMBA,
		transportationProviderId: PROVIDERS.COOP_TRANS_VENCEDORES,
		distance: 422,
		estimatedTravelTime: 9,
		price: 13,
		...dateFields
	},
	{
		id: ROUTES.CATAMAYO_RIOBAMBA_SANTA,
		startCityId: CITIES.CATAMAYO,
		endCityId: CITIES.RIOBAMBA,
		transportationProviderId: PROVIDERS.COOP_SANTA,
		distance: 495,
		estimatedTravelTime: 10,
		price: 17,
		...dateFields
	}
];

export const schedulesData = [
	{
		routeId: `${ROUTES.RIOBAMBA_QUITO_COOP_PATRIA}`,
		schedules: [
			'03:30',
			'05:00',
			'07:00',
			'08:00',
			'08:30',
			'09:45',
			'10:00',
			'11:30',
			'11:45',
			'12:15',
			'13:00',
			'14:15',
			'14:30',
			'16:15',
			'17:45',
			'18:15',
			'18:45',
			'19:15',
			'19:45',
			'20:15',
			'22:00'
		]
	},
	{
		routeId: `${ROUTES.QUITO_RIOBAMBA_COOP_PATRIA}`,
		schedules: [
			'03:45',
			'04:30',
			'06:15',
			'07:00',
			'08:15',
			'08:45',
			'09:45',
			'11:00',
			'12:10',
			'12:20',
			'13:20',
			'13:40',
			'14:00',
			'15:00',
			'15:30',
			'17:15',
			'18:00',
			'18:15',
			'19:30'
		]
	},
	{
		routeId: `${ROUTES.RIOBAMBA_QUITO_COOP_CHIMBORAZO}`,
		schedules: [
			'03:15',
			'05:30',
			'06:30',
			'06:45',
			'09:15',
			'09:30',
			'10:45',
			'11:00',
			'12:00',
			'12:30',
			'13:15',
			'14:00',
			'15:15',
			'17:00',
			'17:30',
			'19:00'
		]
	},
	{
		routeId: `${ROUTES.RIOBAMBA_CUENCA_COOP_PATRIA}`,
		schedules: ['05:30', '07:30', '09:30', '11:00', '13:00', '15:30', '19:30', '22:30']
	},
	{
		routeId: `${ROUTES.RIOBAMBA_MACHALA_COOP_PATRIA}`,
		schedules: ['09:45', '14:15']
	},
	{
		routeId: `${ROUTES.CUENCA_RIOBAMBA_COOP_PATRIA}`,
		schedules: ['04:15', '05:15', '09:40', '11:15', '14:00', '15:30', '17:30', '19:15']
	},
	{
		routeId: `${ROUTES.RIOBAMBA_GUAYAQUIL_COOP_PATRIA}`,
		schedules: [
			'02:00',
			'03:00',
			'03:30',
			'04:30',
			'05:00',
			'06:30',
			'07:00',
			'07:30',
			'08:00',
			'08:30',
			'09:30',
			'10:30',
			'11:00',
			'11:30',
			'12:40',
			'13:30',
			'14:00',
			'15:30',
			'16:00',
			'17:00',
			'18:00',
			'19:00',
			'19:40',
			'20:30',
			'22:30'
		]
	},
	{
		routeId: `${ROUTES.RIOBAMBA_HUAQUILLAS_COOP_PATRIA}`,
		schedules: ['21:30']
	},
	{
		routeId: `${ROUTES.HUAQUILLAS_RIOBAMBA_COOP_PATRIA}`,
		schedules: ['14:30']
	},
	{
		routeId: `${ROUTES.RIOBAMBA_MANTA_TRANS_VENCEDORES}`,
		schedules: ['08:15', '22:00']
	},
	{
		routeId: `${ROUTES.MANTA_RIOBAMBA_TRANS_VENCEDORES}`,
		schedules: ['22:00']
	},
	{
		routeId: `${ROUTES.CATAMAYO_RIOBAMBA_SANTA}`,
		schedules: ['12:00', '13:00', '19:30']
	}
];

export const schedulesFormatted = schedulesData
	.map(({ routeId, schedules }): CreateScheduleDTO[] => {
		return schedules.map((departureTime): CreateScheduleDTO => {
			return { departureTime, isAvailable: true, routeId, ...dateFields };
		});
	})
	.flat();

(() => {
	void main();
})();

async function main(): Promise<void> {
	try {
		// Delete data from tables
		await prisma.schedule.deleteMany();
		await prisma.route.deleteMany();
		await prisma.transportationProvider.deleteMany();
		await prisma.city.deleteMany();
		await prisma.province.deleteMany();
		await prisma.region.deleteMany();

		// Insert seed data
		await prisma.region.createMany({ data: regions });
		await prisma.province.createMany({ data: provinces });
		await prisma.city.createMany({ data: cities });
		await prisma.transportationProvider.createMany({ data: transportationProviders });
		await prisma.route.createMany({ data: routes });
		await prisma.schedule.createMany({ data: schedulesFormatted });

		console.log('Data created!');
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await prisma.$disconnect();
	}
}
