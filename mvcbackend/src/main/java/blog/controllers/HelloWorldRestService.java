package blog.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/hi")
public class HelloWorldRestService {

    @GET
    public String getHelloMessage(){
        return "Hi there!";
    }
}