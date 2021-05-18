package com.huiguan.web.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UploadArticles {
    List<CreateNewArticleRequest> articles;
}
