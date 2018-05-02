
## 一、检查系统是否安装其他版本的MYSQL数据
```
sudo yum list installed | grep mysql
sudo yum -y remove mysql-libs.x86_64
```

## 二、安装及配置
```
wget http://repo.mysql.com/mysql-community-release-el6-5.noarch.rpm
sudo rpm -ivh mysql-community-release-el6-5.noarch.rpm
sudo yum repolist all | grep mysql
```
### 安装MYSQL数据库
```
sudo yum install mysql-community-server -y
```
### 设置为开机启动(2、3、4都是on代表开机自动启动)
```
sudo chkconfig --list | grep mysqld
sudo chkconfig mysqld on
```

## 三、设置远程root

启动mysql

```
sudo service mysqld start
```
设置root密码

```
mysql_secure_installation
```

登陆root账号

```
mysql -uroot -p
```

建立远程root用户

```
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你设置的密码' WITH GRANT OPTION;
mysql> flush privileges;
```

## 四、设置utf-8编码

查看mysql原本编码：
```
mysql> show variables like 'character%';
```
设置编码
```
sudo vim /etc/my.cnf
```
如下(少补)：

```
[mysqld]
character-set-server=utf8
collation-server=utf8_general_ci
sql_mode='NO_ENGINE_SUBSTITUTION'

[mysql]
default-character-set = utf8

[mysql.server]
default-character-set = utf8


[mysqld_safe]
default-character-set = utf8


[client]
default-character-set = utf8
```
重启mysql

```
sudo service mysqld restart
```
再次查看编码：

```
mysql -uroot -p
mysql> show variables like 'character%';
+--------------------------+----------------------------+
| Variable_name | Value |
+--------------------------+----------------------------+
| character_set_client | utf8 |
| character_set_connection | utf8 |
| character_set_database | utf8 |
| character_set_filesystem | binary |
| character_set_results | utf8 |
| character_set_server | utf8 |
| character_set_system | utf8 |
| character_sets_dir | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
8 rows in set (0.00 sec)
```
