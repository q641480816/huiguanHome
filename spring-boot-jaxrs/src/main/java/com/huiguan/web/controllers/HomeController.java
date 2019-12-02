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
import com.sun.tools.rngom.parse.host.Base;
import io.swagger.annotations.ApiResponse;
import lombok.experimental.Delegate;
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

import java.sql.Timestamp;
import java.util.Set;

@Component
@Path("/list")
@Api(value = "/list", description = "123")
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
    @ApiOperation("Get a operation")
    @Transactional
    public GetResourceResponse getResource(@PathParam("id") int id) throws ApiException {
        logger.info("Retrieving resource info");
        GetResourceResponse res = resourceService.findById(id);
        return res;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/page/{sectionId}/{pageNum}/{pageSize}")
    @ApiOperation("Get a page")
    @Transactional
    public GetPageResponse getArticleByPage(
            @PathParam("sectionId") int sectionId,
            @PathParam("pageNum") int pageNum,
            @PathParam("pageSize") int pageSize) throws ApiException {
        logger.info("Retrieving page info");
        GetPageResponse response = new GetPageResponse();
        Set<GetArticleResponse> articles = articleService.findArticlePageSortBySectionAndId(pageNum, pageSize, sectionId);
        response.setSectionId(sectionId);
        response.setArticleList(articles);
        response.setArticleSize(articleService.countBySection(sectionId));
        response.setSuccess(true);
        response.setHttpStatus(200);
        return response;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/short/page/{sectionId}/{pageNum}/{pageSize}")
    @ApiOperation("Get a page")
    @Transactional
    public GetShortPageResponse getShortArticleByPage(
            @PathParam("sectionId") int sectionId,
            @PathParam("pageNum") int pageNum,
            @PathParam("pageSize") int pageSize) throws ApiException {
        logger.info("Retrieving page info");
        GetShortPageResponse response = new GetShortPageResponse();
        Set<GetShortArticleResponse> articles = articleService.findShortArticlePageSortBySectionAndId(pageNum, pageSize, sectionId);
        response.setSectionId(sectionId);
        response.setArticleList(articles);
        response.setArticleSize(articleService.countBySection(sectionId));
        response.setSuccess(true);
        response.setHttpStatus(200);
        return response;
    }



    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/resources")
    @ApiOperation("Create a promotion")
    @Transactional
    public BaseResponse createResource(CreateNewResourceRequest req) {
        logger.info("Creating new resources");
        Resource resource = convertToEntityService.convertToResourceEntity(req);
        int id = resourceService.addNewResource(resource);
        CreateResponse response = new CreateResponse();
        if (id > 0) {
            response.setHttpStatus(200);
            response.setSuccess(true);
            response.setId(id);
        } else {
            response.setHttpStatus(400);
            response.setErrorMessage("Not created successfully");
        }
        return response;
    }


    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("articles/{id}")
    @ApiOperation("Update a promotion")
    @Transactional
    public BaseResponse updateArticle(@PathParam("id") int id,CreateNewArticleRequest req){
        logger.info("Updating an article");
        Article article = convertToEntityService.convertToArticleEntity(req);
        if (article==null) return new CreateResponse("Converting to DTO fails");
        article.setCreationTime(new Timestamp(System.currentTimeMillis()));
        int articleId = articleService.edit(id, article);
        UpdateResponse response = new UpdateResponse();
        if (articleId == id && id > 0){
            response.setHttpStatus(200);
            response.setSuccess(true);
            response.setId(id);
        }else{
            response.setHttpStatus(400);
            response.setErrorMessage("Not created successfully");
        }
        return response;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/articles")
    @ApiOperation("Create a promotion")
    @Transactional
    public BaseResponse createArticle(CreateNewArticleRequest req) {
        logger.info("Creating new articles");
        Article article = convertToEntityService.convertToArticleEntity(req);
        if (article==null) return new CreateResponse("Converting to DTO fails");
        article.setCreationTime(new Timestamp(System.currentTimeMillis()));
        int id = articleService.addNewArticle(article);
        CreateResponse response = new CreateResponse();
        if (id > 0) {
            response.setHttpStatus(200);
            response.setSuccess(true);
            response.setId(id);
        } else {
            response.setHttpStatus(400);
            response.setErrorMessage("Not created successfully");
        }
        return response;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/sections")
    @ApiOperation("Create a section")
    @Transactional
    public BaseResponse createSection(CreateNewSectionRequest req) {
        logger.info("Creating new sections");
        Section section = convertToEntityService.convertToSectionEntity(req);
        int id = sectionService.addNewSection(section);
        CreateResponse response = new CreateResponse();
        if (id > 0) {
            response.setHttpStatus(200);
            response.setSuccess(true);
            response.setId(id);
        } else {
            response.setHttpStatus(400);
            response.setErrorMessage("Not created successfully");
        }
        return response;
    }


    @GET
    @ApiResponse(code =200, message = "success")
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/articles/{id}")
    @ApiOperation("Get an article")
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
    @ApiOperation("Get a section")
    public Response getSection(@PathParam("id") int id) throws ApiException {
        logger.info("Retrieving section info");
        Section article = sectionService.findById(id).orElseThrow(() -> new ApiException("Section not found"));
        return Response.status(Response.Status.OK).entity(article).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/latest")
    @Transactional
    @ApiOperation("Get latest articles")
    public GetPageResponse getLatestArticles() throws ApiException {
        logger.info("Retrieving latest 5 articles");
        Set<GetArticleResponse> articles = articleService.findLatestArticles(4,12);
        GetPageResponse res = new GetPageResponse();
        res.setSuccess(true);
        res.setHttpStatus(200);
        res.setArticleList(articles);
        return res;
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/latest/{start}/{end}")
    @Transactional
    @ApiOperation("Get latest articles")
    public GetPageResponse getLatestArticlesByRange(@PathParam("start") int start,  @PathParam("end") int end) throws ApiException {
        logger.info("Retrieving latest 5 articles");
        Set<GetArticleResponse> articles = articleService.findLatestArticles(start, end);
        GetPageResponse res = new GetPageResponse();
        res.setSuccess(true);
        res.setHttpStatus(200);
        res.setArticleList(articles);
        return res;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/short/latest/{start}/{end}")
    @Transactional
    @ApiOperation("Get latest articles")
    public GetShortPageResponse getLatestShortArticles(@PathParam("start") int start,  @PathParam("end") int end) throws ApiException {
        logger.info("Retrieving latest 5 articles");
        Set<GetShortArticleResponse> articles = articleService.findLatestShortArticles(start,end);
        GetShortPageResponse res = new GetShortPageResponse();
        res.setSuccess(true);
        res.setHttpStatus(200);
        res.setArticleList(articles);
        return res;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/search")
    @Transactional
    @ApiOperation("Get latest articles")
    public GetShortPageResponse getLatestShortArticlesByRange(SearchRequest request) throws ApiException {
        logger.info("Retrieving latest 5 articles");
        if (request.getKeyword()==null || request.getKeyword().equals("")){
            return new GetShortPageResponse("Search key word is empty");
        }
        int PageSize = 50;
        if (request.getPageSize()>0) PageSize =request.getPageSize();
        Set<GetShortArticleResponse> articles = articleService.findByTitle(request.getKeyword(),request.getPageNum(),PageSize);
        GetShortPageResponse res = new GetShortPageResponse();
        res.setSuccess(true);
        res.setHttpStatus(200);
        res.setArticleList(articles);
        return res;
    }

    @DELETE
    @Path("/articles/{id}")
    public Response deleteArticleById(@PathParam("id") int id) throws ApiException {
        logger.info("Deleting article");

        articleService.deleteById(id);

        return Response.status(Response.Status.OK).build();
    }

}