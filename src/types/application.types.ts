export type FetchedApplicationType = {
  id: string;
  amount: number;
  reason: string;
  hide: boolean;
  rating: number;
  Verifier: {
    id: string;
    distance: number;
    fullname: string;
    phoneNum: string;
    selfie: string;
  };
} | null;

export type FetchedApplicationsType = FetchedApplicationType[];

export type ApplicationsActionStateAdditionalType = {
  applications: FetchedApplicationsType;
  hasMore: boolean;
};
