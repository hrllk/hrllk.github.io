---
 title: X509TrustManager
 categories:
    - CS
---


### overview
---
>  When building secure applications in Java, you’ll often encounter the `X509TrustManager` class. It’s a cornerstone of Java’s security infrastructure, responsible for verifying the authenticity of SSL/TLS certificates used to establish secure connections.  Without it, your application would be vulnerable to man-in-the-middle attacks.


Java Application에 보안할 때 자주 만나게되는 클래스,<br>
SSL 인증서 설정을 통해 안전한 연결을 설정하는데 사용됨<br>
하지만 인증서 신뢰 여부에 대한 책임이 필요함<br>



### X509TrustManager
--- 
> `X509TrustManager` is an interface defined in the Java Security API. It represents a trust store – a collection of certificates that the JVM uses to verify the identity of servers you connect to. It allows you to control how your application trusts certificates, enabling you to specify which certificates are acceptable and how to handle invalid or untrusted certificates.

Trust Store의미를 갖는 보안 인터페이스 <br>
Java Application(JVM)에서 요청을 보내고자하는 서버에 대해 검증을 진행하는 용도로 사용 <br>



### how does it work?
---


1. **`checkServerCertificate`**: 서버와 ssl handshake 시점에 호출되는 메소드로, 하기 내용들을 확인 가능
   - 인증서 유효성 체크( 만료되지 않았는지, 취소되지 않았는지,) <br>
   - 인증서 제목이 연결된 서버의 호스트네임과 일치하는지, <br>

2. **`checkClientCertificate`**: 클라이언트간 연계시 호출되는 메소드, 클라이언트간 SSL handshake 시점에 서로 인증서를 교환할 때 상대방의 인정서 검증을 허용

3. **`setTrustedCertStoreEntry`**: 신뢰하는 인증서를 trust store에 추가하는 용도로 사용

``` java 
public interface X509TrustManager extends TrustManager {
    /**
     * Given the partial or complete certificate chain provided by the
     * peer, build a certificate path to a trusted root and return if
     * it can be validated and is trusted for client SSL
     * authentication based on the authentication type.
     * <p>
     * The authentication type is determined by the actual certificate
     * used. For instance, if RSAPublicKey is used, the authType
     * should be "RSA". Checking is case-sensitive.
     *
     * @param chain the peer certificate chain
     * @param authType the authentication type based on the client certificate
     * @throws IllegalArgumentException if null or zero-length chain
     *         is passed in for the chain parameter or if null or zero-length
     *         string is passed in for the  authType parameter
     * @throws CertificateException if the certificate chain is not trusted
     *         by this TrustManager.
     */
    public void checkClientTrusted(X509Certificate[] chain, String authType)
        throws CertificateException;

    /**
     * Given the partial or complete certificate chain provided by the
     * peer, build a certificate path to a trusted root and return if
     * it can be validated and is trusted for server SSL
     * authentication based on the authentication type.
     * <p>
     * The authentication type is the key exchange algorithm portion
     * of the cipher suites represented as a String, such as "RSA",
     * "DHE_DSS". Note: for some exportable cipher suites, the key
     * exchange algorithm is determined at run time during the
     * handshake. For instance, for TLS_RSA_EXPORT_WITH_RC4_40_MD5,
     * the authType should be RSA_EXPORT when an ephemeral RSA key is
     * used for the key exchange, and RSA when the key from the server
     * certificate is used. Checking is case-sensitive.
     *
     * @param chain the peer certificate chain
     * @param authType the key exchange algorithm used
     * @throws IllegalArgumentException if null or zero-length chain
     *         is passed in for the chain parameter or if null or zero-length
     *         string is passed in for the  authType parameter
     * @throws CertificateException if the certificate chain is not trusted
     *         by this TrustManager.
     */
    public void checkServerTrusted(X509Certificate[] chain, String authType)
        throws CertificateException;

    /**
     * Return an array of certificate authority certificates
     * which are trusted for authenticating peers.
     *
     * @return a non-null (possibly empty) array of acceptable
     *          CA issuer certificates.
     */
    public X509Certificate[] getAcceptedIssuers();
}


```

### example
---

``` java
try {
    // 1. create a trust manager factory
    TrustManagerFactory trustManagerFactory = new TrustManagerFactory();
    TrustManager trustManager = new SelfSignedTrustManager(); // 2. create a custom trust manager
    trustManagerFactory.setTrustManagers(new TrustManager[]{trustManager}); // 3. set trust manager with custom manager

    // ...
} catch (Exception e) {

}
```


