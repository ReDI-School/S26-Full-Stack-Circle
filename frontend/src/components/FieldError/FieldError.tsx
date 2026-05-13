type FieldErrorProps = {
  id: string;
  message?: string;
};

const FieldError = ({ id, message }: FieldErrorProps) =>
  message ? (
    <p id={id} role="alert" className="text-xs text-red-600 mt-1 flex items-center gap-1">
      {message}
    </p>
  ) : null;

export default FieldError;
