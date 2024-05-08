---
 title: what is diffrenet between XSSFWorkbook and SXSSFWorkbook
 categories: 
     - spring
     - troubleShooting 
---


### XSSFWorkbook
- 07년 이후 POI 표준, 확장자 .xlsx
- 전체 엑셀 문서를 메모리에 로드 대용량 엑셀 파일 보다 중소형 엑셀파일에 적합
엑셀 데이터가 많은경우 OOM 이슈 발생 할 수 있음

### SXSSFWorkbook
- XSSFWorkbook의 확장 클래스
스트리밍 기능 제공 <br>
대용량 엑셀을 writing 하기위해 설계됨 <br>
메모리가 아닌, 임시디스크파일에 데이터를 기록한 후 대량의 엑셀파일을 처리할 수 있도록 설계됨<br>
메모리사용량을 최적화할 때(대용량 엑셀파일을 다룰때 유용)<br>


요약, XSSFWorkbook == 중소형 엑셀파일에 사용
SXSSFWorkbook == 대용량 엑셀파일에 사용


