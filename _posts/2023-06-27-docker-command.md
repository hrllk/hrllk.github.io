---
title: docker commands 
categories: 
    - modernSoftware 
---


## build docker image
```bash
docker build -f dockerfile -t mini-web
```

### 1. install builderx (to build on docker)
도커이미지파일을 통해 이미지를 생성(빌드)하려 하였으나, <br>
빌더가 오래되었고, 더이상 사용되지않는 에러리턴 <br>

> The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:

builderx라는 플러그인을 설치. <br>
```bash 
brew install builderx
```


### build docker image again
```bash
docker build -f dockerfile -t mini-web
```


## docker image command 
### 1. docker image list
```bash 
docker images
```

### 2. docker image export(.tar)
```bash 
docker save mini-web.tar
```

### 3. docker image load(.tar)
```bash 
docker load -i mini-web.tar
```

### 4. docker image run(deploy)
```bash 
docker run -d -p {local-port}:{docker-port} {container-name}
```


## container status check 
도커가 실행되고, 컨테이너에대한 상태체크 


### 1. container status 
```bash 
docker ps
```

### 2. container log 
```bash 
docker logs ${conatainer-id}
```
