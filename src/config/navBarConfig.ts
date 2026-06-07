import type { NavBarConfig } from "../types/config";
import { LinkPreset } from "../types/config";

/**
 * 导航栏菜单配置
 */
export const navBarConfig: NavBarConfig = {
  links: [
    // 预设链接：首页
    LinkPreset.Home,
    // 预设链接：归档
    LinkPreset.Archive,

    // 自定义一级下拉菜单示例：外部链接集合
    {
      name: "Links",
      url: "/links/",
      icon: "material-symbols:link",
      children: [
        {
          name: "GitHub",
          url: "https://github.com/NecoArc-Chaos",
          external: true, // 外部链接，新标签页打开
          icon: "fa7-brands:github",
        },
        {
          name: "Bilibili",
          url: "https://space.bilibili.com/1823717804",
          external: true,
          icon: "fa7-brands:bilibili",
        },
      ],
    },

    // 自定义一级下拉菜单示例：个人内容页面
    {
      name: "My",
      url: "/content/",
      icon: "material-symbols:person",
      children: [
        {
          name: "Anime",
          url: "/anime/",
          icon: "material-symbols:movie",
        },
        {
          name: "Diary",
          url: "/diary/",
          icon: "material-symbols:book",
        }, // 已成功加回日记页面
        {
          name: "Gallery",
          url: "/albums/",
          icon: "material-symbols:photo-library",
        },
        {
          name: "Devices",
          url: "/devices/",
          icon: "material-symbols:devices",
          external: false, // 内部链接，当前页导航
        },
      ],
    },

    // 自定义一级下拉菜单示例：关于相关
    {
      name: "About",
      url: "/content/",
      icon: "material-symbols:info",
      children: [
        {
          name: "About",
          url: "/about/",
          icon: "material-symbols:person",
        },
        {
          name: "Friends",
          url: "/friends/",
          icon: "material-symbols:group",
        },
      ],
    },
  ],
};
