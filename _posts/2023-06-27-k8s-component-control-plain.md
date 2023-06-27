--- 
title: k8s component - Control Plane
---




### Control Plane Components
클러스터 매니징, 이벤트핸들링 + <br>
coordinating tasks to 워커노드 <br>

"Control Plane" 컴포넌트는 보통 마스터노드에 배포.<br>


### 1. kube-api server
api server == API server <br>
클라이언트에게 메뉴를 노출해 요청을받음 (pod or service를 생성하거나, 배포등의 리소스를 생성, 수정) <br>
요청을받고, 주문이 유효한지 검사하고 처리후, 클러스터 내부 상태를 업데이트함.<br>

### 2. etcd 
etcd == 저장소 <br>

모든 클러스터 데이터를 담는 저장공간.(key, value) <br>
### 3. kube scheduler
scheduler == pod 배치자 <br>

노드를 배정받지 못한 pod를 감지해 <br>
실행할 노드를 선택하는 컴포넌트 <br>

마트에 계시는 자율계산대 직원님st...<br>

### 4. kube control manager
kube ctontrol manager == contorller 프로세스 실행 매니저 (하기에 있는 컨트롤러들을 매니징)<br>

#### 4-1. node controller
노드다운시 통지 및 대응 책임 <br>

#### 4-2. job controller
잡(일회성 작업) 오브젝트 감시 하고, 해당 작업을 완료할 때까지 동작하는 파드를생성 

#### 4-3. endpoint slice controller
endpoint slice controller == service 와 pod의 hub<br>
서비스와 pod 사이를 연결하기위한 작업을진행 (EndpointSlice 라 칭함)<br>

#### 4-4. service account controller
새로운 네임스페이스에 대해 기본 service account를 생성 <br>

### 5. cloud controller manager

cloud controller manager == 클라우드 서비스와 kubenetes간의 연결, 관리하는 컴포넌트.<br>
※ (on-premise 환경애서의 k8s는 이 컴포넌트가 필요없음)<br>

##### 5-1. node controller
노드가 응답을 멈춘경우 벤더사에 노드상태를 확인요청<br>
##### 5-2. route controller
벤더사의 인프라환경에서 라우팅관리.<br>

##### 5-3. service controller
벤더사의 서비스에서 제공하는 LB 생성 or 삭제 <br>




