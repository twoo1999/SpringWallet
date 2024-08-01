package kimtaewoo.springwallet.oauth.userInfo;

import java.util.Map;
import java.util.Objects;

public class GoogleOAuthUserInfo extends OAuth2UserInfo{
    public GoogleOAuthUserInfo(Map<String, Object> attributes){
        super(attributes);
    }

    @Override
    public String getId(){
        return (String) attributes.get("sub");
    }

    @Override
    public String getEmail(){
        return (String) attributes.get("email");
    }

    @Override
    public String getName(){
        return (String) attributes.get("name");
    }
}
