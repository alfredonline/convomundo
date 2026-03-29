export interface Topic {
  _id: string;
  title: string;
  summary?: string;
  language?: string;
  questions?: string[];
  vocabulary?: string[];
  images?: string[];
  exampleSentences?: string[];
  collocations?: string[];
  createdAt?: string;
}
