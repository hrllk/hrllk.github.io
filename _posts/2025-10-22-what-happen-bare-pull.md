---
title: "What Happen When Pull Event On Bare"
categories:
  - Git
toc: true
toc_sticky: true
toc_label: "Contents"
published: true
---


### Overview
---
클라이언트에서 `git pull` 명령이 실행되면, 서버에서는 Fetch 요청에 응답하는 과정만 담당한다. <br>
이때 서버는 <b>읽기 중심의 동작(read only)을 수행하며</b>, 실제 Merge나 Rebase 등의 작업은 클라이언트 측에서 진행된다.

### Key Terms Explained
---
- `Pack`: Git 객체를 효율적으로 저장하기위한 압축 파일 형식으로, `.pack` 파일과 인덱스역할을 하는`.idx` 파일로 구성된다.
- `Bare Repository`: `.git` 폴더만 존재하며, 작업 디렉터리(working tree)가 없는 저장소 형태로, 서버에서 원격 저장소로 사용된다.
- `git-upload-pack`: 클라이언트의 Pull(혹은 Fetch) 요청을 처리하는 읽기 전용 엔드포인트
- `git-receive-pack`: 클라이언트의 Push 요청을 처리하는 쓰기 전용 엔드포인트



### Flow 
---

Git 클라이언트가 `git pull` 수행시 서버에서는 fetch 요청에 응답하는 과정만 담당하며, 읽기 중심의 작업이 진행됨

``` mermaid
sequenceDiagram
    autonumber
    participant C as Client (git pull)
    participant G as Git Server (JGit GitServlet)
    participant R as Bare Repo (.git) (FS)

    Note over C: git pull = fetch + (merge/rebase)<br/>서버는 fetch 단계만 처리

    C->>G: GET /<repo>.git/info/refs?service=git-upload-pack
    G->>R: refs 조회 + capability 확인
    R-->>G: refs 목록
    G-->>C: refs + capabilities (Discovery 단계)

    C->>G: POST /<repo>.git/git-upload-pack<br/>(want/have, shallow 옵션 등)
    G->>R: 객체 그래프 탐색 및 필요한 객체 계산
    Note over G,R: thin-pack / ofs-delta / bitmap index 등 최적화 수행

    G-->>C: side-band 스트림 시작<br/>ch1: pack 데이터<br/>ch2: 진행률<br/>ch3: 에러
    Note over C: packfile 수신 (.pack + .idx)

    C->>C: 로컬 객체 DB 갱신 및 인덱스 작성
    C->>C: (pull의 후반) merge 또는 rebase 수행
```


### Flow Detail
---
#### 1. Discovery
르라이언트가 `git pull` (Smart HTTP방식)을 수행하면, 내부적으로 서버의 `git-upload-pack` 엔드포인트로 refs 정보를 요청한다.


##### 1-1. 클라이언트 요청 
``` bash
GET /<repo>.git/info/refs?service=git-upload-pack
```

refs 조회 요청





##### 1-2 서버 응답
서버는 파일 시스템 내 Bare Repository를 탐색해 아래 정보를 클라이언트에게 전달한다.


