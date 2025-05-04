export interface PredictionResponse {
  response: {
    predicted_price: number;
    predicted_profit: {
      value: number;
      confidence: number;
    };
  };
}
