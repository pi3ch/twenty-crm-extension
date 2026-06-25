// LinkedIn Data Types
export type LinkedInProfileData = {
  type: 'person';
  linkedinUrl: string;
  firstName: string;
  lastName: string;
  headline?: string;
  currentCompany?: string;
  profileImageUrl?: string;
  location?: string;
};

export type LinkedInCompanyData = {
  type: 'company';
  linkedinUrl: string;
  name: string;
  website?: string;
  industry?: string;
  employeeCount?: string;
  logoUrl?: string;
  description?: string;
};

export type LinkedInData = LinkedInProfileData | LinkedInCompanyData;

// Twenty CRM Types
// Links composite type: primaryLinkUrl, primaryLinkLabel, secondaryLinks
export type TwentyLinks = {
  primaryLinkUrl?: string;
  primaryLinkLabel?: string;
  secondaryLinks?: Array<{ url: string; label: string }> | null;
};

export type TwentyPerson = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  linkedinLink?: TwentyLinks;
  jobTitle?: string;
  avatarUrl?: string;
  city?: string;
  company?: {
    id: string;
    name: string;
  };
};

export type TwentyCompany = {
  id: string;
  name: string;
  linkedinLink?: TwentyLinks;
  domainName?: TwentyLinks;
  employees?: number;
  idealCustomerProfile?: boolean;
};

// Extension State Types
export type CaptureStatus = 
  | 'idle'
  | 'loading'
  | 'exists'
  | 'ready'
  | 'saving'
  | 'saved'
  | 'error';

export type CaptureState = {
  status: CaptureStatus;
  existingRecord?: {
    id: string;
    type: 'person' | 'company';
  };
  error?: string;
  data?: LinkedInData;
};

// Message Types for Extension Communication
export type MessageType =
  | 'GET_AUTH_TOKEN'
  | 'CHECK_DUPLICATE'
  | 'CREATE_RECORD'
  | 'UPDATE_RECORD'
  | 'SEARCH_RECORDS'
  | 'GET_SETTINGS'
  | 'SAVE_SETTINGS'
  | 'TEST_CONNECTION'
  | 'GET_RECENT_CAPTURES'
  | 'GET_WORKSPACE_MEMBERS'
  | 'SCRAPE_PAGE';

export type ExtensionMessage = {
  type: MessageType;
  payload?: unknown;
};

export type ExtensionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Optional custom-field mappings. All blank by default — when a value is empty
// the corresponding field is simply not sent, so this never affects workspaces
// that don't have these custom fields configured.
export type CustomFieldConfig = {
  // Relation field to a workspace member (e.g. "accountOwner"); the member is
  // assigned as the record owner on new People and Companies.
  accountOwnerField?: string;
  accountOwnerMemberId?: string;
  // Select field set to its "new" value on newly created People (e.g. "leadStatus" -> "NEW").
  leadStatusField?: string;
  leadStatusNewValue?: string;
  // Select field set to a fixed value on newly created People (e.g. "leadSource" -> "LINKEDIN").
  leadSourceField?: string;
  leadSourceValue?: string;
};

// Settings
export type ExtensionSettings = {
  twentyUrl: string;
  apiKey: string;
  customFields: CustomFieldConfig;
};

// GraphQL Response Types
export type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
    path?: string[];
  }>;
};

export type PeopleQueryResult = {
  people: {
    edges: Array<{
      node: TwentyPerson;
    }>;
  };
};

export type CompaniesQueryResult = {
  companies: {
    edges: Array<{
      node: TwentyCompany;
    }>;
  };
};

export type CreatePersonResult = {
  createPerson: TwentyPerson;
};

export type CreateCompanyResult = {
  createCompany: TwentyCompany;
};

