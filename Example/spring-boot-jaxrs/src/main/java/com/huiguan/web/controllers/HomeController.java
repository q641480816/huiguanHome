package com.huiguan.web.controllers;

import com.huiguan.web.dto.*;
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

import java.util.Set;

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
    public GetResourceResponse getResource(@PathParam("id") int id) throws ApiException {
        logger.info("Retrieving resource info");
        GetResourceResponse res = resourceService.findById(id);
        return res;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/page/{section}/{pageNum}/{pageSize}")
    @Transactional
    public Set<GetArticleResponse> getArticleByPage(
            @PathParam("section") String section,
            @PathParam("pageNum") int pageNum,
            @PathParam("pageSize")int pageSize) throws ApiException {
        logger.info("Retrieving resource info");
        Set<GetArticleResponse> res = articleService.findArticlePageSortBySectionAndId(pageNum,pageSize,section);
        return res;
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
    public GetArticleResponse getArticle(@PathParam("id") int id) throws ApiException {
        logger.info("Retrieving article info");
        GetArticleResponse res = articleService.findById(id);
        return res;
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