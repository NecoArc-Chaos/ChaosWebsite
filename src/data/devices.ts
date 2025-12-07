// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	realme: [
		{
			name: "realme GT6",
			image: "/images/device/realmegt6.png",
			specs: "骁龙8gen3 / 16G + 512GB",
			description: "5800mhA Battery, 120W SuperVOOC.",
			link: "https://www.realme.com/cn/realme-gt-6",
		},
	],
	insta360: [
		{
			name: "Go 3S",
			image: "/images/device/insta360go3s.png",
			specs: "4K,128G,39g(本体)",
			description:
				"Powerful 4K in a tiny body means a whole lot of creativity! Mount it anywhere, take it everywhere.",
			link: "https://www.insta360.com/product/insta360-go3s",
		},
	],
};
