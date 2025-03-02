---
 title: TPS 오답 노트
 categories: 
     - spring
 published: false
---

``` c
#include <stdio.h>

// n == 2 > sum == 1 > return 0
// n == 3 > sum == 1 > return 0
// n == 4 > sum == 3 > return 0
// n == 5 > sum == 3 > return 0

// 완전수 공식 ㅅㅂ.. ㅎㅎ
int test(int n) { // 2,3,4,5,6,7...100
    int i, sum = 0;
    
    for (i = 1; i <= n / 2; i++){ // 2 > sum=2 > return true, 3 > sum == 3 > 
        if (n % i == 0)  // 6 % 1, 6 % 2 
            sum += i;
    }

    if (n == sum) // 2
        return 1;
   
    return 0;
}

int main(){
    int i, sum=0;
    
    for (i = 2; i <= 100; i++){ 
        if (test(i))
        sum += i;
    }

    printf("%d ", sum); 
    return 0;

}

// 숫자를 일일히 넣어서 무슨 함수인지 확인해보면 자기 자신을 제외한 약수의 합이 자기자신과 같은 “완전수”를 찾는 문제이다. 범위는 2부터 100까지 이므로 완전수인 6, 28의 합인 34가 








// 📌 C언어에서 구조체의 멤버에 접근하기 위해 괄호안의 ‘기호’를 작성하시오. ( 23년 3회 )Permalink

```

``` c

#include <stdio.h>
#include <stdlib.h>
 
typedef struct Data{
    char c;
    int *numPtr; 
} Data;
 
int main(){
    int num = 10;
    Data d1;    
    Data *d2 = malloc(sizeof(struct Data));
    
    d1.numPtr = &num;  
    d2 ( ) numPtr = &num; 
 
    printf("%d\n", *d1.numPtr); 
    printf("%d\n", *d2 ( ) numPtr);
 
    free(d2); 
    return 0;
}


```

``` c
// [ 출력 결과 ] 
// 10
// 10
// 
// 
// 
// 
// C언어에서 구조체 포인터에 접근하기 위한 기호는 -> 이다.
// 
// 
// 
// 
// 
// 
// 
// 
// 📌 다음 C언어 코드에 알맞는 출력값을 작성하시오. ( 23년 3회 )Permalink


#include
 

// 7-1
// 6-1
// 5-1 > 4 * 3
// 4-1 > 3 * 2
// 3-1 > 2 * 1
// 2-1 > 1
//
//
//
//
int f(int n) {
    if(n<=1) 
        return 1;
    else 
        return n*f(n-1);
}
 
int main() {
    printf("%d", f(7));
}



```

``` c

// 함수를 해석해보면 1x2x3x4x5x6x7 을 의미한다.
// 
// 
// 
// 
// 
// 
// 
// 
// 📌다음은 C언어의 포인터 문제이다. 알맞는 출력값을 작성하시오. ( 23년 3회 )Permalink

```

``` c

#include
 
int main() {
    char* p = "KOREA";
    printf("%s ", p);
    printf("%s ", p+1);
    printf("%c ", *p);
    printf("%c ", *(p+3));
    printf("%c ", *p+4);
}



// 
// 포인터는 주소값을 의미한다는 사실만 알고있으면 쉽게 풀 수 있다. 그리고 *p가 의미하는것이 p의 주소값을 참조한다 즉 p의 주소값을 통해 실제값(여기서는 문자)을 가진다 라고 생각하면 문제를 풀기 쉽다. 일단 p는 포인터 문자로 선언되어 있으므로 K의 주소값을 가진다.
// 
// 첫번째 printf("%s ", p);는 p가 나타내는 문자열 KOREA 를 출력한다.
// 두번째 printf("%s ", p+1);은 p의 바로 다음 주소인 O부터 KOREA를 출력한다.
// 세번째 printf("%c ", *p);는 p를 참조한다.
// 즉 p의 실제값인 K를 출력한다.
// 네번째 printf("%c ", *(p+3));은 p+3의 주소값을 참조한다.
// 즉 E를 출력한다.
// 마지막 printf("%c ", *p+4);는 p를 참조하고 아스키값 4를 더한다.
// 즉 K+4=O를 출력한다
```

``` c




// 📌다음은 C언어 코드의 문제이다. 다음의 조건에 맞도록 빈 괄호 안에 알맞은 코드를 작성하시오. ( 23년 2회 )Permalink
// 조건 : 입력값이 54321일 경우 출력값이 43215로 출력되어야 한다. 



int main(void) {
 
    int n[5];
    int i;
 
    for (i = 0; i < 5; i++) {
        printf("숫자를 입력해주세요 : ");
        scanf("%d", &n[i]);
    }
 
    for (i = 0; i < 5; i++) {
        printf("%d", (            ) );
    }
 
  return 0;
 
}




// 뭐 딱히 해설할게 없다. 그냥 첫번째 입력한걸 마지막에 출력되게 작성하면 된다.
// 
// 
// 
// 
// 
// 
// 
// 
// 📌다음은 c언어의 코드이다. 보기의 조건에 맞추어 알맞은 출력값을 작성하시오. ( 23년 2회 )Permalink
// ` 입력값은 홍길동, 김철수, 박영희 순서로 주어진다. `

```

