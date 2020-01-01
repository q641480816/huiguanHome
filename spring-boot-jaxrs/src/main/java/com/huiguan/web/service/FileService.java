package com.huiguan.web.service;

import com.huiguan.web.controllers.EmailController;
import com.huiguan.web.dto.BaseResponse;
import com.huiguan.web.dto.DeleteFileRequest;
import com.huiguan.web.dto.UploadFileRequest;
import com.sun.tools.rngom.parse.host.Base;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.ws.rs.HeaderParam;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FileService {

    private static final Logger logger = LogManager.getLogger(FileService.class);
    @Value("${default.file.path:/var/www/html/download}")
    private String defaultPath;

    //Get all file under path
    public List<String> getPaths (){
        logger.info("Retrieving file under " + defaultPath);
        try (Stream<Path> walk = Files.walk(Paths.get(defaultPath))) {

            List<String> result = walk.filter(Files::isRegularFile)
                    .map(x -> x.toString()).collect(Collectors.toList());

            result.forEach(System.out::println);
            return result;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    public BaseResponse deleteFile(DeleteFileRequest request){
        String filePath =defaultPath+"/"+request.getName();
        logger.info("Checking file under " + filePath);
        File f = new File(filePath);
        if (!f.exists()) return  new BaseResponse("File does not exist");
        if (f.delete()) {
            logger.info("File is deleted");
            return new BaseResponse(200,true);
        }
        else {
            logger.info("File is not deleted");
            return new BaseResponse("File is not deleted successfully");
        }
    }

    public BaseResponse uploadFile(UploadFileRequest uploadFileRequest) {
        String filePath =defaultPath+"/"+uploadFileRequest.getName();
        logger.info("Checking file under " + filePath);
        File f = new File(filePath);
        if (f.exists()) return  new BaseResponse("File already exists");
        String contentString="";
        if (uploadFileRequest.getValue().contains(",")){
            contentString=uploadFileRequest.getValue().split(",")[1];
        }
        else{
            contentString = uploadFileRequest.getValue();
        }
        if (contentString==null||contentString.isEmpty()) {
            return new BaseResponse("Base64 string not found");
        }
        byte[] data = Base64.getDecoder().decode(contentString);
        logger.info("Outputting the file");
        try(

                OutputStream stream = new FileOutputStream(filePath);
        )
        {
            stream.write(data);
        }
        catch (Exception e)
        {
            logger.error("Couldn't write to file...");
            logger.error(e.getMessage());
            e.printStackTrace();
            return new BaseResponse("Conversion failed");
        }
        if (f.exists()){
            f.setExecutable(true);
            f.setReadable(true);
            f.setWritable(false);
        }
        return new BaseResponse(200,true);

    }

}
