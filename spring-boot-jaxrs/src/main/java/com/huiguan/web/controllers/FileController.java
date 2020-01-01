package com.huiguan.web.controllers;

import com.huiguan.web.dto.*;
import com.huiguan.web.service.AuthService;
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
    @Autowired
    private AuthService authService;
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
    public BaseResponse uploadFile(@HeaderParam("token") String token,UploadFileRequest uploadFileRequest){
        if (!authService.checkToken(token)) return new BaseResponse("Not authorised");
        return  fileService.uploadFile(uploadFileRequest);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/delete")
    public BaseResponse deleteFile(@HeaderParam("token") String token,DeleteFileRequest request){
        if (!authService.checkToken(token)) return new BaseResponse("Not authorised");
        return  fileService.deleteFile(request);
    }
}
