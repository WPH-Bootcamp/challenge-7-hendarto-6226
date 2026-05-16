// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts

// TODO: Import fungsi storage untuk baca/tulis file

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword
import { saveTodos, loadTodos } from './storage.js';

let nextId: number = 1;

function generateUniqueId(): number {
  return nextId++;
}

export class Todo {
  id: number;
  title: string;
  completed: boolean;

  constructor(id: number, title: string, completed: boolean = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  // Method to show completed or not
  getDisplayString(): string {
    const status = this.completed ? '[DONE]' : '[ACTIVE]';
    return `${status} ${this.id}. ${this.title}`;
  }
}

// Class to manage to-do list
export class TodoList {
  todos: Todo[];

  constructor() {
    this.todos = loadTodos();
    // Update nextId based on loaded todos
    if (this.todos.length > 0) {
      let maxId = 0;
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id > maxId) {
          maxId = this.todos[i].id;
        }
      }
      nextId = maxId + 1;
    }
  }

  // Method to add new task
  addTodo(title: string): Todo {
    if (!title || title.trim() === '') {
      throw new Error('Judul tidak boleh kosong');
    }
    const id = generateUniqueId();
    const todo = new Todo(id, title.trim());
    this.todos.push(todo);

    // Save to file
    saveTodos(this.todos);

    return todo;
  }

  markTodoCompleted(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error(`ID ${id} tidak ditemukan`);
    }
    todo.completed = true;

    // Save to file
    saveTodos(this.todos);

    return todo;
  }

  deleteTodo(id: number): boolean {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`ID ${id} tidak ditemukan`);
    }
    this.todos.splice(index, 1);

    // Save to file
    saveTodos(this.todos);

    return true;
  }

  listTodos(): Todo[] {
    if (this.todos.length === 0) {
      console.log('Belum ada task');
      return [];
    }
    this.todos.forEach((todo) => {
      console.log(todo.getDisplayString());
    });
    return this.todos;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  isEmpty(): boolean {
    return this.todos.length === 0;
  }
}
