export type UserType = {
  id: string;
  email: string;
  name: string;
  role: string;
  image: string;
}

export type QuestionType = {
  content: string;
  answers: AnswerType[]
}

export type AnswerType = {
  id?: string;
  content: string;
  is_correct: boolean;
}

export type ExamType = {
  code: string;
  user_id: string;
  id: string;
  redo: boolean;
  review: boolean;
  questions: QuestionType[]
  time: number;
  created_at: string;
  subject: string;
}