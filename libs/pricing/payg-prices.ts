export const GiB_BYTES = 1024 ** 3;
export const MiB_BYTES = 1024 ** 2;

export type RegionId = 'hzh' | 'bja' | 'gzg' | 'sgp';

export interface UnitPrices {
	/** ¥ per core-hour */
	cpuCoreHour: number;
	/** ¥ per GiB-hour */
	memoryGiBHour: number;
	/** ¥ per GiB-hour */
	storageGiBHour: number;
	/** ¥ per port-hour */
	portHour: number;
	/** ¥ per GiB traffic */
	networkGiB: number;
}

export const unitPricesByRegion: Record<RegionId, UnitPrices> = {
	hzh: {
		cpuCoreHour: 0.027671,
		memoryGiBHour: 0.013956,
		storageGiBHour: 0.000846,
		portHour: 0.0139,
		networkGiB: 0.000781,
	},
	bja: {
		cpuCoreHour: 0.017125,
		memoryGiBHour: 0.008637,
		storageGiBHour: 0.000523,
		portHour: 0.007,
		networkGiB: 0.000781,
	},
	gzg: {
		cpuCoreHour: 0.01742,
		memoryGiBHour: 0.008786,
		storageGiBHour: 0.000532,
		portHour: 0.007,
		networkGiB: 0.000781,
	},
	sgp: {
		cpuCoreHour: 0.067,
		memoryGiBHour: 0.033792,
		storageGiBHour: 0.002048,
		portHour: 0.0139,
		networkGiB: 0.000781,
	},
};
