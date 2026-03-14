var store = [{
        "title": "Interface",
        "excerpt":"인터페이스란? 인터페이스는 “틀”이다. 인터페이스는 설계도 이다. 왜쓸까? “여러개발자들이 협업을 할 때 “동시”에(혼선없이) 작업을 하기 위함이다.” 예를들어보자, 세금을 계산하는 어떤 서비스가 있다고 가정해보자. A개발자는 세금을 계산하기위한 비즈니스로직을 구현하고, B개발자는 그 비즈니스로직에 필요한 계산기능을 가진 클래스를 구현한다고 가정했을 때, A개발자는 B개발자가 구현한 계산기능을 가진 클래스를 필요로한다. 그리고 계산기능을 가진 클래스가 완성되어야만, 그...","categories": ["Java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/why-we-use-interface/",
        "teaser": null
      },{
        "title": "MVC",
        "excerpt":"MVC MVC = model + view + controller model : 애플리케이션에서 사용되는 데이터와 그 데이터를 처리하는 부분 view : 사용자에게 보여지는 UI controller : 사용자의 행동에 대해서 처리하는 부분 flow 사용자의 action이 Controller에 들어옵니다. Controller는 사용자의 action을 확인하고, model 을 업데이트합니다. Controller는 Model을 나타내줄 View를 선택합니다. View는 Model을 이용하여 화면을...","categories": ["spring","designPattern"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/designpattern/mvc-pattern/",
        "teaser": null
      },{
        "title": "setenv.sh of Tomcat",
        "excerpt":"환경변수 애플리케이션의 설정을 적용하기위해 사용 예를들면.. 자바 애플리케이션에서 내가 설정해놓은 키값대로 동작을 다르게 처리하고싶을 때(?) 사용. 왜 setenv.sh에?? 결론부터 이야기하면 톰캣의 doc에서 환경변수 관련된 설정은 setenv.sh 파일에 작성하라고 명시되어있다. 다만, 기본적으로 제공해주는 것이 아니기 때문에 최초 아카이브파일을 압축 해제하면 사용자가 직접 쉘 파일을 만들어서 사용해야함. startup.sh에 설정하면안되는가?? 안되는것은 아니다, 되긴...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/why-we-need-set-env/",
        "teaser": null
      },{
        "title": "MariaDB Grant",
        "excerpt":"Show User  SELECT HOST,USER,PASSWORD FROM USER   Generate User  CREATE USER '${user.id}'@'%' IDENTIFIED BY '${password}';  Grant   GRANT ALL PRIVILEGES ON ${db.name}.* TO '${user.id}'@'%'; FLUSH PRIVILEGES;   Delete User  DROP USER ${user.id}@${host}  ","categories": ["database"],
        "tags": [],
        "url": "https://hrllk.github.io//database/mariaDB-Grant/",
        "teaser": null
      },{
        "title": "\\[TroubleShooting\\] resource.getFile FileNotFoundException",
        "excerpt":"getFile() 은안되고, getInputStream은 되는이유 문제발생 외부 .json파일을 가져와 사용하는 소스를 배포하였으며, 구동중 FileNotFoundException 발생. 사실수집 -- 외부 json파일을 가져와서 사용하기위해 -- .resource.getFile() 메소드를 사용하였으나, build,deploy후 구동중 FileNotFoundException이 발생. String filePath = \"/com/pack/abcabc.json\"; FileReader fr = new FileReader(resource.getFile()); WHY? Spring에서 classpath에 있는 여러가지 resource를 처리하기위해 Resource라는 인터페이스의 구현체인 ClassPathResource를 제공함. 해당...","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//FileNotFoundException/",
        "teaser": null
      },{
        "title": "String.valueOf return \"Null\"",
        "excerpt":"Null인데요 Null이 아닙니다(?) 문제: 값이 Null임에도, 자꾸만 null check 조건문을 뚫고(?) 들어와 로그를 출력하는 현상이 발생. Map안에있는 키값(double형인..)을 꺼내, null Check을 위한 조건문을 작성하였으나, 값이 Null임에도, 자꾸만 로그가 찍히는 현상이 발생 String lat = String.valueOf(row.get(\"LAT\")); String lng = String.valueOf(row.get(\"LNG\")); if (lat != null &amp;&amp; lng != null) { logger.debug(\"lat:[{}] lng:[{}]\",lat,lng);...","categories": ["Java","troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//java/troubleshooting/String.valueOf/",
        "teaser": null
      },{
        "title": "Persistence",
        "excerpt":"Persistence(영속성) Persistence란?? 프로그램종료시 데이터는 메모리에만 존재하기때문에 사라짐. 이를 해결하기 위해 파일시스템과 관계형데이터베이스를 활용하여 구현함. 데이터가 영속성을 가지기 위해 Spring에서 사용하는 방법은 아래와 같음. JDBC(Java) Spring JDBC Persistence Framework Persistence Framework Persistence Framework란 “자료를 DB에 저장하는 과정을 도와주는 소프트웨어” 데이터를 가공하는 자바 객체층과 데이터를 저장하는 DB층 사이를 매끄럽게 연결하는 이음매라고 할...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/ORM-And-SqlMapper/",
        "teaser": null
      },{
        "title": ".bashrc란..",
        "excerpt":"터미널을 사용하면서 .bash_profile, .bashrc 등.. 어떤 파일에 어떤 설정을 해줘야하는지 헷갈렸다. rc란??: rc란? “실행제어”를 의미한다. 이전 Unix시스템(CTSS)에서 채택된 규칙이라고 한다. “rc stands for the phrase “run commands”. It is used for any file that contains startup information for a command” 설정파일들: ~/.bash_profile란? ~/.bash_profile은 bash가 “Login을 통해” 실행될 때 로드되는 “지역”...","categories": ["Linux"],
        "tags": [],
        "url": "https://hrllk.github.io//linux/bashrc/",
        "teaser": null
      },{
        "title": "Try Catch, Throw Exception",
        "excerpt":"## 글의기원은 Spring의 Transaction처리는 기본적으로는.. RunTime계열은 rollback하고, Unchecked 계열은 rollback하지않음. 그것은 어디까지나 기본적인 동작임.. Spring Transaction은 옵션으로 우리가 설정할 수 있게끔 런타임 예외 중에서도 이러 이러한 예외는 롤백을 하지않게끔 설정할 수 있고, UnChecked 예외중에서도 이러이러한 롤백은 반대로 롤백을 하게끔 설정 할 수있음. Spring Transaction의 기본 전략으로 모든 예외를 업무에서 처리하지않기...","categories": ["Java","CS"],
        "tags": [],
        "url": "https://hrllk.github.io//java/cs/tryCatch-vs-ThrowsException/",
        "teaser": null
      },{
        "title": "OOP vs PP",
        "excerpt":"객체지향 Object Oriented Programming 특징: 기능하나하나를 모듈화하여 중복되는 기능을 최소화 즉, 재사용성을 높이는 프로그래밍 기법을 의미 단점: 설계에 절차지향보다 많은 시간소요가 들어감. 처리속도가 절차지향에 비해 떨어진다. 대표언어: 자바 절차지향 Procedure Programming 특징 : 절차지향 프로그래밍은 물흐르는 것처럼 순차적으로 처리하며 구동되는 프로그래밍을 의미. 단점 : 객체지향에 비해 유지보수가 어려움. 이유는 프로그램의...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/OOP-PP/",
        "teaser": null
      },{
        "title": "CORS Policy(Cross Origin Resource Sharing)",
        "excerpt":"CORS Policy란? CORS == “교차 출처 리소스 공유” Policy == 를 막는행위 누가?? 브라우저가 왜?? 보안적인 이유로 인해서 Cross Origin Cross Origin == Origin 이 한가지라도 다를경우를 이야기함 Origin Origin == URL구조에서 Protocol + Host + Port를 합친것을 의미함 URL 구조 https://www.naver.com:443/api/signup?page=1 “protocol”  +    “host”    +       “port”     +    “path”    + “queryStr” “https://” + “www.naver.com:” + “443”...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/CORS/",
        "teaser": null
      },{
        "title": "PUT vs PATCH",
        "excerpt":"무엇이다를까??? PUT “리소스의 ‘전체’를 업데이트할때 사용” PATCH “리소스의 ‘일부’를 업데이트할때 사용” PUT 예시: 원본데이터: { \"name\": \"홍길동\", \"age\": 18 } 희망하는데이터: (나이를 20으로 변경하길 희망..) { \"name\": \"홍길동\", \"age\": 20 } 요청데이터: (age만 20요청하면되는것이아닌, 이름도 지정해줘야함.) { \"name\": \"홍길동\", \"age\": 20 } PATCH 예시: 원본데이터: { \"name\": \"홍길동\", \"age\": 18...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/what-diff-put-and-patch/",
        "teaser": null
      },{
        "title": "Encoding base64",
        "excerpt":"인코딩이란.. Binary Data를 Text로 바꾸는 행위 왜 쓸까 ?? 파일에 저장된 정보의 형태를 표준화하여 보안, 처리속도, 저장공간 절약등의 이유에서 사용. 동영상 or 이미지 영역에서 많이 사용된다. Base64 인코딩이란 .. 64진법을 의미 == 2^6 ASCII 문자들로만 이루어진 문자열로 바꾸는 인코딩 방식 이유는 8비트 이진데이터를 영향받지않기때문 인코딩과정 : 원본문자열을 10진수로변환 (ASCII코드 를...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/base64/",
        "teaser": null
      },{
        "title": "You do not have the SUPER privilege",
        "excerpt":"오류:     MariaDB(AWS-RDS)에서 시퀀스 사용을 위해 function을 추가하려고했지만,   다음과같은 오류가 발생.    [HY000][1419] You do not have the SUPER privilege and binary logging is enabled (you *might* want to use the less safe log_bin_trust_function_creators variable)   해결 :     RDS 파라미터그룹의 log_bin_trust_function_creators variable 값을 1로 변경   ","categories": ["troubleShooting","database"],
        "tags": [],
        "url": "https://hrllk.github.io//troubleshooting/database/you-do-not-have-the-SUPER-privilege/",
        "teaser": null
      },{
        "title": "Uncaught SyntaxError Unexpected token",
        "excerpt":"문제발생: 백오피스 파일 다운로드 기능을 구현하던 중 Uncaught SyntaxError: Unexpected token ‘&lt;’ 오류가 발생. 아래 추가로 uncaught reference $ is not defind” 라는 오류가 떨어졌기에, 당연히 .. import한 제이쿼리를 인식하지 못하는중이겠거니 판단하여 화면단에서 path가 올바른지를 확인하는데에 많은 시간을 소비했음… 그러나… 문제를 찾지못하여 개발중인 feature브랜치와 develop브랜치를 하나하나 비교하던중 RestController에서 이상한점을 발견하였음....","categories": ["troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//troubleshooting/uncaught-syntax-error-unexpected-token/",
        "teaser": null
      },{
        "title": "No space left on device",
        "excerpt":"문제발생: “No space left on device” 2022-04-28 15:15:22.845 [org.springframework.scheduling.quartz.SchedulerFactoryBean#0_Worker-8] WARN c.a.s.s.i.S3AbortableInputStream - Not all bytes were read from the S3ObjectInputStream, aborting HTTP connection. This is likely an error and may result in sub-optimal behavior. Request only the bytes you need via a ranged GET or drain the input stream after...","categories": ["troubleShooting","Java"],
        "tags": [],
        "url": "https://hrllk.github.io//troubleshooting/java/No-space-left-on-device/",
        "teaser": null
      },{
        "title": "Singleton",
        "excerpt":"Singleton “소프트웨어 디자인패턴 중 한 종류” Spring의 Bean들은 모두 싱글톤 패턴트로 제공된다. “클래스의 인스턴스를 딱 한개만 생성” 어떻게 ?? 아래 예제코드를 통해 확인해보자 동작방식 및 예제코드 public class SingtonService { /*** * 1. static 영역에 최초 1회만 생성 */ private static final SingletonService instance = new SingletonService(); /*** * 2....","categories": ["spring","designPattern"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/designpattern/singletone/",
        "teaser": null
      },{
        "title": "Transaction",
        "excerpt":"Transaction이란??? 작업의 단위이다. 작업의 단위이며, 하나의 트랜잭션은 Commit되거나 Rollback된다. 왜 사용할까? 보통.. 하나의 작업은 여러개의 쿼리를 요구한다. 데이베이스를 다룰 때 트랜잭션을 적용하면 데이터의 추가, 업데이트, 삭제 등으로 이뤄진 작업을 처리하던도중 오류 발생시 모든 작업들을 원상태로 되돌릴 수 있다. (모든 작업들이 성공해야만 최종적으로 데이터베이스에 반영하도록 한다.) 송금이라는 작업이 있다고 가정하자. A가...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/Transaction/",
        "teaser": null
      },{
        "title": "DevOps",
        "excerpt":"포스팅하는이유 업무를 하면서 DevOps의 특징이 현재 나의 포지션(?)과 닮았다 느꼈지만, 정확한 의미를 제대로 알지못하여 생각정리겸 최대한 간결하게 포스팅을 하기로하였다. DevOps란? DevOps == Dev(개발) + Ops(운영) 이다. DevOps는 소프트웨어 개발방법론 중 하나이다. 각 프로세스(개발, 테스트, 배포(운영))의 담당자들을 모아놓은 하나의팀을 의미한다. 탄생배경(왜 ??) 일반적으로, 개발팀에서 개발이 끝나면 테스트를 거쳐 라이브 브랜치에 새로운...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/devOps/",
        "teaser": null
      },{
        "title": "A1931 회의실 배정",
        "excerpt":"문제 한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 I에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의가 겹치지 않게 하면서 회의실을 사용할 수 있는 회의의 최대 개수를 찾아보자. 단, 회의는 한번 시작하면 중간에 중단될 수 없으며 한 회의가 끝나는 것과 동시에...","categories": ["algorithm"],
        "tags": [],
        "url": "https://hrllk.github.io//algorithm/Algorithm-%ED%9A%8C%EC%9D%98%EC%8B%A4/",
        "teaser": null
      },{
        "title": "ReseponseBody VS ModelAttribute",
        "excerpt":"클라이언트로부터 전송받은 데이터를 컨트롤러에서 객체에 바인딩(변환?)시 @RequestBody와 @ModelAttribute를 사용하는데 이 둘의 미묘(?)한 차이를 정리하기위해 포스팅. 결론 @RequestBody : JSON data를 자바객체로 “변환” 시에 사용. @ModelAttribute : form data를 자바객체로 “바인딩”(할당) 시 사용. MessageConverter 스프링은 여러형태의 MessageConverter를 소유하고있다. FormHttpMessageConverter MappingJacksonHttpMessageConverter 차이 @RequestBody Setter 필요없음 @RequestBody에 사용되는 MessageConverter(MappingJacksonHttpMessageConverter)의 매커니즘은 객체에 바인딩하지 않고...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/ResponseBody-ModelAttribute/",
        "teaser": null
      },{
        "title": "pem동작방식",
        "excerpt":"SSH 인증방식중 하나인 PEM을 알아보자. 개요(우리회사 인프라구성) 아마존 AWS로 인프라를 구성할때 퍼블릭으로 접속할수있는 게이트웨이, 그리고 그 게이트웨이를 통해야만 접속할 수 있는 프라이빗 서브넷 영역 내부에 존재하는 서비스 인스턴스들에 접근(to 핸들링)하기위해 우리는 퍼블릭 게이트웨이를 거쳐가야만한다. (현재 회사는 이런식으로 구성이되어있다) 게이트웨이에 접속하는 방법은 설정에따라 ID, PW를 통한 인증으로도 접속할 수 있지만, 보통의...","categories": ["linux"],
        "tags": [],
        "url": "https://hrllk.github.io//linux/what-is-pem/",
        "teaser": null
      },{
        "title": "Circular Reference(순환참조) 란??",
        "excerpt":"오류발생: 사내 업무중 변경된 소스를 배포하였고, Circular Reference 라는 오류를 faced했다 *************************** APPLICATION FAILED TO START *************************** Description: The dependencies of some of the beans in the application context form a cycle: appInstallLogServiceImpl (field com.infinigru.gruvoice.web.service.LoginService com.infinigru.gruvoice.web.service.AppInstallLogServiceImpl.loginService) ┌─────┐ | loginServiceImpl (field com.infinigru.gruvoice.web.service.TcpipMessageService com.infinigru.gruvoice.web.service.LoginServiceImpl.tcpipMessageService) ↑ ↓ | tcpipMessageServiceImpl (field com.infinigru.gruvoice.web.service.GfFdsService com.infinigru.gruvoice.web.service.TcpipMessageServiceImpl.gfFdsService) ↑...","categories": ["spring","troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/troubleshooting/Circular-Reference/",
        "teaser": null
      },{
        "title": "ResponseEntity란?",
        "excerpt":"ResponseEntity ? In Spring, ResponseEntity is a class that represents the entire HTTP response and is derived from the HttpEntity class. 전체 HTTP 응답을 나타내는 클래스 HttpEntity의 파생품 What we mean by the entire HTTP response is; status code, headers and body. We can change these features of the response...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/ResponseEntity/",
        "teaser": null
      },{
        "title": "SES Bounce",
        "excerpt":"평판 SES에는 “평판” 이라는 개념이존재, 평판은 반송율과 수신거부율로 정해지는데 권장사항으로는 반송율은 5% 미만, 수신거부율은 0.1% 미만이여야 함. SNS (Simple Notification Service) 위에서 이야기한 “평판”을 관리하기위해 알람서비스를 이용함. 이메일 반송 혹은 수신거부 되었을때, 모니터링 하기위해 사용한다. SES 설정 이메일전송이 반송되었을때 모니터링 하기위함. Create SNS Topic (Amazon SES &gt; Verified identities &gt;...","categories": ["aws"],
        "tags": [],
        "url": "https://hrllk.github.io//aws/SES-Bounce/",
        "teaser": null
      },{
        "title": "@RequiredArgsConstructor",
        "excerpt":"RequiredArgsConstructor 란??     생성자를통한 의존성주입을 간결하게 설정하는 애노테이션이다.    Before  @Controller public class UserController {          private UserService userService;          public UserController(UserService userService){        this.userService = userService;      } }   After   @Controller @RequiredArgsConstructor public class UserController {          private final UserService userService; }   ","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/RequiredArgsConstructor/",
        "teaser": null
      },{
        "title": "DispatcherSevlet이란?",
        "excerpt":"1. Dispatcher Servlet이란?? FrontController + RequestDispatcher 이다. DispatcherServlet이 자동생성되어 질 때 수 많은 객체가 Ioc된다. 보통 필터들이며, 해당 필터들은 내가 직접 등록할 수 도 있고(on servlet-context.xml), 기본적으로 필요한 필터들은 자동으로 등록되어진다. 2. FrontController 패턴이란? 디자인패턴중 한 종류이다. 필터이다. 맨 앞단에서 모든요청을 낚아채 필요한 클래스에 요청하는 역할을 가지고있다. 3. requestDispatcher란? 사용자의...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/DispatcherSevlet/",
        "teaser": null
      },{
        "title": "Spring 구동순서",
        "excerpt":"구동순서 web.xml이 로딩됨 tomcat에의해 ContextLoaderListener 생성 내가 생각하는 Stream 이란?? 자바 Collection을 Framework를 유연하게 핸들링하는 표준 라이브러리이다. 이점 : 무분별한 loop방지 결국 가독성?? Before @Controller public class UserController { private UserService userService; public UserController(UserService userService){ this.userService = userService; } } After @Controller @RequiredArgsConstructor public class UserController { private final UserService...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/Drive-Order-Of-Spring/",
        "teaser": null
      },{
        "title": "web.xml",
        "excerpt":"web.xml 이란??   설정목록:        sevletContext 초기파라미터 설정            초기파라미터를 가지고있다면           Session의 유효기간 설정            인증도구                   Reference :       Spring Framework 구동순서 완벽정리   ","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/web.xml/",
        "teaser": null
      },{
        "title": "Mockito",
        "excerpt":"Mockito란?? Mock객체를 만들기 위한 프레임워크. 사용이유: 테스트할 서비스클래스를 들여다보면 DB접근을 위한 많은 의존성을 맺고있을 때가있다. 그것들을 테스트하기가 상당히 까다로운데 (DB에있는 데이터를 로딩하기위해 실제로 DB에 데이터가 있어야하는데 테스트시마다 그 데이터들을 일일이 넣어줄것인가??) 해결방법으로 Mockito를 사용할 수 있다. 테스트방법: 1. 가짜객체를 생성 Mock 객체를 사용하여 가짜객체를 생성해낸다. DetectionInfoService detectionInfoService = Mock.mockito(DetectionInfoService.class); 2....","categories": ["tdd"],
        "tags": [],
        "url": "https://hrllk.github.io//tdd/Mockito/",
        "teaser": null
      },{
        "title": "Connection Pool",
        "excerpt":"title: Connection Pool categories: - CS Connection Pool 요청이올때, 커넥션이 만드는것이아닌, 미리만들어놓고, pool로 관리하는 형태를 의미한다. 필요할 때 마다 커넥션을 이용 후, 사용하고난 후 반납하는 기법을 의미한다. 생성된 커넥션을 이용하게되면 커넥션을 맺는 비용을 줄일 수 있다. 그냥 생성되어있는걸 쓰면 되기 때문이다. 생성하고 맺는과정을 생략하니 DB접속도 빠르다. 설정 최적화 커넥션 풀이...","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//Connection-Pool/",
        "teaser": null
      },{
        "title": "Tcpdump",
        "excerpt":"title: tcpdump categories: - CS tcpdump란 네트워크를 인터페이스를 거치는 패킷을 캡쳐해주는 도구 옵션 i device : 어느 인터페이스를 경유하는 패킷들을 잡을지 지정 c number : 제시된 수의 패킷을 받은 후 종료 w : 캡춰한 패킷들을 분석해서 출력하는 대신에 그대로 파일에 저장 n : 모든 주소들을 번역하지 않는다(port,host address 등등) v...","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//tcpdump/",
        "teaser": null
      },{
        "title": "Pull Request",
        "excerpt":"title: PR categories: - CS Pull Requeset 원작자의 코드에 나의 코드를 기여하는 행위 왜?? 다른사람의 코드이기 때문에, 내가 코드를 수정한들 병합할 수 있는 권한이없기때문. 방법 따라서 원작자의 코드를 Fork한 후, 수정하여 원작자에게 Pull Request한다. (내가 기능을 추가했으니, 검토 후 원본에도 반영해주세요…) 라는 뜻이다. Pull Request를 받은 원작자는 해당내용을 확인하고, 병합여부를...","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//pull-request/",
        "teaser": null
      },{
        "title": "스프링이란",
        "excerpt":"스프링을 사용하는이유 스프링이란: Java진영에서 사용하는 엔터프라이즈 애플리케이션 개발을 쉽게 해주는 프레임웤이다. 탄생배경: 스프링이 탄생하기전에는 자바진영에서 EJB라는 프레임워크를 사용했었는데, 무겁고 복잡한 EJB의 특성으로 인해 스프링이 등장하게되었다. 특징: POJO Base 및 사용이유 EJB나 J2EE프레임워크들은 사용방법이 구현(implement)하거나, 상속을(extends)받아야하는데 이러한 사용방법들은 프레임워크를 종속시키며 애플리케이션을 무겁고 복잡하게 만든다. 2000년대 초반에 EJB로 개발된 많은 프로젝트들이 실패하였다....","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/why-we-use-spring/",
        "teaser": null
      },{
        "title": "Pojo",
        "excerpt":"title: 스프링이란 categories: - spring POJO(Plain Old Java Object) 간단한 자바 오브젝트 탄생배경 스프링이 탄생하기전 JavaEE 라는 프레임워크가 있었고, 해당프레임웍을 종속하면서 객체지향의 장점이 퇴색되었다. “다시 객체지향의 본질로 돌아가자” 라는의견과 함께 탐생한 용어입니다. 탄생배경 2 - TMI 스프링 프레임웤 이전의 프레임웍(EJB)들의 설계방식은, 그 기술(클래스)을 직접적으로 사용하게끔 객체를 설계했고, 이러한 설계방식. 해당...","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//pojo/",
        "teaser": null
      },{
        "title": "Algorithm Sample",
        "excerpt":"Algorithm Sample  ","categories": ["algorithm"],
        "tags": [],
        "url": "https://hrllk.github.io//algorithm/algorithm-sample/",
        "teaser": null
      },{
        "title": "DataStructure Sample",
        "excerpt":"DataStructure Sample  ","categories": ["data-structure"],
        "tags": [],
        "url": "https://hrllk.github.io//data-structure/dataStructure-sample/",
        "teaser": null
      },{
        "title": "HTTP",
        "excerpt":"HTTP란 ? Hypertext Transfer Protocol it’s foundation of data communication on the WWW(World Wide Web) client sends an HTTP to the server, Then the server responds with an HTTP resonse that includes the requested resource 데이터를 주고받기위한 서버와 사용자간의 프로토콜이다. 특징 HTTP is a stateless protoocl, which means that each...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/http/",
        "teaser": null
      },{
        "title": "Network Sample",
        "excerpt":"Network Sample  ","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/network-sample/",
        "teaser": null
      },{
        "title": "HTTP, HTTPS 차이",
        "excerpt":"HTTPS란 ? http, https are both used for communication between a client (such a web browser) and server 데이터를 주고받기위한 프로토콜 + 암호화 HTTP(Hypertext Transfer Protocol) + S(Secure) 배경 the main difference between them is in how they secure the data that is trasmitted over the internet HTTP is an...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/what-is-difference-http-https/",
        "teaser": null
      },{
        "title": "Message To Byte Encoder",
        "excerpt":"MessageToByteEncoder 란?? MessageToByteEncoder == Netty framework for Java 비동기이벤트기반 네트워크 애플리케이션 프레임웤 용도 메세지를 bytes로 인코딩해준다 (outbound messages » byte buffers) 그리고 변환된 메세지는 네트워크를 통해 전송할 수 있다. 사용법 클래스 상속 encode() method 재정의 예제코드 public class MyEncoder extends MessageToByteEncoder&lt;MyMessage&gt; { @Override protected void encode(ChannelHandlerContext ctx, MyMessage msg, ByteBuf out)...","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//message-to-byte-encoder/",
        "teaser": null
      },{
        "title": "Factory Pattern",
        "excerpt":"Factory Pattern Factory Pattern == 소프트웨어 디자인패턴 in OOP the Factory Pattern provides a way to create objects without specifying the exact class of object that will be created 생성될 객체의 정확한 클래스를 지정하지않고, 객체를 생성하는방법이라고한다. 음… 이게무슨말일까?? Instead of directly creating an object using the “new” keyword, a factory...","categories": ["designPattern"],
        "tags": [],
        "url": "https://hrllk.github.io//designpattern/factory-pattern/",
        "teaser": null
      },{
        "title": "Docker 와 VM",
        "excerpt":"Docker란 ?? Docker == 하드웨어를 효율적으로 사용하기위한 기술 (컨테이너라고한다.) 배경 (Virtual Machine) 기존의 우리는 하드웨어를 조금 더 효율적으로 사용하기위해 Virturl Machine을 사용해왔다. 서버자원이 놀면 손해이고, 너무 굴리면 서비스의 목숨이 위태롭기때문에 밸런스를 잘 맞춰주어야한다. 하지만,, 가상머신이 가지고있는 단점이 있다. OS 복제로인한 무거움 VM은 호스트 위에서 OS전체를 가상화하여, OS위에서 OS가 구동되는 구조이다....","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/docker/",
        "teaser": null
      },{
        "title": "LocalDateTime_not_supported_by_default",
        "excerpt":"LocalDateTime_not_supported_by_default 줄거리 토이프로젝트를 진행하면서 특정이벤트가 발생했을때, 데이터를 적재하는 로직이있었다. row를 적재하는시점에 적재되는 시간이들어가는 created_at 컬럼이 있었는데, 자동으로 now()값이아닌, null로 채워지지 않는 증상이 있었고, 자동으로 값을 채워주기위해 테이블 scheme을 다음과같이 수정하였다. before ... created_at datetime DEFAULT NULL, ... after ... created_at datetime DEFAULT CURRENT_TIMESTAMP, ... 오류발생 변경해주고나서, row를 적재시, 변경된 컬럼에는...","categories": ["troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//troubleshooting/LocalDateTime_not_supported_by_default/",
        "teaser": null
      },{
        "title": "MultiThread",
        "excerpt":"MultiThread 란?? multithreading is a technique by which a single program can run multiple tasks concurrently (at the same time) within a single process MultiThread == 하나의 프로세스에서 둘 이상의 스레드가 “동시에” 수행하는 것을 의미. 일반적으로는 하나의 프로세스를 하나의 스레드가 수행하지만, 하나의 프로세스를 여러스레드가 동시에 수행하는것을 멀티스레드라고 한다. 특징 리소스...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/MultiThread/",
        "teaser": null
      },{
        "title": "ThreadSafe",
        "excerpt":"ThreadSafe 란?? Thread Safe == MultiThread환경에서 여러 스레드로부터 변수 or 함수 or 객체가 동시에 접근이 이뤄져도, “안전하고” 올바르게 사용할 수 있는 프로그램이다. “안전하다” 의미 각각의 쓰레드가 하나의 작업에대해 동시에 실행하기위해 하나의 인스턴스에 접근하게되는데, 해당 인스턴스내의 동일한 리소스(like.. 전역변수) 에 접근하면, 데이터의 충돌로인해 결과가 손상될 수 있다. 이를 방지하는게 Thread Safe라고한다....","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/ThreadSafe/",
        "teaser": null
      },{
        "title": "Stack",
        "excerpt":"Stack이란? In Java, a stack is a data structure that allows for data to be added or removed only at the top of the stack. This means that the last item added to the stack will be the first item to be removed, known as the Last-In-First-Out (LIFO) principle. Stack...","categories": ["Java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/Stack/",
        "teaser": null
      },{
        "title": "Synchronized Method",
        "excerpt":"Synchronized 메소드란? Synchornized Method == 멀티스레드 환경에서 Thread Safe 하기위한 메소드 용도 멀티스레드 환경에서 여러 스레드가 하나의 공유자원에 동시에 접근하지 못하도록 막는것을 의미한다. 동작원리 When a thread enters a synchronized method, it acquires a lock on the object that the method belongs to. This lock ensures that no other thread...","categories": ["Java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/Synchronized/",
        "teaser": null
      },{
        "title": "Tmux 사용법",
        "excerpt":"tmux 란?? tmux == terminal multiplexer 터미널 분할 기능 + 프로그램을 백그라운드로의 전환 및 복귀 할 수 있도록 도와주는 프로그램 1. 터미널 분할기능 음.. 터미널 분할기능은 iterm의 단축키로도 가능하다. 그렇지만 이 부분은 맥OS에서만 가능하다 다른 유닉스에서는 아마 없는걸로 알고있다. 그래서.. 내 생각은 다른 유닉스환경에서도 tmux를 활용해 화면분할을 할 수 있을것같다....","categories": ["Utility"],
        "tags": [],
        "url": "https://hrllk.github.io//utility/tmux/",
        "teaser": null
      },{
        "title": "쿠버네티스",
        "excerpt":"쿠버네티스란 ?? Kubernetese(k8s) == !도커(컨테이너)를 관리 하기위한 툴 사용배경 1. 컨테이너 수동관리의 어려움 애플리케이션을 격리된환경에서 실행하는 기술인 도커가 유용하게쓰이기 시작. 하지만 컨테이너를 수동으로 관리하는일은 여간 힘든일이 아님을 깨달음 컨테이너를 오케스트레이션 할 수있는 시스템이 필요해짐 이점 1. 확장성(스케일링) 애플리케이션의 스케일링의 유리. 트래픽의 부하에 따라 애플리케이션을 확장하거나 축소할 수있음. 2. 자동화 애플리케이션...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/kubernetes/",
        "teaser": null
      },{
        "title": "Helm Chart Install Guide",
        "excerpt":"Install Helm Chart Guide 네임스페이스접근 k8s 명령어를 이용해 특정 네임스페이스로 접근한다. 특정 네임스페이스 아래, pods아래 애플리케이션을 설치하기 위함이다. (helm을 이용해 특정애플리케이션을 사용자의 namespace에 설치해보자.) kubectl config set-context --current --namespace=${namespace} kubectl config set-context --current --namespace=hrkim helm chart 조회 특정 네임스페이스에 접근후, 다음명령어를 통해 설치된 차트를 조회. helm list helm chart repo...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/helm-chart-install-guide/",
        "teaser": null
      },{
        "title": "Kubenetes CLI Guide",
        "excerpt":"네임스페이스 명령어 조회 네임스페이스 목록조회 $kubectl get ns 선택 아래의 명령어를 사용하여 특정 네임스페이스로 전환. 이 명령은 kubectl 아래구성파일에 있는 컨텍스트 네임스페이스를 변경함. kubectl config set-context --current --namespace=hrkim cat ~/.kube/config 이후 사용되는 kubectl명령은 해당 네임스페이스를 사용하게된다. 리소스 생성, 조회, 수정, 삭제가능 Pod 란? pods == 쿠버네티스의 기본 실행단위. 하나이상의 컨테이너를...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/kubeneties-cli/",
        "teaser": null
      },{
        "title": "What Is Helm?",
        "excerpt":"What is Helm  Helm == 쿠버네티스에서 애플리케이션 손쉽게 설치하기위한 설치툴.    실질적으로는 Helm Chart를 다운로드받는다.     Helm Chart  애플리케이션을 손 쉽게 설치하기위한 설치키트이다. (템플릿 패키지)  묶여있는 단위를 Chart라 한다.      Helm Repo  Helm Chart들이 모여있는 저장소이다.   Prerequistites (사전준비물)  쿠버네티스 설치를 필요로함 (이미설치되어있었음(참고))     Kubernetes cluster   ","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/what-is-helm/",
        "teaser": null
      },{
        "title": "persistent volume",
        "excerpt":"Persistent Volume PV == 데이터저장공간(영구적으로 컨테이너환경에서) 컨테이너환경에서 데이터를 영구적으로 저장할 수 있는 저장공간. (k8s의,) 배경 컨테이너에서 일시적으로 생성되는 데이터는 메모리에저장한다. 그래서 컨테이너가 종료되면, 데이터도 함께 소멸된다. 이런 제한을 극복하기위해 persistent volumn을 사용해 데이터를 영구적으로 보관한다. 특징 k8s의 클러스터내에서 독립적으로 관리. 여러 pod간에 공유되거나 특정 파드에 바인딩 가능. 네트워크 연결을 통해...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/persistent-volume/",
        "teaser": null
      },{
        "title": "storage class",
        "excerpt":"Storage Class Storage Class == 동적으로 프로비저닝되는 스토리지 볼륨의 설정을 정의하는 객체 애플리케이션이나 파드에서 사용할 수 있는 스토리지 볼륨을 정의하고 생성하는데 사용 용도 스토리지 프로비저너 선택 어떤 프로비저너를 이용해서 볼륨을 프로비저닝 할 지 지정. 프로비저너는 스토리지시스템 or 클라우드프로바이더에서 실제로 볼륨을 생성하고 관리하는 역할. 스토리지 클래스 파라미터 스토리지클래스는 프로비저너에대한 구성 옵션을...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/storage-class/",
        "teaser": null
      },{
        "title": "why we use scm-manager?",
        "excerpt":"scm-manager SCM Manager is an open-source web-based application that provides version control repository management for various source code management systems. It offers a centralized platform to host and manage repositories, making it easier for teams to collaborate on software development projects. SCM Manager == 오픈소스(소스코드 버전컨트롤을위한) 용도 사실 팀내 소프트웨어...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/scm-manager/",
        "teaser": null
      },{
        "title": "what is haproxy??",
        "excerpt":"what is haproxy HAProxy is a free and open-source load balancing and proxying solution that allows distributing network traffic across multiple servers to ensure high availability, scalability, and reliability of applications. It operates at the application layer (Layer 7) of the OSI model and provides advanced features for load balancing,...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/haproxy/",
        "teaser": null
      },{
        "title": "what is layer 7 load balancing?",
        "excerpt":"what is layer 7 load balancing? Layer 7 load balancing, also known as application-level load balancing, operates at the highest layer of the OSI model, the application layer. It involves distributing network traffic based on specific application-level information, such as HTTP headers, URLs, cookies, or application-specific data. layer 7 load...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/layer-7-load-balancing/",
        "teaser": null
      },{
        "title": "K8S Service Account",
        "excerpt":"Service Account In Kubernetes, a ServiceAccount is an identity used by Pods or applications to authenticate and authorize themselves when interacting with the Kubernetes API server or other cluster resources. Service Account == 인증 하기위한 리소스 클러스터안에있는 리소스(Pod or application)들이 서로 상호작용을 하기위함 기본동작흐름 When a Pod is created, it...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/k8s-service-account/",
        "teaser": null
      },{
        "title": "what is containerd ? (in kubernetes)",
        "excerpt":"containered란?? Containerd is an open-source container runtime that provides a core set of features for container management, such as image management, container lifecycle management, and low-level runtime operations containerd == 쿠버네티스의 컨테이너 runtime tool 컨테이너를 관리하기위한 핵심기능을 제공 이미지관리, 컨테이너 라이플사이클 관리 등.. 컨테이너 관리에대한 기능을 가볍게 모듈링한 오픈소스. 왜?...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/containerd/",
        "teaser": null
      },{
        "title": "what is ctr (in containerd)",
        "excerpt":"ctr이란?  ctr == containerd 의 daemon(바이너리)   containerd == 쿠버네티스에서 컨테이너를 런타임하기위한 모듈     기능   1. 이미지관리(컨테이너의)  pull, push, list, delete 가능 (using ctr)   2. 컨테이너 관리  create, starting, stopping, delete 가능   3. 메타데이터 검사  메타데이터 확인가능 &gt; e.g) 컨테이너의 상태, 실행환경, 리소스사용량   4. 컨테이너에서 명령어실행가능  실행중인 컨테이너에서 명령어 실행이가능하다.  ","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/ctr-containerd-cli/",
        "teaser": null
      },{
        "title": "what is kubelet? (in kubernetes)",
        "excerpt":"kubelet이란? kubelet == 쿠버네티스의 클러스터 컴포넌트 클러스터 안에있는 노드들을 관리한다. 기능 1. node agent kubelet은 각 노드들에서 실행됨. 노드의 라이프 사이클을 관리하기위함 2. 파드실행 파드들을 실행하는 역할담당 컨테이너 런타임 » containerd통신해서 파드를 시작 or 정지 관리하는 역할을 수행한다. 3. 상태모니터링 노드와 노드에서실행중인 컨테이너의 상태(리소스)를 모니터링. 컨테이너 혹은 파드가 실패한경우, 재시작 혹은...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/kubelet/",
        "teaser": null
      },{
        "title": "docker commands",
        "excerpt":"build docker image docker build -f dockerfile -t mini-web 1. install builderx (to build on docker) 도커이미지파일을 통해 이미지를 생성(빌드)하려 하였으나, 빌더가 오래되었고, 더이상 사용되지않는 에러리턴 The legacy builder is deprecated and will be removed in a future release. Install the buildx component to build images with BuildKit: builderx라는 플러그인을...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/docker-command/",
        "teaser": null
      },{
        "title": "k8s component - Control Plane",
        "excerpt":"Control Plane Components 클러스터 매니징, 이벤트핸들링 + coordinating tasks to 워커노드 “Control Plane” 컴포넌트는 보통 마스터노드에 배포. 1. kube-api server api server == API server 클라이언트에게 메뉴를 노출해 요청을받음 (pod or service를 생성하거나, 배포등의 리소스를 생성, 수정) 요청을받고, 주문이 유효한지 검사하고 처리후, 클러스터 내부 상태를 업데이트함. 2. etcd etcd ==...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/k8s-component-control-plain/",
        "teaser": null
      },{
        "title": "what is openshift",
        "excerpt":"openshift란 openshift == 클라우드 + kubernetes기반 컨테이너플랫폼 클라우드기반의 kubernetes 확장판. 목적: 컨테이너간의 okestration, CI/CD 파이프라인 을 보다 편리하게 기능 1. 컨테이너화 Docker같은 툴을 사용해 격리된공간에 애플리케이션을 배포 2. 오케스트레이션 openshift == kubenerntes 위에서 구축됨(kubernetes의 기능을 확장받음) 3. 개발자 생산성(워크 플로우간소화) 소스통합, 자동빌드, 배포 자동화기능 제공 4. 멀티, 하이브리드클라우드 환경 지원...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/openshift/",
        "teaser": null
      },{
        "title": "what is nas??",
        "excerpt":"Nas Repository란?? NAS(Network Attached Storage) == LAN으로 연결하는 외장 하드디스크 네트워크 외장 하드디스크 반대되는 개념은 DAS(Direct Attached Storage) 작동원리 1. 네트워크연결 이더넷 or 무선네트워크를 통해 로컬 네트워크에 연결. 연결된 NAS장치는 할당된 IP주소를 사용하여 통신. 2. 파일시스템 관리 하드드라이브 or 스토리지 어레이로 구성된 파일시스템. 이 파일시스템의 데이터를 조직화하며 메타데이터를 관리. E.g)...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/nas/",
        "teaser": null
      },{
        "title": "what is openstack",
        "excerpt":"openstack이란 OpenStack is an open-source cloud computing platform that allows you to create and manage a private or public cloud infrastructure. It provides a set of software tools for building and managing cloud computing platforms for various purposes, such as virtual machines, storage, and networking. openstack == 오픈소스(클라우드 컴퓨팅 플랫폼구축을...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/openstack/",
        "teaser": null
      },{
        "title": "git flow",
        "excerpt":"git flow git flow == git 의 브랜치전략 구성 master, develop, feature, release, hotfix로 구성 절차 create master, develop branches create feature branch (from develop branch) 기능을 개발하기위함 merge feature branch into develop branch 개발한소스를 develop에 merge create release branch (from develop branch) QA QA를 위해 릴리즈 브랜치를 생성 만약...","categories": ["modernSoftware","devOps"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/devops/git-flow/",
        "teaser": null
      },{
        "title": "github과 gitlab의 flow",
        "excerpt":"github flow git flow(5) 를 간소화한 전략 브랜치구성 master 와 작업브랜치로만 구성 모든 작업(새 기능추가 or 버그해결)은 master브랜치로부터 checkout되며 브랜치이름은 어떤작업을 하는지 자세하게 작성 주기적 Push Local 작업브랜치에 수시로 커밋하고 Remote 작업 브랜치에 수시로 Push 병합 작업브랜치에 작업이 완료되었다면 Master에 병합을 준비하는과정 PR을 생성 후, 자신의 코드를 공유 공유가 끝나고...","categories": ["modernSoftware","devOps"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/devops/show-diff-flow-github-gitlab/",
        "teaser": null
      },{
        "title": "Harbor",
        "excerpt":"title: what is harbor?? categories: - modernSoftware - devOps — harbor 란?? Harbor is an open-source cloud-native container registry that is used for storing, securing, and distributing container images. It was initially developed by VMware and is now part of the Cloud Native Computing Foundation (CNCF). harbor == 이미지(컨테이너) 저장소...","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//harbor/",
        "teaser": null
      },{
        "title": "Nexus",
        "excerpt":"title: what is nexus?? categories: - modernSoftware — nexus repository란?? A Nexus repository refers to a software repository management system developed by Sonatype. It is designed to host and manage software components and artifacts, including binary files, libraries, frameworks, and other dependencies. Nexus repositories provide a central location where development...","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//nexus/",
        "teaser": null
      },{
        "title": "Git Hook",
        "excerpt":"title: what is git hook? categories: - modernSoftware — git hook이란?? Certainly! Git hooks are scripts that can be executed automatically before or after certain events occur in a Git repository. These events can include actions like committing changes, pushing to a remote repository, merging branches, or even checking out...","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//git-hook/",
        "teaser": null
      },{
        "title": "serialVersionUID란?",
        "excerpt":"serialVersionUID란? In Java, the term “serialVersionUID” refers to a special field used in the serialization and deserialization process of objects. It is a unique identifier for a serialized class and is used to ensure that the deserialization process is performed properly. serialVersionUID == unique value 이다. to 직렬화, 역직렬화에 상용되는.....","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/serialVerionUID/",
        "teaser": null
      },{
        "title": "neovim이란 ?",
        "excerpt":"neovim 이란? Neovim is a modern, highly extensible, and backward-compatible text editor that is designed as a fork and successor to the Vim text editor. It aims to provide a better user experience, improved performance, and enhanced extensibility while maintaining compatibility with Vim’s keybindings and configuration. neovim == 모던한 text...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/neovim/",
        "teaser": null
      },{
        "title": "nmap이란 ?",
        "excerpt":"nmap 이란? Nmap (Network Mapper) is a powerful and widely used open-source network scanning and reconnaissance tool. It is designed to discover hosts and services on a computer network, thus providing valuable information about network infrastructure and security. nmap == 오픈소스 툴 to 네트워크를 스캔하기위한 툴 의미있는 정보를 제공 (네트워크...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/nmap/",
        "teaser": null
      },{
        "title": "gitlab merge request 절차",
        "excerpt":"gitlab MR 절차 gitlab MR 절차테스트 1. create branch curl --location --request POST '${host}/api/v4/projects/1/repository/branches?branch=test-branch&amp;ref=main' \\ --header 'Authorization: Bearer glpat-gmQy3xan28N_MU-63nZA' \\ --data '' 2. commit changes curl --location '${host}/api/v4/projects/1/repository/commits' \\ --header 'Content-Type: application/json' \\ --header 'Authorization: Bearer glpat-gmQy3xan28N_MU-63nZA' \\ --data '{ \"branch\": \"test-branch\", \"commit_message\": \"test commit message\", \"actions\": [ { \"action\":...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/gitlab-api-merge-request/",
        "teaser": null
      },{
        "title": "maven vs gradle",
        "excerpt":"maven vs gradle Maven and Gradle are both popular build automation tools used in Java and other programming languages. While they serve similar purposes, there are some key differences between Maven and Gradle: Maven과 Gradle은 컴파일러다 Java파일을 컴파일하기위한 컴파일러 매우유사지만 몇가지다른점이있다 차이점 1: Configuration and Syntax: Maven: Maven uses an...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/maven-vs-gradle/",
        "teaser": null
      },{
        "title": "log4jdbc",
        "excerpt":"log4jdbc? Log4jdbc is a Java library that provides JDBC (Java Database Connectivity) logging and debugging capabilities. It is used to log SQL statements, parameters, and results generated by JDBC calls, making it a helpful tool for debugging and performance monitoring of database interactions in Java applications. Log4jdbc == library JDBC...","categories": ["java","framework"],
        "tags": [],
        "url": "https://hrllk.github.io//java/framework/log4jdbc/",
        "teaser": null
      },{
        "title": "Maven Shade Plugin",
        "excerpt":"오류발생 인터페이스하기위한 라이브러리를 내부적으로 테스트 후 고객사에 제공했으나, 고객사가 해당 라이브러리(.jar)를 import 하고 라이브러리 내부의 함수를 호출하여 기능을 테스트했지만 호출시에 라이브러리 내부에있는 클래스를 찾을 수 없다고 오류가 발생하였음 원인 원인 == 불완전한 패키징 원인은 만든 라이브러리는 구동시 외부 라이브러리를 의존하는데 의존되는 라이브러리들이 같이 패키징되지 않았다. 그런데 어떻게 내부적으로 테스트했을 당시는...","categories": ["troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//troubleshooting/maven-shade-plugin/",
        "teaser": null
      },{
        "title": "WHAT IS DHCP",
        "excerpt":"What is DHCP DHCP == Dynamic Host Configuration Protocol 프로토콜 동적으로 호스트를 설정하기 위한 It is a network protocol used to automatically assign and manage IP addresses and other configuration information to devices on a TCP/IP network. DHCP simplifies the process of network administration by dynamically allocating IP addresses to...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/what-is-dhcp/",
        "teaser": null
      },{
        "title": "WHAT IS ICMP",
        "excerpt":"What is ICMP ?? ICMP stands for Internet Control Message Protocol. It is a network layer protocol used in the Internet Protocol (IP) suite, primarily for diagnostic and error-reporting purposes. ICMP is used by network devices, like routers and hosts, to communicate error information and status updates to other devices...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/ICMP/",
        "teaser": null
      },{
        "title": "WHAT IS bestfit",
        "excerpt":"What is bestfit ?? bestfit == 알고리즘 메모리를 관리하기위한 알고리즘 It involves allocating the smallest available memory block that is large enough to accommodate a requested size. This helps minimize memory wastage, but may result in fragmentation over time. bestfit은 수반한다 허용을 수반한다 사용가능한 작은단위의 메모리 블럭형태로 메모리를 방지가 가능(장점),...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/bestfit/",
        "teaser": null
      },{
        "title": "what is subnetmask?",
        "excerpt":"subnet mask subnetmask == 네트워킹에 사용되기위해 이뤄진 32bit로 이뤄진 숫자 A subnet mask is a 32-bit number used in networking to determine the range of IP addresses within a network. It is used to divide the IP address into two parts: the network address and the host address. 용도는.. 네트워킹에...","categories": ["CS","network"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/network/subnetmask/",
        "teaser": null
      },{
        "title": "CS 오답노트",
        "excerpt":"stop and wait 전송계층 프로토콜 중 1 (to 데이터 보장) 데이터를 송신하고 정지, 대기하는 프로토콜이며 송신에대한 에러유무를 판단한다. coincidental cohesion 우연한 응집도를 의미 모듈내 서로관련이 없는 기능들이 뭉쳐있는것을 의미 가독성 저하, 유지보수가 어려워짐 논리주소에 대한 물리주소 계산법 CMM CMM == capability maturity model 성숙도 모델 조직의 유지보수 프로세스를 평가, 개선하기위한...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/cs-note/",
        "teaser": null
      },{
        "title": "CS 오답노트(24.02.13-2)",
        "excerpt":"해싱함수 종류 제산법(division): 입력값을 특정 숫자로 나눈 후 나머지값을 해시로 사용하는 방식 숫자분석법(digit): 부분 해싱 충돌을 보다 예방 가능 제곱법(mid-square): (입력값제곱 / 2)(의 중간값) 오버플로우 발생할 수 있음 데이터베이스 스키마 종류 internal 데이터가 물리적으로 저장되는 방법을 설명 테이블정보, 인덱스정보 … conceptual (개념) 사용자 그룹에 대한 구조 데이터 유형 및 관계,...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/cs-note2/",
        "teaser": null
      },{
        "title": "CS 오답노트",
        "excerpt":"데이터베이스 데이터베이스 물리적 설계 레코드 집중 및 분석 설계 접근 경로 설정 저장 레코드의 양식 설계 병행제어 기법 프로그래밍 언어 활용 CSMA/CA Carrier Since Multiple Access with Colision Avoidance CA == Colision Avoidance (충돌 회피) CD == Colision Detection (충돌 탐지) 프로세스 적재정책 설명 반복, 스택 및 부 프로그램은 시간...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/cs-note/",
        "teaser": null
      },{
        "title": "CS 오답노트",
        "excerpt":"설계 개발 DFS 깊이 순서 Depth First Search 깊이 우선 탐색 연결된 브랜치를 모두 탐색하고 다음 브랜치로 넘어가는 방식 자료구조 선형 리스트 큐 스택 데크 비선형 트리 그래프 파일 직접 파일 순차 파일 색인 파일 테스트 테스트 드라이버 상위 모듈 목업 용도 테스트 스텁 하위 모듈 목업 용도 데이터베이스 프로그래밍...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/cs-note2/",
        "teaser": null
      },{
        "title": "CS 오답노트 linux",
        "excerpt":"RAID $rw init-bin/sh GDM DISPLAY(환경변수) 시그널번호 arp ss /etc/passwd /etc/gshadow w /usr/bin/passwd link-s locate NI&amp;PRI pgrep pkill killall tar 옵션 ldd modprobe 커널컴파일과정 make config make menuconfig fdisk(파티션속성변경) mdadm(RAID구성과정) 프린트작업요청 logger sysctl setfacl chattr nessus cpio XFS 파일시스템 dump httpd 및 옵션 mod_userdir.so(ask) LDAP LDAP 속성 설정 systemctl ypbind, yptools...","categories": ["OS","CS"],
        "tags": [],
        "url": "https://hrllk.github.io//os/cs/cs-note-lnx/",
        "teaser": null
      },{
        "title": "CS 오답노트",
        "excerpt":"인스펙션 inspection == 조사, 점검 작성자를 제외한 검토자들이 명세서를 확인하면서 결함을 점검하는행위 “정적” 검사 코드품질 향상 기법 중 1 순서 교육 준비 회의 수정 조치 정규형 용어가 너무 어려운 정규형 … 1NF 속성의 속성값들이 원자값으로만 구성됨, 더 이상 쪼개질 수 없고, 아래와 같은 문제 발생 문제점: 삽입이상, 삭제이상, 갱신이상 발생...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/cs-note/",
        "teaser": null
      },{
        "title": "troubleShooting getReader has already been called",
        "excerpt":"error 2024-03-04 15:03:33 [INFO] [http-nio-8080-exec-3] o.o.tps.api.config.InterceptorConfig - Request URL: [http://localhost:8080/post-test] || Method: [POST] || Data: [{\"name\": \"hhh\",\"age\": \"18\"}] 2024-03-04 15:03:33 [ERROR] [http-nio-8080-exec-3] o.a.c.c.C.[.[.[.[dispatcherServlet] - Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: java.lang.IllegalStateException: getReader() has already been called for this request] with root cause...","categories": ["troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//troubleshooting/trouble-shooting-get-inputstream-has-already-been-called/",
        "teaser": null
      },{
        "title": "hexagonal architecture",
        "excerpt":"table of Contents what is hexagonal architecture principle application domain infrastructure Benefit 1. focus 2. easier to understand References what is hexagonal architecture hexagonal architecture === 소프트웨어 설계 방식 도메인 로직 중심 소프트웨어 설계 방식 aka ddd principle 역할 분기(외부와 내부) application(outside), domain(inside), infrastucture(outside) application 외부와 접점되는 구간 접점되는 컴포넌트들을...","categories": ["softwareArchitecturePattern"],
        "tags": [],
        "url": "https://hrllk.github.io//softwarearchitecturepattern/hexagonal-architecture/",
        "teaser": null
      },{
        "title": "what is csrf",
        "excerpt":"what is csrf CSRF == Cross Site Request Forgery 크로스 사이트 요청 위조 보안 취약점 예방책 that occurs when an attacker tricks a user’s browser into making an unintended request to a website where the user is authenticated 공격자가 브라우저를 속여 공격하는 방식 (상태값 병경 (계정 정보 변경, 폼값 전송...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/csrf/",
        "teaser": null
      },{
        "title": "what is non-blocking http",
        "excerpt":"non-blocking http non-bloking http == 동시에 여러 요청을 수행하기위한 통신처리 스타일 ?? &gt; HTTP 통신에서 쓰레드가 요청을 수행하는데 이 요청에대한 응답을 기다리지않고, 비동기식으로 동시에 다른쓰레드를 계속 이용해 요청을 동시에 수행할 수 있음을 의미한다. HTTP 통신을 핸들링 하기위해 사용 쓰레드가 기다리지 않게 사용 In traditional blocking I/O, when a thread makes...","categories": ["cs"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/non-blocking-http-request/",
        "teaser": null
      },{
        "title": "generic response",
        "excerpt":"generic response We can say that GenericResponse is a term used to express a general response class. This type of class provides us with a generalized structure to cover the different types of data that the API can return. Thus, we can return various responses to the client, such as...","categories": ["modernSoftware","spring"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/spring/generic-response/",
        "teaser": null
      },{
        "title": "exception handler getting started",
        "excerpt":"  exception handler   references  https://www.baeldung.com/exception-handling-for-rest-with-spring   ","categories": ["modernSoftware","spring"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/spring/exception-handler/",
        "teaser": null
      },{
        "title": "caching getting started on spring boot",
        "excerpt":"Dependencies spring context (caching에 필요한 핵심적 기능) caching abstration: cache manager 제공   purpose: to store cache into storage spring-boot-starter-cache: spring boot 에서 캐싱과 관련된 의존성 추가를 쉽게 ~~implementation 'org.springframework:spring-context:6.1.3' // caching abstraction~~ implementation 'org.springframework:spring-context-support:6.1.3' // cache manager implementation 'org.springframework.boot:spring-boot-starter-cache:3.2.3' // starter pacakge with cache spring-context-support 의존성은 spring-context의존성을 주입하고있음, 따라서...","categories": ["spring","modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/modernsoftware/caching-getting-started-on-spring/",
        "teaser": null
      },{
        "title": "caching getting started on spring boot",
        "excerpt":"Dependencies spring context (caching에 필요한 핵심적 기능) caching abstration: cache manager 제공   purpose: to store cache into storage spring-boot-starter-cache: spring boot 에서 캐싱과 관련된 의존성 추가를 쉽게 ~~implementation 'org.springframework:spring-context:6.1.3' // caching abstraction~~ implementation 'org.springframework:spring-context-support:6.1.3' // cache manager implementation 'org.springframework.boot:spring-boot-starter-cache:3.2.3' // starter pacakge with cache spring-context-support 의존성은 spring-context의존성을 주입하고있음, 따라서...","categories": ["spring - modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//spring%20-%20modernsoftware/@transaction/",
        "teaser": null
      },{
        "title": "what is JTA",
        "excerpt":"JTA JTA == Java Transaction API Java 진영에서 transaction 을 관리하기위한 API The true power of JTA lies in its ability to manage multiple resources (i.e. databases, messaging services) in a single transaction. transaction(commit or rollback)을 제어하기위해 추상적으로 제공 해당 추상화가 없는경우, 각 리소스별로 각 API에 대해서 처리를 해야함 JDBC...","categories": ["java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/JTA/",
        "teaser": null
      },{
        "title": "Could not write JSON JsonObject (default message converter of spring)",
        "excerpt":"Error 2024-04-15 19:58:43 [WARN] [http-nio-8085-exec-1] o.s.w.s.m.s.DefaultHandlerExceptionResolver - Resolved [org.springframework.http.converter.HttpMessageNotWritableException: Could not write JSON: JsonObject] spring was 환경에서 API를 통해 클라이언트에게 응답을 하던 중 오류가 발생 Default Converter 기본적으로 아래 컨버터들을 지원한다. ByteArrayHttpMessageConverter – converts byte arrays StringHttpMessageConverter – converts Strings ResourceHttpMessageConverter – converts org.springframework.core.io.Resource for any type of octet stream...","categories": ["troubleShooting","spring"],
        "tags": [],
        "url": "https://hrllk.github.io//troubleshooting/spring/message-converter/",
        "teaser": null
      },{
        "title": "Spring Transaction Strategy",
        "excerpt":"Overview Spring의 @Transactional 어노테이션은 매우 유용하지만, 기본 동작 방식에 대한 오해는 종종 데이터 정합성 문제로 이어질 수 있음. 해당 포스트에서는 핵심적인 두 가지 질문에 대해 명확히 짚으려 함 롤백(Rollback)의 기본 규칙: Unchecked Exception vs Checked Exception 가장 흔한 오해는 “예외가 발생하면(모든) 롤백을 일으킨다.” 이는 오해 예외 종류 기본 동작 예시...","categories": ["spring","troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/troubleshooting/spring-transaction-strategy/",
        "teaser": null
      },{
        "title": "Could not initialize class sun.awt.X11FontManager(POI)",
        "excerpt":"Overview 2024-04-22 18:41:20 [ERROR] [http-nio-8082-exec-5] o.a.c.c.C.[.[.[.[dispatcherServlet] - Servlet.service() for servlet [dispatcherServlet] in context with path [/common/api] threw exception [Handler dispatch failed: java.lang.NoClassDefFoundError: Could not initialize class sun.awt.X11FontManager] with root cause java.lang.NoClassDefFoundError: Could not initialize class sun.awt.X11FontManager at java.base/java.lang.Class.forName0(Native Method) at java.base/java.lang.Class.forName(Class.java:466) at java.desktop/sun.font.FontManagerFactory$1.run(FontManagerFactory.java:82) at java.base/java.security.AccessController.doPrivileged(AccessController.java:312) at java.desktop/sun.font.FontManagerFactory.getInstance(FontManagerFactory.java:74) at java.desktop/java.awt.Font.getFont2D(Font.java:526) at...","categories": ["java","troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//java/troubleshooting/POI-issue/",
        "teaser": null
      },{
        "title": "what is diffrenet between XSSFWorkbook and SXSSFWorkbook",
        "excerpt":"XSSFWorkbook 07년 이후 POI 표준, 확장자 .xlsx 전체 엑셀 문서를 메모리에 로드 대용량 엑셀 파일 보다 중소형 엑셀파일에 적합 엑셀 데이터가 많은경우 OOM 이슈 발생 할 수 있음 SXSSFWorkbook XSSFWorkbook의 확장 클래스 스트리밍 기능 제공 대용량 엑셀을 writing 하기위해 설계됨 메모리가 아닌, 임시디스크파일에 데이터를 기록한 후 대량의 엑셀파일을 처리할 수...","categories": ["spring","troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/troubleshooting/diffrence-between-XSSFWorkbook-and-SXSSFWorkbook/",
        "teaser": null
      },{
        "title": "spring cloud getting started",
        "excerpt":"spring cloud config spring cloud config server === 설정값들을 저장하고 있는 서버 추후 여러 애플리케이션에서 해당 서버로 저장되어있는 설정값들을 요청시, 저장되어있는 설정값들을 서빙하는 용도로 활용됨 spring 애플리케이션에 매우 적합하지만 다른 종류 언어기반의 애플리케이션과도 활용됨 dependencies spring-cloud-config-server spring-boot-starter-web configuration @EnableConfigServer @SpringBootApplication @EnableConfigServer public class ConfigServer { public static void main(String[] arguments)...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/spring-cloud-quick-start/",
        "teaser": null
      },{
        "title": "principle of operation of message converter (in spring)",
        "excerpt":"principle of operation request, response processing When a client sends an HTTP request to a Spring application, the request body may contain data in a specific format (e.g., JSON, XML). Spring’s message converters are used to convert the request body data into Java objects that can be processed by the...","categories": ["spring","troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/troubleshooting/principle-of-operation-of-message-converter/",
        "teaser": null
      },{
        "title": "getting started logging aspect",
        "excerpt":"what’s AOP? AOP stands for Aspect-Oriented Programming. It is a programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns. In AOP, cross-cutting concerns are aspects of a program that affect multiple parts of the codebase and are difficult to modularize using traditional object-oriented programming techniques....","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/log-aspect/",
        "teaser": null
      },{
        "title": "JPQL이란?",
        "excerpt":"JPQL ? JPQL (Java Persistence Query Language) is a query language defined by the JPA (Java Persistence API) JPQL == Java Persistence Query Language JPA의해 선언된 쿼리 언어로, 객체 지향 쿼리를(OOQ) 의미 SQL과의 차이점이라고 한다면, SQL은 DB의 테이블을 대상으로 쿼리문이 작성되고, JPQL은 entity를 대상으로 쿼리문이 작성된다. 이리 작성된 JPQL은 결국...","categories": ["spring","persistence"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/persistence/jpql/",
        "teaser": null
      },{
        "title": "cs note",
        "excerpt":"데이터 마이닝 Data mining is the process of discovering patterns, trends, and insights from large datasets using a combination of techniques from statistics, machine learning, and database systems. The goal of data mining is to extract useful and actionable information from data that may be hidden, unknown, or not readily...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/cs-note/",
        "teaser": null
      },{
        "title": "job store",
        "excerpt":"JobStore 설정  Job과 Trigger를 관리하기 위함  JobStoreTx   JobStoreCMT   차이는 트랜잭션 차이 transaction을 관리하는 방법에 차이가 있음  ","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/job-store/",
        "teaser": null
      },{
        "title": "async request",
        "excerpt":"feignClient 의 응답타입이 void인경우 비동기로 요청 가능 오류났을때는.. ?   ","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/feign-void-async/",
        "teaser": null
      },{
        "title": "CS 오답노트",
        "excerpt":"RARP (Reverse ) “역순 주소 결정 프로토콜” MAC 주소에 해당하는 IP주소를 알려주는 프로토콜 DB 설계 종류 개념 사람이 이해할 수 있는 형태의 정보구조 논리 위 구조를 컴퓨터가 이해하고 처리할 수 있도록 변환하는 과정 물리 실제 저장장치에 어떻게 저장할지 설계하는 단계 EAI 기업에서 서로 다른 플랫폼 및 애플리케이션 간의 정보를 “전달,...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/cs-note/",
        "teaser": null
      },{
        "title": "cs note",
        "excerpt":"형상관리도구 CVS, SVN, GIT 형상 통제 변경 요청을 “검토”, “승인” 현재 베이스라인에 반영되게끔 통제 디자인 패턴 - Bridge 구현부, 추상부 분리하여 각자 독립적으로 변형 및 확장 가능 디자인 패턴 - Observer 한 객체의 상태가 변경되면 그 객체에 의존하는 다른 객체들에게 연락되며 자동으로 내용이 갱신되는 방식의 패턴 UML UML 다이어그램 UML...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/cs-note/",
        "teaser": null
      },{
        "title": "linux 오답노트",
        "excerpt":"고가용성 클러스터 인프라기술이며, 로드밸런서를 이용해 부하분산 역할을 수행하도록 구성 RAID RAID 5: N - 1(패리티) rw init=/bin/sh 루트 비밀번호 분실시 환경 설정 파일 변경 루트 비밀번호로 수정하 rw single GDM (GNOME Display Manager) GNOME == 리눅스 GUI 관리자 이미지 ARP (Adrress Resolution Protocol) 로컬 네트웍에 연결된 다른 호스트의 Mac주소를 확인하기...","categories": ["linux"],
        "tags": [],
        "url": "https://hrllk.github.io//linux/linux/",
        "teaser": null
      },{
        "title": "MSA architecture",
        "excerpt":"MSA Architecture Componentization: 구성 요소화 독립적으로 재 배포할 수 있게 컴포넌트를 독립적으로 분기 목적은 서비스의 재사용성에 포커스를 맞추고있음 Product-Based decentralization Pros Fast CI/CD Monolithic 서비스보다 가벼워 CI/CD가 보다 빠름 Single Responsibility 각 서비스(모듈)별 개발이 가능하며 독립적으로 배포가능 Cons Network complexity 메세징에 크게 의존되므로 네트워크 관리에대한 cost가 모놀리식보다 높음 Poor performance...","categories": ["modernSoftware"],
        "tags": [],
        "url": "https://hrllk.github.io//modernsoftware/msa-architecture/",
        "teaser": null
      },{
        "title": "linux master",
        "excerpt":"시스템 관리 실무 사용자 및 그룹 계정 관리 로그인 관련 명령어 w: 로그인 한 사용자가 하고있는 행위 확인(로그인시간, 원격 IP주소 …) who: 로그인한 사용자 확인 users: 로그인한 사용자명만 출력 (로그인한 사용자들이 누구인지 빠르게 확인) lslogins: 시스템의 모든 계정정보 출력 사용자 관리 명령어 usermod: 사용자 수정(사용자명, 사용자홈 …) passwd: 사용자 비밀번호...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/linux/",
        "teaser": null
      },{
        "title": "websocket getting started in spring boot",
        "excerpt":"Message Broker 소프트웨어간, 혹은 시스템간, 통신을 가능케하는 매개체 Role WebSocket STOMP 다음 ( 괄호 ) 안에 들어갈 내용으로 알맞은 것은? 이미지를 클릭하면 확대 가능합니다.(한번더 클릭하면 원본크기로 변경 됩니다). 1. ㉠ modprobe.conf ㉡ modprobe 2. ㉠ modprobe.conf ㉡ depmod 3. ㉠ modules.dep ㉡ modprobe 4. ㉠ modules.dep ㉡ depmod STOMP spring...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/websocket-getting-started/",
        "teaser": null
      },{
        "title": "Tps Note",
        "excerpt":"                                                                                                             –&gt;  –&gt;  –&gt;  –&gt;  –&gt;  –&gt;  –&gt;  –&gt;  –&gt;  –&gt;  –&gt;  –&gt;                                                                                                                          ","categories": [],
        "tags": [],
        "url": "https://hrllk.github.io//TPS-note/",
        "teaser": null
      },{
        "title": "TPS 오답 노트",
        "excerpt":"#include &lt;stdio.h&gt; // n == 2 &gt; sum == 1 &gt; return 0 // n == 3 &gt; sum == 1 &gt; return 0 // n == 4 &gt; sum == 3 &gt; return 0 // n == 5 &gt; sum == 3 &gt; return 0 // 완전수 공식 ㅅㅂ.....","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/language-c-quiz/",
        "teaser": null
      },{
        "title": "Event Storming",
        "excerpt":"Event Storming?  Event Storming == 비즈니스 설계에 사용되는 협업 기법 도메인 주도 설계의 일환으로 사용됨   목적     요구사항 정의   도메인 모델링, 아키텍처 설계   ","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/event-storming/",
        "teaser": null
      },{
        "title": "Checked, UnChecked Exception",
        "excerpt":"Checked Exception (Exception) These are exceptions that are checked at compile-time by the Java compiler. The programmer is required to handle these exceptions explicitly, either by using a try-catch block or by declaring them in the method signature with the throws keyword. 컴파일러에 의해 컴파일시점에 확인되며, 프로그램 내에서 예외처리를 필요로함...","categories": ["java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/Checked_UnChecked/",
        "teaser": null
      },{
        "title": "Thread Local",
        "excerpt":"Overview ThreadLocal construct from the java.lang package. This gives us the ability to store data individually for the current thread and simply wrap it within a special type of object. Thread Local == Java 표준 클래스 Thread에 개별적으로 데이터를 적재할 수 있으며 특별한 객체타입으로 Wrapping 가능 (Generic) 데이터를 주입하거나 가져오거나,...","categories": ["java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/ThreadLocal/",
        "teaser": null
      },{
        "title": "ArgoCD Getting Started",
        "excerpt":"  ArgoCD Application   Overview      image build   image upload on harbor   argocd application create            클래스터내(특정NS 밑에) 애플리케이션 생성           argocd application sync  ","categories": ["java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/ArgoCD-getting-started/",
        "teaser": null
      },{
        "title": "@Valid, @Validate 차이",
        "excerpt":"Overview In this quick tutorial, we’ll focus on the differences between the @Valid and @Validated annotations in Spring. Validating users’ input is a common functionality in most of our applications. In the Java Ecosystem, we specifically use the Java Standard Bean Validation API to support this, which is well integrated...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/diffrence-between-valid-validate/",
        "teaser": null
      },{
        "title": "Java Standard Bean Validation API",
        "excerpt":"Overview Validating user input is a super common requirement in most applications, and the Java Bean Validation framework has become the de facto standard for handling this kind of logic. Java Bean Validation framework == 사용자의 입력값을 검증하기위한 표준 JSR 380 JSR 380 == Java Bean 을 검증하기 위한 Java...","categories": ["spring"],
        "tags": [],
        "url": "https://hrllk.github.io//spring/java-standard-bean-validation-api/",
        "teaser": null
      },{
        "title": "getting start docker with colima",
        "excerpt":"Overview Since macOS doesn’t natively support Docker’s underlying Linux kernel features, you need a lightweight virtual machine (VM) to run the Docker daemon. colima == vm (to start docker daemon) (리눅스의 커널기반의 기능들을 미제공) Colima is optimized for local development environments where portability and simplicity are more important than performance...","categories": ["devops"],
        "tags": [],
        "url": "https://hrllk.github.io//devops/docker-installation-on-silmac/",
        "teaser": null
      },{
        "title": "getting start docker on ARM",
        "excerpt":"Overview Since macOS doesn’t natively support Docker’s underlying Linux kernel features, you need a lightweight virtual machine (VM) to run the Docker daemon. colima == vm (to start docker daemon) MacOS 환경에서 기본적으로 리눅스 커널환경 미제공 Docker를 구동하기위한 VM을 설치 Colima is optimized for local development environments where portability and...","categories": ["devops"],
        "tags": [],
        "url": "https://hrllk.github.io//devops/getting-started-docker-on-arm/",
        "teaser": null
      },{
        "title": "DDNS",
        "excerpt":"overview Most home internet connections don’t have a static (fixed) IP address, DDNS is solves this problem. it automatically updates DNS records when your IP address changes, ensuring your domain name always points to the correct IP, even if your ISP assigns you a new one daily 유동 IP의 한계점을...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/ddns/",
        "teaser": null
      },{
        "title": "access from external",
        "excerpt":"통신사 공유기를 스위칭허브모드로 변경 별도의 IP할당 없이 패킷전달 용도 변경 변경시 NAT기능이 사라지기 때문에 해당 공유기 하위의 모든 디바이스들에 공인IP가 할당되는 이슈가 있음 이러한 이슈때문에 통신사에서는 IPV4이슈 문제로 일부 공인IP들을 사용하지 못하게 조치를 취할것 Super DMZ기능 사용으로 우회 Super DMZ기능 == TWIN IP 사설공유기자체에 공인 IP를 할당하는 기능 해당 기능을...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/external/",
        "teaser": null
      },{
        "title": "switching hub",
        "excerpt":"overview operates at Layer 2(Data Link Layer) of OSI, uses Mac addresses to forward data to the correct destination creates separate collision domains for each port provides full-duplex comunication supports multiple simultaneous connections switching hub == 네트워킹 디바이스 mac 주소를 이용해 데이터를 올바른목적지까지 포워딩하기위한 Data Link 계층에서 동작하는 네트워킹 디바이스...","categories": ["network"],
        "tags": [],
        "url": "https://hrllk.github.io//network/switching-hub/",
        "teaser": null
      },{
        "title": "thread safe quick start",
        "excerpt":"synchronized, 다중화환경 미제공 DB에서 Lock제어 Pessimitic Lock (DB) 동시성이슈가 자주 발생할것이라고 예상해 락을 걸어버리는 방법 한 트랜잭션이 데이터에 접근시, 다른 트랜잭션이 command를 할 수 없도록 막아 동시성 이슈를 해결 overview operates at Layer 2(Data Link Layer) of OSI, uses Mac addresses to forward data to the correct destination creates separate...","categories": ["cs","java"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/java/thread-safe-quick-start/",
        "teaser": null
      },{
        "title": "jsession id?",
        "excerpt":"overview JSESSIONID is a session identifier used in Java-based web applications to maintain state between a client (usually a web browser) and a server It is typically managed via HTTP cookies and allows the server to track user sessions across multiple requests JSESSIONID == 세션 ID(식별자) J(ava WebApplicaion) SESSION ID...","categories": ["java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/jsession-id/",
        "teaser": null
      },{
        "title": "RAID (Redundant Array of Independent Disks)",
        "excerpt":"overveiw RAID is a data storage virtualization technology that combines multiple physical disk drive components into one or more logical units for data redundancy, performance improvement, or both. RAID == 데이터 스토리지 가상화 기술 여러개의 물리적 디스크를 한개 혹은 여러개의 논리적으로 파티션 가능 for what ?? (advantages) IO 성능 향상...","categories": ["cs"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/RAID/",
        "teaser": null
      },{
        "title": "RARP (Reverse Address Resolution Protocol)",
        "excerpt":"overview RARP, which stands for Reverse Address Resolution Protocol, is a network layer protocol used in computer networking. As the name suggests, it performs the reverse function of ARP (Address Resolution Protocol). RARP == 네트워크 계층의 프로토콜 ARP의 반대 MAC 주소로 IP를 조회하는데 사용 how works? 맥주소를 가진 디바이스가 네트워크에...","categories": ["cs","network"],
        "tags": ["RARP","ARP","Network Layer","MAC Address","IP Address"],
        "url": "https://hrllk.github.io//cs/network/RARP/",
        "teaser": null
      },{
        "title": "0.0.0.0 vs 127.0.0.1",
        "excerpt":"prerquirements DDNS(optional) Port forwarding overview 로컬 LLM 서버 액세스 이슈 초기 구성 시도시에도 불구하고 로컬에서 실행중인 LLM 서버를 외부에서 액세스 할 수 없는 문제 발생 이 포스트에서는 호스트 주소로 127.0.0.1과 0.0.0.0을 사용하는것에 대한 차이점 및 해당 이슈를 해결하는 방법을 설명 step 홈 네트워크 특정 디바이스에 LLM을 설치하고, 외부에서 LLM을 사용하고싶었음...","categories": ["troubleShooting","network"],
        "tags": [],
        "url": "https://hrllk.github.io//troubleshooting/network/0.0.0.0-vs-127-0-0-1/",
        "teaser": null
      },{
        "title": "PKCS#12 (Public Key Cryptography Standard No12)",
        "excerpt":"overview A P12 file is a binary format that combines a certificate chain and a private key into a single, encrypted file. This format is widely used in SSL/TLS certificates and client authentication, providing a convenient way to manage and distribute certificates securely. Public Key Cryptography Standard #12 == 공개키...","categories": ["secure"],
        "tags": [],
        "url": "https://hrllk.github.io//secure/PKCS12/",
        "teaser": null
      },{
        "title": "mTLS",
        "excerpt":"overview Mutual TLS (mTLS) is an extension of the standard TLS protocol that provides mutual authentication between client and server. This ensures that both parties in a communication channel are verified, enhancing security in network communications. TLS 프로토콜의 확장버전 클라이언트와 서버사이에서 각자 상대의 인증서를 검증 양쪽의 당사자들의 인증서를 모두 검증해...","categories": ["secure"],
        "tags": [],
        "url": "https://hrllk.github.io//secure/mTLS/",
        "teaser": null
      },{
        "title": "CS 오답노트",
        "excerpt":"오답노트 SIEM trust zone typo squatting 스케쥴링 FCFS SJF HRN RR (라운드 로빈) SRT 인터페이스 데이터 교환방식 가성회선 연결식 데이터그램 비연결식 L2TP IMCP 행위패턴 데이터베이스 스키마 종류 내부 개념 외부 정보시스템 암호화 단방향 양방향 대칭 AES, SEED, DES 비대칭 RSA … 프로그래밍 언어 활용 응집도 기순교절시논우 결합도 자스제외공내 BAAS ==...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/cs-note/",
        "teaser": null
      },{
        "title": "TCP-IP Deep Dive",
        "excerpt":"overview TCP/IP 송수신 원리: 데이터가 네트워크를타고 이동하는 여정 소켓통신은 파일 시스템과 유사하게 읽기(Receive)와 쓰기(Send)로 구성되며, 파일을 조각내어 읽고 쓰듯이, 네트워크 데이터도 작은단위로 분할되어 이동됨 3-way handshake: 연결의 시작 TCP는 신뢰성 확보를 위해 위처럼 시작전 3단계 확인과정을 거침 SYN: 클라이언트가 서버에 연결을 요청 SYN_ACK: 서버는 요청을 승낙, 클라이언트에 응답 ACK: 클라이언트는...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/TCPIP/",
        "teaser": null
      },{
        "title": "Packet Flow In TCP/IP",
        "excerpt":"overview TCP/IP 프로토콜에서 패킷 흐름을 설명 패킷 == 데이터를 주고받는 기본 단위 in 네트워크 통신 TCP/IP 프로토콜 스택 구조 Application: HTTP, FTP, DNS.. 사용자 애플리케이션이 동작하는 계층 Transport: TCP, UDP가 동작하며, 포트 개념을 통해 송수신 제어 Internet: IP주소를 기반으로 라우팅 결정 Link: 실제 NIC와 연결하며, Ethernet을 통해 물리적으로 전송 웹사이트...","categories": ["CS","network"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/network/packet-flow/",
        "teaser": null
      },{
        "title": "X509TrustManager",
        "excerpt":"overview When building secure applications in Java, you’ll often encounter the X509TrustManager class. It’s a cornerstone of Java’s security infrastructure, responsible for verifying the authenticity of SSL/TLS certificates used to establish secure connections. Without it, your application would be vulnerable to man-in-the-middle attacks. Java Application에 보안할 때 자주 만나게되는 클래스,...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/X509TrustManager/",
        "teaser": null
      },{
        "title": "equals, hashCode, toString",
        "excerpt":"overview 자바에서 모든 클래스는 명시적으로 다른 클래스를 상속받지 않는경우 자동적으로 최상위 클래스인 Object 클래스를 상속받음 Object 해당 클래스는 기본적으로 equals, hashCode, toString 함수를 제공하고 이는 객체의 상태를 다루는 데 있어 중요 역할을 함. 모든 클래스는 Object 클래스를 간접적으로 상속받으므로, 해당 클래스에서 정의되어있는 메소드를 모든 객체에서 사용할 수 있음 1. equals...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/equals-hashCode/",
        "teaser": null
      },{
        "title": "try with resources",
        "excerpt":"overview 자바에서 파일, DB 연결, 네트워크 소켓 등.. 자원을 다룰 때 항상 자원을 열면 필히 닫아줘야 함, 그렇지 않으면 메모리 누수, 파일잠김 혹은 연결 누수등의 문제가 발생할 수 있음 이를 보다 간결한 문법인 try-with-resources를 통해 간소화해 사용이 가능함 try-with-resources? 자원을 사용할 때 간결하고 모던한 문법 java 1.7에 도입된 문법으로, AutoCloseable...","categories": ["java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/try-with-resources/",
        "teaser": null
      },{
        "title": "feign patch",
        "excerpt":"https://www.baeldung.com/openfeign-http-patch-request overview JDK 5.0 introduced Java Generics with the aim of reducing bugs and adding an extra layer of abstraction over types. This tutorial is a quick intro to Generics in Java, the goal behind them, and how they can improve the quality of our code. 계층 추상화를 위해 제네릭...","categories": ["troubleshooting"],
        "tags": [],
        "url": "https://hrllk.github.io//troubleshooting/generic/",
        "teaser": null
      },{
        "title": "how to use PATCH method in feign client",
        "excerpt":"overview 2025-05-27 17:30:17 [ERROR] [http-nio-8082-exec-1] o.o.t.c.c.GlobalExceptionHandler - occur an exception: feign.RetryableException: Invalid HTTP method: PATCH executing PATCH http://localhost:8085/users/1 외부 어플리케이션과 연계중 오류 발생 why? 외부 호출하기위한 클라이언트로 FeignClient 사용하였고, 예외의 원인은 FeignClient가 내부적으로 사용하는 HttpClient(HttpUrlConnection)의 메소드 미지원 함 해당클래스는 기본적으로 PATCH 메소드를 지원하지 않음, Http1.1 이전에 설계되었지만 설계 당시에 PATCH가...","categories": ["java","troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//java/troubleshooting/how-to-use-patch-in-feign/",
        "teaser": null
      },{
        "title": "READ_UNCOMMITTED",
        "excerpt":"overview READ_UNCOMMITTED is the lowest isolation level in database transaction management. It allows a transaction to read data that has been modified by other transactions but not yet committed. This means that a transaction operating under READ_UNCOMMITTED can see “dirty” data. 낮은 독립레벨의 트랜잭션 관리 그것은 허용한다. 트랜잭션에 대한 데이터에...","categories": ["java","troubleShooting"],
        "tags": [],
        "url": "https://hrllk.github.io//java/troubleshooting/READ_UNCOMMITTED/",
        "teaser": null
      },{
        "title": "anomalies of concurrency",
        "excerpt":"Overview 동시성 == 이상현상 데이터베이스 시스템에서 트랜잭션을 통해 데이터를 조작할 때 발생할 수 있는 이슈 데이터의 일관성을 해칠 수 있기 때문에(이상현상) 트랜잭션 격리 수준 [!] 을 통해 제어됨 Anomalies Dirty Read: 설명: 하나의 트랜잭션이 아직 커밋되지 않은 다른 트랜잭션의 데이터를 읽는것 문제점: 데이터를 변경한 트랜잭션이 만약 어떤 이유로 롤백이되는경우, 이름...","categories": ["database"],
        "tags": [],
        "url": "https://hrllk.github.io//database/anomalies-of-concurrency/",
        "teaser": null
      },{
        "title": "Implementations of Map",
        "excerpt":"Overview Map 구현체들에대한 특징 설명 HashMap 자료구조: HashTable 알고리즘: Hasing 설명: hashCode() 메소드를 통해 해시 코드를 취득, 이를 사용해 배열의 인덱스를 계산하고 계산된 인덱스에 키값의 쌍을 정의 해시코드를 취득하는과정에서 충돌이 발생할 수 있고(같은 인덱스에 여러 엔트리 저장), 이때, 연결리스트 or 트리를 사용해 충돌을 처리 특징: 시간복잡도 O(1) 저장순서 미보장 Null키...","categories": ["java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/Implementations-of-Map/",
        "teaser": null
      },{
        "title": "Mockist TDD",
        "excerpt":"Overview Mockist TDD를 진행해보면서 Mockist TDD의 목표와 추구하는바가 무엇인지에 대한 내용을 기술 Mockist TDD (Solitary Test) Mockist TDD, often referred to as “Solitary TDD,” advocates for testing each unit of code in isolation. This means that when testing a System Under Test (SUT), any objects that the SUT collaborates with...","categories": ["java"],
        "tags": [],
        "url": "https://hrllk.github.io//java/Mockist-TDD/",
        "teaser": null
      },{
        "title": "Nullish, Falsy",
        "excerpt":"Overview In JavaScript, understanding the concepts of “nullish” and “falsy” values is crucial for writing robust and predictable code. While often used interchangeably by beginners, they represent distinct categories of values that behave differently in logical operations and conditional statements. This post will clarify these concepts, highlight their differences, and...","categories": ["Javascript"],
        "tags": [],
        "url": "https://hrllk.github.io//javascript/Nullish-Falsy/",
        "teaser": null
      },{
        "title": "ArrayDeque?",
        "excerpt":"Overview In this tutorial, we’ll show how to use Java’s ArrayDeque class – which is an implementation of the Deque interface. An ArrayDeque (also known as an “Array Double Ended Queue”, pronounced as “ArrayDeck”) is a special kind of a growable array that allows us to add or remove an...","categories": ["data-structure"],
        "tags": [],
        "url": "https://hrllk.github.io//data-structure/ArrayDeque/",
        "teaser": null
      },{
        "title": "Quick Start Task Master",
        "excerpt":"Overview A task management system for AI-driven development with Claude, designed to work seamlessly with Cursor AI. Task Manger AI == AI 드리븐 기반 == Task 매니저 == AI PM Prerequirements nodejs 필수 설치 Advantages 작업 종속성(?) 관리: 작업간 종속성관리(?) 가시성 확보: 작업 진행 상황, 상태 및 로그 실시간 분석...","categories": ["ai"],
        "tags": [],
        "url": "https://hrllk.github.io//ai/getting-started-taskMatser/",
        "teaser": null
      },{
        "title": "cs note",
        "excerpt":"세타조인: WHERE 절에오는 조건을 모든 경우를 조인한다느 의미 자연조인: 운영체제 SRT == 짧은걸 먼저 실행 (CPU 스케쥴링) CPU 선점 알고리즘 선점형 뺏김 SRT (Shortest Remaining Time First): 실행중인 프로세스보다 도착프로세스의 실행시간이 더 짧은경우, 현재프로세스를 중단하고, 새로 도착한 프로세스가 우선 실행됨 RR: 각 프로세스에 동일한 짧은시간 할당량 부여, 시간만료시 다음프로세스에게 우선권...","categories": ["cs"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/cs-note/",
        "teaser": null
      },{
        "title": "system design",
        "excerpt":"  시스템 디자인   요구사항 명확화   기능적 요구사항     핵심기능   액터(사용자 or 관리자)   구체적인 작업 목록   시스템이 주로 처리해야하는 데이터 유형   시스템이 통합해야하는 외부시스템 혹은 서드파티 서비스   비기능적 요구사항     사용자 수   시스템에서 처리해야 할 데이터 볼륨   시스템의 입출력  ","categories": ["cs"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/design/",
        "teaser": null
      },{
        "title": "NDJSON",
        "excerpt":"Overview In today’s data-driven world, efficiently transferring large datasets between systems is crucial. While JSON has become the standard format for data exchange, it faces limitations when handling large volumes of data or streaming scenarios. This is where NDJSON (Newline Delimited JSON) comes in – a simple yet powerful format...","categories": ["CS"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/NDJSON/",
        "teaser": null
      },{
        "title": "What is Bare Repository?",
        "excerpt":"Overview Git 서버를 직접 운영하거나(예: JGit + Spring), 사내 호스팅을 구축하려면 Bare 저장소 개념을 정확히 이해해야 하는데 이 글은 Bare 저장소가 무엇인지, 언제/왜 필요한지, 어떻게 만들고 노출하는지(HTTP/SSH), 그리고 실무 팁(초기 커밋, 읽기 공개 정책, 트러블슈팅)까지 한 번에 정리. What is Bare Repository? bare 저장소 == 시스템 저장소 Bare 저장소는 Working...","categories": ["Git"],
        "tags": [],
        "url": "https://hrllk.github.io//git/bare-repository/",
        "teaser": null
      },{
        "title": "What Happen When Pull Event On Bare",
        "excerpt":"Overview 클라이언트에서 pull event 가 발생했을때의 흐름을 설명한다. 클라이언트에서 git pull 명령이 실행되면, 서버에서는 Fetch 요청에 응답하는 과정만 담당하며, 읽기 중심의 동작(read only)을 수행하며, 실제 Merge나 Rebase 등의 작업은 클라이언트 측에서 진행된다. Key Terms Explained Pack: Git 객체를 효율적으로 저장하기위한 압축 파일 형식으로, .pack 파일과 인덱스역할을 하는.idx 파일로 구성된다. Bare...","categories": ["Git"],
        "tags": [],
        "url": "https://hrllk.github.io//git/what-happen-bare-pull/",
        "teaser": null
      },{
        "title": "Git Adverties Refs Deep Dive",
        "excerpt":"Overview git pull 혹은 git fetch 명령은 단순히 “서버에서 파일을 받기위한 명령이아니라, 형상정보를 제공받기전에, 양쪽 저장소의 그래프(커밋 DAG) 비교가 선행되어야 하며, 해당 단계를 Advertise-Refs라 하며, 해당포스트에서는 이에대한 내용을 설명함. 단계 단계 역할 요청/응답 ① Client → Server /info/refs?service=git-upload-pack 요청 (GET) ② Server → Client 각 브랜치의 tip SHA(최신 커밋 해시)...","categories": ["Git"],
        "tags": [],
        "url": "https://hrllk.github.io//git/Git-Pull-Event-Adverties-Refs-Deep-Dive/",
        "teaser": null
      },{
        "title": "Git Pull Event Trace Log(client/server)",
        "excerpt":"Overview git pull 실행 시 클라이언트 ↔ 서버 간 연계에 대한 트레이스 Endpoint 1단계 Discovery: GET {prefix}/info/refs?service=git-upload-pack [Adverties, Negotitation] 2단계 Fetching Packfile: POST {prefix}/git-upload-pack Step 1) Discovery Advertise 1-1) Advertise :: Client → Server: refs 정보 요청 (Advertise-Refs) 의미: git pull 이벤트와 함께 refs 정보 서버로 요청 엔드포인트: GET /info/refs?service=git-upload-pack...","categories": ["Git"],
        "tags": [],
        "url": "https://hrllk.github.io//git/Git-Pull-Event-Trace/",
        "teaser": null
      },{
        "title": "Git Negotiation Deep Dive",
        "excerpt":"Overview Git의 fetch/pull 과정에서 Negotiation은 “클라이언트가 서버로부터 어떤 commit을 받아와야 하는지” 결정하기 위한 핵심 프로세스이며, 본문에서는 해당 내용에 대해 기술 Negotiation란? Negotiation이란, 클라이언트가 서버로부터 어떤 commit을 받아와야 하는지 결정하는 과정을 의미하며 이전 포스트에서 Advertise-Refs 절차를 통해받아온 refs정보를 기반으로 이미 가지고있는지, 혹은 내가 모르는커밋인지(더 받아와야하는 커밋인지)를 판별하며 이 과정이 Negotiation을 의미한다....","categories": ["Git"],
        "tags": [],
        "url": "https://hrllk.github.io//git/Git-Pull-Event-Negotiation-Deep-Dive/",
        "teaser": null
      },{
        "title": "Git Pull Event Packfile Retrieval Deep Dive",
        "excerpt":"Overview 본문은 git pull 이벤트 발생시 Discovery, Negotiation 프로세스 수행을 전제로 마지막 단계인 Packfile Retrieval를 설명한다. refs 를 통해 wants/have 가 도출되었다면 이제 어떻게 서버와 주고받는지를 살펴보기 위함 Previous 참고 포스트 핵심 요약 Packfile Retrieval과의 관계 What Happen When Pull Event On Bare pull 이벤트 전체 시퀀스 3단계(Fetch/Pack) 흐름 확장...","categories": ["Git"],
        "tags": [],
        "url": "https://hrllk.github.io//git/Git-Pull-Event-Packfile-Retrieval-Deep-Dive/",
        "teaser": null
      },{
        "title": "cs roadmap",
        "excerpt":"overview CS는 많이 보는 게 아니라 순서가 중요함. 백엔드 기준 핵심 축은 4개. 운영체제 네트워크 데이터베이스 분산시스템 이 4개가 성능/장애 원인을 설명하는 기본 틀. 1) 운영체제 CPU, 메모리, 스레드 실행을 관리. 스레드 과다하면 컨텍스트 스위칭 늘고 p99 튐. 메모리 압박 오면 GC/페이지폴트로 지연 커짐. 운영체제 = 코드가 실제로 도는 바닥...","categories": ["cs"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/cs-map-for-backend/",
        "teaser": null
      },{
        "title": "Prometheus는 왜 Pull 모델을 쓰는가",
        "excerpt":"overview Prometheus는 기본적으로 Pull 모델이다. 즉, Prometheus가 직접 타겟을 주기적으로 긁어온다. Push vs Pull 핵심 질문은 이거다. 왜 Push가 아니라 Pull인가? Pull: 수집 서버가 가져감 Push: 애플리케이션이 보냄 Prometheus가 Pull을 선택한 이유 타겟 상태 확인이 쉬움 up 지표로 수집 성공/실패 바로 확인 가능 중앙에서 수집 주기/정책 통제 가능 scrape interval,...","categories": ["cs","observability"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/observability/prometheus-pull-vs-push/",
        "teaser": null
      },{
        "title": "시계열 데이터와 샘플링 주기 기본",
        "excerpt":"overview Prometheus/Grafana 처음 잡을 때 제일 먼저 헷갈리는 게 시계열 데이터임. 핵심은 시계열과 샘플링 주기이다 시계열(time series): 시간축을 가진 메트릭 샘플링 주기(scrape interval): 몇 초마다 수집할지 시계열 데이터란? 시간순으로 찍은 데이터이며, 같은 유형의 메트릭이 반복적으로 샘플링되는 것을 의미한다. 예시) http_server_requests_seconds_count{job=\"api\",uri=\"/login\"} 124 (18:10:00) http_server_requests_seconds_count{job=\"api\",uri=\"/login\"} 131 (18:10:15) http_server_requests_seconds_count{job=\"api\",uri=\"/login\"} 140 (18:10:30) 로그가 시간순으로...","categories": ["cs","observability"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/observability/time-series-and-sampling-basics/",
        "teaser": null
      },{
        "title": "Prometheus Quick Start for Spring Boot",
        "excerpt":"Prometheus Quick Start for Spring Boot Prerequisites Actuator 애플리케이션 상태(health, metrics)를 외부에 노출하는 기능 한 줄 요약: 노출 Prometheus 노출된 메트릭을 주기적으로 수집(scrape)하는 모니터링 시스템 한 줄 요약: 수집 1. 의존성 추가 dependencies { implementation 'org.springframework.boot:spring-boot-starter-actuator' runtimeOnly 'io.micrometer:micrometer-registry-prometheus' } 의존성만 추가했다고 끝이 아니며, 자동 설정되는 부분과 직접 설정해야 할 부분을...","categories": ["cs","observability"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/observability/spring-boot-prometheus-dependency/",
        "teaser": null
      },{
        "title": "what is mark and Sweep",
        "excerpt":"overview GC 어렵게 볼 필요 없음. 핵심은 “살아있는 객체만 남기고 나머지 치운다” 이거임. 1) GC를 왜 알아야 함? 웹 서비스 느려질 때 원인 중 하나가 GC pause임. 특히 p99 튈 때, 쿼리만 보지 말고 GC도 같이 봐야 함. 2) Mark and Sweep 한 줄 정의 Mark: 살아있는 객체에 표시 Sweep:...","categories": ["cs","jvm"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/jvm/gc-mark-and-sweep-basics/",
        "teaser": null
      },{
        "title": "jvm old generation",
        "excerpt":"Overview 지난 포스트에서 JVM Heap의 Young Generation(링크처리)을 다뤘고, 이번엔 Old Generation(고인물 영역)에 대해 다룸. Young 영역에서 살아남은 객체들이 어디로 가서 어떻게 관리되는지 이해하는 것이 효율적인 GC 튜닝의 핵심이다. Old 영역은 무엇인가? Heap은 크게 Young과 Old 영역으로 나뉘고, 그 중 Old 영역은 Young 영역에서 여러 번의 Minor GC에도 살아남은, 즉 ‘오래...","categories": ["cs","jvm","garbage-collection"],
        "tags": [],
        "url": "https://hrllk.github.io//cs/jvm/garbage-collection/jvm-old-generation/",
        "teaser": null
      }]
