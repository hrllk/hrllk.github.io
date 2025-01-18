---
 title: getting start docker on ARM
 categories:
     - devops
---




### Overview
> Since macOS doesn't natively support Docker's underlying Linux kernel features, 
you need a lightweight virtual machine (VM) to run the Docker daemon.

colima == vm (to start docker daemon)
(리눅스의 커널기반의 기능들을 미제공)

> Colima is optimized for local development environments where portability and simplicity are more important than performance or stability.
It is not designed to match the production-grade reliability of container orchestration platforms like Kubernetes, Docker Swarm, or directly running Docker on Linux servers.

단순성에 포커싱되어 설계되었고(성능, 사용성보다) 개발환경에 적합 <br>
k8s, docker swarm처럼 운영환경을 위해 설계된 도구가 아님 <br>

> Colima uses QEMU to emulate Linux on macOS. While this works well for development, it adds overhead, especially when handling large-scale workloads.
For production environments, running Docker containers natively on a Linux server offers significantly better performance and stability.
Compatibility Concerns (x86 vs ARM)

리눅스 에뮬레이트를 위해 QEMU를 사용 큰 규모인환경에서 사용시 overhead 비용 지불 필요

> Apple Silicon (ARM) architecture can cause compatibility issues with certain Docker images, which may be built for x86-64 (amd64).
Although Docker and Colima support multi-architecture builds, using ARM in production can still lead to unexpected issues with libraries, binaries, or images that are not ARM-compatible.
Not Built for High Availability

Silicon Mac(ARM) 환경에서는 호환성 문제가 발생할 수 있음 Docker와 Colima는 다중 아키텍쳐환경도 지원하지만 <br>
Production 환경에서 사용하기엔 라이브러리, 바이너리, 이미지에대해 호환성이슈가 발생할 수 있고, 고가용성에 대해 설계되어있지 않음 <br>


> Colima lacks the features required for production, such as clustering, failover mechanisms, or container orchestration at scale.
It's not a substitute for tools like Kubernetes or dedicated Linux-based Docker environments.
Lack of Enterprise-Grade Support

운영환경에서 사용하기에는 기능 부족 (클러스터링, failover)


### Installation
``` shell
$ brew install colima
```







### References
[!https://dev.to/mochafreddo/running-docker-on-macos-without-docker-desktop-64o](https://dev.to/mochafreddo/running-docker-on-macos-without-docker-desktop-64o)





