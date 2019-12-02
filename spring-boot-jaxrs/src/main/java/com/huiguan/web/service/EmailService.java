package com.huiguan.web.service;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.huiguan.web.controllers.HomeController;
import com.huiguan.web.dto.BaseResponse;
import com.huiguan.web.dto.CreateEmailTemplate;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import sun.rmi.runtime.Log;

import javax.mail.*;
import javax.mail.internet.*;
import javax.swing.plaf.basic.BasicEditorPaneUI;
import java.util.Properties;

@Service
public class EmailService {
    private static final Logger logger = LogManager.getLogger(EmailService.class);


//    // for example, smtp.mailgun.org
//    private static final String SMTP_SERVER = "smtp server ";
//    private static final String USERNAME = "chinkang.no.reply@gmail.com";
//    private static final String PASSWORD = "chinkang123";
//
//    private static final String EMAIL_FROM = "From@gmail.com";
//    private static final String EMAIL_TO = "howard.zhang.1995@gmail.com";
//    private static final String EMAIL_TO_CC = "";
//
//    private static final String EMAIL_SUBJECT = "Test Send Email via SMTP";
//    private static final String EMAIL_TEXT = "Hello Java Mail \n ABC123";

    public void start() {

        final String username = "chinkang.no.reply@gmail.com";
        final String password = "chinkang123";


        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true"); //TLS


        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });


        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("from@gmail.com"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse("howard.zhang.1995@gmail.com")
            );
            message.setSubject("Testing Gmail TLS");
            message.setText("Dear Mail Crawler,"
                    + "\n\n Please do not spam my email!");

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public BaseResponse send(CreateEmailTemplate req) {
        String emailSubject = "";
        if (req.getNameEnglish()!=null&&!req.getNameEnglish().isEmpty()) emailSubject = "New registration form for: " +
                req.getNameEnglish();
        else emailSubject = "New registration form";
        logger.info("Creating the text content");
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String jsonString = gson.toJson(req);

        logger.info("Setting up the email server");
        final String username = "chinkang.no.reply@gmail.com";
        final String password = "chinkang123";


        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true"); //TLS


        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });


        try {


            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("from@gmail.com"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse("howard.zhang.1995@gmail.com,q641480816@gmail.com")
            );
            message.setSubject(emailSubject);

            // creates message part
            MimeBodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setText( jsonString, "utf-8" );
            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);

            String rawImageString = req.getImage();
            String imageBase64 = "";
            String[] imageParts = rawImageString.split(",");
            if (rawImageString!=null &&!rawImageString.isEmpty()) imageBase64=rawImageString.split(",")[1];
            if (!imageBase64.equals("")){
                String type=imageParts[0].split("/")[1].split(";")[0];
                MimeBodyPart filePart = new PreencodedMimeBodyPart("base64");
                filePart.setFileName("photo." + type);
                filePart.setText(imageBase64);
                multipart.addBodyPart(filePart);
            }


            message.setContent(multipart);
            Transport.send(message);

            logger.info("Email sent successfully");
            return new BaseResponse(200, true);
        } catch (MessagingException | RuntimeException e) {
            e.printStackTrace();
            return new BaseResponse("Email not sent successfully. Please try again");
        }
    }
}
