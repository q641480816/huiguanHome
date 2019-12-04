package com.huiguan.web.controllers;

import com.huiguan.web.dto.BaseResponse;
import com.huiguan.web.dto.CreateEmailTemplate;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.service.EmailService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import java.sql.Timestamp;

@Component
@Path("/email")
public class EmailController extends Application {
    private static final Logger logger = LogManager.getLogger(EmailController.class);

    @Autowired
    EmailService emailService;


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/")
    @Transactional
    public BaseResponse sendEmail(CreateEmailTemplate req,@HeaderParam("token") String token) throws ApiException {
        if (token==null||token.isEmpty()||!token.equals("admin_jinjiang")) return new BaseResponse("Not authorised");
        logger.info("Sending the email");
        req.setCreationTime(new Timestamp(System.currentTimeMillis()));
        BaseResponse response = emailService.send(req);

        return response;
    }

}
