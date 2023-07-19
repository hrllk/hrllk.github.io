---
title: gitlab merge request 절차
categories: 
    - modernSoftware
---

### gitlab MR 절차 
gitlab MR 절차테스트

#### 1. create branch 
```
curl --location --request POST '${host}/api/v4/projects/1/repository/branches?branch=test-branch&ref=main' \
--header 'Authorization: Bearer glpat-gmQy3xan28N_MU-63nZA' \
--data ''
```


#### 2. commit changes
```
curl --location '${host}/api/v4/projects/1/repository/commits' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer glpat-gmQy3xan28N_MU-63nZA' \
--data '{
  "branch": "test-branch",
  "commit_message": "test commit message",
  "actions": [
    {
      "action": "create",
      "file_path": "foo/bar",
      "content": "some content"
    }
  ]
}'
```

#### 3. create MR(with assign)

``` bash
curl --location '${host}/api/v4/projects/1/merge_requests' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer glpat-gmQy3xan28N_MU-63nZA' \
--data-raw '{
  "source_branch": "test-branch",
  "target_branch": "main",
  "title": "Merge test branch to main branch",
  "description": "This merge request combines the changes from the feature branch into the main branch.",
  "author": {
    "id": 1,
    "name": "Administrator",
    "username": "admin",
    "state": "active",
    "avatar_url": null,
    "web_url" : "https://gitlab.example.com/admin"
  },
  "assignee": {
    "id": 12,
    "username": "hr.kim",
    "name": "hr.kim@okestro.com",
    "state": "active",
    "avatar_url": null,
    "web_url" : "https://gitlab.example.com/admin"
  },
    "sha": "8888888888888888888888888888888888888888"
}'
```

#### 4. show diff 
``` bash
curl --location '${host}/api/v4/projects/1/merge_requests/4/diffs' \
--header 'Authorization: Bearer glpat-gmQy3xan28N_MU-63nZA' \
--data ''
```


#### 5. approve merge request(merge a merge request)
``` bash
curl --location --request PUT '${host}/api/v4/projects/1/merge_requests/4/merge' \
--header 'Authorization: Bearer glpat-gmQy3xan28N_MU-63nZA' \
--data ''
```

#### 6. commit list
``` bash 
curl --location --request GET '${host}/api/v4/projects/1/repository/commits' \
--header 'Content-Type: text/plain' \
--header 'Authorization: Bearer glpat-gmQy3xan28N_MU-63nZA' \
--data ''
```

