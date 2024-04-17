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
        GsonHttpMessageConverter gsonConverter = new GsonHttpMessageConverter();

        // Add GsonHttpMessageConverter to the list of converters
        converters.add(6, gsonConverter);
    }
}
```

인덱스를 추가해주지 않을경우, 맨 끝순서에 append되며, 이 경우 gson을 여전히 converting할 수 없다. <br>
Jackson 순서 앞단에 추가해주면 우선적으로 사용하여 gson을 converting 할 수 있음<br>

#### Before 
0 = {ByteArrayHttpMessageConverter@12871} 
1 = {StringHttpMessageConverter@12872} 
2 = {StringHttpMessageConverter@12873} 
3 = {ResourceHttpMessageConverter@12874} 
4 = {ResourceRegionHttpMessageConverter@12875} 
5 = {AllEncompassingFormHttpMessageConverter@12876} 
6 = {MappingJackson2HttpMessageConverter@12877} 
7 = {MappingJackson2HttpMessageConverter@12878} 
8 = {Jaxb2RootElementHttpMessageConverter@12879} 

#### After
0 = {ByteArrayHttpMessageConverter@12902} 
1 = {StringHttpMessageConverter@12903} 
2 = {StringHttpMessageConverter@12904} 
3 = {ResourceHttpMessageConverter@12905} 
4 = {ResourceRegionHttpMessageConverter@12906} 
5 = {AllEncompassingFormHttpMessageConverter@12907} 
6 = {GsonHttpMessageConverter@12908}  <<
7 = {MappingJackson2HttpMessageConverter@12909} 
8 = {Jaxb2RootElementHttpMessageConverter@12910} 

### references 
https://www.baeldung.com/spring-httpmessageconverter-rest