- HEAD
- refs/heads/* (브랜치정보)
- refs/tags/* (태그정보)

> 이 과정을 ref광고(Discovery) 라고 칭하며, 클라이언트가 이후에 Fetch 요청을 구성할 수 있도록 정보를 제공한다.






#### 2. Fetch 
클라이언트는 Discovery 단계에서 받은 refs 정보를 바탕으로, 서버가 가지고 있지만 로컬에는 없는 커밋들을 요청한다.
``` bash 
POST /<repo>.git/git-upload-pack
```
- 요청에는 `want`, `have`, `shallow` 옵션 등이 포함된다.





#### 3. Negotiation (비교를 통한 동기화 결정)
- 클라이언트와 서버간의 refs 정보를 비교(handshake)
- 로컬에 없는 객체만 선별후 요청(효율적 데이터 전송)
- 서버는 필요한 객체를 계산한 후 packfile을 생성하여 응답


#### 4. Packfile 전송 및 수신
서버는 side-band 스트림을 통해 데이터를 전송한다.

| 채널 | 내용 |
| -------------- | --------------- |
| ch1 | pack 데이터 |
| ch2 | 진행률 정보 |
| ch3 | 오류 메세지 |

클라이언트는 수신한 `.pack` 파일을 로컬 객체 DB에 반영하고 인덱스를 작성한다.



#### 5. Merge or Rebase
Fetch가 완료되면, 클라이언트는 로컬 브랜치와 병합하거나 리베이스를 수행해 최종적으로 로컬 상태를 갱신한다.



### Conclusion
---
1. 서버는 refs 정보를 제공
2. 클라이언트는 이를 기반으로 필요한 객체만 요청함.
3. 서버는 Pack 파일을 생성 및 응답해 효율적 동기화를 지원
4. 최종적으로 클라이언트는 Pack 파일을 받아 Merge나 Rebase를 수행함


<br>
<br>









<!-- ##### 1-1. git pull (with smart http) -->
<!-- 클라이언트가 `git pull` 수행시 해당요청이 내부적으로 Git 서버의 `git-upload-pack` 엔드포인트에 정보를 요청하게된다. -->
<!-- <details> -->
<!--   <summary>TL;DR</summary> -->
<!--   Git 서버는 Pull 요청을 받기위한 `git-upload-pack` api, Push 요청을 받기위한 `git-receive-pack` api를 내장한다. -->
<!-- </details>  -->
<!---->
<!---->
<!-- ##### 1-2. respond refs (to client) -->
<!-- `git-upload-pack` 엔드포인트로 요청을 받은 서버는 파일시스템에 존재하는 bare repository로부터 ref 목록을 클라이언트에 응답한다. -->
<!---->
<!---->
<!-- - HEAD -->
<!-- - refs/heads/* (브랜치정보) -->
<!-- - refs/tags/* (태그정보) -->
<!---->
<!-- <details> -->
<!--   <summary>TL;DR</summary> -->
<!--   “내가 이런 브랜치와 태그를 보관하고 있어, 네가 가진 것과 비교해서 뭐가 부족한지 알아보도록해~” 라는 의미를 가지며 해당단계가 `Discovery` 라 함 -->
<!-- </details>  -->
<!---->
<!-- #### 2. Fetch  -->
<!-- 클라이언트는 `Discovery`단계에서 받았던 `refs` 정보를 바탕으로, 서버는가지고있는데 "내가 갖지 않은 커밋을 받고싶다" 라는 요청을구성해 다시 서버측으로 요청을 전송함 -->
<!---->
<!-- <details> -->
<!--   <summary>TL;DR</summary> -->
<!-- </details>  -->
<!---->
<!-- #### 3. negotiation (comparing refs between server and local) -->
<!-- 핸드셰이크를 통해 서버로부터 refs 정보를 받고 로컬에있는 refs 정보 비교를 통해 로컬기준으로 서버에 어떤내용을 추가요청해 갱신해야되는지 비교한다. -->
<!---->
<!---->
<!-- #### 4. resend a request (to receive packfile) -->
<!---->
<!---->
<!---->
<!-- ### Conclusion -->
<!-- --- -->
<!-- > `git pull`시 서버는 1차적으로 refs에 대한 정보를 클라이언트에 제공하고, 클라이언트는 서버로부터받은 refs의 상태와 로컬에가지고있는 refs 상태를 비교해 동기화가 필요한경우 서버에 Pack file을 요청한다. -->
<!---->
<!---->
<!---->
<!---->
<!---->
<!-- <details> -->
<!--   <summary>TL;DR</summary> -->
<!---->
<!--   - 이 글은 Jekyll에서 `<details>` 태그로 접기 기능을 구현하는 예시입니다. -->
<!--   - HTML 그대로 렌더링되므로 별도 플러그인 불필요합니다. -->
<!--   - Markdown과 HTML 혼용 가능! -->
<!---->
<!-- ```ruby -->
<!--   puts "Hello Jekyll!" -->
<!-- ``` -->
<!---->
<!---->
<!-- </details>  -->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!---->
<!-- 🔍 Git Pull 시 Bare Repository 내부에서 일어나는 일 -->
<!---->
<!-- “Git pull = fetch + merge/rebase” -->
<!-- 서버(Bare Repository)는 fetch 단계까지만 관여하며, merge/rebase는 클라이언트 로컬에서 수행됩니다. -->
<!---->
<!-- 1️⃣ 전체 흐름 요약 -->
<!---->
<!-- Git 클라이언트가 git pull을 수행할 때, 서버에서는 fetch 요청에 응답하는 과정만 담당합니다. -->
<!-- 이때 서버는 Bare Repository 형태로 운영되며, 내부에서는 디스크 변경 없이 읽기 중심의 작업이 진행됩니다. -->
<!---->
<!-- 2️⃣ 단계별 내부 동작 (서버 측) -->
<!-- 🧩 ① 연결 수립 & 서비스 선택 -->
<!---->
<!-- 클라이언트가 Smart HTTP / SSH 프로토콜을 통해 git-upload-pack으로 접속합니다. -->
<!---->
<!-- 서버는 ref advertisement(참조 광고) 를 준비합니다. -->
<!---->
<!-- 광고 대상: -->
<!---->
<!-- HEAD -->
<!---->
<!-- refs/heads/* -->
<!---->
<!-- refs/tags/* -->
<!---->
<!-- capabilities 예시: -->
<!---->
<!-- multi_ack, side-band-64k, thin-pack, ofs-delta, shallow, filter, agent=... -->
<!---->
<!-- 📚 ② refs 광고 (읽기 전용) -->
<!---->
<!-- 서버가 디스크에서 읽는 파일 목록은 다음과 같습니다: -->
<!---->
<!-- 항목	설명 -->
<!-- refs/heads/*, refs/tags/*	브랜치와 태그 참조 정보 -->
<!-- packed-refs	압축된 참조 정보 (존재 시) -->
<!-- HEAD	보통 ref: refs/heads/main 형태의 심볼릭 참조 -->
<!-- objects/pack/pack-*.idx	광고 전 집계 시 bitmap 인덱스를 사용할 수 있음 -->
<!---->
<!-- 💡 디스크 쓰기 없음. -->
<!-- 서버는 단순히 “현재 상태를 광고”할 뿐입니다. -->
<!---->
<!-- 🧮 ③ 원하는 커밋/객체 협상 (Negotiation) -->
<!---->
<!-- 클라이언트 요청 -->
<!---->
<!-- want <sha> ... -->
<!-- have <sha> ... -->
<!---->
<!---->
<!-- want: 받고 싶은 커밋 -->
<!---->
<!-- have: 이미 보유한 커밋 -->
<!---->
<!-- 서버 처리 -->
<!---->
<!-- 도달성 판단 (common base 탐색) -->
<!---->
<!-- bitmap 인덱스가 있으면 빠르게 차집합 계산 가능 -->
<!---->
<!-- 📦 ④ pack 생성 (서버 → 클라이언트) -->
<!---->
<!-- 서버는 클라이언트가 요청한 객체 집합을 기반으로 packfile을 생성해 전송합니다. -->
<!---->
<!-- 객체 집합 계산 → delta 압축 진행 -->
<!---->
<!-- thin-pack 허용: 클라이언트가 이미 가진 객체는 생략 -->
<!---->
<!-- 진행 로그 전송: 사이드밴드 채널(2: progress)을 통해 실시간 전송 -->
<!---->
<!-- ⚙️ 이 과정은 모두 메모리 상에서 수행되며, -->
<!-- 서버 디스크에는 어떤 변화도 발생하지 않습니다. -->
<!---->
<!-- 🔚 ⑤ 응답 종료 -->
<!---->
<!-- pack 전송 완료 후 연결 종료 -->
<!---->
<!-- 서버는 요청에 대한 응답만 수행하고, 저장소 상태는 그대로 유지됩니다. -->
<!---->
<!-- 3️⃣ Bare Repository의 디스크 변화 요약 -->
<!-- 구분	내용 -->
<!-- 변경되는 것	없음 -->
<!-- 읽는 것	refs/*, packed-refs, objects/pack/*.idx, HEAD -->
<!-- 디스크 쓰기	없음 -->
<!-- Hook 실행	없음 (fetch는 기본적으로 읽기 전용) -->
<!-- 4️⃣ 핵심 정리 -->
<!---->
<!-- git pull은 fetch(서버) + merge/rebase(클라이언트) 로 구성됩니다. -->
<!---->
<!-- BareRepo는 객체를 읽어 광고하고, pack을 만들어 보내는 역할만 수행합니다. -->
<!---->
<!-- 서버의 디스크는 전혀 수정되지 않으며, fetch 시에는 훅(hook) 도 일반적으로 실행되지 않습니다. -->
<!---->
<!-- 🧠 요약: Bare Repository는 “읽기 전용 pack 제공자” 역할만 수행한다. -->
<!---->
<!-- 🧾 참고 개념 -->
<!---->
<!-- Bare Repository: -->
<!-- .git 폴더만 존재하며, 작업 디렉터리(working tree)가 없는 저장소 형태. -->
<!-- 서버용으로 사용됨. -->
<!---->
<!-- Packfile: -->
<!-- 여러 Git 객체를 효율적으로 저장하기 위한 압축 파일(.pack, .idx). -->
<!---->
<!-- ✅ 결론: -->
<!---->
<!-- git pull 시 서버(BareRepo)는 오직 데이터를 읽고 pack을 만들어 전송할 뿐, -->
<!-- 서버 내부의 파일이나 디렉터리에는 아무런 변화가 없습니다. -->
