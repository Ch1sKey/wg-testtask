import "./Button.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  red?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ red, className, ...rest }) => {
  return (
    <button
      className={`button ${red ? "button_red" : ""} ${className}`}
      {...rest}
    />
  );
};
