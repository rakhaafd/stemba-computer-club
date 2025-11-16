# Laravel + React Starter Kit

## Introduction

Our React starter kit provides a robust, modern starting point for building Laravel applications with a React frontend using [Inertia](https://inertiajs.com).

Inertia allows you to build modern, single-page React applications using classic server-side routing and controllers. This lets you enjoy the frontend power of React combined with the incredible backend productivity of Laravel and lightning-fast Vite compilation.

This React starter kit utilizes React, TypeScript, and Tailwind, but **does not include any authentication scaffolding**.

## Official Documentation

Documentation for all Laravel starter kits can be found on the [Laravel website](https://laravel.com/docs/starter-kits).

## Contributing

Thank you for considering contributing to our starter kit! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## License

The Laravel + React starter kit is open-sourced software licensed under the MIT license.

Here is a clean and correct **“Getting Started”** section you can add to your README.
I’ll also mark notes specific to **Linux** so it’s accurate.

---

# 🚀 Getting Started

Follow these steps to set up the Laravel + React (Inertia) starter kit locally:

### **1. Install PHP dependencies**

```bash
composer install
```

> **Linux users:** Make sure the `php-xml` extension is installed, otherwise Composer may fail.
> Example (Debian/Ubuntu):
> `sudo apt install php-xml`

---

### **2. Install JavaScript dependencies**

```bash
npm install
```

---

### **3. Set up your environment file**

```bash
cp .env.example .env
```

Edit `.env` and configure:

* `APP_NAME`
* `APP_URL`
* `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
* Other options as needed

---

### **4. Generate application key**

```bash
php artisan key:generate
```

---

### **5. Ensure MySQL is running**

Start or verify MySQL/MariaDB service is active:

```bash
sudo systemctl start mysql
```

> **Linux users:** Make sure the PHP extension `pdo_mysql` is enabled.
> Debian/Ubuntu: `sudo apt install php-mysql`

---

### **6. Run database migrations**

```bash
php artisan migrate
```

---

### **7. (Optional) Seed the database**

If the starter kit includes seeders:

```bash
php artisan db:seed
```

---

### **8. Start the Laravel development server**

```bash
php artisan serve
```

---

### **9. Start the Vite dev server**

```bash
npm run dev
```

Now your Laravel + React application should be running!

---

✅ **Yes — the steps you wrote are correct**, and the version above is just organized, clean, and ready for README usage.
