# Panduan Install

## Download Source Code

1. Download Source Code dari github (klik code lalu pilih Download ZIP)
2. Lalu ekstrak
3. Buka file Komisi menggunakan VSCode atau IDE lainnya
4. Pastikan folder backend dan frontend ada

## Setting backend

1. Buka XAMPP
2. Klik start pada Apache dan MySQL
3. Buka browser lalu masukkan url ini: http://localhost/phpmyadmin/index.php?route=/
4. Lihat sidebar di kiri lalu klik New
5. Masukkan field Database name dengan sales_db
6. Refresh halaman lalu klik sales_db
7. Klik tab SQL di bagian atas
8. lalu masukkan query berikut:
   ```sql
   CREATE TABLE marketing (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL
   );

   CREATE TABLE penjualan (
       id INT AUTO_INCREMENT PRIMARY KEY,
       transaction_number VARCHAR(50) NOT NULL,
       marketing_Id INT NOT NULL,
       date DATE NOT NULL,
       cargo_fee INT NOT NULL,
       total_balance INT NOT NULL,
       grand_total INT NOT NULL,
       FOREIGN KEY (marketing_Id) REFERENCES marketing(id) ON DELETE CASCADE
   );
   ```

9. Scroll ke bawah lihat pojok kanan bawah, lalu klik go
10. Kembali ke VSCode
11. Buka terminal
12. Ketik cd backend
13. Ketik npm install lalu tunggu sampai selesai
14. Ketik node server.js

## Setting frontend

1. Buka terminal baru
2. Ketik cd frontend/sales-app
3. Ketik npm install lalu tunggu sampai selesai
4. Ketik npm run dev
5. Lalu klik CTRL + klik kiri (mouse)/tap (touchpad) pada link localhost anda
