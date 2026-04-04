export type InfoBoxVariant = 'info' | 'error' | 'warning' | 'success';

export type VariantConfig = {
  icon: React.ReactNode;
  role?: 'alert';
};

export interface InfoBoxProps {
  variant: InfoBoxVariant;
  message: string;
}
