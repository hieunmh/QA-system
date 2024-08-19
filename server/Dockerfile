# Sử dụng image PHP 8.1 với Apache
FROM php:8.1-apache

# Cài đặt các extension PHP cần thiết cho Laravel và PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Cài đặt Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Thiết lập thư mục làm việc
WORKDIR /var/www/html

# Copy toàn bộ mã nguồn vào container
COPY . .

# Cài đặt các dependencies của Laravel
RUN composer install --optimize-autoloader --no-dev

# Thiết lập quyền truy cập cho các thư mục cần thiết
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Tạo key ứng dụng Laravel
RUN php artisan key:generate

# Expose port 80 để truy cập
EXPOSE 80

# Khởi chạy Apache
CMD ["apache2-foreground"]
