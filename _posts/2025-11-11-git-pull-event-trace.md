---
title: "Git Pull Event Trace Log(client/server)"
categories:
  - Git
toc: true
toc_sticky: true
toc_label: "Contents"
published: true
---


### Overview
---
`git pull` 실행 시 클라이언트 ↔ 서버 트레이스 정리

- **전송 방향**: git> / fetch-pack> = 클라이언트 → 서버, git< / fetch-pack< = 서버 → 클라이언트

- **엔드포인트**
    - 1단계(Advertise-Refs): GET {prefix}/info/refs?service=git-upload-pack
    - 2단계(Upload-Pack): POST {prefix}/git-upload-pack
    - prefix = /okgit/git/CMPART/repo4.git

#### 1) Client → Server: refs 정보 요청 (Advertise-Refs)
- 의미: `git pull` 이벤트와 함께 `refs` 정보 서버로 요청
- 엔드포인트: GET `/info/refs?service=git-upload-pack`
``` text 
16:03:05.672103 git.c:479               trace: built-in: git pull --rebase
16:03:05.676203 run-command.c:666       trace: run_command: git merge-base --fork-point refs/remotes/origin/devs devs
16:03:05.676219 run-command.c:758       trace: start_command: /opt/homebrew/opt/git/libexec/git-core/git merge-base --fork-point refs/remotes/origin/devs devs
16:03:05.688176 run-command.c:666       trace: run_command: git fetch --update-head-ok
16:03:05.688226 run-command.c:758       trace: start_command: /opt/homebrew/opt/git/libexec/git-core/git fetch --update-head-ok
16:03:05.695026 git.c:479               trace: built-in: git fetch --update-head-ok
16:03:05.697631 run-command.c:666       trace: run_command: GIT_DIR=.git git remote-http origin http://localhost:8084/okgit/git/CMPART/repo4.git
16:03:05.697640 run-command.c:758       trace: start_command: /opt/homebrew/opt/git/libexec/git-core/git remote-http origin http://localhost:8084/okgit/git/CMPART/repo4.git
16:03:05.704320 git.c:781               trace: exec: git-remote-http origin http://localhost:8084/okgit/git/CMPART/repo4.git
16:03:05.704639 run-command.c:666       trace: run_command: git-remote-http origin http://localhost:8084/okgit/git/CMPART/repo4.git
16:03:05.704647 run-command.c:758       trace: start_command: /opt/homebrew/opt/git/libexec/git-core/git-remote-http origin http://localhost:8084/okgit/git/CMPART/repo4.git
16:03:05.716170 http.c:913              == Info: Couldn't find host localhost in the .netrc file; using defaults
16:03:05.716405 http.c:913              == Info: Host localhost:8084 was resolved.
16:03:05.716409 http.c:913              == Info: IPv6: ::1
16:03:05.716410 http.c:913              == Info: IPv4: 127.0.0.1
16:03:05.716429 http.c:913              == Info:   Trying [::1]:8084...
16:03:05.716576 http.c:913              == Info: Connected to localhost (::1) port 8084
16:03:05.716603 http.c:860              => Send header, 0000000245 bytes (0x000000f5)
16:03:05.716606 http.c:872              => Send header: GET /okgit/git/CMPART/repo4.git/info/refs?service=git-upload-pack HTTP/1.1
```

#### 2) Server → Client: refs 광고 응답
- 의미: 서버가 참조(브랜치/HEAD)와 capabilities를 광고(`refs` 엔드포인트로 요청을 받은 서버는 `refs` 정보를 도출해 클라이언트로 응답.)

``` text 
2025-11-11 15:11:02 [DEBUG] [http-nio-8084-exec-7] o.o.t.g.i.c.filter.HttpLogFilter - HTTP Method: [GET], URI: [/okgit/git/CMPART/repo4.git/info/refs], SevletPath: [/git], PathInfo: [/CMPART/repo4.git/info/refs]
2025-11-11 15:11:02 [INFO] [http-nio-8084-exec-7] o.o.t.g.i.config.GitHttpConfig - $$$ AdvertiseRefsHook advertiseRefs! discovery!: client: [0:0:0:0:0:0:0:1], repo: [/okgit/git/CMPART/repo4.git/info/refs]

2025-11-11 15:11:02 [INFO] [http-nio-8084-exec-7] o.o.t.g.i.config.GitHttpConfig - refKey: [HEAD] || refValue: [SymbolicRef[HEAD -> refs/heads/main=5451d6013b97bb6728ec8aa048ea208a9dae923a(-1)]]
2025-11-11 15:11:02 [INFO] [http-nio-8084-exec-7] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/branchPushTest] || refValue: [Ref[refs/heads/branchPushTest=19f8d70c656327448e14978578f8864344584011(-1)]]
2025-11-11 15:11:02 [INFO] [http-nio-8084-exec-7] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/devs] || refValue: [Ref[refs/heads/devs=d7dedb6ca08292dc602c36c2dd95ab0c1373c102(-1)]]
2025-11-11 15:11:02 [INFO] [http-nio-8084-exec-7] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/feature001] || refValue: [Ref[refs/heads/feature001=e6588fe025ce44f9a09930564fbb1fc239268137(-1)]]
2025-11-11 15:11:02 [INFO] [http-nio-8084-exec-7] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/main] || refValue: [Ref[refs/heads/main=5451d6013b97bb6728ec8aa048ea208a9dae923a(-1)]]
2025-11-11 15:11:02 [INFO] [http-nio-8084-exec-7] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/main2] || refValue: [Ref[refs/heads/main2=31e44feb657394d909d7a75631a57dbead273be9(-1)]]
2025-11-11 15:11:02 [INFO] [http-nio-8084-exec-7] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/main3] || refValue: [Ref[refs/heads/main3=e399c6468707df9463a9c633355d8c9337bc2b23(-1)]]
```


