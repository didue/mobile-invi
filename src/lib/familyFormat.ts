type FamilyContact = {
  name: string;
  role: string;
  rel: string;
};

export function formatParentName(contacts: FamilyContact[], role: string): string {
  return contacts.find((c) => c.role === role)?.name || '';
}

export function formatRel(contacts: FamilyContact[], selfRole: string): string {
  const self = contacts.find((c) => c.role === selfRole);
  return `${self?.rel ?? ""}`;
}

// 성을 뺀 이름(뒤 2글자)만 표시한다. 외자·복성 이름이 생기면 이 규칙을 다시 정한다.
export function formatGivenName(fullName: string): string {
  return fullName.slice(-2);
}
