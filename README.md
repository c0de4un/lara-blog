# lara-blog
PHP with Laravel simple blog app with comments

Frontend packed as SPA into several module without link to Laravel and Blade templates.


## Minimal software requirements
* Docker

## Minimal hardware requirements
* 2 GB RAM
* Ethernet
* Any x64 CPU
* 10 GB file storage

## Dev
Run backend development environment
```sh
docker compose -f compose.dev.yml up -d
```

Run frontend local dev
```sh
cd web
npn run dev
```

### Run migrations manually
```sh
docker exec -it http_app bash
php artisan migrate
```

### Run seeders manually
```sh
docker exec -it http_app bash
php artisan db:seed
```

## PHP-Docs
Package barryvdh/laravel-ide-helper is installed.
It helps to generate php-docs for models.
```sh
php artisan ide-helper:generate
php artisan ide-helper:models -RW
```
