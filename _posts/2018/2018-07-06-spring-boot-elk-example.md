# spring boot elk example
## 搭建elk环境


``` sh
#拉取容器
docker pull sebp/elk
#启动容品
docker run -d -p 5044:5044 -p 127.0.0.1:5601:5601 -p 127.0.0.1:9200:9200 -p 127.0.0.1:9300:9300 -v /Users/winfan/desktop/data/elk:/var/lib/elasticsearch --name=elk sebp/elk
```
 简单介绍上述命令参数如下：
 
> -d表示后台    
> -h 定义容器host    
> -p表示端口映射    
> –name 表示容器别名 (我这里就叫elk)    
> sebp/elk是image镜像

端口描述 
* 5601 (Kibana web interface) 提供网站查询日志使用的.
* 9200 (Elasticsearch JSON interface 提供搜索数据接口).
* 5044 (Logstash Beats interface, receives logs from Beats such as Filebeat – see the Forwarding 日志收集服务)

启动后进入docker容器内还需要修改logstash服务，这一步很关键，要不然不能在kibana 后台 建 index patten
> 1,使用命令：docker exec -it <container-name> /bin/bash 进入容器内  
> 2,执行命令: /opt/logstash/bin/logstash -f  /opt/logstash/bin/conf/  
> 注意：如果看到这样的报错信息 Logstash could not be started because there is already another instance using the configured data directory.  If you wish to run multiple instances, you must change the "path.data" setting. 请执行命令：service logstash stop 然后在执行就可以了。   

> 3,当命令成功被执行后，看到：Successfully started Logstash API endpoint {:port=>9600} 信息后，输入：this is a dummy entry 然后回车，模拟一条日志进行测试。   
> 4,打开浏览器，输入：http://localhost:9200/_search?pretty 如图，就会看到我们刚刚输入的日志内容   
![](/assets/images/2018/7-4/image2018-7-4_14_2_25.png.jpeg)
