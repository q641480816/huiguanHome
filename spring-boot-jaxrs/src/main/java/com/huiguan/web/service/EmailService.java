package com.huiguan.web.service;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.huiguan.web.dto.BaseResponse;
import com.huiguan.web.dto.Beneficiary;
import com.huiguan.web.dto.ContactEmailTemplate;
import com.huiguan.web.dto.CreateEmailTemplate;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;


import java.io.FileNotFoundException;
import java.io.FileOutputStream;


@Service
public class EmailService {
    private static final Logger logger = LogManager.getLogger(EmailService.class);

    @Value("${huiguan.email:howard.zhang.1995@gmail.com}")
    private String emailAddress;
    @Value("${huiguan.path:SimHei.ttf}")
    private String FONT;

    public BaseResponse send(ContactEmailTemplate req) {
        logger.info("Current working directory is: "+Paths.get(".").toAbsolutePath().normalize().toString());

        String emailSubject = "联系我们  Inquiry";
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
                    InternetAddress.parse(emailAddress)
            );
            message.setSubject(emailSubject);

            // Adding different parts to email
            Multipart multipart = new MimeMultipart();

            // set text part
            logger.info("Attaching the text");
            MimeBodyPart textPart = new MimeBodyPart();
            textPart.setText( "Please reply to this email 联系人: " + req.getReplyTo()  +"\n\n Content 反馈内容: " + req.getContent(), "utf-8" );
            multipart.addBodyPart(textPart);

            message.setContent(multipart);
            Transport.send(message);

            logger.info("Email sent successfully");
            return new BaseResponse(200, true);


        } catch (MessagingException | RuntimeException e) {
            e.printStackTrace();
            return new BaseResponse("Email not sent successfully. Please try again");
        }
    }

    public BaseResponse send(CreateEmailTemplate req) {
        String fileName = saveToPdf(req);
        String emailSubject = "";
        if (req.getBeneficiaries()==null){
            emailSubject ="青年团入会申请 Youth club application form";
        }
        else{
            emailSubject= "入会申请 Membership application form";
        }
        if (req.getNameEnglish()!=null&&!req.getNameEnglish().isEmpty()) emailSubject = emailSubject +" for: " + req.getNameEnglish();

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
                    InternetAddress.parse(emailAddress)
            );
            message.setSubject(emailSubject);

            // Adding different parts to email
            Multipart multipart = new MimeMultipart();

            // set text part
            logger.info("Attaching the text");
            MimeBodyPart textPart = new MimeBodyPart();
            textPart.setText( "Dear User, \n Please find attached for more info. \n Thank you", "utf-8" );
            multipart.addBodyPart(textPart);

            logger.info("Attaching the Pdf");
            File f = new File(fileName);
            if (!fileName.isEmpty() && f.exists()){
                logger.info("Pdf created successfully, sending the pdf");
                MimeBodyPart pdfAttachmentPart = new MimeBodyPart();
                pdfAttachmentPart.attachFile(f,"application/pdf",null);
                multipart.addBodyPart(pdfAttachmentPart);
            }else{
                // creates message part
                logger.info("Pdf failed, sending the Json String");
                MimeBodyPart messageBodyPart = new MimeBodyPart();
                messageBodyPart.setText( jsonString, "utf-8" );

                multipart.addBodyPart(messageBodyPart);
            }


            // photo attachment
            logger.info("Attaching the photo");
            String rawImageString = req.getImage();
            String imageBase64 = "";
            String[] imageParts = rawImageString.split(",");
            if (rawImageString!=null &&!rawImageString.isEmpty()) imageBase64=rawImageString.split(",")[1];
            if (!imageBase64.equals("")){
                String type=imageParts[0].split("/")[1].split(";")[0];
                MimeBodyPart photoPart = new PreencodedMimeBodyPart("base64");
                photoPart.setFileName("photo." + type);
                photoPart.setText(imageBase64);
                multipart.addBodyPart(photoPart);
            }



            message.setContent(multipart);
            Transport.send(message);

            logger.info("Email sent successfully");
            return new BaseResponse(200, true);
        } catch (MessagingException | RuntimeException | IOException e) {
            e.printStackTrace();
            return new BaseResponse("Email not sent successfully. Please try again");
        }
    }

    private String saveToPdf (CreateEmailTemplate req){
        logger.info("Save data in Pdf");
        Document document = new Document();
        Font titleFont = FontFactory.getFont(FontFactory.COURIER, 14, Font.BOLD, new CMYKColor(255, 0, 0, 0));
        //Font textFont = FontFactory.getFont(FontFactory.COURIER, 12, Font.BOLD, new CMYKColor(0, 0, 0, 255));
        Font fontChinese = FontFactory.getFont(FONT, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        try
        {
            String fileName = "Application form";
            if (req.getNameEnglish()!=null){
                fileName=fileName+"_"+req.getNameEnglish();
            }
            fileName+=".pdf";
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileName));
            document.open();

            Paragraph titleApplicant = new Paragraph("Particular of Applicant 张 \n", titleFont);
            Paragraph titleBeneficiaries = new Paragraph("Particular of Beneficiaries \n", titleFont);
            document.add(titleApplicant);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f); //Space before table
            table.setSpacingAfter(10f); //Space after table
