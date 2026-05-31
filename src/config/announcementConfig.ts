import type { AnnouncementConfig } from "../types/config";

// 公告栏配置
export const announcementConfig: AnnouncementConfig = {
  title: "Coming Posts & Note", // 已恢复你的公告标题
  content: `1.Gal杂谈 
              2.关于《朝圣》
              3.关于本站
              4.#鸽鸽鸽鸽鸽
`, // 已恢复你的公告内容
  closable: false, // 恢复旧配置：不允许用户关闭公告
  link: {
    enable: false, // 恢复旧配置：禁用底部链接
    text: "Learn More", // 链接文本
    url: "/about/", // 链接 URL
    external: false, // 内部链接
  },
};
