package kimtaewoo.springwallet.oauth;

import kimtaewoo.springwallet.domain.Member;
import kimtaewoo.springwallet.domain.Role;
import kimtaewoo.springwallet.domain.SocialType;
import kimtaewoo.springwallet.oauth.userInfo.GoogleOAuthUserInfo;
import kimtaewoo.springwallet.oauth.userInfo.OAuth2UserInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {
    private String nameAttributeKey;
    private OAuth2UserInfo oAuth2UserInfo;

    @Builder
    private OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oAuth2UserInfo){
        this.nameAttributeKey = nameAttributeKey;
        this.oAuth2UserInfo = oAuth2UserInfo;
    }

    public static OAuthAttributes of(SocialType socialType, String userNameAttributeName, Map<String, Object> attributes){
//        if(socialType == SocialType.GOOGLE){
//            return ofGoogle(userNameAttributeName, attributes);
//        }

        return ofGoogle(userNameAttributeName, attributes);
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes){
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oAuth2UserInfo(new GoogleOAuthUserInfo(attributes))
                .build();
    }

    public Member toEntity(SocialType socialType, OAuth2UserInfo oAuth2UserInfo){
        return Member.builder()
                .socialtype(socialType)
                .email(oAuth2UserInfo.getEmail())
                .name(oAuth2UserInfo.getName())
                .role(Role.USER)
                .build();

    }
}