#### 3) Client: refs 기반으로 wants/haves 계산 시작
- 의미: 수신한 refs와 로컬 보유 OID 비교 → 부족한 커밋을 want로 선정
- e부 단계에서 fetch-pack가 기동됨(무상태 RPC)
3. `refs` 정보를 수신한 클라이언트는 로컬에있는 해시를 비교하고 로컬의 추가로딩이 필요한경우 (로컬의 해시와 서버의 해시가 다른경우) `wants` 정보를 파싱한다.
``` text

16:03:05.784421 http.c:913              == Info: Connection #0 to host localhost left intact
16:03:05.784432 run-command.c:666       trace: run_command: 'git credential-store store'
16:03:05.784434 run-command.c:758       trace: start_command: /bin/sh -c 'git credential-store store' 'git credential-store store'
16:03:05.798090 git.c:479               trace: built-in: git credential-store store
16:03:05.799599 pkt-line.c:86           packet:          git< # service=git-upload-pack
16:03:05.799613 pkt-line.c:86           packet:          git< 0000
16:03:05.799616 pkt-line.c:86           packet:          git< 5451d6013b97bb6728ec8aa048ea208a9dae923a HEAD\0 include-tag multi_ack_detailed multi_ack ofs-delta side-band side-band-64k thin-pack no-progress shallow no-done agent=JGit/7.3.0.202506031305-r symref=HEAD:refs/heads/main
16:03:05.799632 pkt-line.c:86           packet:          git< 19f8d70c656327448e14978578f8864344584011 refs/heads/branchPushTest
16:03:05.799637 pkt-line.c:86           packet:          git< 2dd5b72b58dedba0dd808f788a98ed6a029419db refs/heads/devs
16:03:05.799639 pkt-line.c:86           packet:          git< e6588fe025ce44f9a09930564fbb1fc239268137 refs/heads/feature001
16:03:05.799640 pkt-line.c:86           packet:          git< 5451d6013b97bb6728ec8aa048ea208a9dae923a refs/heads/main
16:03:05.799641 pkt-line.c:86           packet:          git< 31e44feb657394d909d7a75631a57dbead273be9 refs/heads/main2
16:03:05.799663 pkt-line.c:86           packet:          git< e399c6468707df9463a9c633355d8c9337bc2b23 refs/heads/main3
16:03:05.799670 pkt-line.c:86           packet:          git< 0000
16:03:05.803902 pkt-line.c:86           packet:          git> 2dd5b72b58dedba0dd808f788a98ed6a029419db refs/heads/devs
16:03:05.803908 pkt-line.c:86           packet:          git> 0000
16:03:05.803917 run-command.c:666       trace: run_command: git fetch-pack --stateless-rpc --stdin --lock-pack --include-tag --thin http://localhost:8084/okgit/git/CMPART/repo4.git/
16:03:05.803928 run-command.c:758       trace: start_command: /opt/homebrew/opt/git/libexec/git-core/git fetch-pack --stateless-rpc --stdin --lock-pack --include-tag --thin http://localhost:8084/okgit/git/CMPART/repo4.git/
16:03:05.811325 git.c:479               trace: built-in: git fetch-pack --stateless-rpc --stdin --lock-pack --include-tag --thin http://localhost:8084/okgit/git/CMPART/repo4.git/
16:03:05.811668 pkt-line.c:86           packet:   fetch-pack< 2dd5b72b58dedba0dd808f788a98ed6a029419db refs/heads/devs
16:03:05.811673 pkt-line.c:86           packet:   fetch-pack< 0000
16:03:05.811676 pkt-line.c:86           packet:   fetch-pack< 5451d6013b97bb6728ec8aa048ea208a9dae923a HEAD\0 include-tag multi_ack_detailed multi_ack ofs-delta side-band side-band-64k thin-pack no-progress shallow no-done agent=JGit/7.3.0.202506031305-r symref=HEAD:refs/heads/main
16:03:05.811686 pkt-line.c:86           packet:   fetch-pack< 19f8d70c656327448e14978578f8864344584011 refs/heads/branchPushTest
16:03:05.811688 pkt-line.c:86           packet:   fetch-pack< 2dd5b72b58dedba0dd808f788a98ed6a029419db refs/heads/devs
16:03:05.811690 pkt-line.c:86           packet:   fetch-pack< e6588fe025ce44f9a09930564fbb1fc239268137 refs/heads/feature001
16:03:05.811692 pkt-line.c:86           packet:   fetch-pack< 5451d6013b97bb6728ec8aa048ea208a9dae923a refs/heads/main
16:03:05.811694 pkt-line.c:86           packet:   fetch-pack< 31e44feb657394d909d7a75631a57dbead273be9 refs/heads/main2
16:03:05.811696 pkt-line.c:86           packet:   fetch-pack< e399c6468707df9463a9c633355d8c9337bc2b23 refs/heads/main3
16:03:05.811697 pkt-line.c:86           packet:   fetch-pack< 0000
```

