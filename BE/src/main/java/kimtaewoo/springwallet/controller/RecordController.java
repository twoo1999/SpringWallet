package kimtaewoo.springwallet.controller;


import kimtaewoo.springwallet.Service.RecordService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.dto.record.CreateRecordReqDto;
import kimtaewoo.springwallet.dto.record.CreateRecordResDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@Controller
public class RecordController {
        private final RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }


    @PostMapping("/api/record")
    @ResponseBody
    public ResponseEntity createRecord(AccessTokenPayload ap, @RequestBody CreateRecordReqDto record) {

        CreateRecordResDto r = recordService.save(ap, record);
        return ResponseEntity.ok(r);
    }

    @GetMapping("/api/record")
    @ResponseBody
    public List<Record> findRecordByUserId(AccessTokenPayload acp){
        return recordService.findByUserId(acp);
    }

    @PostMapping("/api/record/{id}")
    @ResponseBody
    public ResponseEntity updateRecord(@RequestBody CreateRecordReqDto record, @PathVariable("id") Long id){
        CreateRecordResDto createRecordResDto = recordService.updateRecord(record, id);
        return ResponseEntity.ok(createRecordResDto);
    }

    @DeleteMapping("/api/record/{id}")
    @ResponseBody
    public ResponseEntity deleteRecord(@PathVariable("id") Long id) {
        return recordService.deleteRecord(id);
    }

}
