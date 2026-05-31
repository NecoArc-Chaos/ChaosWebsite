// 设备数据配置文件

export interface Device {
  name: string;
  image: string;
  specs: string;
  description: string;
  link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = Record<string, Device[]> & {
  自定义?: Device[];
};

export const devicesData: DeviceCategory = {
  通讯设备: [
    {
      name: "realme GT6",
      image: "/images/device/realmegt6.png",
      specs: "骁龙8gen3 / 16G + 512GB",
      description: "5800mhA Battery, 120W SuperVOOC.",
      link: "https://www.realme.com/cn/realme-gt-6",
    },
    {
      name: "Pixel 3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbOj33XAZiQn1DtNLdEcfEgYmaUPU3b_x3oz2v4t8Thw&s=10",
      specs: "骁龙845 / 4+64 / oled屏幕 / 线性马达",
      description: "闲鱼花220淘的，pixelos牛福",
      link: "https://zh.wikipedia.org/wiki/Pixel_3",
    },
    {
      name: "Pixel Watch 3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjYPaNFIYJEXKN7-tYU9u5PQ5slBMfl8RaV1LbjSifg&s=10",
      specs: "Wifi / 45mm / 美版",
      description:
        "Pixel Watch 3 的錶徑有45 公釐，螢幕較前一代大40% 以上，無論是運動、使用地圖或處理其他事務，一眼就能掌握更豐富的資訊. ",
      link: "https://www.google-mobile.cn/?product=pixel-watch-3",
    },
  ],
  相机: [
    {
      name: "insta360 GO 3S",
      image: "/images/device/insta360go3s.png",
      specs: "4K,128G,39g(本体)",
      description: "拇指相机，要便携有便携，要续航有便携",
      link: "https://www.insta360.com/product/insta360-go3s",
    },
  ],
};
