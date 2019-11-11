package blog.controllers;

import blog.models.Resource;
import blog.services.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
@ApplicationPath("huiguan")
public class HomeController extends Application {
    @Autowired
    private ResourceService resourceService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/resources/{id}")
    public Response index(@PathParam("id") int id) {
        Resource resource = resourceService.findById(id);
        return Response.status(Response.Status.OK).entity(resource).build();
    }

    @Override
    public Set<Class<?>> getClasses() {
        return new HashSet(Arrays.asList(HelloWorldRestService.class));
    }
}