package com.huiguan.web.controllers;

import com.huiguan.web.dto.BaseResponse;
import com.huiguan.web.dto.CreateNewResourceRequest;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.model.Article;
import com.huiguan.web.model.Resource;
import com.huiguan.web.service.ArticleService;
import com.huiguan.web.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;


@Path("huiguan")
public class HomeController extends Application {
    @Autowired
    private ResourceService resourceService;
    @Autowired
    ArticleService articleService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/resources/{id}")
    @Transactional
    public Response getResource(@PathParam("id") int id) throws ApiException {

        Resource resource = resourceService.findById(id).orElseThrow(() -> new ApiException("Resource not found"));
        return Response.status(Response.Status.OK).entity(resource).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/resources")
    @Transactional
    public Response createResource(CreateNewResourceRequest req) {
        Resource resource = new Resource(req.getUrl(), req.getType());
        int id = resourceService.addNewResource(resource);
        return Response.status(Response.Status.OK).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/articles/{id}")
    @Transactional
    public Response getArticle(@PathParam("id") int id) throws ApiException {

        Article article = articleService.findById(id).orElseThrow(() -> new ApiException("Resource not found"));
        return Response.status(Response.Status.OK).entity(article).build();
    }

}