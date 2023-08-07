export interface Option {
  text: string;
}

export interface Question {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: Option[];
}

export interface Survey {
  title: string;
  image: string;
  questions: Question[];
}
