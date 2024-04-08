package kimtaewoo.springwallet.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.Service.OauthService;
import kimtaewoo.springwallet.domain.GoogleOauthUserInfo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(MockitoExtension.class)
public class OauthServiceTest {
    @InjectMocks
    private OauthService oauthService;

    @Test
    void JsonMappingTest(){
        // given


        // when

        // then
        assertThat(1).isEqualTo(1);
    }
    @Test
    void loginTest(){
        // 1. code를 받고 이를 통해 id token을 가져온다.
//        String idToken = oauthService.getAccessToken(code);
        // 2. id 토큰의 payload를 가져와 이를 userInfo에 넣는다.
//        GoogleOauthUserInfo userInfo = oauthService.getUserInfo(idtoken);
        // 3. userInfo의 이메일과 이름을 db에 저장(회원가입 시에만 수행)

        // 4. userInfo의 이메일을 payload로 해서 access token과 refresh token을 발급(쿠키 저장)
    }
    @Test
    void decodePayloadTest(){
        // given
        String encodedPayload = "eyJ0ZXN0IjoidGVzdCJ9";
        String value = "{\"test\":\"test\"}";

        // when
        String decodedPayload = oauthService.decodePayload(encodedPayload);

        // then
        assertThat(decodedPayload).isEqualTo(value);
    }

    @Test
    void objectMapperTest() throws JsonProcessingException {
        // given
        String jsonString = "{\"azp\":\"azptest\",\"aud\": \"aud.googleusercontent.com\",\"sub\": \"105966501385063363190\",\"email\": \"test@gmail.com\",\"email_verified\": true,\"at_hash\": \"testhash\",\"name\": \"test\",\"picture\": \"https://link\",\"given_name\": \"t\",\"family_name\": \"est\",\"iat\": 1712498817,\"exp\": 1712502417}";

        // when
        GoogleOauthUserInfo userInfo = oauthService.getUserInfo(jsonString);

        // then
        assertThat(userInfo.getName()).isEqualTo("test");
    }


}
