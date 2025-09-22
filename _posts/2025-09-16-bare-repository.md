---
title: "What is Bare Repository?"
categories:
  - Git
toc: true
toc_sticky: true
toc_label: "Contents"
published: true
---


### Overview
---
<!-- Git 서버를 운영하거나, 호스팅을 하기위한 bare 저장소의 개념을 설명하는 포스팅이며, bare 저장소가 무엇이고, 언제, 왜, 어떻게 사용되는지를 설명 -->

Git 서버를 직접 운영하거나(예: JGit + Spring), 사내 호스팅을 구축하려면 Bare 저장소 개념을 정확히 이해해야 하는데 이 글은 Bare 저장소가 무엇인지, 언제/왜 필요한지, 어떻게 만들고 노출하는지(HTTP/SSH), 그리고 **실무 팁(초기 커밋, 읽기 공개 정책, 트러블슈팅)**까지 한 번에 정리.


### What is Bare Repository?
---
bare 저장소 == 시스템 저장소
Bare 저장소는 Working 디렉토리(작업 트리)가 없는 Git 저장소. 즉, 파일이 “펼쳐진” 상태가 아니라, 오직 .git 내부 구조(객체 objects/, 참조 refs/, HEAD, config 등)만 존재함
서버는 코드를 “수정”하지 않고 push/fetch 트래픽만 처리하므로 bare 형태가 적합함.
GitLab/GitHub의 서버 측 저장소는 결국 bare 저장소이며, 클라이언트가 clone시에 none-bare 저장소(워킹)를 다운로드.


| | None-bare | Bare |
| --------------- | --------------- | --------------- |
| Working Directory  | O | X |
| Purpose | Develop(Update) | Hub |
| Path | myproj/ | myproj.git |


### Bare Repository Detail
---
Bare 저장소는 Working 디렉토리가 없어 직접 파일을 수정하거나, 커밋할 수 없지만 Git의 모든 핵심 객체(Commit, Tree, Blob)와 참조 브랜치를 정보를 가지므로서 원격 저장소로서의 역할을 가짐 (주로 깃서버들이 원격에서 Bare Repository를 관리함)

#### 버전 기록 보관
모든 커밋 이력과 파일 변경 사항을 안전하게 저장합니다. (클라이언트에서 push이벤트 발생시)
#### 협업의 중심
여러 개발자가 코드를 푸시하고 가져가는 중앙 허브 역할
#### 데이터 무결성 유지
Git의 분산 버전 관리 시스템의 핵심으로서 데이터의 일관성과 무결성을 보장

### Consistence
---

``` bash 
``~/tmptmp/bare/CMPART/repo4.git ❮ pwd
/Users/hwiryungkim/tmptmp/bare/CMPART/repo4.git
~/tmptmp/bare/CMPART/repo4.git ❯ tree 10
 ├──      HEAD
 ├──      config
 └──      branches/
 └──      hooks/
 └──      logs/
 │  └────      refs/
 │  │  └────      heads/
 └──      objects/
 │  └────      28/
 │  │  └────      81cf521a9e651b5836526fa1b882509965a5e5
 │  └────      33/
 │  │  └────      576b74b182eb2f0425e01d043808079964f1ec
 │  └────      7b/
 │  │  └────      47b83147a0a4f11cf38ed34310acd09d644565
 │  └────      97/
 │  │  └────      7fb4c7718f385d3662c63e2d4793f0ddeb799f
 │  └────      ff/
 │  │  └────      3b16fdc99a43a18f4bd82c70a994cd73d173c6
 │  └────      info/
 │  └────      pack/
 │  │  ├────      pack-28a144e10298de370c6287d4c19f83b47484db90.idx
 │  │  ├────      pack-28a144e10298de370c6287d4c19f83b47484db90.pack
 │  │  ├────      pack-30ecd01905cda0fc57677dd278849ee846ed0849.idx
 │  │  ├────      pack-30ecd01905cda0fc57677dd278849ee846ed0849.pack
 │  │  ├────      pack-406dffc677f816d8b4c97b5b7201666d96453f24.idx
 │  │  ├────      pack-406dffc677f816d8b4c97b5b7201666d96453f24.pack
 │  │  ├────      pack-6b578c9ebe6ab818a588c645b05e997aa574fb0d.idx
 │  │  ├────      pack-6b578c9ebe6ab818a588c645b05e997aa574fb0d.pack
 │  │  ├────      pack-e3fe37184e812739a2e67aeba217061d26892d43.idx
 │  │  └────      pack-e3fe37184e812739a2e67aeba217061d26892d43.pack
 └──      refs/
 │  └────      heads/
 │  │  ├────      devs
 │  │  ├────      feature001
 │  │  └────      main
 │  └────      tags/
```

#### objects
Git의 실제 데이터 저장소로,
모든 commit, tree, blob, tag 객체가 해싱되어 저장됨
클라이언트로부터 push이벤트가 발생할때 새로운 commit, blob, tree 객체들이 해당 디렉토리 하위에 추가되며, fetch시에 여기서 읽혀 클라이언트에 응답됨


