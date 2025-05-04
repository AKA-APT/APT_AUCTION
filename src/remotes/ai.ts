import { PredictionResponse } from '@/models/ai';
import { httpClient } from '@/utils/http-client';

export function getPrediction(id: string) {
  return httpClient.get<PredictionResponse>(`/ai/predict/${id}`);
}
