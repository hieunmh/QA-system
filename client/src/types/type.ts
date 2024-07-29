export type UserType = {
  id: string;
  name: string;
  email: string;
  image: string;
}

export type AnswerType = {
  content: string;
  is_correct: boolean;
}

export type QuestionType = {
  content: string;
  answers: AnswerType[]
}

export type ExamType = {
  id: string;
  code: string;
  redo: boolean;
  review: boolean;
  subject: string;
  time: number;
  created_at: string;
  questions: QuestionType[]
}