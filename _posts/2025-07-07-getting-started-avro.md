---
title: Getting Started Avro
categories:
   - 
toc: true
toc_label: "Getting Started Avro"
 published: false
---

<!-- TODO:  -->

### Overview 

> Data serialization is a technique of converting data into binary or text format. There are multiple systems available for this purpose. Apache Avro is one of those data serialization systems.
Avro is a language independent, schema-based data serialization library. It uses a schema to perform serialization and deserialization. Moreover, Avro uses a JSON format to specify the data structure which makes it more powerful.


Avro == 데이터 직렬 라이브러리 (to binary or text)

데이터 직렬화 기술
데이터 변환 binary or text 

언어에 비종속적,
데이터 스키마기반 직렬화 라이브러리
스키마 데이터를 직렬화, 역직렬화하기 위한 용도로 사용, 
더불어 Json format을 사용

Avro == 라이브러리
스키마 데이터를 직렬화 혹은 역직렬화하기 위한 용도로 사용하며,
데이터를 변경으로 


### What is Avro
Avro is a language-independent serialization library. To do this Avro uses a schema which is one of the core components. It stores the schema in a file for further data processing.

Avro is the best fit for Big Data processing. It’s quite popular in the Hadoop and Kafka world for its faster processing.

Avro creates a data file where it keeps data along with schema in its metadata section. Above all, it provides a rich data structure which makes it more popular than other similar solutions.

To use Avro for serialization, we need to follow the steps mentioned below.


빅데이터 변환에 적합
하둡이나, 카프카 월드에서 유명

Avro는 언어에 종속적이지 않은 직렬화 라이브러리이며,
핵심 구성요소로 스키마 개념이 존재함
데이터를 처리할 때 스키마를 파일에 저장함


빅데이터 처리에 적합하며 Kafka or Hadoop 생태계에서 인기있음



동작방식: 
메탕데이터 섹션에 스키마와 함께 데이터를 보관하는 데이터 파일을 생성하고,

Avro는 언어 독립적인 직렬화 라이브러리입니다. 이를 위해 Avro는 핵심 구성 요소 중 하나인 스키마를 사용합니다. Avro는 추가 데이터 처리를 위해 스키마를 파일에 저장합니다.

Avro는 빅데이터 처리에 가장 적합합니다. 더 빠른 처리 속도로 인해 Hadoop 및 Kafka 생태계에서 매우 인기가 있습니다.

Avro는 메타데이터 섹션에 스키마와 함께 데이터를 보관하는 데이터 파일을 생성합니다. 무엇보다도 풍부한 데이터 구조를 제공하여 다른 유사한 솔루션보다 더 인기를 얻고 있습니다.

Avro를 직렬화에 사용하려면 아래 언급된 단계를 따라야 합니다.



### Web Application 흐름





### Problem Statement 

Let’s start with defining a class called AvroHttRequest that we’ll use for our examples. The class contains primitive as well as complex type attributes:

``` java
class AvroHttpRequest {
    
    private long requestTime;
    private ClientIdentifier clientIdentifier;
    private List<String> employeeNames;
    private Active active;
}
 ```
Here, requestTime is a primitive value. ClientIdentifier is another class which represents a complex type. We also have employeeNames which is again a complex type. Active is an enum to describe whether the given list of employees is active or not.

Our objective is to serialize and de-serialize the AvroHttRequest class using Apache Avro.

### 한국어 번역

예제에서 사용할 `AvroHttpRequest`라는 클래스를 정의하는 것부터 시작하겠습니다. 이 클래스에는 기본 타입과 복합 타입 속성이 모두 포함됩니다:

```java
class AvroHttpRequest {
    
    private long requestTime;
    private ClientIdentifier clientIdentifier;
    private List<String> employeeNames;
    private Active active;
}
```

여기서 `requestTime`은 기본 값입니다. `ClientIdentifier`는 복합 타입을 나타내는 또 다른 클래스입니다. `employeeNames`도 복합 타입이며, `Active`는 주어진 직원 목록이 활성 상태인지 아닌지를 설명하는 열거형입니다.

우리의 목표는 Apache Avro를 사용하여 `AvroHttpRequest` 클래스를 직렬화하고 역직렬화하는 것입니다.




### Avro Data Types
Before proceeding further, let’s discuss the data types supported by Avro.

Avro supports two types of data:

Primitive type: Avro supports all the primitive types. We use primitive type name to define a type of a given field. For example, a value which holds a String should be declared as {“type”: “string”} in the schema
Complex type: Avro supports six kinds of complex types: records, enums, arrays, maps, unions and fixed
For example, in our problem statement, ClientIdentifier is a record.

In that case schema for ClientIdentifier should look like:

