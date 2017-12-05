SSH无密码登录要使用公钥与私钥。linux下可以用用ssh-keygen生成公钥/私钥对，下面我以ubuntu为例。有机器A(192.168.0.2)，B(192.168.0.3)。现想A通过ssh免密码登录到B。1.在A机下生成公钥/私钥对。

```
[ua@A ~]$ ssh-keygen -t rsa
```

后面可加-P表示密码，-P '' （－P后面两个单引号）就表示空密码，也可以不用-P参数，这样就要三车回车，用-P就一次回车。
它在`/home/ua`下生成`.ssh`目录，.ssh下有`id_rsa`和`id_rsa.pub`。

把A机下的id_rsa.pub复制到B机下，在B机的.ssh/authorized_keys文件里，用scp复制(windows下可用图形化的WinSCP软件)。也可以使用`cat`命令查看id_rsa.pub内容，直接粘贴到B机器。

```
[ua@A ~]$ scp .ssh/id_rsa.pub ub@192.168.0.3:/home/ub/id_rsa.pub
ub@192.168.0.3's password:
```

由于还没有免密码登录的，所以要输入密码。

B机把从A机复制的id_rsa.pub内容添加到.ssh/authorzied_keys文件里。

```
[ub@B ~]$ mkdir .ssh
[ub@B ~]$ cat id_rsa.pub >> .ssh/authorized_keys
[ub@B ~]$ chmod 600 .ssh/authorized_keys
```

authorized_keys的权限要是600。
