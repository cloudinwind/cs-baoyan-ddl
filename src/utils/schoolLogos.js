// 学校 logo 映射工具
import universitiesData from '../../2025_universities.json';

// 创建学校名称到logo URL的映射
const logoMap = {
  // 手动添加的额外Logo
  '香港科技大学': '/university_logos/香港科技大学.jpg',
  '上海创智学院': '/university_logos/上海创智学院.jpg',
  '香港中文大学': '/university_logos/香港中文大学.jpg'
};

// 处理大学名称，清除附加信息，只保留大学主名称
function processUniversityName(fullName) {
  // 去除双一流/985/211等标签
  let cleanName = fullName.replace(/双一流\/985\/211|双一流|985\/211|985|211/g, '').trim();
  
  // 去除英文名称（通常位于中文名后）
  if (cleanName.includes(' ')) {
    cleanName = cleanName.split(' ')[0].trim();
  }
  
  return cleanName;
}

// 构建映射关系
universitiesData.forEach(uni => {
  const cleanName = processUniversityName(uni.name);
  // 只有当手动添加的映射中不存在时才添加
  if (!logoMap[cleanName] && uni.logo_url) {
    logoMap[cleanName] = uni.logo_url;
  }
});

/**
 * 根据学校名称获取logo URL
 * @param {string} schoolName - 学校名称
 * @returns {string|null} - 返回logo URL，如果没找到则返回null
 */
export function getSchoolLogo(schoolName) {
  // 直接匹配
  if (logoMap[schoolName]) {
    return logoMap[schoolName];
  }
  
  // 尝试部分匹配（例如，"清华大学"可能与"清华大学"匹配）
  const keys = Object.keys(logoMap);
  for (const key of keys) {
    if (schoolName.includes(key) || key.includes(schoolName)) {
      return logoMap[key];
    }
  }
  
  // 如果没有找到匹配，返回默认logo或null
  return null;
}

// 用于测试和调试
export function getAllLogoMappings() {
  return logoMap;
}

export default {
  getSchoolLogo,
  getAllLogoMappings
}; 