{
   "type":"record",
   "name":"ClientIdentifier",
   "namespace":"com.baeldung.avro.model",
   "fields":[
      {
         "name":"hostName",
         "type":"string"
      },
      {
         "name":"ipAddress",
         "type":"string"
      }
   ]
}

### 한국어 번역

### Avro 데이터 타입
Avro는 두가지 타입의 데이터를 지원함 (기본형 Primitive or 복합형 Complex)
기본형: String, int, boolean ..
복합형: records, enums, arrays, maps, union ..
레코드 == 아래예제에서 "ClientIdentifier"


```json
{
   "type":"record",
   "name":"ClientIdentifier",
   "namespace":"com.baeldung.avro.model",
   "fields":[
      {
         "name":"hostName",
         "type":"string"
      },
      {
         "name":"ipAddress",
         "type":"string"
      }
   ]
}
```


### Using Avro
To start with, let’s add the Maven dependencies we’ll need to our pom.xml file.

We should include the following dependencies:

Apache Avro –  core components
Compiler –  Apache Avro Compilers for Avro IDL and Avro Specific Java APIT
Tools – which includes Apache Avro command line tools and utilities
Apache Avro Maven Plugin for Maven projects
We’re using version 1.8.2 for this tutorial.

However, it’s always advised to find the latest version on Maven Central:

<dependency>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro-compiler</artifactId>
    <version>1.8.2</version>
</dependency>
<dependency>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro-maven-plugin</artifactId>
    <version>1.8.2</version>
</dependency>


### Quick Start (Dependencies)

- **Apache Avro**: core
- **Compiler**
- **Tools**: core
- **Apache Avro**: core
시작하기 전에, `pom.xml` 파일에 필요한 Maven 의존성을 추가해 봅시다.

다음 의존성들을 포함해야 합니다:

*   **Apache Avro** – 핵심 구성 요소
*   **Compiler** – Avro IDL 및 Avro 특정 Java API를 위한 Apache Avro 컴파일러
*   **Tools** – Apache Avro 명령줄 도구 및 유틸리티 포함
*   **Apache Avro Maven Plugin** – Maven 프로젝트용 플러그인

이 튜토리얼에서는 버전 1.8.2를 사용하고 있습니다.

하지만, 항상 Maven Central에서 최신 버전을 찾는 것이 좋습니다:

```xml
<dependency>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro-compiler</artifactId>
    <version>1.8.2</version>
</dependency>
<dependency>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro-maven-plugin</artifactId>
    <version>1.8.2</version>
</dependency>
```

Maven 의존성을 추가한 후, 다음 단계는 다음과 같습니다:

*   스키마 생성
*   프로그램에서 스키마 읽기
*   Avro를 사용하여 데이터 직렬화
*   마지막으로 데이터 역직렬화




6. Schema Creation
Avro describes its schema using a JSON format. There are mainly four attributes for a given Avro schema:

type- which describes the type of schema whether its complex type or primitive value
namespace- which describes the namespace where the given schema belongs to
name – the name of the schema
fields- which tells about the fields associated with a given schema. Fields can be of primitive as well as complex type.
One way of creating the schema is to write the JSON representation, as we saw in the previous sections.

We can also create a schema using SchemaBuilder which is undeniably a better and efficient way to create it.

### 한국어 번역

### 6. 스키마 생성
JSON을 사용해 스키마를 설명(정의?)
대표적으로 스키마에 4가지 속성이 존재 

Avro는 JSON 형식을 사용하여 스키마를 설명합니다. 주어진 Avro 스키마에는 주로 네 가지 속성이 있습니다:

* **type**: 스키마의 타입 기본 or 복합
* **namespace**: 스키마가 속하는 네임스페이스
* **name**: 스키마명
* **fields**: 스키마와 관련된 필드에 대한 설명 명시

스키마를 생성하는 한 가지 방법은 이전 섹션에서 보았듯이 JSON 표현을 작성하는 것입니다.


또한 SchemaBuilder를 사용하여 스키마를 생성할 수도 있으며, 이는 스키마를 생성하는 더 좋고 효율적인 방법임이 분명합니다.





### 6.1. SchemaBuilder Utility
The class org.apache.avro.SchemaBuilder is useful for creating the schema.

First of all, let’s create the schema for ClientIdentifier:

Schema clientIdentifier = SchemaBuilder.record("ClientIdentifier")
  .namespace("com.baeldung.avro.model")
  .fields()
  .requiredString("hostName")
  .requiredString("ipAddress")
  .endRecord();

Now, let’s use this for creating an avroHttpRequest schema:

