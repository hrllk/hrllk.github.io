---
title: Quick Start Task Master
categories:
   - ai
toc: true
toc_label: "TOC"
---

### Overview 

> A task management system for AI-driven development with Claude, designed to work seamlessly with Cursor AI.

Task Manger AI == AI 드리븐 기반<br>
== Task 매니저<br>
== AI PM<br>



### Prerequirements
---

nodejs 필수 설치


### Advantages
---
- **작업 종속성(?) 관리**: 작업간 종속성관리(?)
- **가시성 확보**: 작업 진행 상황, 상태 및 로그 실시간 분석

<!-- Task Master는 다음과 같은 이점을 제공합니다: -->
<!-- *   **효율성 증대:** 반복적이고 수동적인 작업을 자동화하여 시간과 노력을 절약합니다. -->
<!-- *   **안정성 향상:** 작업의 종속성을 관리하고 오류 처리 및 재시도 메커니즘을 통해 시스템의 안정성을 높입니다. -->
<!-- *   **가시성 확보:** 작업의 진행 상황, 상태 및 로그를 실시간으로 모니터링하여 시스템 운영에 대한 명확한 통찰력을 제공합니다. -->
<!-- *   **확장성:** 분산 환경에서 작업을 효율적으로 분배하여 대규모 워크로드를 처리할 수 있도록 지원합니다. -->
<!-- *   **개발 생산성 향상:** 개발자가 복잡한 작업 오케스트레이션 대신 핵심 비즈니스 로직에 집중할 수 있도록 돕습니다. -->
<!-- *   **일관성 유지:** 표준화된 작업 정의 및 실행 프로세스를 통해 시스템 전반의 일관성을 보장합니다. -->


### Installation
---
> $ npm install task-master-ai


### Setup Configurations
---
> $ task-master init

위 명령어를 통해 초기화를 진행<br>
각종 dotfile들이 프로젝트 하위에 생성됨 (.cursor, .roo, .taskmaster, ...)<br>

![](/Users/hwiryungkim/Desktop/Screenshot%202025-07-03%20at%2017.49.48.png)


#### Setup 1. Declare Feature Specification
---

위에서 init 진행시, dotfiles이 생성되고, 추가로 가이드라인도 같이 제공됨.<br>
양식에 맞춰 제품에 대한 명세를 작성<br>

- example_prd.md

``` md 
<context>
# Overview  
[Provide a high-level overview of your product here. Explain what problem it solves, who it's for, and why it's valuable.]

# Core Features  
[List and describe the main features of your product. For each feature, include:
- What it does
- Why it's important
- How it works at a high level]

# User Experience  
[Describe the user journey and experience. Include:
- User personas
- Key user flows
- UI/UX considerations]
</context>

<PRD>
# Technical Architecture  
[Outline the technical implementation details:
- System components
- Data models
- APIs and integrations
- Infrastructure requirements]

# Development Roadmap  
[Break down the development process into phases:
- MVP requirements
- Future enhancements
- Do not think about timelines whatsoever -- all that matters is scope and detailing exactly what needs to be build in each phase so it can later be cut up into tasks]

# Logical Dependency Chain
[Define the logical order of development:
- Which features need to be built first (foundation)
- Getting as quickly as possible to something usable/visible front end that works
- Properly pacing and scoping each feature so it is atomic but can also be built upon and improved as development approaches]

# Risks and Mitigations  
[Identify potential risks and how they'll be addressed:
- Technical challenges
- Figuring out the MVP that we can build upon
- Resource constraints]

# Appendix  
[Include any additional information:
- Research findings
- Technical specifications]
</PRD>
```


#### Setup 2. MCP, Models + API key
---

용도별 모델선언이 가능하나, API KEY가 하나뿐이라 통일해서 구성해보았음
- config.json
``` json
{
  "models": {
    "main": {
      "provider": "google",
      "modelId": "gemini-2.5-flash",
      "maxTokens": 120000,
      "temperature": 0.2
    },
    "research": {
      "provider": "google",
      "modelId": "gemini-2.5-flash",
      "maxTokens": 8700,
      "temperature": 0.1
    },
    "fallback": {
      "provider": "google",
      "modelId": "gemini-2.5-flash",
      "maxTokens": 8192,
      "temperature": 0.1
    }
  },
  "global": {
    "logLevel": "info",
    "debug": false,
    "defaultSubtasks": 5,
    "defaultPriority": "medium",
    "projectName": "Taskmaster",
    "ollamaBaseURL": "http://localhost:11434/api",
    "bedrockBaseURL": "https://bedrock.us-east-1.amazonaws.com",
    "ollamaBaseUrl": "http://localhost:11434/api",
    "azureOpenaiBaseUrl": "https://your-endpoint.openai.azure.com/",
    "userId": "1234567890"
  }
}
```

- .env
``` config
GOOGLE_API_KEY=??????????????
```



#### Setup 3. Create Task List Json
---

> $ tm parse-prd --input=prd.txt --force

위 절차에서 자연어로 작성한 명세서와 아래 명령어를 통해 TODO List를 매끄럽게 생성할 수 있음<br>
위 명령어를 통해 task를 생성하게되면 task.json 파일이 생성된다.<br>


<br><br>

### Features
---


#### Feature 1. Show Created Tasks

> $ tm list