``` c


#include<stdlio.h> 
#include<stdlib.h> 

char n[30];
char* test() {
    printf(입력하세요 : );
    gets(n);
    return n;
}
 
int main()
 
{
    char* test1;
    char* test2;
    char* test3;
 
    test1 = test();
    test2 = test();
    test3 = test();
 
    printf(%s\n,test1);
    printf(%s\n,test2);
    printf(%s,test3);
}



// 박영희
// 박영희
// 박영희
// 
// 
// 
// 
// 
// 
// 
// 
// 📌다음은 c언어의 코드이다. 알맞은 출력값을 작성하시오. ( 23년 2회 )Permalink
```

``` c


int n[3] = [73, 95, 82] 
int sum = 0 
 
for(i=0;i<3;i++){
    sum += n[i];
}
 
switch(sum/30){
    case 10:
    case 9: printf("A");
    case 8: printf("B");
    case 7: 
    case 6: printf("C");
    default: printf("D");
}




// 먼저 for문을 통해 sum = n[0]+n[1]+n[2] 가 되므로 sum = 250 이 된다. 따라서 switch(sum/30)은 switch(250/3), 즉 switch(8) 이 실행된다. 근데 주의할점은 switch문의 각 case마다 break가 걸려있지 않다는 점이다. 때문에 case8 을 수행한뒤 case7, case6,default 까지 실행될 것이다. 따라서 
// 
// 
// 
// 
// 
// 
// 
// 
// 📌다음 소스코드의 알맞은 출력을 작성하시오. ( 23년 2회 )Permalink

```

``` c

#include <stdio.h>
 
int main(){
 
    int c = 0;
 
    for(int i = 1; i <=2023; i++) { 
		if(i%4 == 0) c++; 
    }
    printf("%d", c);
}




// for문의 i는 1~2023까지 돌고, i가 4의배수일때 c++ 하므로 c는 505번 1 증가한다. 따라서 
// 
// 
// 
// 
// 
// 
// 
// 
// 📌다음은 C언어 문제이다. 알맞은 출력값을 작성하시오. ( 23년 2회 )Permalink

```

``` c

#include <stdio.h>
#define MAX_SIZE 10
 
int isWhat[MAX_SIZE];
int point= -1; 
 
void into(int num) {
    if (point >= 10) printf("Full");
    isWhat[++point] = num;
}
 
int take() {
    if (isEmpty() == 1) printf("Empty");
    return isWhat[point--];
}
 
int isEmpty() {
    if (point == -1) return 1;
    return 0;
}
 
int isFull() {
    if (point == 10) return 1;
    return 0;
}
 
int main(int argc, char const *argv[]){
    int e;
    into(5);
    into(2);
    while(!isEmpty()){
        printf("%d", take());
        into(4); into(1); printf("%d", take()); 
        into(3); printf("%d", take()); printf("%d", take()); 
        into(6); printf("%d", take()); printf("%d", take()); 
    }
    return 0;
}




// c언어로 stack을 구현한 코드라고 보면 된다. 일반적으로 알고있는 stack의 push,pop,isEmpty, isFull을 생각하면 된다.
// 
// 
// 
// 
// 
// 
// 
// 
// 📌다음 코드는 선택정렬 구현에 관한 문제이다. 빈칸에 알맞는 연산자를 보기에서 골라 작성하시오. ( 23년 2회 )Permalink
```

``` c


#include
int main() {
    int E[] = {64, 25, 12, 22, 11};
    int n = sizeof(E) / sizeof(E[0]);
    int i = 0;
    do {
        int j = i + 1;
        do {
            if (E[i] (     ) E[j]) {
                int tmp = E[i];
                E[i] = E[j];
                E[j] = tmp;
            }
            j++;
        } while (j < n);
        i++;
    } while (i < n-1);
    for(int i=0; i<=4; i++)
        printf("%d ", E[i]);
}




// 그냥 직관적으로도 풀수있는 문제.








// 📌다음 C언어의 출력값을 작성하시오. ( 23년 1회 )Permalink

```

``` c

#include <stdio.h>
 
int main(){
    char a[] = "Art";
    char* p = NULL;
    p = a;
 
    printf("%s\n", a);
    printf("%c\n", *p);
    printf("%c\n", *a);
    printf("%s\n", p);
 
    for(int i = 0; a[i] != '\0'; i++)
    printf("%c", a[i]);
 
}












// 📌다음 C언어의 출력값을 작성하시오. ( 23년 1회 )Permalink


#include <stdio.h>
 
int main(){
 
    char* a = "qwer";
    char* b = "qwtety";
 
    for(int i = 0; a[i] != '\0' ; i++){
        for(int j = 0; b[j] != '\0'; j++){
            if(a[i] == b[j]) printf("%c", a[i]);
        }
    }
 
}







```

``` c




// 📌다음 아래 코드에서 이진수를 십진수로 변환하는 코드에 대해 괄호 (a) (b)의 적합한 답을 작성하시오. ( 23년 1회 )Permalink


#include <stdio.h>
 
int main() {
 
    int input = 101110;
    int di = 1;
    int sum = 0;
 
    while (1) {
 
        if (input == 0) break
        else {
 
          sum = sum + (input (a)(b)) * di;
             di = di * 2;
             input = input / 10;
 
        }
    }
 
    printf("%d", sum);
 
    return 0;
}


```


