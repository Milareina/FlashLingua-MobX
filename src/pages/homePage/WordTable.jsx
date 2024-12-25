import React, { useState } from "react";
import { observer } from "mobx-react";
import AddWordForm from "../../components/addWord/AddWordButton";
import wordStore from "../../stores/WordStore";
import "./WordTable.module.scss";

const WordTable = observer(() => {
  const { words, addWord, updateWord, deleteWord } = wordStore;
  const [editingWord, setEditingWord] = useState(null);
  const [tempWord, setTempWord] = useState({});
  const [errors, setErrors] = useState({});

  const handleEdit = (word) => {
    setEditingWord(word.id);
    setTempWord({ ...word });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingWord(null);
    setTempWord({});
    setErrors({});
  };

  const handleSave = async () => {
    const validationErrors = validateFields(tempWord);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Все поля должны быть заполнены");
      return;
    }

    await updateWord(editingWord, tempWord); 
    setEditingWord(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempWord((prev) => ({ ...prev, [name]: value }));

    if (value.trim()) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Поле не должно быть пустым" }));
    }
  };

  const handleAddWord = async (word) => {
    try {
      await addWord(word); 
    } catch (err) {
      console.error("Ошибка добавления слова:", err);
    }
  };

  const handleDeleteWord = async (id) => {
    try {
      await deleteWord(id); 
    } catch (err) {
      console.error("Ошибка удаления слова:", err);
    }
  };

  const validateFields = (fields) => {
    const errors = {};
    if (!fields.english || fields.english.trim() === "") errors.english = "Поле не должно быть пустым";
    if (!fields.transcription || fields.transcription.trim() === "") errors.transcription = "Поле не должно быть пустым";
    if (!fields.russian || fields.russian.trim() === "") errors.russian = "Поле не должно быть пустым";
    return errors;
  };

  const renderEditableRow = () => {
    const isSaveDisabled = Object.keys(errors).length > 0 ||
      !tempWord.english ||
      !tempWord.transcription ||
      !tempWord.russian;

    return (
      <>
        <div className={`cell ${errors.english ? "error" : ""}`}>
          <input
            type="text"
            name="english"
            value={tempWord.english || ""}
            onChange={handleInputChange}
            className={errors.english ? "error-border" : ""}
          />
          {errors.english && <div className="error-message">{errors.english}</div>}
        </div>
        <div className={`cell ${errors.transcription ? "error" : ""}`}>
          <input
            type="text"
            name="transcription"
            value={tempWord.transcription || ""}
            onChange={handleInputChange}
            className={errors.transcription ? "error-border" : ""}
          />
          {errors.transcription && <div className="error-message">{errors.transcription}</div>}
        </div>
        <div className={`cell ${errors.russian ? "error" : ""}`}>
          <input
            type="text"
            name="russian"
            value={tempWord.russian || ""}
            onChange={handleInputChange}
            className={errors.russian ? "error-border" : ""}
          />
          {errors.russian && <div className="error-message">{errors.russian}</div>}
        </div>
        <div className="cell">
          <button onClick={handleSave} className="save-btn" disabled={isSaveDisabled}>
            Сохранить
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            Отмена
          </button>
        </div>
      </>
    );
  };

  const renderReadOnlyRow = (word) => (
    <>
      <div className="cell">{word.english}</div>
      <div className="cell">{word.transcription}</div>
      <div className="cell">{word.russian}</div>
      <div className="cell">
        <button onClick={() => handleEdit(word)} className="edit-btn">
          Изменить
        </button>
        <button onClick={() => handleDeleteWord(word.id)} className="delete-btn">
          Удалить
        </button>
      </div>
    </>
  );

  return (
    <div>
      <AddWordForm onWordAdded={handleAddWord} />
      <div className="word-grid">
        <div className="header">#</div>
        <div className="header">Английский</div>
        <div className="header">Транскрипция</div>
        <div className="header">Русский</div>
        <div className="header">Действие</div>

        {words.map((word, index) => (
          <React.Fragment key={word.id}>
            <div className="cell">{index + 1}</div>
            {editingWord === word.id
              ? renderEditableRow()
              : renderReadOnlyRow(word)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

export default WordTable;
