import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (hasError) {
        console.log('entrou aqui 2')
      // Aqui você pode logar o erro para um serviço
      console.error(error);
    }
  }, [hasError, error]);

  const errorHandler = (error) => {
    setHasError(true);
    setError(error);
  };

  const resetErrorBoundary = () => {
    setHasError(false);
    setError(null);
  };

  return (
    <React.Fragment>
      {hasError ? (
        <div>
          <h1>Something went wrong: {error.message}</h1>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      ) : (
        React.Children.map(children, child =>
          React.cloneElement(child, {
            onError: errorHandler
          })
        )
      )}
    </React.Fragment>
  );
};

export default ErrorBoundary;