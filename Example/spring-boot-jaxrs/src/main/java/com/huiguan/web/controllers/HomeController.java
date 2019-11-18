package com.huiguan.web.controllers;

import com.huiguan.web.dto.CreateNewArticleRequest;
import com.huiguan.web.dto.CreateNewResourceRequest;
import com.huiguan.web.dto.CreateNewSectionRequest;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.model.Article;
import com.huiguan.web.model.Resource;
import com.huiguan.web.model.Section;
import com.huiguan.web.service.ArticleService;
import com.huiguan.web.service.ConvertToEntityService;
import com.huiguan.web.service.ResourceService;
import com.huiguan.web.service.SectionService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
@Component
@Path("/list")
@Api(value = "/list",description ="123")
public class HomeController extends Application {
    private static final Logger logger = LogManager.getLogger(HomeController.class);
    @Autowired
    private ResourceService resourceService;
    @Autowired
    ArticleService articleService;
    @Autowired
    SectionService sectionService;
    @Autowired
    ConvertToEntityService convertToEntityService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/resources/{id}")
    @Transactional
    public Response getResource(@PathParam("id") int id) throws ApiException {
        logger.info("Retrieving resource info");
        Resource resource = resourceService.findById(id).orElseThrow(() -> new ApiException("Resource not found"));
        return Response.status(Response.Status.OK).entity(resource).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/resources")
    @Transactional
    public Response createResource(CreateNewResourceRequest req) {
        logger.info("Creating new resources");
        Resource resource = convertToEntityService.convertToResourceEntity(req);
        int id = resourceService.addNewResource(resource);
        return Response.status(Response.Status.OK).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/articles")
    @Transactional
    public Response createArticle(CreateNewArticleRequest req) {
        logger.info("Creating new articles");
        Article article = convertToEntityService.convertToArticleEntity(req);
        int id = articleService.addNewArticle(article);
        return Response.status(Response.Status.OK).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/sections")
    @Transactional
    public Response createSection(CreateNewSectionRequest req) {
        logger.info("Creating new sections");
        Section section = convertToEntityService.convertToSectionEntity(req);
        int id = sectionService.addNewSection(section);
        return Response.status(Response.Status.OK).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/articles/{id}")
    @ApiOperation(value = "Finds an article with Id")
    @Transactional
    public Response getArticle(@PathParam("id") int id) throws ApiException {
        logger.info("Retrieving article info");
        Article article = articleService.findById(id).orElseThrow(() -> new ApiException("Resource not found"));
        return Response.status(Response.Status.OK).entity(article).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/sections/{id}")
    @Transactional
    public Response getSection(@PathParam("id") int id) throws ApiException {
        logger.info("Retrieving section info");
        Section article = sectionService.findById(id).orElseThrow(() -> new ApiException("Resource not found"));
        return Response.status(Response.Status.OK).entity(article).build();
    }

}