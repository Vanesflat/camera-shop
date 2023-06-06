export type ReviewFormFields = {
  name: string;
  plus: string;
  minus: string;
  comment: string;
};

export type FormField = {
  label: string;
  placeholder: string;
  errorText: string;
  minLength?: number;
};
