type OpenAIChoice = {
  finish_reason: string;
  index: number;
  message: {
    content: string;
    role: string;
  }
};

type PredictAPIResponse = {
  lesson_plan: {
    choices: OpenAIChoice[];
    created: number;
    id: string,
    model: string,
    object: string,
    usage: {
      completion_tokens: number,
      prompt_tokens: number,
      total_tokens: number
    }
  },
  teaching_aid: string;
  teaching_aid_category: string;
};