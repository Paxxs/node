## 目录
* [容器生命周期管理](#容器生命周期管理)
    * [run](#run)
    * [start/stop/restart](#start%2fstop%2frestart)
    * [kill](#kill)
    * [rm](#rm)
    * [pause/unpause](#pause%2funpause)
    * [create](#create)
    * [exec](#exec)
* [容器操作](#容器操作)
    * [ps](#ps)
    * [inspect](#inspect)
    * [top](#top)
    * [attach](#attach)
    * [events](#events)
    * [logs](#logs)
    * [wait](#wait)
    * [export](#export)
    * [port](#port)
* [容器rootfs命令](#容器rootfs命令)
    * [commit](#commit)
    * [cp](#cp)
    * [diff](#diff)
* [镜像仓库](#镜像仓库)
    * [login](#login)
    * [pull](#pull)
    * [push](#push)
    * [search](#search)
* [本地镜像管理](#本地镜像管理)
    * [images](#images)
    * [rmi](#rmi)
    * [tag](#tag)
    * [build](#build)
    * [history](#history)
    * [save](#save)
    * [import](#import)
* [info|version](#info|version)
    * [info](#info)
    * [version](#version)

## 容器生命周期管理

### run

**docker run**：创建一个新的容器并运行一个命令

#### 语法

```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

OPTIONS说明：

* -a stdin: 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；
* -d: 后台运行容器，并返回容器ID；
* -i: 以交互模式运行容器，通常与 -t 同时使用；
* -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
* --name="nginx-lb": 为容器指定一个名称；
* --dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；
* --dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；
* -h "mars": 指定容器的hostname；
* -e username="ritchie": 设置环境变量；
* --env-file=[]: 从指定文件读入环境变量；
* --cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；
* -m :设置容器使用内存最大值；
* --net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
* --link=[]: 添加链接到另一个容器；
* --expose=[]: 开放一个端口或一组端口；

#### 实例

使用docker镜像nginx:latest以后台模式启动一个容器,并将容器命名为mynginx。

```
docker run --name mynginx -d nginx:latest
```

使用镜像nginx:latest以后台模式启动一个容器,并将容器的80端口映射到主机随机端口。

```
docker run -P -d nginx:latest
```

使用镜像nginx:latest以后台模式启动一个容器,将容器的80端口映射到主机的80端口,主机的目录/data映射到容器的/data。

```
docker run -p 80:80 -v /data:/data -d nginx:latest
```

使用镜像nginx:latest以交互模式启动一个容器,在容器内执行/bin/bash命令。

```
$ docker run -it nginx:latest /bin/bash
/#
```

<a id="start/stop/restart" />
### start/stop/restart

**docker start** :启动一个或多少已经被停止的容器
**docker stop** :停止一个运行中的容器
**docker restart** :重启容器

#### 语法

```
docker start [OPTIONS] CONTAINER [CONTAINER...]
```

```
docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

```
docker restart [OPTIONS] CONTAINER [CONTAINER...]
```

#### 实例

启动已被停止的容器myrunoob

```
docker start myrunoob
```

停止运行中的容器myrunoob

```
docker stop myrunoob
```

重启容器myrunoob

```
docker restart myrunoob
```

### kill

**docker kill** :杀掉一个运行中的容器。

#### 语法

```
docker kill [OPTIONS] CONTAINER [CONTAINER...]
```

OPTIONS说明：

* -s :向容器发送一个信号

#### 实例

杀掉运行中的容器mynginx

```
$ docker kill -s KILL mynginx
mynginx
```

### rm

**docker rm** ：删除一个或多少容器

#### 语法

```
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

OPTIONS说明：

* -f :通过SIGKILL信号强制删除一个运行中的容器
* -l :移除容器间的网络连接，而非容器本身
* -v :-v 删除与容器关联的卷

#### 实例

强制删除容器db01、db02

```
docker rm -f db01、db02
```

移除容器nginx01对容器db01的连接，连接名db

```
docker rm -l db
```

删除容器nginx01,并删除容器挂载的数据卷

```
docker rm -v nginx01
```

<a id="pause/unpause"/>
### pause/unpause

**docker pause** :暂停容器中所有的进程。
**docker unpause** :恢复容器中所有的进程。

#### 语法

```
docker pause [OPTIONS] CONTAINER [CONTAINER...]
docker unpause [OPTIONS] CONTAINER [CONTAINER...]
```

#### 实例

暂停数据库容器db01提供服务。

```
docker pause db01
```

恢复数据库容器db01提供服务。

```
docker unpause db01
```

### create

**docker create** ：创建一个新的容器但不启动它

用法同 [docker run](#run)

#### 语法

```
docker create [OPTIONS] IMAGE [COMMAND] [ARG...]
```

语法同 [docker run](#run)

#### 实例

使用docker镜像nginx:latest创建一个容器,并将容器命名为myrunoob

```
$ docker create  --name myrunoob  nginx:latest      
09b93464c2f75b7b69f83d56a9cfc23ceb50a48a9db7652ee4c27e3e2cb1961f
```

### exec

**docker exec** ：在运行的容器中执行命令

#### 语法

```
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

OPTIONS说明：

* -d :分离模式: 在后台运行
* -i :即使没有附加也保持STDIN 打开
* -t :分配一个伪终端

#### 实例

在容器mynginx中以交互模式执行容器内/root/runoob.sh脚本

```
$ docker exec -it mynginx /bin/sh /root/runoob.sh
http://www.runoob.com/
```

在容器mynginx中开启一个交互模式的终端

```
$ docker exec -i -t  mynginx /bin/bash
/#
```

## 容器操作

### ps

**docker ps** : 列出容器

#### 语法

```
docker ps [OPTIONS]
```

OPTIONS说明：

* -a :显示所有的容器，包括未运行的。
* -f :根据条件过滤显示的内容。
* --format :指定返回值的模板文件。
* -l :显示最近创建的容器。
* -n :列出最近创建的n个容器。
* --no-trunc :不截断输出。
* -q :静默模式，只显示容器编号。
* -s :显示总的文件大小。

#### 实例

列出所有在运行的容器信息。

```
$ docker ps
CONTAINER ID   IMAGE          COMMAND                ...  PORTS                    NAMES
09b93464c2f7   nginx:latest   "nginx -g 'daemon off" ...  80/tcp, 443/tcp          myrunoob
96f7f14e99ab   mysql:5.6      "docker-entrypoint.sh" ...  0.0.0.0:3306->3306/tcp   mymysql
```

列出最近创建的5个容器信息。

```
$ docker ps -n 5
CONTAINER ID        IMAGE               COMMAND                   CREATED           
09b93464c2f7        nginx:latest        "nginx -g 'daemon off"    2 days ago   ...     
b8573233d675        nginx:latest        "/bin/bash"               2 days ago   ...     
b1a0703e41e7        nginx:latest        "nginx -g 'daemon off"    2 days ago   ...    
f46fb1dec520        5c6e1090e771        "/bin/sh -c 'set -x \t"   2 days ago   ...   
a63b4a5597de        860c279d2fec        "bash"                    2 days ago   ...
```

列出所有创建的容器ID。

```
$ docker ps -a -q
09b93464c2f7
b8573233d675
b1a0703e41e7
f46fb1dec520
a63b4a5597de
6a4aa42e947b
de7bb36e7968
43a432b73776
664a8ab1a585
ba52eb632bbd
...
```

### inspect

**docker inspect** : 获取容器/镜像的元数据。

#### 语法

```
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```

OPTIONS说明：

* -f :指定返回值的模板文件。
* -s :显示总的文件大小。
* --type :为指定类型返回JSON。

#### 实例
获取镜像mysql:5.6的元信息。

```
$ docker inspect mysql:5.6
[
    {
        "Id": "sha256:2c0964ec182ae9a045f866bbc2553087f6e42bfc16074a74fb820af235f070ec",
        "RepoTags": [
            "mysql:5.6"
        ],
        "RepoDigests": [],
        "Parent": "",
        "Comment": "",
        "Created": "2016-05-24T04:01:41.168371815Z",
        "Container": "e0924bc460ff97787f34610115e9363e6363b30b8efa406e28eb495ab199ca54",
        "ContainerConfig": {
            "Hostname": "b0cf605c7757",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "3306/tcp": {}
            },
...
```

获取正在运行的容器mymysql的 IP。

```
$ docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mymysql
172.17.0.3
```

### top

**docker top** :查看容器中运行的进程信息，支持 ps 命令参数。

#### 语法

```
docker top [OPTIONS] CONTAINER [ps OPTIONS]
```

容器运行时不一定有/bin/bash终端来交互执行top命令，而且容器还不一定有top命令，可以使用docker top来实现查看container中正在运行的进程。

#### 实例

查看容器mymysql的进程信息。

```
$ docker top mymysql
UID    PID    PPID    C      STIME   TTY  TIME       CMD
999    40347  40331   18     00:58   ?    00:00:02   mysqld
```

查看所有运行容器的进程信息。

```
for i in  `docker ps |grep Up|awk '{print $1}'`;do echo \ &&docker top $i; done
```

### attach

**docker attach** :连接到正在运行中的容器。

#### 语法
```
docker attach [OPTIONS] CONTAINER
```
要attach上去的容器必须正在运行，可以同时连接上同一个container来共享屏幕（与screen命令的attach类似）。

官方文档中说attach后可以通过CTRL-C来detach，但实际上经过我的测试，如果container当前在运行bash，CTRL-C自然是当前行的输入，没有退出；如果container当前正在前台运行进程，如输出nginx的access.log日志，CTRL-C不仅会导致退出容器，而且还stop了。这不是我们想要的，detach的意思按理应该是脱离容器终端，但容器依然运行。好在attach是可以带上--sig-proxy=false来确保CTRL-D或CTRL-C不会关闭容器。

#### 实例

容器mynginx将访问日志指到标准输出，连接到容器查看访问信息。

```
$ docker attach --sig-proxy=false mynginx

192.168.239.1 - - [10/Jul/2016:16:54:26 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36" "-"
```

### events
### logs
### wait
### export
### port

## 容器rootfs命令
### commit
### cp
### diff
## 镜像仓库
### login
### pull
### push
### search

## 本地镜像管理
### images
### rmi
### tag
### build
### history
### save
### import

<a id="info|version"/>
## info|version
### info
### version