Schema avroHttpRequest = SchemaBuilder.record("AvroHttpRequest")
  .namespace("com.baeldung.avro.model")
  .fields().requiredLong("requestTime")
  .name("clientIdentifier")
    .type(clientIdentifier)
    .noDefault()
  .name("employeeNames")
    .type()
    .array()
    .items()
    .stringType()
    .arrayDefault(null)
  .name("active")
    .type()
    .enumeration("Active")
    .symbols("YES","NO")
    .noDefault()
  .endRecord();

It’s important to note here that we’ve assigned clientIdentifier as the type for the clientIdentifier field. In this case, clientIdentifier used to define type is the same schema we created before.


### 6.1. SchemaBuilder 유틸리티
`org.apache.avro.SchemaBuilder` 클래스는 스키마를 생성하는 데 유용합니다.

먼저, `ClientIdentifier`에 대한 스키마를 생성해 봅시다:

```java
Schema clientIdentifier = SchemaBuilder.record("ClientIdentifier")
  .namespace("com.baeldung.avro.model")
  .fields()
  .requiredString("hostName")
  .requiredString("ipAddress")
  .endRecord();
```

이제 이를 사용하여 `avroHttpRequest` 스키마를 생성해 봅시다:

```java
Schema avroHttpRequest = SchemaBuilder.record("AvroHttpRequest")
  .namespace("com.baeldung.avro.model")
  .fields().requiredLong("requestTime")
  .name("clientIdentifier")
    .type(clientIdentifier)
    .noDefault()
  .name("employeeNames")
    .type()
    .array()
    .items()
    .stringType()
    .arrayDefault(null)
  .name("active")
    .type()
    .enumeration("Active")
    .symbols("YES","NO")
    .noDefault()
  .endRecord();
```

여기서 `clientIdentifier` 필드의 타입으로 `clientIdentifier`를 할당했다는 점에 유의하는 것이 중요합니다. 이 경우, 타입을 정의하는 데 사용된 `clientIdentifier`는 이전에 생성한 스키마와 동일합니다.



### 6.2. Using the Schema Object
As we have seen, we can utilize SchemaBuilder‘s fluent API to generate an org.apache.avro.Schema object declaratively. After that, we can apply the toString() method to get the JSON structure of Schema.

Let’s verify that the Schema instance we created for the ClientIdentifier record generates the correct JSON. We can use a dedicated assertion library like JsonUnit for this:

@Test
void whenCallingSchemaToString_thenReturnJsonAvroSchema() {
    Schema clientIdSchema = clientIdentifierSchema();

    assertThatJson(clientIdSchema.toString())
      .isEqualTo("""
          {
             "type":"record",
             "name":"ClientIdentifier",
             "namespace":"com.baeldung.avro.model",
             "fields":[
                {
                   "name":"hostName",
                   "type":"string"
                },
                {
                   "name":"ipAddress",
                   "type":"string"
                }
             ]
          }
          """);
}

Needless to say, we can do the same to generate the Avro schema for the AvroHttpRequest record.

Then, we can save these generated schemas as .avsc files under src/main/resources. This allows us to use the files with avro-maven-plugin plugins later.

### 한국어 번역

### 6.2. 스키마 객체 사용하기
우리가 보았듯이, `SchemaBuilder`의 플루언트(fluent) API를 활용하여 `org.apache.avro.Schema` 객체를 선언적으로 생성할 수 있습니다. 그 후, `toString()` 메서드를 적용하여 스키마의 JSON 구조를 얻을 수 있습니다.

`ClientIdentifier` 레코드를 위해 생성한 스키마 인스턴스가 올바른 JSON을 생성하는지 확인해 봅시다. 이를 위해 JsonUnit과 같은 전용 어설션 라이브러리를 사용할 수 있습니다:

```java
@Test
void whenCallingSchemaToString_thenReturnJsonAvroSchema() {
    Schema clientIdSchema = clientIdentifierSchema();

    assertThatJson(clientIdSchema.toString())
      .isEqualTo("""
          {
             "type":"record",
             "name":"ClientIdentifier",
             "namespace":"com.baeldung.avro.model",
             "fields":[
                {
                   "name":"hostName",
                   "type":"string"
                },
                {
                   "name":"ipAddress",
                   "type":"string"
                }
             ]
          }
          """);
}
```

말할 필요도 없이, `AvroHttpRequest` 레코드에 대한 Avro 스키마를 생성하기 위해 동일한 작업을 수행할 수 있습니다.

그런 다음, 이렇게 생성된 스키마를 `src/main/resources` 아래에 `.avsc` 파일로 저장할 수 있습니다. 이렇게 하면 나중에 `avro-maven-plugin` 플러그인과 함께 파일을 사용할 수 있습니다.


### 7. Reading the Schema
We can use the Schema instance to create org.apache.avro.generic.GenericRecord objects. This GenericRecord API allows us to store data in a schema-based format, without needing a predefined Java class.

