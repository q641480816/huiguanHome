package com.huiguan.web.controllers;

import com.huiguan.web.dto.BaseResponse;
import com.huiguan.web.dto.CreateNewResourceRequest;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.model.Article;
import com.huiguan.web.model.Resource;
import com.huiguan.web.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Path("huiguan")
public class HomeController extends Application {
    @Autowired
    private ResourceService resourceService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/resources/{id}")
    public Response getResource(@PathParam("id") int id) throws ApiException {

        Resource resource = resourceService.findById(id).orElseThrow(() -> new ApiException("Resource not found"));
        return Response.status(Response.Status.OK).entity(resource).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/resources")
    public Response createResource(CreateNewResourceRequest req) {
        Resource resource = new Resource(req.getUrl(), req.getType());

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Article article = new Article("222",timestamp);
        resource.getArticles().add(article);
        int id = resourceService.addNewResource(resource);
        return Response.status(Response.Status.OK).entity(new BaseResponse(200,true)).build();
    }

}