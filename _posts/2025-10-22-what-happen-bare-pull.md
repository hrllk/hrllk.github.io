---
title: "What Happen When Pull Event On Bare"
categories:
  - Git
toc: true
toc_sticky: true
toc_label: "Contents"
published: true
---

## Overview

클라이언트에서 pull event 가 발생했을때의 흐름을 설명한다. 
클라이언트에서 git pull 명령이 실행되면, 서버에서는 Fetch 요청에 응답하는 과정만 담당하며, 읽기 중심의 동작(read only)을 수행하며, 실제 Merge나 Rebase 등의 작업은 클라이언트 측에서 진행된다.

## Key Terms Explained
- Pack: Git 객체를 효율적으로 저장하기위한 압축 파일 형식으로, .pack 파일과 인덱스역할을 하는.idx 파일로 구성된다.
- Bare Repository: .git 폴더만 존재하며, 작업 디렉터리(working tree)가 없는 저장소 형태로, 서버에서 원격 저장소로 사용된다.

## Flow


### 1. Discovery

원격 상태 파악과 필요 데이터 판단까지의 전반 흐름

#### 1-1. Advertise-Refs

클라이언트가 `git pull` 수행 시, 서버의 git-upload-pack 엔드포인트로 refs 정보를 요청

- 클라이언트 요청

``` nginx
GET /<repo>.git/info/refs?service=git-upload-pack
```

- 서버 응답 항목
    - HEAD
    - refs/heads/* (브랜치 정보)
    - refs/tags/* (태그 정보)
    - capabilities 목록



### 2. Negotiation
#### 2-1.  wants/have 도출

서버가 제공한 refs 정보를 기반으로 로컬과 상태 대조를 통한 추가요청을 위한 객체 도출  (wants, have)

- 요청 전송

``` nginx
POST /<repo>.git/git-upload-pack
```
- 요청 구성: want, have, shallow 등
- 목적: 공통 조상 확인, 부족한 객체만 선별 요청



### 3.Packfile Retrieval

필요 객체에 대한 팩 생성, 전송, 수신 및 적용 흐름(클라이언트는 위 Negotiation 단계에서 받은 refs 정보를 바탕으로, 서버가 가지고 있지만 로컬에는 없는 커밋들을 요청한다.)
요청에는 `want`, `have`, `shallow` 옵션 등이 포함됨

#### 3-1. 서버 → 클라이언트 전송 (side-band)

- side-band 스트림: ch1(pack 데이터), ch2(진행률), ch3(에러)
- thin-pack, ofs-delta, bitmap index 등 최적화 적용 가능

#### 3-2. 클라이언트 수신·적용

- `.pack` 수신 및 `.idx` 인덱스 생성
- 로컬 객체 DB 반영



## Diagram

``` mermaid 
sequenceDiagram
  autonumber
  participant C as Client
  participant S as Server (JGit)

  alt Discovery Advertise
      C->>S: GET /info/refs?service=git-upload-pack
      S-->>C: refs + capabilities (Advertise-Refs)
  end
  alt Negotiation
      C->>C: compute wants/haves
  end
  alt Fetching PackFile
  C->>S: POST /git-upload-pack (wants, haves, done)
  S-->>C: PACK (side-band, thin-pack)
  C->>C: update remote-tracking branch, merge/rebase
  end 

```



## Pull Event Trace





