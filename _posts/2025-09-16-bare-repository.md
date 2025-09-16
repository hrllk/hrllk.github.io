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
Bare 저장소는 워킹 디렉터리(작업 트리)가 없는 Git 저장소. 즉, 파일이 “펼쳐진” 상태가 아니라, 오직 .git 내부 구조(객체 objects/, 참조 refs/, HEAD, config 등)만 존재함
서버는 코드를 “수정”하지 않고 push/fetch 트래픽만 처리하므로 bare 형태가 적합함.
GitLab/GitHub의 서버 측 저장소는 결국 bare 저장소이며, 클라이언트가 clone시에 none-bare 저장소(워킹)를 다운로드.


| | None-bare | Bare |
| --------------- | --------------- | --------------- |
| Working Directory  | O | X |
| Purpose | Develop(Update) | Hub |
| Path | myproj/ | myproj.git |



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

