const BASE_URL = "http://itgirlschool.justmakeit.ru/api/words";

export const fetchWords = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Не удалось получить слово");
  return await response.json();
};

export const addWord = async (word) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(word),
  });
  if (!response.ok) throw new Error("Не удалось добавить слово");
  return response.json();
};

export const updateWord = async (id, word) => {
  const response = await fetch(`${BASE_URL}/${id}/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(word),
  });
  if (!response.ok) throw new Error("Не удалось изменить слово");
  return response.json();
};

export const deleteWord = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}/delete`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Не удалось удалить слово");
};
