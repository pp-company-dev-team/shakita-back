export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Application = {
  __typename?: 'Application';
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  place: Scalars['String']['output'];
  status: ApplicationStatus;
};

export enum ApplicationStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Bonus = {
  __typename?: 'Bonus';
  asset: Scalars['String']['output'];
  count: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  payload?: Maybe<Scalars['JSON']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BonusTicket = {
  __typename?: 'BonusTicket';
  activeTill?: Maybe<Scalars['DateTime']['output']>;
  code: Scalars['String']['output'];
  id: Scalars['String']['output'];
  ticketType: BonusTicketType;
};

export enum BonusTicketType {
  Const = 'CONST',
  Disposable = 'DISPOSABLE'
}

export type Mutation = {
  __typename?: 'Mutation';
  activateBonus?: Maybe<SuccessOutput>;
  createBonus?: Maybe<Bonus>;
  createBonusTicket?: Maybe<BonusTicket>;
  createOneApplication: Application;
  createOneUser: User;
  deleteBonus?: Maybe<SuccessOutput>;
  deleteBonusTicket?: Maybe<SuccessOutput>;
  deleteOneApplication: SuccessOutput;
  deleteOneUser: SuccessOutput;
  register: Tokens;
  updateOneApplication: SuccessOutput;
  updateOneUser: User;
};


export type MutationActivateBonusArgs = {
  bonusTicketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateBonusArgs = {
  asset: Scalars['String']['input'];
  count: Scalars['String']['input'];
};


export type MutationCreateBonusTicketArgs = {
  activeTill: Scalars['DateTime']['input'];
  bonusId: Scalars['String']['input'];
  code: Scalars['String']['input'];
  ticketType?: InputMaybe<BonusTicketType>;
  userId: Scalars['String']['input'];
};


export type MutationCreateOneApplicationArgs = {
  date: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  notificationOnMail?: Scalars['Boolean']['input'];
  payload?: InputMaybe<PayloadArgs>;
  place: Scalars['String']['input'];
};


export type MutationCreateOneUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: UserRole;
};


export type MutationDeleteBonusArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteBonusTicketArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOneApplicationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOneUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateOneApplicationArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  place?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ApplicationStatus>;
};


export type MutationUpdateOneUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type PayloadArgs = {
  instagram?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  telegram?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  findApplications?: Maybe<Array<Application>>;
  findApplicationsByDate?: Maybe<Array<Application>>;
  findApplicationsHistory?: Maybe<Array<Application>>;
  findOneApplication?: Maybe<Application>;
  findOneUser?: Maybe<User>;
  login: Tokens;
  refresh: Tokens;
};


export type QueryFindApplicationsArgs = {
  date_from?: InputMaybe<Scalars['DateTime']['input']>;
  date_to?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ApplicationStatus>;
};


export type QueryFindApplicationsByDateArgs = {
  date: Scalars['DateTime']['input'];
};


export type QueryFindApplicationsHistoryArgs = {
  email: Scalars['String']['input'];
};


export type QueryFindOneApplicationArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryRefreshArgs = {
  token: Scalars['String']['input'];
};

export type SuccessOutput = {
  __typename?: 'SuccessOutput';
  success: Scalars['Boolean']['output'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserRole {
  Admin = 'admin',
  UnregisteredUser = 'unregisteredUser',
  User = 'user'
}
