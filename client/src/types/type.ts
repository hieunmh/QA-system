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