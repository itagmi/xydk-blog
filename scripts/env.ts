/** .env 값 trim + HTTP 헤더용 ASCII 검증 (한글 주석/오타 방지) */
export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`환경 변수 ${name}이(가) 설정되지 않았습니다.`);
  }
  return value;
}

export function requireAsciiEnv(name: string): string {
  const value = requireEnv(name);

  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) > 0x7f) {
      throw new Error(
        `${name}에 ASCII가 아닌 문자가 포함되어 있습니다 (index ${i}, code ${value.charCodeAt(i)}). ` +
          `.env에서 키 값 끝의 한글·공백·주석을 제거했는지 확인해주세요.`,
      );
    }
  }

  return value;
}
