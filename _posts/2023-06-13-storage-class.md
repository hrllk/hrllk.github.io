---
title: storage class
categories: 
    - modernSoftware
---


### Storage Class
Storage Class == 동적으로 프로비저닝되는 스토리지 볼륨의 설정을 정의하는 객체 
애플리케이션이나 파드에서 사용할 수 있는 스토리지 볼륨을 정의하고 생성하는데 사용 


### 용도 

- 스토리지 프로비저너 선택 
    어떤 프로비저너를 이용해서 볼륨을 프로비저닝 할 지 지정.
    프로비저너는 스토리지시스템 or 클라우드프로바이더에서 실제로 볼륨을 생성하고 관리하는 역할. 

- 스토리지 클래스 파라미터 
    스토리지클래스는 프로비저너에대한 구성 옵션을 지정 및 파라미터를 포함 할 수있음. 
    스토리지 프로비저너에 따라 다를 수 있다. 
    ex) 스토리지 클래스를 통해 볼륨의 용량, 성능, 특성, 액세스 등 지정 가능 

- 정책 
    스토리지 클래스는 프뢰저닝 정책을 지정할 수 있음. 
    ex) 볼륨이 동적으로 생성될 때 특정 볼륨클래스를 사용하도록 강제할 수 있음. 


### 책임 

스토리지 클래스는 클러스터 관리자가 정의하고, 클러스터 전역에서 사용함. 
애플리케이션또는 파드에서 PVC를 통해 스토리지클래스를 참조해 
해당 스토리지 클래스에 정의된 설정에 따라 동적으로 스토리지 볼륨을 프로비저닝 할 수 있다. 

