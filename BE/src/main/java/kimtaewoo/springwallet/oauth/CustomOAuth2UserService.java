package kimtaewoo.springwallet.oauth;


import kimtaewoo.springwallet.domain.Member;
import kimtaewoo.springwallet.domain.enumClass.SocialType;
import kimtaewoo.springwallet.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest req) throws OAuth2AuthenticationException{
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(req);

        String registrationId = req.getClientRegistration().getRegistrationId();
        SocialType socialType = getSocialType(registrationId);
        String userNameAttributeName = req.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        Map<String, Object> attribute = oAuth2User.getAttributes();

        OAuthAttributes extractAttribute = OAuthAttributes.of(socialType, userNameAttributeName, attribute);

        Member m = getMember(extractAttribute, socialType);

        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(m.getRole().getKey())),
                attribute,
                extractAttribute.getNameAttributeKey(),
                m.getEmail(),
                m.getName(),
                m.getRole()
        );


    }

    private Member getMember(OAuthAttributes attributes, SocialType socialType){
        Member m = memberRepository.findByEmail(attributes.getOAuth2UserInfo().getEmail()).orElse(null);

        if(m == null){
            return saveMember(attributes, socialType);
        }
        return m;
    }
    private Member saveMember(OAuthAttributes attributes, SocialType socialType){
        Member m = attributes.toEntity(socialType, attributes.getOAuth2UserInfo());
        return memberRepository.save(m);
    }
    private SocialType getSocialType(String id){
        if(id.equals("NAVER")){
            return SocialType.NAVER;
        }

        if(id.equals("KAKAO")){
            return SocialType.NAVER;
        }

        return SocialType.GOOGLE;
    }
}
