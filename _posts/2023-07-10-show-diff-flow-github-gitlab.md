---
title: github과 gitlab의 flow
categories: 
    - modernSoftware 
    - devOps 
---

### github flow
git flow(5) 를 간소화한 전략<br>


- 브랜치구성<br>
master 와 작업브랜치로만 구성<br><br>
모든 작업(새 기능추가 or 버그해결)은 master브랜치로부터 checkout되며 <br>
브랜치이름은 어떤작업을 하는지 자세하게 작성 <br>
- 주기적 Push<br>
Local 작업브랜치에 수시로 커밋하고 Remote 작업 브랜치에 수시로 Push<br>
- 병합<br>
작업브랜치에 작업이 완료되었다면 Master에 병합을 준비하는과정 <br>
PR을 생성 후, 자신의 코드를 공유<br>
공유가 끝나고 merge준비가 완료되었다면 반영을 요청<br>
(*곧장 product로 반영되므로, 이해관계가 연결된 사람들과 충분히 논의 후 반영) <br>
- 배포(즉시) <br>
master로 merge가 일어나면 자동으로 배포가 되도록 설정해놓는다. <br>

### 순서요약 
1. checkout feature branch(from master) <br>
2. merge(PR) to master branch(from feature)<br>
3. deploy<br>



### gitlab flow 
gitlab flow == github flow + pre-production branch <br>
<br>
위에서 설명한 (github flow) branch 전략에서 <br>
pre-production 브랜치라는 브랜치를 하나 더 구성한 전략이다. <br>
<br>
master와 production(배포되는브랜치)  사이에 pre-production이라는 브랜치를 추가해 <br>
개발한 내용을 (production에) 곧장 반영치 않고, 시간을 두고 반영하는 전략이다. <br>

### 순서요약 
1. checkout feature branch (from master)<br>
2. merge(MR) to master branch (from feature) <br>
3. merge to pre-production branch (from master) (testing on test server)<br>
4. merge to production branch (from pre-production)<br>
5. merge (from production)<br>




