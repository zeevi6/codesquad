# 문제2: 맵 문자열을 변환하고 출력하는 프로그램


### 실행환경

* javascript 로 작성하였습니다.
 
* prob02.html 파일 실행 후 브라우저 개발자 도구의 콘솔에서 실행 가능합니다. 
 
* (테스트 브라우저: IE 11, Edge, Chrome)


### 함수

* **function parseData(map)** 

  string 형식의 입력을 json string 형식(width, height, data)으로 변환합니다.

* **function drawMap(json)** 
 
  json string 형식(width, height, data)의 내용을 콘솔에 출력합니다.




### 테스트 방법(콘솔)

```javascript
> var map="10,5\n++++++++++\n+-P------+\n+--------+\n+-----o--+\n++++++++++\n"
> var json = parseData(map)
> drawMap(json)
++++++++++
+ P      +
+        +
+        +
+     o  +
++++++++++
```