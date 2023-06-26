---
title: what is containerd ? (in kubernetes)
categories: 
    - modernSoftware 
---


### containered란?? 
> Containerd is an open-source container runtime that provides a core set of features for container management, such as image management, container lifecycle management, and low-level runtime operations

containerd == 쿠버네티스의 컨테이너 runtime tool <br>

컨테이너를 관리하기위한 핵심기능을 제공 <br>
이미지관리, 컨테이너 라이플사이클 관리 등..<br>

컨테이너 관리에대한 기능을 가볍게 모듈링한 오픈소스. <br>


### 왜? 
기존에 컨테이너를 관리하기위해 쿠버네티스뿐만아니라 다른 컨테이너 오케스트레이션 플랫폼들에서 컨테이너 매니징을위해 Docker를 사용했지만, Docker는 컨테이너를 매니징하는 기능뿐만아니라 다른 여러가지기능(volumn, compose, security ...)들도 포함하고있었기에 무겁고 복잡했음. <br>
Containerd는 핵심기능(컨테이너 매니징 기능)에만 초점을 맞춰 단순하고 가벼운 컨테이너 런타임을 제공해 이런문제를 해결. <br>
