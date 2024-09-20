package org.green.education.controller;

import org.green.core.constant.Constant;
import org.green.core.coreApi.CoreController;
import org.green.core.model.response.CoreResponse;
import org.green.education.model.response.EducationResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/education")
public class EducationController implements CoreController {


    @Override
    public CoreResponse create() {
        return null;
    }

    @Override
    public CoreResponse update(int id) {
        return null;
    }

    @Override
    public CoreResponse delete(int id) {
        return null;
    }

    @Override
    public CoreResponse getById(int id) {
        CoreResponse response = new CoreResponse();
        EducationResponse educationResponse = new EducationResponse();

        educationResponse.setId(1L);
        educationResponse.setName("Quan Ho Van");
        educationResponse.setDescription("Test");

        response.setCode(Constant.SUCCESS);
        response.setMessage(Constant.SUCCESS_MESSAGE);
        response.setData(educationResponse);

        return response;
    }
}
