import PropTypes from "prop-types";
import "./ErrorMessage.module.scss";
const ErrorIndicator = ({ code, message }) => (
    <div className="error-indicator">
      <h2 className="code">{code}</h2>
      <p className="text">Ошибка: {message}</p>
    </div>
  );
  ErrorIndicator.propTypes = {
    code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    message: PropTypes.string.isRequired,
  };
  
  export default ErrorIndicator;