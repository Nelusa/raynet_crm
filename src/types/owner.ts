export interface Owner {
  id: number;
  titleBefore: string | null;
  firstName: string | null;
  lastName: string | null;
  titleAfter: string | null;
  fullName: string;
  avatar?: string;
}
