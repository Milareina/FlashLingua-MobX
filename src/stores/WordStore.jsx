import { makeAutoObservable } from "mobx";
import { fetchWords, addWord, updateWord, deleteWord } from "../api/Api";

class WordStore {
  words = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);  
    this.loadWords();
  }

  async loadWords() {
    this.loading = true;
    try {
      const data = await fetchWords();
      this.words = data;
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async addWord(word) {
    try {
      const newWord = await addWord(word);
      this.words.push(newWord);
    } catch (err) {
      this.error = err.message;
    }
  }

  async updateWord(id, updatedWord) {
    try {
      const updated = await updateWord(id, updatedWord);
      this.words = this.words.map((word) =>
        word.id === id ? updated : word
      );
    } catch (err) {
      this.error = err.message;
    }
  }

  async deleteWord(id) {
    try {
      await deleteWord(id);
      this.words = this.words.filter((word) => word.id !== id);
    } catch (err) {
      this.error = err.message;
    }
  }
}

const wordStore = new WordStore();
export default wordStore;
