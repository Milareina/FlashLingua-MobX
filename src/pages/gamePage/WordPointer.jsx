import { useState } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import WordCard from "../../components/wordCard/WordCard"; 
import LeftArrow from "../../assets/left-arrow.svg";
import RightArrow from "../../assets/right-arrow.svg";
import "./WordPointer.module.scss";

const WordPointer = inject("wordStore")(
    observer(({ wordStore }) => {
        const { words } = wordStore; 
        const [currentIndex, setCurrentIndex] = useState(0);
        const [isAnimating, setIsAnimating] = useState(false);
        const [direction, setDirection] = useState("");
        const [learnedWords, setLearnedWords] = useState(new Set());
        const [isTranslationVisible, setIsTranslationVisible] = useState(false);

        const handleNext = () => {
            if (isAnimating) return;
            setDirection("next");
            setIsAnimating(true);
            setIsTranslationVisible(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex < words.length - 1 ? prevIndex + 1 : 0
                );
                setIsAnimating(false);
            }, 300);
        };

        const handlePrev = () => {
            if (isAnimating) return;
            setDirection("prev");
            setIsAnimating(true);
            setIsTranslationVisible(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : words.length - 1
                );
                setIsAnimating(false);
            }, 300);
        };

        const handleViewTranslation = () => {
            setLearnedWords((prevLearned) => {
                const updatedLearned = new Set(prevLearned);
                updatedLearned.add(currentIndex); 
                return updatedLearned;
            });
            setIsTranslationVisible(true);
        };

        if (!words || words.length === 0) {
            return <p>Список слов пуст</p>;
        }

        return (
            <div className="word-pointer">
                <div className="learned-words">
                    Изучено слов: {learnedWords.size} / {words.length}
                </div>
                <button className="arrow-btn left" onClick={handlePrev}>
                    <img src={LeftArrow} alt="Стрелка назад" />
                </button>

                <div className="word-card-wrapper">
                    <div
                        className={`card-animation ${
                            isAnimating ? `slide-${direction}` : ""
                        }`}
                    >
                        <WordCard
                            key={currentIndex}
                            english={words[currentIndex].english}
                            transcription={words[currentIndex].transcription}
                            russian={words[currentIndex].russian}
                            isTranslationVisible={isTranslationVisible} 
                            onViewTranslation={handleViewTranslation}
                        />
                    </div>
                </div>
                
                <button className="arrow-btn right" onClick={handleNext}>
                    <img src={RightArrow} alt="Стрелка вперед" />
                </button>
            </div>
        );
    })
);

WordPointer.propTypes = {
    words: PropTypes.arrayOf(
        PropTypes.shape({
            english: PropTypes.string.isRequired,
            transcription: PropTypes.string,
            russian: PropTypes.string.isRequired,
        })
    ),
    initialIndex: PropTypes.number,
};

WordPointer.defaultProps = {
    words: [],
    initialIndex: 0,
};

export default WordPointer;
