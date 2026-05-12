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

// Tampilkan menu utama
function showMenu(): void {
  console.log('TO-DO LIST APPLICATION');
  console.log('1. Tambah Task');
  console.log('2. Lihat Semua Task');
  console.log('3. Tandai Selesai');
  console.log('4. Hapus Task');
  console.log('5. Keluar');
}

function runTodoApp(): void {
  const todoService = new TodoService();

  let isRunning = true;
  while (isRunning) {
    showMenu();
    const choice = prompt('Pilih menu:(1-5): "); ');

    switch (choice) {
      case '1':
        const title = prompt('Masukkan judul task: ');

        break;
      // Add more cases for other menu options
    }
  }
}
