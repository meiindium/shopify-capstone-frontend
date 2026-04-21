import { Loader2 } from 'lucide-react';

export default function Spinner({ size = 40, color = 'var(--primary)', text = 'Loading...' }) {
  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
    }}>
      <Loader2 
        size={size} 
        color={color} 
        style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} 
      />
      {text && <h3 style={{ color: 'var(--text-muted)' }}>{text}</h3>}
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}