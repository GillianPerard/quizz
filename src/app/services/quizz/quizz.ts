import { AnswerType } from './answer-type.enum';

export interface ChoiceQuestion {
  answer: string;
  answerType: AnswerType.Choice;
  choices: Array<string>;
  label: string;
}

export interface MultipleChoiceQuestion {
  answerType: AnswerType.MultipleChoice;
  answers: Array<string>;
  choices: Array<string>;
  label: string;
}

export interface TextQuestion {
  answer: string;
  answerType: AnswerType.Text;
  label: string;
}

export type Question = ChoiceQuestion | MultipleChoiceQuestion | TextQuestion;
export type Questions = Array<Question>;
