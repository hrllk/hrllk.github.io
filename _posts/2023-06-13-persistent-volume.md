---
title: persistent volume
categories: 
    - modernSoftware
---


### Persistent Volume 
PV == 데이터저장공간(영구적으로 컨테이너환경에서)<br>
컨테이너환경에서 데이터를 영구적으로 저장할 수 있는 저장공간. (k8s의,)<br>

### 배경 
컨테이너에서 일시적으로 생성되는 데이터는 메모리에저장한다. <br>
그래서 컨테이너가 종료되면, 데이터도 함께 소멸된다. <br>
이런 제한을 극복하기위해 persistent volumn을 사용해 데이터를 영구적으로 보관한다. <br>


### 특징 
1. k8s의 클러스터내에서 독립적으로 관리.
2. 여러 pod간에 공유되거나 특정 파드에 바인딩 가능.
3. 네트워크 연결을 통해 다른 스토리지 시스템과 연결되어 데이터를 읽기, 쓰기가능 
4. 데이터 복제, 백업 지원 
