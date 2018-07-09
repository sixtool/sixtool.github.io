# spring boot elk example
## 搭建elk环境

 实验版本说明：spring boot 1.5.x,  ElasticSearch 6.3.0 (截至目前为止，spring官方暂未提供良好的接口查询，但如果只是用于logback和logstash日志收集可以用的，如果要用spring boot 查询 es统计，数据，做curd，请绕开)

``` sh
#拉取容器
docker pull sebp/elk
#启动容品,注意如果对elk有版本要求，请参数官网提供的标签，如sebp/elk:550,代表es表版为5.5.0
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
1,使用命令：docker exec -it <container-name> /bin/bash 进入容器内   
2,执行命令: /opt/logstash/bin/logstash -f&nbsp;/opt/logstash/bin/conf/  (/opt/logstash/bin/conf/这个目录需要自行创建,目录名随意，创建后该目录必须放一个.conf后缀的文件，文件内容如下)
``` sh
input {
    tcp {
        port => 5044
        # 这个插件用json数据格式插件
        codec => json_lines  
    }
}

filter {
  if "_jsonparsefailure" in [tags] {
      drop { }
  }
}

output {
    elasticsearch {
        hosts => ["localhost"]
    }
}
```      
注意：如果看到这样的报错信息 Logstash could not be started because there is already another instance using the configured data directory.  If you wish to run multiple instances, you must change the "path.data" setting. 请执行命令：service logstash stop 然后在执行就可以了。      

3,当命令成功被执行后，看到：Successfully started Logstash API endpoint {:port=>9600} 信息后，输入：this is a dummy entry 然后回车，模拟一条日志进行测试。   
4,打开浏览器，输入：http://localhost:9200/_search?pretty 如图，就会看到我们刚刚输入的日志内容      
![](/assets/images/2018/7-6/QQ20180706-181149@2x.png)   
5,打开浏览器，输入http://localhost:5601 点击创建 index      
![](/assets/images/2018/7-6/kbin201231242343233.png)   
6,看到如下界面，到此安装结束。   
![](/assets/images/2018/7-6/kbin201231242343homepage.png)   

7,看看从spring boot 收集回来的日志   
![](/assets/images/2018/7-6/kbin2012312423432.png)   
![](/assets/images/2018/7-6/kbin201231242343search.png)   

8,看看elk架构图
![](/assets/images/2018/7-6/xxx-docker-overview.png)
