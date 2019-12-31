package com.huiguan.web.controllers;

import com.huiguan.web.dto.BaseResponse;
import com.huiguan.web.dto.GetPathResponse;
import com.huiguan.web.dto.UploadFileRequest;
import com.huiguan.web.dto.UploadFileResponse;
import com.huiguan.web.service.FileService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Component
@Path("/file")
public class FileController {
    private static final Logger logger = LogManager.getLogger(GetPathResponse.class);

    @Autowired
    private FileService fileService;

    @GET
    @Path("/path")
    @Produces(MediaType.APPLICATION_JSON)
    public GetPathResponse getPaths(){
        logger.info("Retrieving all file path");
        List<String> result = fileService.getPaths();
        return new GetPathResponse(result);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/upload")
    public BaseResponse uploadFile(UploadFileRequest uploadFileRequest){
        return  fileService.uploadFile(uploadFileRequest);
    }
}
