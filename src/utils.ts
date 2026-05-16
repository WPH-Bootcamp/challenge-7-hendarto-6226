// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid
import { Todo } from './todoService.js';

// Type guard to check if data is a Todo
export function isTodo(obj: any): obj is Todo {
  if (obj === null) return false;
  if (typeof obj !== 'object') return false;
  if (typeof obj.id !== 'number') return false;
  if (typeof obj.title !== 'string') return false;
  if (typeof obj.completed !== 'boolean') return false;
  return true;
}

// Type guard to check if data is array of Todos
export function isTodoArray(data: any): data is Todo[] {
  if (!Array.isArray(data)) {
    return false;
  }

  for (let i = 0; i < data.length; i++) {
    if (!isTodo(data[i])) {
      return false;
    }
  }
  return true;
}
