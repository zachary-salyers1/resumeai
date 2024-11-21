const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!groqApiKey) {
  throw new Error('Missing Groq API key');
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

export const groq = {
  chat: {
    completions: {
      create: async ({
        messages,
        model,
        temperature = 0.7,
        max_tokens = 1000,
        response_format,
      }: {
        messages: ChatMessage[];
        model: string;
        temperature?: number;
        max_tokens?: number;
        response_format?: { type: string };
      }) => {
        const response = await fetch('https://api.groq.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages,
            temperature,
            max_tokens,
            ...(response_format && { response_format }),
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Groq API error: ${response.status} - ${errorData}`);
        }

        const data = await response.json() as ChatCompletionResponse;
        return data;
      },
    },
  },
};
