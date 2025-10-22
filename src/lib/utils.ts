// Emoji utilities for categories and subcategories
export function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    'Tiếng Anh': '🇺🇸',
    'Tiếng Nhật': '🇯🇵',
    'Tiếng Trung': '🇨🇳',
    'Tiếng Hàn': '🇰🇷',
    'Tiếng Pháp': '🇫🇷',
    'Tiếng Đức': '🇩🇪',
    'Tiếng Tây Ban Nha': '🇪🇸',
    'Tiếng Ý': '🇮🇹',
    'Tiếng Nga': '🇷🇺',
    'Tiếng Bồ Đào Nha': '🇵🇹',
    'Ngôn ngữ khác': '🌍',
    'Toán học': '🔢',
    'Vật lý': '⚛️',
    'Hóa học': '🧪',
    'Sinh học': '🧬',
    'Lịch sử': '📜',
    'Địa lý': '🌍',
    'Khoa học xã hội': '👥',
    'Kinh tế': '💰',
    'Kinh doanh': '🏢',
    'Marketing': '📈',
    'CNTT': '💻',
    'Lập trình': '👨‍💻',
    'Thiết kế': '🎨',
    'Âm nhạc': '🎵',
    'Nghệ thuật': '🎭',
    'Thể thao': '⚽',
    'Sức khỏe': '🏥',
    'Y học': '⚕️',
    'Luật pháp': '⚖️',
    'Tâm lý học': '🧠',
    'Giáo dục': '📚',
    'Khác': '📝'
  };

  return emojiMap[category] || '📚';
}

export function getSubCategoryEmoji(subCategory: string): string {
  const emojiMap: Record<string, string> = {
    // Tiếng Anh
    'Từ vựng cơ bản (Anh)': '📝',
    'Từ vựng nâng cao (Anh)': '📚',
    'Ngữ pháp (Anh)': '📖',
    'Luyện nghe (Anh)': '🎧',
    'Luyện nói (Anh)': '🗣️',
    'Luyện đọc (Anh)': '📖',
    'Luyện viết (Anh)': '✍️',
    'TOEIC': '📊',
    'IELTS': '🎯',
    'TOEFL': '🎓',
    'Business English': '💼',
    'Academic English': '🎓',
    'Idioms & Phrasal Verbs': '💭',
    'Synonyms & Antonyms': '🔄',

    // Tiếng Nhật
    'Hiragana': 'あ',
    'Katakana': 'ア',
    'Kanji': '漢',
    'Từ vựng JLPT N5': '🥉',
    'Từ vựng JLPT N4': '🥈',
    'Từ vựng JLPT N3': '🥇',
    'Từ vựng JLPT N2': '🏆',
    'Từ vựng JLPT N1': '👑',
    'Ngữ pháp tiếng Nhật': '📝',
    'Kanji theo chủ đề': '📚',

    // Tiếng Trung
    'Hàn tự': '汉',
    'Pinyin': '拼',
    'Từ vựng HSK 1-3': '🥉',
    'Từ vựng HSK 4-6': '🏆',
    'Thành ngữ (Trung)': '💭',

    // Tiếng Hàn
    'Hangul': '한',
    'Từ vựng TOPIK': '🎌',
    'Ngữ pháp tiếng Hàn': '📝',

    // Các ngôn ngữ khác
    'Từ vựng cơ bản (Khác)': '📝',
    'Ngữ pháp (Khác)': '📖',

    // Toán học
    'Đại số': '➕',
    'Hình học': '📐',
    'Giải tích': '📈',
    'Xác suất': '🎲',
    'Thống kê': '📊',

    // Khoa học
    'Vật lý': '⚛️',
    'Hóa học': '🧪',
    'Sinh học': '🧬',
    'Địa chất': '🌋',

    // Lịch sử & Địa lý
    'Lịch sử thế giới': '🌍',
    'Lịch sử Việt Nam': '🇻🇳',
    'Địa lý': '🗺️',

    // Kinh tế & Kinh doanh
    'Kinh tế vi mô': '💰',
    'Kinh tế vĩ mô': '🏛️',
    'Marketing': '📈',
    'Quản trị': '👔',

    // CNTT & Lập trình
    'Python': '🐍',
    'JavaScript': '🟨',
    'Java': '☕',
    'C++': '⚡',
    'HTML/CSS': '🌐',
    'SQL': '🗃️',
    'Machine Learning': '🤖',
    'Data Science': '📊',

    // Thiết kế
    'Photoshop': '🎨',
    'Illustrator': '✏️',
    'UI/UX': '💻',

    // Âm nhạc
    'Lý thuyết âm nhạc': '🎼',
    'Nhạc cụ': '🎹',
    'Hòa âm': '🎵',

    // Thể thao
    'Bóng đá': '⚽',
    'Bóng rổ': '🏀',
    'Bơi lội': '🏊',
    'Thể dục': '💪',

    // Sức khỏe & Y học
    'Giải phẫu': '🫀',
    'Dược học': '💊',
    'Dinh dưỡng': '🥗',
    'Tập luyện': '🏃',

    // Luật pháp
    'Luật dân sự': '⚖️',
    'Luật hình sự': '🚔',
    'Luật thương mại': '🏢',

    // Tâm lý học
    'Tâm lý học phát triển': '🌱',
    'Tâm lý học nhận thức': '🧠',
    'Tâm lý học xã hội': '👥',

    // Giáo dục
    'Phương pháp dạy học': '👨‍🏫',
    'Lý thuyết giáo dục': '📚',

    // Khác
    'Khác': '📝'
  };

  return emojiMap[subCategory] || '📋';
}