However, the more popular approach is to use the .avro schema files to create Avro classes. Once the classes are created, we can use them to serialize and deserialize objects. There are two ways to create Avro classes:

Programmatically generating Avro classes: Classes can be generated using SchemaCompiler. There are a couple of APIs which we can use for generating Java classes. We can find the code for generation classes on GitHub.
Using a Maven plugin to generate classes
We can use the avro-maven-plugin to generate the Java classes based on the .avsc files. Let’s include the plugin in our pom.xml:

<plugin>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro-maven-plugin</artifactId>
    <version>${avro.version}</version>
        <executions>
            <execution>
                <id>schemas</id>
                <phase>generate-sources</phase>
                <goals>
                    <goal>schema</goal>
                    <goal>protocol</goal>
                    <goal>idl-protocol</goal>
                </goals>
                <configuration>
                    <sourceDirectory>${project.basedir}/src/main/resources/</sourceDirectory>
                    <outputDirectory>${project.basedir}/src/main/java/</outputDirectory>
                </configuration>
            </execution>
        </executions>
</plugin>

Now, we can simply run “mvn clean install” and the plugin generates the Java classes based on our .avsc files, during the generate-sources phase.

### 한국어 번역

### 7. 스키마 읽기
우리는 `Schema` 인스턴스를 사용하여 `org.apache.avro.generic.GenericRecord` 객체를 생성할 수 있습니다. 이 `GenericRecord` API는 미리 정의된 Java 클래스 없이도 스키마 기반 형식으로 데이터를 저장할 수 있도록 합니다.

그러나 더 일반적인 접근 방식은 `.avro` 스키마 파일을 사용하여 Avro 클래스를 생성하는 것입니다. 클래스가 생성되면 이를 사용하여 객체를 직렬화하고 역직렬화할 수 있습니다. Avro 클래스를 생성하는 두 가지 방법이 있습니다:

*   **프로그래밍 방식으로 Avro 클래스 생성**: `SchemaCompiler`를 사용하여 클래스를 생성할 수 있습니다. Java 클래스 생성을 위해 사용할 수 있는 몇 가지 API가 있습니다. 클래스 생성 코드는 GitHub에서 찾을 수 있습니다.
*   **Maven 플러그인을 사용하여 클래스 생성**

`avro-maven-plugin`을 사용하여 `.avsc` 파일에 기반하여 Java 클래스를 생성할 수 있습니다. `pom.xml`에 플러그인을 포함해 봅시다:

```xml
<plugin>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro-maven-plugin</artifactId>
    <version>${avro.version}</version>
        <executions>
            <execution>
                <id>schemas</id>
                <phase>generate-sources</phase>
                <goals>
                    <goal>schema</goal>
                    <goal>protocol</goal>
                    <goal>idl-protocol</goal>
                </goals>
                <configuration>
                    <sourceDirectory>${project.basedir}/src/main/resources/</sourceDirectory>
                    <outputDirectory>${project.basedir}/src/main/java/</outputDirectory>
                </configuration>
            </execution>
        </executions>
</plugin>
```

이제 간단히 "mvn clean install"을 실행하면 플러그인이 `generate-sources` 단계 동안 `.avsc` 파일에 기반하여 Java 클래스를 생성합니다.




``` java 

public byte[] serializeAvroHttpRequestJSON(
  AvroHttpRequest request) { // Method to serialize an AvroHttpRequest object to a JSON byte array
 
    // Create a DatumWriter for AvroHttpRequest, which serializes Avro specific records
    DatumWriter<AvroHttpRequest> writer = new SpecificDatumWriter<>(
      AvroHttpRequest.class);
    byte[] data = new byte[0]; // Initialize an empty byte array to hold the serialized data
    ByteArrayOutputStream stream = new ByteArrayOutputStream(); // Create a byte array output stream to write serialized data
    Encoder jsonEncoder = null; // Declare an Avro Encoder for JSON format
    try {
        // Get a JSON encoder from the EncoderFactory, using the schema of AvroHttpRequest and the output stream
        jsonEncoder = EncoderFactory.get().jsonEncoder(AvroHttpRequest.getClassSchema(), stream);
        writer.write(request, jsonEncoder); // Write the AvroHttpRequest object to the encoder
        jsonEncoder.flush(); // Flush the encoder to ensure all data is written to the stream
        data = stream.toByteArray(); // Get the serialized data as a byte array from the stream
    } catch (IOException e) { // Catch any IOException that occurs during serialization
        // Log an error if serialization fails
        logger.error("Serialization error:" + e.getMessage());
    }
    return data; // Return the serialized byte array
}
```



### Why?


### References
[https://www.baeldung.com/java-apache-avro](https://www.baeldung.com/java-apache-avro)
