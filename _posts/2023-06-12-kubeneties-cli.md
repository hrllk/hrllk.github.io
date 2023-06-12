---
title: Kubenetes CLI Guide
categories: 
    - modernSoftware
---


<br>
### 네임스페이스 명령어 

#### 조회 
네임스페이스 목록조회 
```shell
$kubectl get ns 
```


#### 선택 
아래의 명령어를 사용하여 특정 네임스페이스로 전환. <br>
이 명령은 kubectl 아래구성파일에 있는 컨텍스트 네임스페이스를 변경함. <br>
```shell
kubectl config set-context --current  --namespace=hrkim
cat ~/.kube/config
```
이후 사용되는 kubectl명령은 해당 네임스페이스를 사용하게된다. <br>
리소스 생성, 조회, 수정, 삭제가능 <br>



### Pod 란?
pods == 쿠버네티스의 기본 실행단위.<br>
하나이상의 컨테이너를 포함하는 그룹이며 그룹된 환경과 리소스를 가지고있음. <br>
Pod내의 컨테이너는 동일한 호스트에서 실행되며, 같은 네트워크 네임스페이스, IP 주소, 저장소 및 다른리소스를 공유할 수 있음. <br>

### Pod 명령어
#### 생성 
##### 설정파일 생성
```shell
vim hrkim-pod.yaml
-- -----
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: nginx:latest
```
##### 생성 
```shell
kubectl create -f hrkim-pod.yaml
```
#### 조회 
pod 목록을 조회한다. 
```shell
kubectl get pods 
```
#### 로그조회 
```shell
kubectl logs {pod-name} 
```

#### 선택(쉘을 통한 접근)
```shell
kubectl exec -it {pod-name}  -- /bin/bash
```

### 포트포워딩 명령어 
로컬 내부포트로 요청이 들어왔을 때 <br>
Pod내부에 구동되고있는 포트로 요청을 인계한다. <br>
```shell
kubectl port-forward {pod-name} {local-port}:{pod:port}
kubectl port-forward hrkim 8080:8000
```
