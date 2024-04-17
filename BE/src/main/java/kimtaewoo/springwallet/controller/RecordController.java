package kimtaewoo.springwallet.controller;


import jakarta.servlet.http.HttpServletRequest;
import kimtaewoo.springwallet.Service.RecordService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.dto.CreateRecordReqDto;
import kimtaewoo.springwallet.dto.CreateRecordResDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    public ResponseEntity<String> join(AccessTokenPayload ap, @RequestBody CreateRecordReqDto record) {

        recordService.join(ap, record);
        return ResponseEntity.ok("ok");
    }
}
