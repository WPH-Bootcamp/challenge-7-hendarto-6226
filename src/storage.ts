import * as fs from 'fs';
import * as path from 'path';

// TODO: Definisikan path file untuk menyimpan data To-Do

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)

import { Todo } from './todoService.js';
import { isTodoArray } from './utils.js';

const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'todos.json');

// Make sure data folder exists
function ensureDataDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load todos from JSON file
export function loadTodos(): Todo[] {
  try {
    ensureDataDirectory();

    if (!fs.existsSync(dataFile)) {
      return [];
    }

    const data = fs.readFileSync(dataFile, 'utf-8');
    const parsedData = JSON.parse(data);

    if (isTodoArray(parsedData)) {
      // Convert plain objects back to Todo instances
      const todos: Todo[] = [];
      for (let i = 0; i < parsedData.length; i++) {
        const item = parsedData[i];
        const todo = new Todo(item.id, item.title, item.completed);
        todos.push(todo);
      }
      return todos;
    }

    return [];
  } catch (error) {
    console.log('Error loading data: ' + error);
    return [];
  }
}

// Save todos to JSON file
export function saveTodos(todos: Todo[]): boolean {
  try {
    ensureDataDirectory();
    const jsonData = JSON.stringify(todos, null, 2);
    fs.writeFileSync(dataFile, jsonData, 'utf-8');
    return true;
  } catch (error) {
    console.log('Error saving data: ' + error);
    return false;
  }
}
