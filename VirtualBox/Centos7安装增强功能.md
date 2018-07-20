## 安装所需的工具和库

```shell
# yum install gcc make perl
# yum install kernel-devel-$(uname -r)
# rpm -qa kernel\*
kernel-tools-3.10.0-862.el7.x86_64
kernel-tools-libs-3.10.0-862.el7.x86_64
kernel-devel-3.10.0-862.el7.x86_64
kernel-3.10.0-862.el7.x86_64
kernel-headers-3.10.0-862.6.3.el7.x86_64
kernel-devel-3.10.0-862.6.3.el7.x86_64
```

## 挂载iso

```
mount /dev/cdrom /media
```

说明：如果在/dev/cdrom目录下面看不到增强工具文件，强制使用以上命令进行挂载即可。

进入/media目录下，可以看到增强工具文件，说明挂载成功了。

```
 ls /media/
```

## 做一个链接

```
ln -s /usr/src/kernels/3.10.0-514.2.2.el7.x86_64/ /usr/src/linux/
```

## 安装增强工具，运行VBoxLinuxAdditions.run文件即可

```
./VBoxLinuxAdditions.run
```

## 重启

```
reboot
```
