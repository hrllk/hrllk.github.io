---
title: Helm Chart Install Guide
categories: 
    - modernSoftware
---


### Install Helm Chart Guide<br>


### 네임스페이스접근 
k8s 명령어를 이용해 특정 네임스페이스로 접근한다. <br>
특정 네임스페이스 아래, pods아래 애플리케이션을 설치하기 위함이다. <br>
(helm을 이용해 특정애플리케이션을 사용자의 namespace에 설치해보자.)<br>
``` shell
kubectl config set-context --current  --namespace=${namespace}
kubectl config set-context --current  --namespace=hrkim
```

### helm chart 조회 
특정 네임스페이스에 접근후, 
다음명령어를 통해 설치된 차트를 조회.
``` shell
helm list 
```

### helm chart repo 조회 
저장소 조회를 조회한다. 
``` shell
helm search repo ${reposistory-name} 
helm search repo bitnami
```

### helm chart 저장소 추가 
사용자가 원하는 helm 차트를 다운로드받기위해 <br>
원격 저장소를 추가한다. <br>

```shell
helm repo add bitnami https://charts.bitnami.com/bitnami
```

### helm chart 저장소 갱신  
저장소 업데이트 
```shell
helm repo update 
```



### hlem 을 이용한 application 설치 
mariadb를 설치해보았다. 
```shell
helm install bitnami/mariadb --generate-name

--- 


NAME: mariadb-1686554291
LAST DEPLOYED: Mon Jun 12 07:18:13 2023
NAMESPACE: hrkim
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: mariadb
CHART VERSION: 12.2.5
APP VERSION: 10.11.4

....
~~

```
### application 구동 (maraidb기준)
``` shell

kubectl run mariadb-1686558290-client --rm --tty -i --restart='Never' --image  docker.io/bitnami/mariadb:10.11.4-debian-11-r0 --env="MARIADB_ROOT_PASSWORD=${root_password}" --namespace ${namespace}
kubectl run mariadb-1686558290-client --rm --tty -i --restart='Never' --image  docker.io/bitnami/mariadb:10.11.4-debian-11-r0 --env="MARIADB_ROOT_PASSWORD=ALeMjBkyZG" --namespace hrkim

```
### 접속테스트 
해당 application이 특정 독립된 pod공간에 설치되었고, <br>
해당 공간으로 access하여 애플리케이션에 접속해본다. <br>


#### pods 조회 
```shell
kubectl get pods 
```

#### pods 접근 
```shell
kubectl exec -it {pod-name}  -- /bin/bash
kubectl exec -it hrkim  -- /bin/bash
```

#### application 접속 
```
mysql -uroot -p 
```
