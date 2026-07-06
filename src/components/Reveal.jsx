import useReveal from '../hooks/useReveal';

export default function Reveal({ children, delay = 0, className = '', threshold }) {
  const [ref, inView] = useReveal(threshold);
  const delayClass = delay ? `reveal-delay-${delay}` : '';

  return (
    <div ref={ref} className={`reveal ${delayClass} ${inView ? 'in-view' : ''} ${className}`}>
      {children}
    </div>
  );
}
