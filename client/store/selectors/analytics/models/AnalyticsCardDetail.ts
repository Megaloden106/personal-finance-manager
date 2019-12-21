export interface AnalyticsCardDetail {
  title: string;
  details: {
    label: string;
    value: number;
    formatter?: (value: number) => string;
  }[];
}
