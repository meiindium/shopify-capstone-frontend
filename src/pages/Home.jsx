import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, processBogusPayment } from '../services/api';
import PricingCard from '../components/PricingCard';

const plans = [
  { id: 'basic', name: 'Basic', price: '$9', features: ['1 User', '10GB Storage', 'Basic Support'] },
  { id: 'pro', name: 'Pro', price: '$19', features: ['5 Users', '50GB Storage', 'Priority Support'], isPopular: true },
  { id: 'premium', name: 'Premium', price: '$29', features: ['Unlimited Users', '1TB Storage', '24/7 Support'] }
];

export default function Home() {
  const [loadingId, setLoadingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [cardNumber, setCardNumber] = useState('1'); // Default to success
  const [processing, setProcessing] = useState(false);
  
  const navigate = useNavigate();

  const handleSubscribe = async (planId) => {
    setLoadingId(planId);
    try {
      const { data } = await createOrder(planId);
      setCurrentOrder(data.order);
      setShowModal(true); // Open the Bogus Gateway Modal
    } catch (error) {
      alert('Failed to initiate checkout.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleBogusSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
        const { data } = await processBogusPayment({
            order_id: currentOrder.id,
            card_number: cardNumber
        });

        if (data.success) {
            navigate(`/success?order_id=${currentOrder.id}`);
        } else {
            navigate('/cancel');
        }
    } catch (error) {
        alert('Simulated Gateway Error (You probably typed 3). Order Failed.');
        navigate('/cancel');
    } finally {
        setProcessing(false);
        setShowModal(false);
    }
  };

  return (
    <div className="pricing-container">
      <div className="header-text">
        <h1>Simple, transparent pricing</h1>
        <p>Choose the plan that's right for your business.</p>
      </div>
      
      <div className="grid">
        {plans.map(plan => (
          <PricingCard 
            key={plan.id} 
            plan={plan} 
            onSubscribe={() => handleSubscribe(plan.id)}
            isLoading={loadingId === plan.id}
            isDisabled={loadingId !== null}
          />
        ))}
      </div>

      {/* CUSTOM BOGUS GATEWAY MODAL */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle} className="card">
            <h2 style={{ marginBottom: '1rem' }}>Bogus Gateway (Test)</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Simulate a payment. Enter <strong>1</strong> for success, <strong>2</strong> for decline, or <strong>3</strong> for error.
            </p>
            
            <form onSubmit={handleBogusSubmit}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Card Number</label>
                <input 
                    type="text" 
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={inputStyle}
                    required
                />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)} disabled={processing}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={processing}>
                        {processing ? 'Processing...' : 'Pay Now'}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple inline styles for the modal overlay
const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
};
const modalContentStyle = {
    width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-surface)', padding: '2rem'
};
const inputStyle = {
    width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '1rem'
};