위 명령어를 통해 task를 생성하고 다음가이드에서는 다음 명령어를 통해 개발자가 수행해야하는 목록을 시각화해서 렌더링해준다.
(해당 패키지가 위명령어로 생성한 task.json 을 읽어 렌더링을 도와주는듯 보임)

``` bash
~/task/sources/personal/exporter on develop ⇡7 !1 ?3 ❯ tm list                                                                                                                                                                                                                                                                                            3.2.2 at 17:21:52
(node:76571) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
  _____         _      __  __           _
 |_   _|_ _ ___| | __ |  \/  | __ _ ___| |_ ___ _ __
   | |/ _` / __| |/ / | |\/| |/ _` / __| __/ _ \ '__|
   | | (_| \__ \   <  | |  | | (_| \__ \ ||  __/ |
   |_|\__,_|___/_|\_\ |_|  |_|\__,_|___/\__\___|_|

by https://x.com/eyaltoledano
╭───────────────────────────────────────────╮
│                                           │
│   Version: 0.18.0   Project: Taskmaster   │
│                                           │
╰───────────────────────────────────────────╯

🏷️ tag: master
Listing tasks from: .taskmaster/tasks/tasks.json
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                                                                                                ││                                                                                                                                                                                │
│   Project Dashboard                                                                                                                                                            ││   Dependency Status & Next Task                                                                                                                                                │
│   Tasks Progress: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0% 0%                                                                                                                         ││   Dependency Metrics:                                                                                                                                                          │
│   Done: 0  In Progress: 1  Pending: 9  Blocked: 0  Deferred: 0  Cancelled: 0                                                                                                   ││   • Tasks with no dependencies: 1                                                                                                                                              │
│                                                                                                                                                                                ││   • Tasks ready to work on: 1                                                                                                                                                  │
│   Subtasks Progress: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0% 0%                                                                                                                      ││   • Tasks blocked by dependencies: 9                                                                                                                                           │
│   Completed: 0/5  In Progress: 0  Pending: 5  Blocked: 0  Deferred: 0  Cancelled: 0                                                                                            ││   • Most depended-on task: #1 (6 dependents)                                                                                                                                   │
│                                                                                                                                                                                ││   • Avg dependencies per task: 2.5                                                                                                                                             │
│   Priority Breakdown:                                                                                                                                                          ││                                                                                                                                                                                │
│   • High priority: 7                                                                                                                                                           ││   Next Task to Work On:                                                                                                                                                        │
│   • Medium priority: 3                                                                                                                                                         ││   ID: 1.1 - Initialize Project Repository and Bas...                                                                                                                           │
│   • Low priority: 0                                                                                                                                                            ││   Priority: high  Dependencies: None                                                                                                                                           │
│                                                                                                                                                                                ││   Complexity: N/A                                                                                                                                                              │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯│                                                                                                                                                                                │
                                                                                                                                                                                      ╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
┌────────────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────┬──────────────────────────────────────────┬───────────────────────────────────────────────────────────────────────┬───────────────────────────────────┐
│ ID                     │ Title                                                                                                                         │ Status                                              │ Priority                                 │ Dependencies                                                          │ Complexity                        │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼──────────────────────────────────┤
│ 1                      │ Project Setup and Core Infrastructure                                                                                         │ ► in-progress                                       │ high                                     │ None                                                                  │ N/A                               │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
│ 2                      │ Implement PDF Generation Service with Playwright                                                                              │ ○ pending                                           │ high                                     │ 1                                                                     │ N/A                               │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
│ 3                      │ Integrate Message Queue for Asynchronous Processing                                                                           │ ○ pending                                           │ high                                     │ 1, 2                                                                  │ N/A                               │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
│ 4                      │ Implement Distributed Locking with Cache Server                                                                               │ ○ pending                                           │ high                                     │ 1, 3                                                                  │ N/A                               │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
│ 5                      │ Develop API Endpoint for PDF Download Request Submission                                                                      │ ○ pending                                           │ high                                     │ 1, 3                                                                  │ N/A                               │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
│ 6                      │ Implement Progress Tracking and Status Updates                                                                                │ ○ pending                                           │ medium                                   │ 3, 4, 5                                                               │ N/A                               │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
│ 7                      │ Handle Preview/Download Failure Scenarios                                                                                     │ ○ pending                                           │ high                                     │ 2, 6                                                                  │ N/A                               │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
│ 8                      │ Implement Monitoring and Logging                                                                                              │ ○ pending                                           │ medium                                   │ 1                                                                     │ N/A                               │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
│ 9                      │ Develop Frontend Integration for Request and Progress                                                                         │ ○ pending                                           │ medium                                   │ 5, 6, 7                                                               │ N/A                               │
├────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
│ 10                     │ Comprehensive End-to-End Testing and Deployment Preparation                                                                   │ ○ pending                                           │ high                                     │ 1, 2, 3, 4, 5, 6, 7, 8, 9                                             │ N/A                               │
└────────────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────┴──────────────────────────────────────────┴───────────────────────────────────────────────────────────────────────┴───────────────────────────────────┘
```

#### Feature 2. Modify Status of A Task
상태 갱신 가능
> $ tm set-status --id=1 --status=in-progress (or done)


#### Feature 3. Expand Task (Detail)
Task 상세화
> $ tm expand --id=<id> to break down a task into subtasks

### Conclusion
---
찍먹 회고(?), 소규모에서 테스트


### References
---
- [https://github.com/eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master)