//
//            float[] columnWidths = {1f, 1f};
//            table.setWidths(columnWidths);


            // Create cells
            PdfPCell cell1 = new PdfPCell(new Paragraph("中文姓名 Chinese Name: " + checkNull(req.getNameChinese()),fontChinese));
            PdfPCell cell2 = new PdfPCell(new Paragraph("英文姓名 English Name: " + checkNull(req.getNameEnglish()),fontChinese));
            PdfPCell cell3 = new PdfPCell(new Paragraph("身份证号码 Nric: " + checkNull(req.getNric()),fontChinese));
            PdfPCell cell4 = new PdfPCell(new Paragraph("出生日期 Date Of Birth: "+ checkNull(req.getDateOfBirth()),fontChinese));
            PdfPCell cell5 = new PdfPCell(new Paragraph("住家电话 Home Tel: " + checkNull(req.getHomeTel()),fontChinese));
            PdfPCell cell6 = new PdfPCell(new Paragraph("性别 Sex: " + checkNull(req.getSex()),fontChinese));
            PdfPCell cell7 = new PdfPCell(new Paragraph("出生地点 Place of Birth: "+ checkNull(req.getPlaceOfBirth()),fontChinese));
            PdfPCell cell8 = new PdfPCell(new Paragraph("办事处电话 Office Tel: "+ checkNull(req.getOfficeTel()),fontChinese));
            PdfPCell cell9 = new PdfPCell(new Paragraph("职业 Occupation: "+ checkNull(req.getOccupation()),fontChinese));
            PdfPCell cell10 = new PdfPCell(new Paragraph("国籍 Nationality: "+ checkNull(req.getNationality()),fontChinese));
            PdfPCell cell11 = new PdfPCell(new Paragraph("手机 Hand phone: "+ checkNull(req.getHp()),fontChinese));
            PdfPCell cell12 = new PdfPCell(new Paragraph("电邮 Email: "+ checkNull(req.getEmail()),fontChinese));
            PdfPCell cell13 = new PdfPCell(new Paragraph("原籍 Origin: "+ checkNull(req.getOrigin()),fontChinese));
            PdfPCell cell14 = new PdfPCell(new Paragraph("学历 Education: "+ checkNull(req.getEducation()),fontChinese));
            PdfPCell cell15 = new PdfPCell(new Paragraph("住家地址 Home address: "+ checkNull(req.getHomeAddress()),fontChinese));
            PdfPCell cell16 = new PdfPCell(new Paragraph("办事处地址 Office address: "+ checkNull(req.getOfficeAddress()),fontChinese));
            PdfPCell cell17 = new PdfPCell(new Paragraph("参加之团体及职位 Other clubs"+ checkNull(req.getOtherClubs()),fontChinese));
            PdfPCell cell18 = new PdfPCell(new Paragraph("介绍人 Introduced by: "+ checkNull(req.getIntroducedBy()),fontChinese));
            PdfPCell cell19 = new PdfPCell(new Paragraph("申请日期 Submitted time: "+ checkNull(toDate(req.getCreationTime())),fontChinese));
            PdfPCell cell20 = new PdfPCell(new Paragraph(""));


            // Add cells in table
            table.addCell(cell1);
            table.addCell(cell2);
            table.addCell(cell3);
            table.addCell(cell4);
            table.addCell(cell5);
            table.addCell(cell6);
            table.addCell(cell7);
            table.addCell(cell8);
            table.addCell(cell9);
            table.addCell(cell10);
            table.addCell(cell11);
            table.addCell(cell12);
            table.addCell(cell13);
            table.addCell(cell14);
            table.addCell(cell15);
            table.addCell(cell16);
            table.addCell(cell17);
            table.addCell(cell18);
            table.addCell(cell19);
            table.addCell(cell20);

            document.add(table);



            if (req.getBeneficiaries()!=null) {
                document.add(titleBeneficiaries);
                logger.info("Adding beneficiaries");
                for (Beneficiary beneficiary : req.getBeneficiaries()) {
                    document.add(getTableFromBeneficiary(beneficiary,fontChinese));
                }
            }

            document.close();
            writer.close();
            logger.info("Pdf is saved at "+Paths.get(".").toAbsolutePath().normalize().toString());
            return fileName;
        } catch (DocumentException e)
        {
            e.printStackTrace();
            return "";
        } catch (FileNotFoundException e)
        {
            e.printStackTrace();
            return "";
        }
    }

    private PdfPTable getTableFromBeneficiary(Beneficiary req,Font fontChinese) {

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f); //Space before table
        table.setSpacingAfter(10f); //Space after table

        PdfPCell cell1 = new PdfPCell(new Paragraph("中文姓名 Chinese Name: " + checkNull(req.getNameChinese()),fontChinese));
        PdfPCell cell2 = new PdfPCell(new Paragraph("英文姓名 English Name: " + checkNull(req.getNameEnglish()),fontChinese));
        PdfPCell cell3 = new PdfPCell(new Paragraph("性别 Sex: " + checkNull(req.getSex()),fontChinese));
        PdfPCell cell4 = new PdfPCell(new Paragraph("年龄 Age: " + checkNull(req.getAge()),fontChinese));
        PdfPCell cell5 = new PdfPCell(new Paragraph("地址 Address: "+ checkNull(req.getAddress()),fontChinese));
        PdfPCell cell6 = new PdfPCell(new Paragraph("关系 Relationship: " + checkNull(req.getRelationship()),fontChinese));
        PdfPCell cell7 = new PdfPCell(new Paragraph("身份证号码 Nric: " + checkNull(req.getNric()),fontChinese));
        PdfPCell cell8 = new PdfPCell(new Paragraph(""));

        table.addCell(cell1);
        table.addCell(cell2);
        table.addCell(cell3);
        table.addCell(cell4);
        table.addCell(cell5);
        table.addCell(cell6);
        table.addCell(cell7);
        table.addCell(cell8);
        return table;
    }

    private String toDate(Timestamp timestamp) {
        if (timestamp == null) return null;
        Date date = new Date(timestamp.getTime());
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }

    private String checkNull(String in){
        if (in ==null) return "";
        else return in;
    }

}
