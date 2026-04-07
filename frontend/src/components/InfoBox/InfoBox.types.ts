export type InfoBoxVariant = 'info' | 'error' | 'warning' | 'success';

export type VariantConfig = {
  icon: React.ReactNode;
  role?: 'alert';
};

export interface InfoBoxProps {
  /**
  * The variant of the component
  * @default info
  */
  variant?: InfoBoxVariant;
  
  /**
  * The content of the component
  */
  message: string;
}
