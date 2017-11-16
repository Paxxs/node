## 安装Nginx源

```
rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

安装该`rpm`后，我们就能在`/etc/yum.repos.d/` 目录中看到一个名为`nginx.repo` 的文件。

## 安装Nginx

安装完Nginx源后，就可以正式安装Nginx了。

```
yum install -y nginx
```

## Nginx默认目录

输入命令：

```
whereis nginx
```

即可看到类似于如下的内容：

```
nginx: /usr/sbin/nginx /usr/lib64/nginx /etc/nginx /usr/share/nginx
```

以下是Nginx的默认路径：

(1) Nginx配置路径：/etc/nginx/

(2) PID目录：/var/run/nginx.pid

(3) 错误日志：/var/log/nginx/error.log

(4) 访问日志：/var/log/nginx/access.log

(5) 默认站点目录：/usr/share/nginx/html

事实上，只需知道Nginx配置路径，其他路径均可在/etc/nginx/nginx.conf 以及/etc/nginx/conf.d/default.conf 中查询到。

## 常用命令

(1) 启动：

```
nginx
```

(2) 测试Nginx配置是否正确：

```
nginx -t
```

(3) 优雅重启：

```
nginx -s reload

```
该命令与以下命令类似：

```
kill -HUP nginx进程号
```
