import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };
type DivProps = CommonProps & { as: 'div' };

type Props = ButtonProps | AnchorProps | DivProps;

// Reusable liquid-glass surface. Используется в кнопках, пилюлях,
// карточках. Стили вынесены в .liquid-glass в index.css.
export function LiquidGlass(props: Props) {
  const { className = '', children } = props;
  const cls = `liquid-glass ${className}`;
  if (props.as === 'a') {
    const { as: _a, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={cls} {...rest}>
        {children}
      </a>
    );
  }
  if (props.as === 'div') {
    const { as: _a, className: _c, children: _ch, ...rest } = props as DivProps & Record<string, unknown>;
    return (
      <div className={cls} {...rest}>
        {children}
      </div>
    );
  }
  const { as: _a, className: _c, children: _ch, ...rest } = props as ButtonProps;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
