---
 title: caching getting started on spring boot
 categories: 
     - spring
     - troubleShooting 
---



### Error 
> 2024-04-15 19:58:43 [WARN] [http-nio-8085-exec-1] o.s.w.s.m.s.DefaultHandlerExceptionResolver - Resolved [org.springframework.http.converter.HttpMessageNotWritableException: Could not write JSON: JsonObject]

spring was 환경에서 API를 통해 클라이언트에게 응답을 하던 중 오류가 발생




### Default Converter 
기본적으로 아래 컨버터들을 지원한다.

- ByteArrayHttpMessageConverter – converts byte arrays
- StringHttpMessageConverter – converts Strings
- ResourceHttpMessageConverter – converts org.springframework.core.io.Resource for any type of octet stream
- SourceHttpMessageConverter – converts javax.xml.transform.Source
- FormHttpMessageConverter – converts form data to/from a MultiValueMap<String, String>
- Jaxb2RootElementHttpMessageConverter – converts Java objects to/from XML (added only if JAXB2 is present on the classpath)
- MappingJackson2HttpMessageConverter – converts JSON (added only if Jackson 2 is present on the classpath)
- MappingJacksonHttpMessageConverter – converts JSON (added only if Jackson is present on the classpath)
- AtomFeedHttpMessageConverter – converts Atom feeds (added only if Rome is present on the classpath)
- RssChannelHttpMessageConverter – converts RSS feeds (added only if Rome is present on the classpath)


### Error Cause 
Gson을 위한 Converter 가 기본적으로 내장되어있지 않아 발생한 오류이다. 
Gson데이터를 응답하기 위해서는 Converter에 대한 설정을 Override가 필요. 



### Configuration 

``` java 
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // Create Gson instance
        Gson gson = new Gson();

        // Create GsonHttpMessageConverter with Gson instance
        GsonHttpMessageConverter gsonConverter = new GsonHttpMessageConverter(gson);

        // Add GsonHttpMessageConverter to the list of converters
        converters.add(gsonConverter);
    }
}
```

### references 
https://www.baeldung.com/spring-httpmessageconverter-rest

