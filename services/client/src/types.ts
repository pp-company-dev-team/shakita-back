export type ItemType = {
  dayName?: string;
  dayInNumber?: string;
  day?: string;
  time?: string;
};

export type BodyForm = {
  status_book: boolean;
  name: string;
  email: string;
  phone: string;
  date: string;
  id_table: string;
};

export type TablesActiveType = {
  date: string;
  email: string;
  id_table: string;
  name: string;
  phone: string;
  status_book: boolean;
};

export type TablesType = {
  id_table: string;
  name: string;
  status_book: boolean;
};

export type StyledBookType = {
  $tables: TablesType[];
  $tables_active: TablesActiveType[];
  $choosed_table: string;
};

export type ApplicationType = {
  _id: string;
  id_table: string;
  phone: string;
  email: string;
  name: string;
  date: string;
  status_book: boolean;
};

export type AccountType = {
  _id: string;
  id: string;
  id_type: string;
  username: string;
  phone: string;
  roles: string[];
};
