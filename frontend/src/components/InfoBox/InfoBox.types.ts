export type InfoBoxVariant = 'info' | 'error' | 'warning' | 'success';

export interface InfoBoxProps {
  variant: InfoBoxVariant;
  message: string;
}
