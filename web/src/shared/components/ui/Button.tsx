import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
type ButtonSize = 'sm' | 'md';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]',
  secondary:
    'bg-white text-[var(--color-primary)] border border-gray-200 hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)]',
  ghost: 'bg-transparent text-[var(--color-text-muted)] hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  gold: 'bg-[var(--color-gold)] text-[var(--color-primary-dark)] font-semibold hover:bg-[var(--color-gold-light)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
