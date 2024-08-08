export type UserType = {
  id: string;
  email: string;
  name: string;
  role: string;
  image: string;
}

export type QuestionType = {
  id?: string;
  content: string;
  answers: AnswerType[]
}

export type AnswerType = {
  id?: string;
  content: string;
  is_correct: boolean;
}

export type ResultType = {
  id: string;
  user_id: string;
  exam_id: string;  
  score: number
  review: boolean;
  redo: boolean;
  user: UserType
}

export type HistoryType = {
  id: string;
  user_id: string;
  exam_id: string;
  question_id: string;
  answer_id: string;
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
  results: ResultType[],
  histories: HistoryType[]
}