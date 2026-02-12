---
 title: principle of operation of message converter (in spring)
 categories: 
     - spring
     - troubleShooting 
published: false
---

<!-- TODO:  -->

### principle of operation 


#### request, response processing 
> When a client sends an HTTP request to a Spring application, the request body may contain data in a specific format (e.g., JSON, XML).
Spring's message converters are used to convert the request body data into Java objects that can be processed by the application.

> When the Spring application generates a response, the data needs to be converted into the appropriate format before sending it back to the client.
Message converters are used to convert Java objects into the desired response format (e.g., JSON, XML) for the client.



#### content negotiation
> Spring supports content negotiation, which allows the application to determine the appropriate message converter based on the request's Accept header.
Content negotiation helps in selecting the most suitable message converter for converting the request or response data.

요청의 헤더를 참조해 어떤 메세지 컨버터를 이용할지 결정하며,<br>
요청 데이터를 변환하는데 가장 적합한 converter를 고르는데 도움을 줌<br>

#### conversion process
> When a request is received, Spring iterates through the available message converters to find the one that can handle the conversion for the given data format.
The selected message converter converts the request body into Java objects or converts Java objects into the desired response format.

클라이언트로부터 요청이오면, spring은 iterates 하여 available 한 converter 를찾고, <br>
해당 convert를 통해 request body를 converts 함 (to Java Object로)<br>





