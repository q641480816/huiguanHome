package com.huiguan.web.controllers;

import com.huiguan.web.model.Resource;
import com.huiguan.web.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
    public Response index(@PathParam("id") int id) {
        Resource resource = resourceService.findById(id).get();
        return Response.status(Response.Status.OK).entity(resource).build();
    }

    @Override
    public Set<Class<?>> getClasses() {
        return new HashSet(Arrays.asList(HelloWorldRestService.class));
    }
}