import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import './WordCard.module.scss';

const WordCard = ({ 
    english, 
    transcription,
    russian, 
    onViewTranslation, 
    isTranslationVisible,
    
 }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        
        if (buttonRef.current && !isTranslationVisible) {
            buttonRef.current.focus();
        }
    }, [isTranslationVisible]);

    return (
        <div className="word-card">
            <div className="word">{english}</div>
            <div className="transcription">{transcription}</div>
            {isTranslationVisible ? (
                <div className="translation visible">
                    {russian}
                </div>
            ) : (
                <button ref={buttonRef} onClick={onViewTranslation} className="check-button">
                    Проверить
                </button>
            )}
        </div>
    );
};

WordCard.propTypes = {
    english: PropTypes.string.isRequired,         
    transcription: PropTypes.string.isRequired,
    russian: PropTypes.string.isRequired, 
    onViewTranslation: PropTypes.func.isRequired,
    isTranslationVisible: PropTypes.bool.isRequired,
    
};
WordCard.defaultProps = {
    onCheck: null,
    onViewTranslation: null,
};
export default WordCard;

