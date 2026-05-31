import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/Chaoss.jpg", // 已恢复你的头像路径
  name: "NecoArc-Chaos",
  bio: "Ecc3:7",
  typewriter: {
    enable: true, // 启用个人简介打字机效果
    speed: 80, // 打字速度（毫秒）
  },
  links: [
    {
      name: "Bilibili",
      icon: "fa6-brands:bilibili",
      url: "https://space.bilibili.com/1823717804",
    },
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/NecoArc-Chaos",
    },
  ],
};
