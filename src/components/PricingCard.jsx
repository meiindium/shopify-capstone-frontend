import { Check } from 'lucide-react';

export default function PricingCard({ plan, onSubscribe, isLoading, isDisabled }) {

    const buttonClass = plan.isPopular ? 'btn btn-primary' : 'btn btn-outline';

  return (
    <div className={`card pricing-card ${plan.isPopular ? 'popular' : ''}`}>
      {plan.isPopular && <span className="badge">Most Popular</span>}
      
      <h3>{plan.name}</h3>
      <div className="price">{plan.price}<span>/month</span></div>
      
      <ul className="features">
        {plan.features.map((feature, idx) => (
          <li key={idx}>
            <Check size={18} color="#10B981" /> 
            {feature}
          </li>
        ))}
      </ul>
      

      <button 
        className={buttonClass}
        onClick={onSubscribe} 
        disabled={isDisabled || isLoading}
        style={{ marginTop: 'auto' }}
      >
        {isLoading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </div>
  );
}