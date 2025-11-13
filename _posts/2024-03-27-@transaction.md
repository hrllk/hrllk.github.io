---
 title: caching getting started on spring boot
 categories: 
    - spring
     - modernSoftware
 published: false
---

<!-- TODO:  -->




### Dependencies
- ~~spring context (caching에 필요한 핵심적 기능)~~
- caching abstration: cache manager 제공 || purpose: to store cache into storage
- spring-boot-starter-cache: spring boot 에서 캐싱과 관련된 의존성 추가를 쉽게

``` yml
	~~implementation 'org.springframework:spring-context:6.1.3' // caching abstraction~~
	implementation 'org.springframework:spring-context-support:6.1.3' // cache manager
	implementation 'org.springframework.boot:spring-boot-starter-cache:3.2.3' // starter pacakge with cache
```

spring-context-support 의존성은 spring-context의존성을 주입하고있음, <br>
따라서 별도로 spring-context 의존성을 주입 할 필요 없음(제거) <br>


### Configuration 1 - CachingConfig
```java 
@Configuration
@EnableCaching
public class CachingConfig {


    // @Bean
    // public CacheManager cacheManager(){
    //     return new ConcurrentMapCacheManager("auditEndPointList");
    // }
}
```
@EnabledCaching(캐싱활성화) 애노테이션과 starter package 를 소유한 경우, <br>
별도로 CacheManager 선언을 해줄 필요 없음.<br>



### Configuration 2 - CacheCustomizer 
위에서 자동으로 생성한 CacheManager 에대해 부가 설정을 진행
``` java 

@Component
public class SimpleCacheCustomizer implements CacheManagerCustomizer<ConcurrentMapCacheManager> {

    /**
     * cache manager custermize
     * @param cacheManager the {@code CacheManager} to customize
     */
    @Override
    public void customize(ConcurrentMapCacheManager cacheManager) {
        cacheManager.setCacheNames(asList("auditEndPointList"));
    }
}
```




### @Cacheable
> The simplest way to enable caching behavior for a method is to demarcate it with @Cacheable, and parameterize it with the name of the cache where the results would be stored:

캐싱하기 가장 쉬운방법 <br>
메소드위에 해당 애노테이션을 선언시, 메소드가 응답하는 데이터를 캐시화 한다.  <br>
해당 캐시에 값이 없는경우, Mapper 를 호출하여 값을 캐싱하고, 값이 있는경우 <br>
캐시에 담겨있는 값을 응답한다. <br>
``` java 
    @Cacheable(value = "auditEndPointList") // value, key 등으로 다양한 설정 가능
    public List<String> getAuditList() {

        List<String> auditEndPointList = endPointMapper.selectByExample(new EndPointExample())
                .stream()
                .map(EndPoint::getContextPath)
                .filter(bt -> !equals("R"))
                .toList();
//        log.debug("auditEndPointList: [{}]", auditEndPointList);
        return auditEndPointList;
    }
```



### references 
https://www.baeldung.com/spring-cache-tutorial


