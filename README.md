# API Aplikasi Kantin

## Deskripsi

API Aplikasi Kantin adalah sebuah RESTful API yang menyediakan layanan terkait pengelolaan pengguna aplikasi kantin. API ini memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) terhadap data pengguna.

## Endpoint

### Daftar Pengguna

- **GET** `/users`

  Mengembalikan daftar pengguna yang terdaftar dalam aplikasi kantin.

- **POST** `/users`

  Mendaftarkan pengguna baru ke dalam aplikasi kantin.

  #### Payload

  | Parameter | Tipe Data | Deskripsi     |
  | --------- | --------- | ------------- |
  | `username`| String    | Nama pengguna |
  | `fullname`| String    | Nama lengkap  |
  | `password`| String    | Kata sandi    |

## Contoh Penggunaan

### Mendapatkan Daftar Pengguna

**Request:**

```
GET https://calm-red-dove-fez.cyclic.app/users
```

**Response:**

```
[
  {
    "id": ""user-FIbMSWcFKPR4fAAk"",
    "username": "admin",
    "fullname": "Administrator"
  },
  {
    "id": ""user-FPqYfyWnkP8sSpKs"",
    "username": "jane_smith",
    "fullname": "Jane Smith"
  }
]
```

### Mendaftarkan Pengguna Baru

**Request:**

```
POST https://calm-red-dove-fez.cyclic.app/users

Payload:
{
  "username": "james_brown",
  "fullname": "James Brown",
  "password": "mypassword123"
}
```

**Response:**

```
{
  "id": "user-FPqYfyWnkP8sSpKs",
  "username": "james_brown",
  "fullname": "James Brown"
}
```

## Kesimpulan

API Aplikasi Kantin menyediakan dua endpoint yang memungkinkan pengguna untuk mendapatkan daftar pengguna yang terdaftar dan mendaftarkan pengguna baru ke dalam aplikasi. Gunakan endpoint-endpoint ini sesuai dengan kebutuhan aplikasi kantin Anda.
