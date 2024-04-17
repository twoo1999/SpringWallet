package kimtaewoo.springwallet.domain;


public class AccessTokenPayload {
    private String email;
    private String name;
    private int iat;

    public AccessTokenPayload(){}

    public AccessTokenPayload(String email, String name, int iat) {
        this.email = email;
        this.name = name;
        this.iat = iat;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIat() {
        return iat;
    }

    public void setIat(int iat) {
        this.iat = iat;
    }
}
