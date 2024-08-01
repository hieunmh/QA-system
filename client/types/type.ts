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
  content: string;
  is_correct: boolean;
}