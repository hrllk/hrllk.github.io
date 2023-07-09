---
title: what is openstack
categories: 
    - modernSoftware 
---

### openstack이란 
> OpenStack is an open-source cloud computing platform that allows you to create and manage a private or public cloud infrastructure. It provides a set of software tools for building and managing cloud computing platforms for various purposes, such as virtual machines, storage, and networking.


openstack == 오픈소스(클라우드 컴퓨팅 플랫폼구축을 위한)<br>


### 특징 
> OpenStack is designed to be highly scalable and flexible, enabling you to create and manage large-scale cloud environments. It follows a modular architecture, where different components work together to provide the desired cloud services. Some of the core components of OpenStack include

기능별로 쪼개져있는 컴포넌트들(core)<br>
그리고 컴포넌트들이 다같이 클라우드서비스를 제공 <br>


### 모듈들
1. Nova == EC2<br>
VM 제공 및 compute 리소스 매니징 in OpenStack<br>
2. Neutron == VPC<br>
network, router, LB 매니징 <br>
3. Cinder == EBS<br>
Volumn(EBS) attach or detach <br>
4. Swift == S3<br>
Object Storage 제공 <br>
5. Glance == AMI<br>
VM Image 기능 제공 <br>
6. Keystone == IAM<br>
7. Horizon == AWS 콘솔<br>
웹콘솔 to 클라우드 리소스를 프로비저닝하기위한 <br>


### Quick Start
1. 가상머신준비 <br>
OpenStack을 배포할 머신을 준비한다. <br>
2. OpenStack 설치 <br>
패키지매니저를통해 머신에 OpenStack을 설치 <br>
