package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateNewResourceRequest {
    String url;
    int type;
}
