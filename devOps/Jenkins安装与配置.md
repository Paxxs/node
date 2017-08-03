
*系统环境：Centos7 内核版本：3.10.0-514.16.1.el7.x86_64*

*Jenkins 版本 2.72*

https://wiki.jenkins.io/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions

## 安装

将Jenkins存储库添加到yum repos，并从此安装Jenkins。

```shell
$ sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
$ sudo rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key
$ sudo yum install jenkins
```

官方文档中使用OpenJDK，由于测试系统环境中有 Oracle JDK，所以需要修改一下配置文件。

配置文件在 `/etc/sysconfig/jenkins`，如果需要修改端口号，也在这里完成。

```shell
$ sudo vim /etc/sysconfig/jenkins

## JENKINS_JAVA_CMD="/usr/local/java/jdk1.8.0_131/bin/java"
```

一切顺利，启动jekins 服务既可。

```shell
$ sudo service jenkins start

## sudo service jenkins start/stop/restart/status
```

![](https://ws3.sinaimg.cn/large/006tNc79ly1fi6d1w5h6ij30dr0143yj.jpg)

加入开机启动

```shell
$ sudo chkconfig jenkins on
```

## 配置

访问 Jenkins，进行初始化（解锁）操作。

```
http://[IP]:[port]
```

![](https://ws1.sinaimg.cn/large/006tNc79ly1fi6d5mba03j31jc14k43m.jpg)

在服务器执行如下命令获得密码来解锁 Jenkins。

```shell
$ sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

至此，Jenkins 已经安装完成，接下来就是根据实际需求，个性化配置了。

![](https://ws2.sinaimg.cn/large/006tNc79ly1fi6d9ioi1tj31ja14m0y6.jpg)