#### 4) Client → Server: wants/haves 전송 (협상 시작)
- 엔드포인트: POST `/git-upload-pack`
- 의미: 가져올 대상(want) 과 이미 가진 것(have) 을 전송(도출된 `wants` (추가로 받아와야하는 내용들)가 있다면, 해당내용을 재요청하고, 없다면 이벤트가 여기서 종료된다.(서버와 로컬의 히스토리가 같은경우))

``` text
16:03:05.819140 pkt-line.c:86           packet:   fetch-pack> want 2dd5b72b58dedba0dd808f788a98ed6a029419db multi_ack_detailed no-done side-band-64k thin-pack include-tag ofs-delta agent=git/2.47.0
16:03:05.819146 pkt-line.c:86           packet:   fetch-pack> 0000
16:03:05.819149 pkt-line.c:86           packet:   fetch-pack> have d7dedb6ca08292dc602c36c2dd95ab0c1373c102
16:03:05.819151 pkt-line.c:86           packet:   fetch-pack> have f7da6d996f1a6f9c76588b29c15d0f925a2b7bb6
16:03:05.819152 pkt-line.c:86           packet:   fetch-pack> have ef49ca3cde90496cb5a201f04346f2b0ffe9f8cd
16:03:05.819154 pkt-line.c:86           packet:   fetch-pack> have 19f8d70c656327448e14978578f8864344584011
16:03:05.819157 pkt-line.c:86           packet:   fetch-pack> have 5451d6013b97bb6728ec8aa048ea208a9dae923a
16:03:05.819158 pkt-line.c:86           packet:   fetch-pack> have e399c6468707df9463a9c633355d8c9337bc2b23
16:03:05.819159 pkt-line.c:86           packet:   fetch-pack> have 31e44feb657394d909d7a75631a57dbead273be9
16:03:05.819161 pkt-line.c:86           packet:   fetch-pack> have 4846d60a8d7ff1cd9fda6009a2814c638bb79a27
16:03:05.819162 pkt-line.c:86           packet:   fetch-pack> have e6588fe025ce44f9a09930564fbb1fc239268137
16:03:05.819164 pkt-line.c:86           packet:   fetch-pack> have 81ab494eacd9da298a4003b11cea4ea779eed303
16:03:05.819165 pkt-line.c:86           packet:   fetch-pack> done
16:03:05.819169 pkt-line.c:86           packet:   fetch-pack> 0000
16:03:05.819189 pkt-line.c:86           packet:          git< 008cwant 2dd5b72b58dedba0dd808f788a98ed6a029419db multi_ack_detailed no-done side-band-64k thin-pack include-tag ofs-delta agent=git/2.47.000000032have d7dedb6ca08292dc602c36c2dd95ab0c1373c1020032have f7da6d996f1a6f9c76588b29c15d0f925a2b7bb60032have ef49ca3cde90496cb5a201f04346f2b0ffe9f8cd0032have 19f8d70c656327448e14978578f88643445840110032have 5451d6013b97bb6728ec8aa048ea208a9dae923a0032have e399c6468707df9463a9c633355d8c9337bc2b230032have 31e44feb657394d909d7a75631a57dbead273be90032have 4846d60a8d7ff1cd9fda6009a2814c638bb79a270032have e6588fe025ce44f9a09930564fbb1fc2392681370032have 81ab494eacd9da298a4003b11cea4ea779eed3030009done
16:03:05.819217 pkt-line.c:86           packet:          git< 0000
16:03:05.819275 http.c:913              == Info: Found bundle for host: 0x600001e80930 [serially]
16:03:05.819277 http.c:913              == Info: Can not multiplex, even if we wanted to
16:03:05.819285 http.c:913              == Info: Re-using existing connection with host localhost
16:03:05.819352 http.c:913              == Info: Server auth using Basic with user 'sysadmin'
16:03:05.819396 http.c:860              => Send header, 0000000343 bytes (0x00000157)
16:03:05.819401 http.c:872              => Send header: POST /okgit/git/CMPART/repo4.git/git-upload-pack HTTP/1.1
```

