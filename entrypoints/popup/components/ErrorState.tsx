interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  variant?: 'error' | 'unsupported';
}

export default function ErrorState({ error, onRetry, variant = 'error' }: ErrorStateProps) {
  const isUnsupported = variant === 'unsupported';

  return (
    <div className={`converter-error ${isUnsupported ? 'unsupported' : ''}`}>
      <h3>{isUnsupported ? 'Open a Web Page' : '❌ Conversion Failed'}</h3>
      <p>{error}</p>
      <button className="action-button secondary" onClick={onRetry}>
        {isUnsupported ? 'Check Again' : '🔄 Try Again'}
      </button>
    </div>
  );
}
