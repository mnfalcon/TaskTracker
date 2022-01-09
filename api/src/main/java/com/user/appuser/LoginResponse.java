package com.user.appuser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.ResponseBody;

@AllArgsConstructor
@Getter
@Setter
@ResponseBody
public class LoginResponse {
    private String token;
    private String username;
}
