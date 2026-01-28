export function getJosa(word: string, type: '은/는' | '이/가' | '을/를' | '과/와' | '으로/로' | '에서'): string {
    if (!word) return '';
    const lastChar = word.charCodeAt(word.length - 1);
    // Check if it's a Korean character
    if (lastChar < 0xAC00 || lastChar > 0xD7A3) return type.split('/')[1] || type; // Default to vowel case or handle non-Korean

    const jongseongIndex = (lastChar - 0xAC00) % 28;
    const hasJongseong = jongseongIndex > 0;

    switch (type) {
        case '은/는': return hasJongseong ? '은' : '는';
        case '이/가': return hasJongseong ? '이' : '가';
        case '을/를': return hasJongseong ? '을' : '를';
        case '과/와': return hasJongseong ? '과' : '와';
        case '으로/로': return (hasJongseong && jongseongIndex !== 8) ? '으로' : '로';
        case '에서': return '에서'; // '에서' is always '에서' regardless of batchim, but included for consistency
        default: return type;
    }
}

export function appendJosa(word: string, type: '은/는' | '이/가' | '을/를' | '과/와' | '으로/로' | '에서'): string {
    return word + getJosa(word, type);
}
