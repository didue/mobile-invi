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