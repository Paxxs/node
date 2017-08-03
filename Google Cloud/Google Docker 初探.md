*系统环境为 macOS Sierra 10.12.6*

## 工具安装

1.kubectl command line

https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-with-homebrew-on-macos

2.gcloud command line

https://cloud.google.com/sdk/docs/quickstart-mac-os-x?hl=zh-CN


## gcloud 配置

1.设置 gcloud 用户

```
$ gcloud config set account [ACCOUNT]
```

2.授权

授权操作，执行命令后，浏览器自动打开，登录用户后授权既可。

```shell
$ gcloud auth login
```

or

使用 `--no-launch-browser` 参数执行上面命令，将 url 粘贴到浏览器中访问，登录用户并授权后，将 verification code 复制，在命令行粘贴继续。

```shell
$ gcloud auth login --no-launch-browser
```

3.设置projectId

```shell
$ gcloud config set project [PROJECT_ID]
```

4.查看信息

```shell
$ gcloud info
```

## 连接到集群

通过运行以下命令来配置 [kubectl](http://kubernetes.io/docs/user-guide/kubectl-overview/) 命令行访问权限

```shell
$ gcloud container clusters get-credentials [CLUSTER_NAME] \
    --zone [ZONE] --project [PROJECT]
```

可以使用 `--log-http` 查看http日志：

```shell
$ gcloud --log-http container clusters get-credentials [CLUSTER_NAME] \
    --zone [ZONE] --project [PROJECT]
```

然后启动代理以连接到 Kubernetes 控制平面：

```shell
$ kubectl proxy
```

接着，通过浏览器访问以下位置，以打开“信息中心”界面：

http://localhost:8001/ui

## 发布一个简单的Hello 应用

google 官方文档 https://cloud.google.com/container-engine/docs/quickstart

```shell
$ kubectl run hello-node --image=gcr.io/google-samples/node-hello:1.0 --port=8080

$ kubectl expose deployment hello-node --type="LoadBalancer"

$ kubectl get service hello-node

```

查看应用程序（将EXTERNAL-IP替换为上一步中获取的外部IP地址）。

```
http://EXTERNAL-IP:8080
```
