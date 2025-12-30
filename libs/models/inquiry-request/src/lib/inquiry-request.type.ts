export type InquiryQuestion = {
  alias: string;
  question: string;
  responseType: 'boolean' | 'string';
};

export type InquiryResponse = {
  question: string;
  response: string | boolean;
};

export type InquiryCategory = {
  title: string;
  questions: InquiryQuestion[];
};
