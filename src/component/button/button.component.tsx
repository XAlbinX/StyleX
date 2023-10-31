import './button.styles.scss';

interface ButtonProps {
  children: React.ReactNode;
  buttonType: "google" | "inverted";
  onClick?: () => void;
}

const BUTTON_TYPES_CLASSES: Record<string, string> = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button: React.FC<ButtonProps> = ({ children, buttonType,onClick,...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
    onClick={onClick} // Pass the onClick prop to the <button> element
    {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
