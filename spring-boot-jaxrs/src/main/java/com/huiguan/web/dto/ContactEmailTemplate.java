package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class ContactEmailTemplate {
    String content;
    String replyTo;
    Timestamp creationTime;
}
