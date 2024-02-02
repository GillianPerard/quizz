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

export type UserAnswer = string | Array<string>;
export type UserAnswers = Array<UserAnswer>;

export interface QuizzResult {
  questions: Array<[string, boolean]>;
  score: number;
}
