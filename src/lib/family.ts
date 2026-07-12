type FamilyContact = {
  name: string;
  role: string;
  rel: string;
};

export function formatParentsRel(contacts: FamilyContact[], selfRole: string): string {
  const father = contacts.find((c) => c.role === "father");
  const mother = contacts.find((c) => c.role === "mother");
  const self = contacts.find((c) => c.role === selfRole);
  return `${father?.name ?? ""} · ${mother?.name ?? ""}의\n${self?.rel ?? ""}`;
}
