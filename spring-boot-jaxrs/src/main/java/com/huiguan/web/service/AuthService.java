package com.huiguan.web.service;

import com.huiguan.web.dto.BaseResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    public static final String password= "admin_jinjiang";

    public Boolean checkToken(String token){
        if (token==null||token.isEmpty()||!token.equals("this_is_good_password_for_huiguan@chinkang.org.sg")) return false;
        else return true;
    }

}
