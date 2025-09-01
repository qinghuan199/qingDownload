import axios from "axios";

export async function fetchTranslation(locale) {
  try {
    const response = await import(
      `../locale/${locale}.js`
    );
    return response[locale]; // 假设返回的是 JSON 格式的翻译文件
  } catch (error) {
    console.error(`Failed to load translation for ${locale}:`, error);
    return {}; // 请求失败时返回空对象
  }
}
