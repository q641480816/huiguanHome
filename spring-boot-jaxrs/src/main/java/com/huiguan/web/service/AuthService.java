package com.huiguan.web.service;

import com.huiguan.web.dto.BaseResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    public static final String password= "admin_jinjiang";

    public Boolean checkToken(String token){
        if (token==null||token.isEmpty()||!token.equals("Chinkang#_00!")) return false;
        else return true;
    }

}
