```
cd /etc/yum.repos.d
sudo wget http://people.centos.org/tru/devtools-2/devtools-2.repo
sudo yum install devtoolset-2-gcc devtoolset-2-binutils devtoolset-2-gcc-c++
```

三个安装包会被装在 /opt/rh/devtoolset-2/root/ 中

更新软连接：

```
sudo mv /usr/bin/gcc /usr/bin/gcc-4.4.7
sudo mv /usr/bin/g++ /usr/bin/g++-4.4.7
sudo mv /usr/bin/c++ /usr/bin/c++-4.4.7
sudo ln -s /opt/rh/devtoolset-2/root/usr/bin/gcc /usr/bin/gcc
sudo ln -s /opt/rh/devtoolset-2/root/usr/bin/c++ /usr/bin/c++
sudo ln -s /opt/rh/devtoolset-2/root/usr/bin/g++ /usr/bin/g++
gcc --version
```
