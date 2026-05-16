// TODO: Import readline untuk membaca input dari command line

// TODO: Import fungsi-fungsi dari todoService

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop

// TODO: Jalankan fungsi main
console.log('Welcome to TypeScript To-Do App!');
console.log('Start building your app here...');

import * as readline from 'readline';
import { TodoList } from './todoService.js';

// Setup readline for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to get user input
function getUserInput(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Async simulation function (keeping your original structure)
async function asyncSimulation(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Aplikasi siap digunakan');
      resolve();
    }, 300);
  });
}

// Main program: Main function to run to-do app
async function runTodoApp(): Promise<void> {
  const todoList = new TodoList();

  try {
    await asyncSimulation();
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  }

  // Main loop to show menu and handle user input
  let running = true;

  // Interactive menu for user
  while (running) {
    console.log('\n' + '='.repeat(30));
    console.log('MENU:');
    console.log('1. Add List To Do');
    console.log('2. show To-Do List');
    console.log('3. Set Done To Do');
    console.log('4. Delete To Do');
    console.log('5. Exit');
    console.log('='.repeat(30));

    const pilihan = await getUserInput('Choose menu (1-5): ');

    try {
      switch (pilihan) {
        case '1':
          const title = await getUserInput('Masukan judul task: ');
          const newTodo = todoList.addTodo(title);
          console.log(
            `Task "${newTodo.title}" ditambahkan (ID: ${newTodo.id})`
          );
          break;

        case '2':
          console.log('\nList To-Do:');
          todoList.listTodos();
          break;

        case '3':
          console.log('\nTo-do-Done ---');
          if (todoList.isEmpty()) {
            console.log('Belum ada task. Gunakan Add List To Do dulu.');
            break;
          }
          todoList.listTodos();
          const completeIdInput = await getUserInput(
            'Masukan ID task yang selesai: '
          );
          const completeId = parseInt(completeIdInput);
          const completedTodo = todoList.markTodoCompleted(completeId);
          console.log(`Task "${completedTodo.title}" selesai!`);
          break;

        case '4':
          console.log('\nHapus To-Do ---');
          if (todoList.isEmpty()) {
            console.log('Belum ada task. Gunakan Add List To Do dulu.');
            break;
          }
          todoList.listTodos();
          const deleteIdInput = await getUserInput(
            'Masukan ID task yang akan dihapus: '
          );
          const deleteId = parseInt(deleteIdInput);
          todoList.deleteTodo(deleteId);
          console.log(`Task ID ${deleteId} telah dihapus`);
          break;

        case '5':
          console.log('\nTerima kasih!');
          running = false;
          break;

        default:
          console.log('Pilihan tidak valid. Masukkan 1-5.');
      }
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  }

  rl.close();
}

// START here
runTodoApp();
