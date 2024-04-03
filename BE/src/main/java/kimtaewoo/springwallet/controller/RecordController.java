package kimtaewoo.springwallet.controller;


import kimtaewoo.springwallet.Service.RecordService;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.dto.CreateRecordReqDto;
import kimtaewoo.springwallet.dto.CreateRecordResDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RecordController {
    private final RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @PostMapping("record")
    @ResponseBody
    public CreateRecordResDto join(@RequestBody Record record) {
        CreateRecordResDto re = new CreateRecordResDto();
        Long id = recordService.join(record);
        re.setId(id);
        return re;
    }
}