#### 5) Server → Client: packfile 생성·전송
- 의미: 서버가 협상 결과에 따라 PACK 생성 후 전송(`wants` 요청값을 수신한 서버는 해당 내용을가지고, 클라이언트에게 `packfile` 을 만들어 클라이언트에 응답한다.)
``` text
2025-11-11 16:11:05 [DEBUG] [http-nio-8084-exec-1] o.o.t.g.i.c.filter.HttpLogFilter - HTTP Method: [POST], URI: [/okgit/git/CMPART/repo4.git/git-upload-pack], SevletPath: [/git], PathInfo: [/CMPART/repo4.git/git-upload-pack]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - $$$ AdvertiseRefsHook advertiseRefs! clientSID: [null], repositoryPath: [/Users/hwiryungkim/tmptmp/bare/CMPART/repo4.git]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - $$$ AdvertiseRefsHook advertiseRefs! discovery!: client: [0:0:0:0:0:0:0:1], repo: [/okgit/git/CMPART/repo4.git/git-upload-pack]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - refKey: [HEAD] || refValue: [SymbolicRef[HEAD -> refs/heads/main=5451d6013b97bb6728ec8aa048ea208a9dae923a(-1)]]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/branchPushTest] || refValue: [Ref[refs/heads/branchPushTest=19f8d70c656327448e14978578f8864344584011(-1)]]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/devs] || refValue: [Ref[refs/heads/devs=2dd5b72b58dedba0dd808f788a98ed6a029419db(-1)]]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/feature001] || refValue: [Ref[refs/heads/feature001=e6588fe025ce44f9a09930564fbb1fc239268137(-1)]]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/main] || refValue: [Ref[refs/heads/main=5451d6013b97bb6728ec8aa048ea208a9dae923a(-1)]]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/main2] || refValue: [Ref[refs/heads/main2=31e44feb657394d909d7a75631a57dbead273be9(-1)]]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - refKey: [refs/heads/main3] || refValue: [Ref[refs/heads/main3=e399c6468707df9463a9c633355d8c9337bc2b23(-1)]]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - [v0/v1] $$$ PreUploadHook.onBeginNegotiateRound(): round, wants=1, havesSeen=10
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - Client's Wants List:
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - wants: [2dd5b72b58dedba0dd808f788a98ed6a029419db]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - [v0/v1] $$$ PreUploadHook.onEndNegotiateRound(): wants: [commit 2dd5b72b58dedba0dd808f788a98ed6a029419db 1762844577 -----sp]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - [v0/v1] $$$ PreUploadHook.onSendPack(): wants: [[commit 2dd5b72b58dedba0dd808f788a98ed6a029419db 1762844577 -----sp]], haves: [[commit 5451d6013b97bb6728ec8aa048ea208a9dae923a 1759213017 ------p, commit 81ab494eacd9da298a4003b11cea4ea779eed303 1758513914 ------p, commit e399c6468707df9463a9c633355d8c9337bc2b23 1759212898 ------p, commit 19f8d70c656327448e14978578f8864344584011 1762315581 ------p, commit e6588fe025ce44f9a09930564fbb1fc239268137 1758522632 ------p, commit 31e44feb657394d909d7a75631a57dbead273be9 1759211658 ------p, commit ef49ca3cde90496cb5a201f04346f2b0ffe9f8cd 1762316999 ------p, commit d7dedb6ca08292dc602c36c2dd95ab0c1373c102 1762320649 -----sp]]
2025-11-11 16:11:05 [INFO] [http-nio-8084-exec-1] o.o.t.g.i.config.GitHttpConfig - [v0/v1] sendPack(types on wants): commit=[1], tree=[0], blob=[0], tag=[0], others=[0]
```


### 요약
---

``` mermaid 
sequenceDiagram
  autonumber
  participant C as Client
  participant S as Server (JGit)

  C->>S: GET /info/refs?service=git-upload-pack
  S-->>C: refs + capabilities (Advertise-Refs)
  C->>C: compare refs vs local, compute wants/haves
  C->>S: POST /git-upload-pack (wants, haves, done)
  S-->>C: PACK (side-band, thin-pack)
  C->>C: update remote-tracking branch, merge/rebase

```



