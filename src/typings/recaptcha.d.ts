declare var grecaptcha: {
    render: (container: string, parameters: { sitekey: string }) => void;
    getResponse: () => string;
    reset: () => void;
  };