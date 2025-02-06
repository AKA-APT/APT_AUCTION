import React, { ErrorInfo } from 'react';
import { AxiosError } from 'axios';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false } as State;
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <>{this.props.fallback}</>;
    }
    return children;
  }
}
