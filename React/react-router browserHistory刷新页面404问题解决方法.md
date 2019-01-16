如果使用的是nginx服务器，则只需要使用try_files 指令：
```
server {
 ...
 location / {
  try_files $uri /index.html
 }
}
```

如果使用Apache服务器，则需要在项目根目录创建`.htaccess`文件，文件包含如下内容：

```
RewriteEngine on
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```