#### refs
브랜치의 정보가 기록되는 디렉토리로 저장소가 보유한 브랜치들을 소유.
파일 내부에는 커밋이 한줄 기록되어있고, 클라이언트에서 push이벤트가 발생될 때 해당 커밋해시가 갱신됨

#### logs
ref 변경 내역을 추적하는 로그
`main` 브랜치가 언제, 누구의 push에 의해 어떤 커밋에서 어떤 커밋으로 이동되었는지에 대한 기록
Bare Repository에서는 push 이력 관리 용도로 사용됨

#### hooks
서버에서 push를 제어하거나 후처리하는 스크립트를 담는 위치
bare 저장소는 워킹 디렉토리가 없으므로, `post-checkout` 훅은 의미없고 아래 훅에대해 설정 가능
- `pre-receive`: push 전실행 > 정책위반시 push 거부 가능
- `post-receive`: push 후실행 > 알림전송 가능


#### branches (deprecated)
브랜치명 파일들이 생성되어 관리되었었지만, 지금은 refs 밑에서 관리됨(더이상 사용치 않음)

#### config
저장소 설정파일, 클라이언트 워킹저장소에도

```  bash
[core]
	repositoryformatversion = 0
	filemode = true
	bare = true
	logallrefupdates = false
	precomposeunicode = true
[http]
	receivepack = true

```



### When to Use?
---
- 사내 Git 서버·경량 호스팅(JGit): 애플리케이션 내부에서 Git 엔드포인트 제공
- CI/CD: 파이프라인이 소스 스냅샷을 받아 처리


### Remote URL
---
<!-- Bare Repository를 생성하고 해당 Repository 에 엑세스 해야하는데, 원격 URL은 서버가 어떻게 제공하느냐에 따라 달라짐 (with 프로토콜) ssh or http(s) -->

<!-- 후자로 접근하려면 접근하기위한 서블릿을 구성해야함 (like.. jgit server) -->

Bare 저장소를 원격으로 접근할 때의 URL은 **서버가 어떤 프로토콜을 제공하느냐에 따라** 달라짐


#### SSH
- 로컬 경로: /srv/git/haha.git
- 원격: ssh://user@host/srv/git/haha.git 또는 git@host:org/haha.git

> SSH는 서블릿이 아니라 SSH 데몬이 git-upload-pack/git-receive-pack 실행을 중계합니다.

<!-- #### ssh -->
<!-- 파일 경로(로컬): /srv/git/haha.git -->
<!-- SSH: ssh://user@host/srv/git/haha.git -->


#### HTTP/HTTPS (Smart HTTP)
<!-- Git 서버에서 서블릿 설정을 /git/* 해놓았다면,  -->
<!-- http(s)://localhost:port/{context}/git/${repo}.git 형태가 됨 -->
서버에서 스마트 **HTTP 엔드포인트를 열어야 함**(정적 서빙이 아님). JGit이라면 GitServlet을 /git/*로 매핑합니다.

- 예: http(s)://localhost:port/{context}/git/${repo}.git
- 클라이언트 흐름:
    - GET /<repo>.git/info/refs?service=git-upload-pack
    - POST /<repo>.git/git-upload-pack (clone/fetch)
    - POST /<repo>.git/git-receive-pack (push)

가시성 정책: FileResolver(exportAll=false)이면 각 레포에 git-daemon-export-ok가 있어야 익명 읽기가 됩니다. 운영에서는 보통 exportAll=false + 파일로 공개 여부 제어, 푸시에는 인증을 권장합니다.



### How to Create (CLI & JGit)
---
#### CLI
``` bash 
# 새 bare 저장소
git init --bare /srv/git/haha.git

# 기존 저장소를 bare로 클론
git clone --bare /path/to/existing myproj.git
```

#### JGit (예시)
``` java
Repository repo = new RepositoryBuilder()
    .setBare()
    .setGitDir(new File("/srv/git/haha.git"))
    .build();
repo.create(true);
```


> 초기 커밋이 없으면 클론 시 “empty repository”를 만날 수 있음, README 하나 넣어 초기 커밋 + refs/heads/main + HEAD 링크까지 세팅하면 즉시 파일이 보입니다.

### Features (보완 예정)
---
- Read File: 워킹 디렉터리가 없어도 Tree, Blob은 모두 존재해 Bare Repository에서도 파일을 읽을 수 있음


``` bash 
$ git --git-dir=/srv/git/haha.git ls-tree HEAD, git show HEAD:README.md

```



### Conclusion
---
Bare 저장소는 서버 운영을 위한 Git의 기본 단위이며, 프로토콜(SSH/HTTPS)과 공개·보안 정책만 올바르게 설계하면, JGit + Spring 같은 경량 서버부터 사내 전용 호스팅까지 유연하게 확장할 수 있음.

