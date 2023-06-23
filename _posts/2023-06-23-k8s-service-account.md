---
title: K8S Service Account 
categories: 
    - modernSoftware 
---

### Service Account 
> In Kubernetes, a ServiceAccount is an identity used by Pods or applications to authenticate and authorize themselves when interacting with the Kubernetes API server or other cluster resources.

Service Account == 인증 하기위한 리소스 <br>
클러스터안에있는 리소스(Pod or application)들이 서로 상호작용을 하기위함  <br>


### 기본동작흐름 

> When a Pod is created, it is automatically assigned a default ServiceAccount unless specified otherwise. Each Namespace in Kubernetes has its own set of ServiceAccounts, providing isolation and control over access to resources within that Namespace.

Pod이 생성되면 기본적으로 default SA가 할당됨<br>
Pod이 생성되고, ServiceAccount를 할당해주지않으면 default SA가 할당됨<br>
쿠버네티스 내에 각각의 NS들은 자신들의 SA를 가짐<br>
역할은 리소스를 분리하거나 제어할 수 있음 <br>

### 목적 

> ServiceAccounts are primarily used for authentication and authorization purposes. When a Pod makes API requests to the Kubernetes API server, it includes the credentials of the associated ServiceAccount. The API server then verifies the identity and permissions associated with that ServiceAccount before processing the requests.


### 그래서 언제쓴다고요?

클러스터내의 Pod들끼리 통신할 때 

