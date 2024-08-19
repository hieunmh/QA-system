# Sử dụng image PHP 8.1 với Apache
FROM php:8.1-apache

# Cài đặt các extension PHP cần thiết cho Laravel
RUN docker-php-ext-install pdo pdo_mysql

# Cài đặt Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Cài đặt các dependencies của Laravel
WORKDIR /var/www/html
COPY . .
RUN composer install --optimize-autoloader --no-dev

# Thiết lập quyền truy cập
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Tạo key ứng dụng Laravel
RUN php artisan key:generate

# Expose port 80 để truy cập
EXPOSE 80

# Khởi chạy Apache
CMD ["apache2-foreground"]
