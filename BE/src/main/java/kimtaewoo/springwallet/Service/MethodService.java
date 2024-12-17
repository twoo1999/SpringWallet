package kimtaewoo.springwallet.Service;


import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.Method;
import kimtaewoo.springwallet.domain.enumClass.ActiveStatus;
import kimtaewoo.springwallet.dto.method.CreateMethodReqDto;
import kimtaewoo.springwallet.dto.method.DeleteMethodReqDto;
import kimtaewoo.springwallet.repository.MethodRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class MethodService {
    private final MethodRepository methodRepository;
    public MethodService(MethodRepository methodRepository) {
        this.methodRepository = methodRepository;
    }
    public List<Method> getCategoryByMemberId(AccessTokenPayload atp){
        UUID id = atp.getId();
        return methodRepository.findByMemberId(id);
    }

    public Method save(AccessTokenPayload atp, String name){
        UUID id = atp.getId();
        Method newMethod = Method.builder()
                .method_name(name)
                .member_id(id)
                .build();

        return methodRepository.save(newMethod);
    }

    public List<Method> saveAll(AccessTokenPayload atp, CreateMethodReqDto createMethodReqDto){
        UUID id = atp.getId();
        List<Method> methods = new ArrayList<>();
        String[] names = createMethodReqDto.getName();
        for (String n : names) {
            Method newMethod = Method.builder()
                    .method_name(n)
                    .member_id(id)
                    .status(ActiveStatus.ACTIVE)
                    .build();

            methods.add(newMethod);
        }




        return methodRepository.saveAll(methods);
    }


    public List<Long> deleteByIdAll(AccessTokenPayload atp, DeleteMethodReqDto deleteMethodReqDto) {
        UUID id = atp.getId();
        return methodRepository.deleteByIdAll(deleteMethodReqDto.getIds(), id);
    }

}
