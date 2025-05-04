import { getPrediction } from '@/remotes/ai';
import { useSuspenseQuery } from '@tanstack/react-query';

export const usePrediction = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['getPrediction', id],
    queryFn: async () => {
      const response = await getPrediction(id);
      return response.response;
    },
  });
};
