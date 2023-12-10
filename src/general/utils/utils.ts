export function getKeyByValue<T>(value: any, enumValue: T): string | undefined {
  return Object.keys(enumValue).find(
    (key) => enumValue[key as keyof typeof enumValue] === value,
  );
}

export function getValueByKey<T>(key: string, enumValue: T): T | undefined {
  return enumValue[key];
}
