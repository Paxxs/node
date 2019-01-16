近期挺多朋友问到Zuul如何高可用，这里详细探讨一下。

Zuul的高可用非常关键，因为外部请求到后端微服务的流量都会经过Zuul。故而在生产环境中，我们一般都需要部署高可用的Zuul以避免单点故障。

笔者分两种场景讨论Zuul的高可用。

## Zuul客户端也注册到了Eureka Server上

这种情况下，Zuul的高可用非常简单，只需将多个Zuul节点注册到Eureka Server上，就可实现Zuul的高可用。此时，Zuul的高可用与其他微服务的高可用没什么区别。

![Zuul高可用架构图](https://ws4.sinaimg.cn/large/006tKfTcgy1fj7qxjti81j30sp0j275v.jpg)

当Zuul客户端也注册到Eureka Server上时，只需部署多个Zuul节点即可实现其高可用。Zuul客户端会自动从Eureka Server中查询Zuul Server的列表，并使用Ribbon负载均衡地请求Zuul集群。

这种场景一般用于Sidecar。

## Zuul客户端未注册到Eureka Server上

现实中，这种场景往往更常见，例如，Zuul客户端是一个手机APP——我们不可能让所有的手机终端都注册到Eureka Server上。这种情况下，我们可借助一个额外的负载均衡器来实现Zuul的高可用，例如Nginx、HAProxy、F5等。

![Zuul高可用架构图](https://ws2.sinaimg.cn/large/006tKfTcgy1fj7qyj3ov1j30ue0lqdhi.jpg)

Zuul客户端将请求发送到负载均衡器，负载均衡器将请求转发到其代理的其中一个Zuul节点。这样，就可以实现Zuul的高可用。


原文地址：http://www.itmuch.com/spring-cloud/zuul/zuul-ha/
